// Quick test for enhanced analyzer
const { analyzeFile } = require('./code-analyzer');
const { getConfig } = require('./config');

console.log('🧪 Testing Enhanced Code Analyzer');

// Test with our simple test file
const config = getConfig();
console.log('📋 Configuration loaded');

try {
  const result = analyzeFile('./scripts/code-modularity/simple-test.js', config);
  console.log('✅ Analysis completed');
  console.log('📊 Results:', JSON.stringify(result, null, 2));
} catch (error) {
  console.log('❌ Error:', error.message);
  console.log('Stack:', error.stack);
}
