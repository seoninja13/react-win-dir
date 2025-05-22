/**
 * Code Analyzer Module
 * 
 * Analyzes code files for complexity, length, and modularization opportunities.
 */

const fs = require('fs');
const path = require('path');
const esprima = require('esprima');
const { parse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;

/**
 * Analyzes a file for complexity and modularization opportunities
 * @param {string} filePath Path to the file to analyze
 * @param {Object} config Configuration object
 * @returns {Object} Analysis results
 */
function analyzeFile(filePath, config) {
  try {
    // Read the file
    const code = fs.readFileSync(filePath, 'utf8');
    const extension = path.extname(filePath).toLowerCase();
    
    // Skip analysis if file type is not in the configured list
    if (!shouldAnalyzeFile(filePath, config)) {
      return {
        filePath,
        analyzed: false,
        reason: 'File type or path excluded by configuration'
      };
    }
    
    // Analyze based on file type
    if (['.js', '.jsx', '.ts', '.tsx'].includes(extension)) {
      return analyzeJavaScript(code, filePath, config);
    } else {
      return {
        filePath,
        analyzed: false,
        reason: 'Unsupported file type'
      };
    }
  } catch (error) {
    console.error(`Error analyzing file ${filePath}:`, error.message);
    return {
      filePath,
      analyzed: false,
      reason: `Error: ${error.message}`
    };
  }
}

/**
 * Check if a file should be analyzed based on configuration
 * @param {string} filePath Path to the file
 * @param {Object} config Configuration object
 * @returns {boolean} True if the file should be analyzed
 */
function shouldAnalyzeFile(filePath, config) {
  // Check file extension
  const extension = path.extname(filePath).substring(1).toLowerCase();
  if (!config.fileTypes.includes(extension)) {
    return false;
  }
  
  // Check excluded paths
  for (const excludePath of config.excludePaths) {
    if (filePath.includes(excludePath)) {
      return false;
    }
  }
  
  return true;
}

/**
 * Analyzes JavaScript/TypeScript code
 * @param {string} code Code to analyze
 * @param {string} filePath Path to the file
 * @param {Object} config Configuration object
 * @returns {Object} Analysis results
 */
function analyzeJavaScript(code, filePath, config) {
  try {
    // Parse the code
    const ast = parse(code, {
      sourceType: 'module',
      plugins: [
        'jsx',
        'typescript',
        'classProperties',
        'decorators-legacy'
      ]
    });
    
    // Initialize results
    const results = {
      filePath,
      analyzed: true,
      functions: [],
      classes: [],
      fileComplexity: 0,
      fileLength: code.split('\n').length,
      issues: []
    };
    
    // Analyze functions and methods
    traverse(ast, {
      Function(path) {
        const functionInfo = analyzeFunctionNode(path.node, code, config);
        results.functions.push(functionInfo);
        
        // Check for issues
        if (functionInfo.complexity > config.analysis.complexityThreshold) {
          results.issues.push({
            type: 'complexity',
            severity: 'high',
            message: `Function ${functionInfo.name || 'anonymous'} has high complexity (${functionInfo.complexity})`,
            location: functionInfo.location
          });
        }
        
        if (functionInfo.length > config.analysis.lengthThreshold) {
          results.issues.push({
            type: 'length',
            severity: 'medium',
            message: `Function ${functionInfo.name || 'anonymous'} is too long (${functionInfo.length} lines)`,
            location: functionInfo.location
          });
        }
        
        if (functionInfo.maxDepth > config.analysis.depthThreshold) {
          results.issues.push({
            type: 'nesting',
            severity: 'medium',
            message: `Function ${functionInfo.name || 'anonymous'} has deep nesting (depth ${functionInfo.maxDepth})`,
            location: functionInfo.location
          });
        }
        
        if (functionInfo.params > config.analysis.parameterThreshold) {
          results.issues.push({
            type: 'parameters',
            severity: 'low',
            message: `Function ${functionInfo.name || 'anonymous'} has too many parameters (${functionInfo.params})`,
            location: functionInfo.location
          });
        }
      },
      
      ClassDeclaration(path) {
        const classInfo = analyzeClassNode(path.node, code, config);
        results.classes.push(classInfo);
      }
    });
    
    // Calculate overall file complexity
    results.fileComplexity = results.functions.reduce((sum, func) => sum + func.complexity, 0);
    
    // Add file-level issues
    if (results.fileLength > config.analysis.lengthThreshold * 3) {
      results.issues.push({
        type: 'fileLength',
        severity: 'high',
        message: `File is too long (${results.fileLength} lines)`,
        location: { start: { line: 1, column: 0 } }
      });
    }
    
    if (results.fileComplexity > config.analysis.complexityThreshold * 3) {
      results.issues.push({
        type: 'fileComplexity',
        severity: 'high',
        message: `File has high overall complexity (${results.fileComplexity})`,
        location: { start: { line: 1, column: 0 } }
      });
    }
    
    return results;
  } catch (error) {
    console.error(`Error analyzing JavaScript in ${filePath}:`, error.message);
    return {
      filePath,
      analyzed: false,
      reason: `Error analyzing JavaScript: ${error.message}`
    };
  }
}

/**
 * Analyzes a function node for complexity and other metrics
 * @param {Object} node AST node for the function
 * @param {string} code Original code
 * @param {Object} config Configuration object
 * @returns {Object} Function analysis results
 */
function analyzeFunctionNode(node, code, config) {
  const functionName = node.id ? node.id.name : 'anonymous';
  const startLine = node.loc.start.line;
  const endLine = node.loc.end.line;
  const functionLength = endLine - startLine + 1;
  
  // Calculate cyclomatic complexity
  let complexity = 1; // Base complexity
  let maxDepth = 0;
  let currentDepth = 0;
  
  traverse(node, {
    IfStatement() {
      complexity++;
      currentDepth++;
      maxDepth = Math.max(maxDepth, currentDepth);
    },
    ForStatement() {
      complexity++;
      currentDepth++;
      maxDepth = Math.max(maxDepth, currentDepth);
    },
    WhileStatement() {
      complexity++;
      currentDepth++;
      maxDepth = Math.max(maxDepth, currentDepth);
    },
    DoWhileStatement() {
      complexity++;
      currentDepth++;
      maxDepth = Math.max(maxDepth, currentDepth);
    },
    SwitchCase() {
      complexity++;
    },
    LogicalExpression({ node }) {
      if (node.operator === '&&' || node.operator === '||') {
        complexity++;
      }
    },
    ConditionalExpression() {
      complexity++;
    },
    exit(path) {
      if (
        path.isIfStatement() ||
        path.isForStatement() ||
        path.isWhileStatement() ||
        path.isDoWhileStatement()
      ) {
        currentDepth--;
      }
    }
  });
  
  return {
    name: functionName,
    location: {
      start: { line: startLine, column: node.loc.start.column },
      end: { line: endLine, column: node.loc.end.column }
    },
    length: functionLength,
    complexity,
    maxDepth,
    params: node.params ? node.params.length : 0
  };
}

/**
 * Analyzes a class node for complexity and other metrics
 * @param {Object} node AST node for the class
 * @param {string} code Original code
 * @param {Object} config Configuration object
 * @returns {Object} Class analysis results
 */
function analyzeClassNode(node, code, config) {
  const className = node.id ? node.id.name : 'anonymous';
  const startLine = node.loc.start.line;
  const endLine = node.loc.end.line;
  const classLength = endLine - startLine + 1;
  
  // Extract methods
  const methods = [];
  
  if (node.body && node.body.body) {
    for (const member of node.body.body) {
      if (member.type === 'ClassMethod') {
        const methodInfo = analyzeFunctionNode(member, code, config);
        methods.push(methodInfo);
      }
    }
  }
  
  return {
    name: className,
    location: {
      start: { line: startLine, column: node.loc.start.column },
      end: { line: endLine, column: node.loc.end.column }
    },
    length: classLength,
    methods,
    methodCount: methods.length
  };
}

module.exports = {
  analyzeFile,
  shouldAnalyzeFile,
  analyzeJavaScript
};
