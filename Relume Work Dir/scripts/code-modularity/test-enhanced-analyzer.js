#!/usr/bin/env node

/**
 * Test script for the enhanced code analyzer
 * Tests the new dead code detection, unused imports, and code duplication features
 */

const { analyzeFile } = require('./code-analyzer');
const { getConfig } = require('./config');
const path = require('path');
const fs = require('fs');

// Create test files with known issues
const testDir = path.join(__dirname, 'test-files');
if (!fs.existsSync(testDir)) {
  fs.mkdirSync(testDir);
}

// Test file with dead code
const deadCodeTest = `
import React from 'react';

function testFunction() {
  const x = 5;
  return x;
  
  // This code is unreachable
  console.log('This will never execute');
  const y = 10;
}

function anotherTest() {
  if (false) {
    console.log('This is also unreachable');
  }
  
  throw new Error('Something went wrong');
  console.log('This is unreachable after throw');
}

export default testFunction;
`;

// Test file with unused imports
const unusedImportsTest = `
import React from 'react';
import { useState, useEffect } from 'react';
import lodash from 'lodash';
import moment from 'moment';

function MyComponent() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default MyComponent;
`;

// Test file with code duplication
const codeDuplicationTest = `
function calculateArea(length, width) {
  if (length <= 0 || width <= 0) {
    throw new Error('Invalid dimensions');
  }
  
  const area = length * width;
  const perimeter = 2 * (length + width);
  
  return {
    area: area,
    perimeter: perimeter,
    isSquare: length === width
  };
}

function calculateRectangle(l, w) {
  if (l <= 0 || w <= 0) {
    throw new Error('Invalid dimensions');
  }
  
  const area = l * w;
  const perimeter = 2 * (l + w);
  
  return {
    area: area,
    perimeter: perimeter,
    isSquare: l === w
  };
}

function processData(data) {
  const result = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i] !== null && data[i] !== undefined) {
      result.push(data[i] * 2);
    }
  }
  return result;
}

function transformArray(arr) {
  const output = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== null && arr[i] !== undefined) {
      output.push(arr[i] * 2);
    }
  }
  return output;
}
`;

// Write test files
const testFiles = [
  { name: 'dead-code-test.js', content: deadCodeTest },
  { name: 'unused-imports-test.jsx', content: unusedImportsTest },
  { name: 'code-duplication-test.js', content: codeDuplicationTest }
];

testFiles.forEach(({ name, content }) => {
  fs.writeFileSync(path.join(testDir, name), content);
});

// Run tests
async function runTests() {
  console.log('🧪 Testing Enhanced Code Analyzer\n');
  
  const config = getConfig();
  
  for (const { name } of testFiles) {
    const filePath = path.join(testDir, name);
    console.log(`📁 Analyzing: ${name}`);
    console.log('─'.repeat(50));
    
    try {
      const results = analyzeFile(filePath, config);
      
      if (results.analyzed) {
        console.log(`✅ Analysis completed successfully`);
        console.log(`📊 File metrics:`);
        console.log(`   - Lines: ${results.fileLength}`);
        console.log(`   - Functions: ${results.functions.length}`);
        console.log(`   - Complexity: ${results.fileComplexity}`);
        
        if (results.issues && results.issues.length > 0) {
          console.log(`\n🔍 Issues found (${results.issues.length}):`);
          results.issues.forEach((issue, index) => {
            console.log(`   ${index + 1}. [${issue.severity.toUpperCase()}] ${issue.type}: ${issue.message}`);
            if (issue.location) {
              console.log(`      Location: Line ${issue.location.start.line}`);
            }
          });
        } else {
          console.log(`\n✨ No issues found`);
        }
        
        if (results.enhancedAnalysis) {
          console.log(`\n🔬 Enhanced Analysis Results:`);
          if (results.enhancedAnalysis.deadCode.length > 0) {
            console.log(`   - Dead code blocks: ${results.enhancedAnalysis.deadCode.length}`);
          }
          if (results.enhancedAnalysis.unusedImports.length > 0) {
            console.log(`   - Unused imports: ${results.enhancedAnalysis.unusedImports.length}`);
          }
          if (results.enhancedAnalysis.duplicatedCode.length > 0) {
            console.log(`   - Code duplications: ${results.enhancedAnalysis.duplicatedCode.length}`);
          }
        }
        
      } else {
        console.log(`❌ Analysis failed: ${results.reason}`);
      }
      
    } catch (error) {
      console.log(`💥 Error analyzing file: ${error.message}`);
    }
    
    console.log('\n');
  }
  
  // Clean up test files
  testFiles.forEach(({ name }) => {
    fs.unlinkSync(path.join(testDir, name));
  });
  fs.rmdirSync(testDir);
  
  console.log('🧹 Test files cleaned up');
  console.log('✅ Enhanced Code Analyzer testing completed!');
}

// Run the tests
runTests().catch(console.error);
