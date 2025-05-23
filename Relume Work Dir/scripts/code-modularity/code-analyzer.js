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

    // Run enhanced analysis if enabled
    if (config.enhancedAnalysis && config.enhancedAnalysis.enabled) {
      const enhancedResults = runEnhancedAnalysis(ast, code, filePath, config);
      results.issues.push(...enhancedResults.issues);
      results.enhancedAnalysis = enhancedResults.analysis;
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

/**
 * Runs enhanced analysis on the AST
 * @param {Object} ast AST of the code
 * @param {string} code Original code
 * @param {string} filePath Path to the file
 * @param {Object} config Configuration object
 * @returns {Object} Enhanced analysis results
 */
function runEnhancedAnalysis(ast, code, filePath, config) {
  const issues = [];
  const analysis = {
    deadCode: [],
    unusedImports: [],
    duplicatedCode: []
  };

  // Dead code detection
  if (config.enhancedAnalysis.deadCodeDetection) {
    const deadCodeResults = detectDeadCode(ast, code);
    analysis.deadCode = deadCodeResults;
    deadCodeResults.forEach(deadCode => {
      issues.push({
        type: 'deadCode',
        severity: 'medium',
        message: `Unreachable code detected: ${deadCode.type}`,
        location: deadCode.location
      });
    });
  }

  // Unused imports detection
  if (config.enhancedAnalysis.unusedImportsDetection) {
    const unusedImportsResults = detectUnusedImports(ast, code);
    analysis.unusedImports = unusedImportsResults;
    unusedImportsResults.forEach(unusedImport => {
      issues.push({
        type: 'unusedImport',
        severity: 'low',
        message: `Unused import: ${unusedImport.name}`,
        location: unusedImport.location
      });
    });
  }

  // Code duplication detection
  if (config.enhancedAnalysis.codeDuplicationDetection) {
    const duplicatedCodeResults = detectCodeDuplication(ast, code, config.enhancedAnalysis.duplicateThreshold);
    analysis.duplicatedCode = duplicatedCodeResults;
    duplicatedCodeResults.forEach(duplicate => {
      issues.push({
        type: 'codeDuplication',
        severity: 'medium',
        message: `Duplicated code block (${duplicate.lines} lines)`,
        location: duplicate.location
      });
    });
  }

  return { issues, analysis };
}

/**
 * Detects dead/unreachable code
 * @param {Object} ast AST of the code
 * @param {string} code Original code
 * @returns {Array} Array of dead code locations
 */
function detectDeadCode(ast, code) {
  const deadCode = [];

  traverse(ast, {
    // Detect unreachable code after return statements
    ReturnStatement(path) {
      const nextSibling = path.getNextSibling();
      if (nextSibling && nextSibling.node) {
        deadCode.push({
          type: 'unreachable after return',
          location: {
            start: { line: nextSibling.node.loc.start.line, column: nextSibling.node.loc.start.column },
            end: { line: nextSibling.node.loc.end.line, column: nextSibling.node.loc.end.column }
          }
        });
      }
    },

    // Detect unreachable code after throw statements
    ThrowStatement(path) {
      const nextSibling = path.getNextSibling();
      if (nextSibling && nextSibling.node) {
        deadCode.push({
          type: 'unreachable after throw',
          location: {
            start: { line: nextSibling.node.loc.start.line, column: nextSibling.node.loc.start.column },
            end: { line: nextSibling.node.loc.end.line, column: nextSibling.node.loc.end.column }
          }
        });
      }
    },

    // Detect unreachable code in if(false) blocks
    IfStatement(path) {
      const test = path.node.test;
      if (test.type === 'BooleanLiteral' && test.value === false) {
        deadCode.push({
          type: 'unreachable if(false) block',
          location: {
            start: { line: path.node.consequent.loc.start.line, column: path.node.consequent.loc.start.column },
            end: { line: path.node.consequent.loc.end.line, column: path.node.consequent.loc.end.column }
          }
        });
      }
    }
  });

  return deadCode;
}

/**
 * Detects unused imports
 * @param {Object} ast AST of the code
 * @param {string} code Original code
 * @returns {Array} Array of unused imports
 */
function detectUnusedImports(ast, code) {
  const imports = new Map();
  const usedIdentifiers = new Set();

  // Collect all imports
  traverse(ast, {
    ImportDeclaration(path) {
      path.node.specifiers.forEach(spec => {
        if (spec.type === 'ImportDefaultSpecifier') {
          imports.set(spec.local.name, {
            name: spec.local.name,
            location: {
              start: { line: path.node.loc.start.line, column: path.node.loc.start.column },
              end: { line: path.node.loc.end.line, column: path.node.loc.end.column }
            }
          });
        } else if (spec.type === 'ImportSpecifier') {
          imports.set(spec.local.name, {
            name: spec.local.name,
            location: {
              start: { line: path.node.loc.start.line, column: path.node.loc.start.column },
              end: { line: path.node.loc.end.line, column: path.node.loc.end.column }
            }
          });
        }
      });
    }
  });

  // Collect all used identifiers
  traverse(ast, {
    Identifier(path) {
      // Skip if this is part of an import declaration
      if (path.isImportDefaultSpecifier() || path.isImportSpecifier()) {
        return;
      }
      usedIdentifiers.add(path.node.name);
    }
  });

  // Find unused imports
  const unusedImports = [];
  imports.forEach((importInfo, name) => {
    if (!usedIdentifiers.has(name)) {
      unusedImports.push(importInfo);
    }
  });

  return unusedImports;
}

/**
 * Detects code duplication
 * @param {Object} ast AST of the code
 * @param {string} code Original code
 * @param {number} threshold Minimum lines for duplication detection
 * @returns {Array} Array of duplicated code blocks
 */
function detectCodeDuplication(ast, code, threshold) {
  const codeBlocks = [];
  const duplicates = [];

  // Extract code blocks from functions and methods
  traverse(ast, {
    Function(path) {
      const startLine = path.node.loc.start.line;
      const endLine = path.node.loc.end.line;
      const lines = endLine - startLine + 1;

      if (lines >= threshold) {
        const codeLines = code.split('\n').slice(startLine - 1, endLine);
        const normalizedCode = normalizeCodeForComparison(codeLines.join('\n'));

        codeBlocks.push({
          code: normalizedCode,
          originalCode: codeLines.join('\n'),
          location: {
            start: { line: startLine, column: path.node.loc.start.column },
            end: { line: endLine, column: path.node.loc.end.column }
          },
          lines
        });
      }
    }
  });

  // Find duplicates
  for (let i = 0; i < codeBlocks.length; i++) {
    for (let j = i + 1; j < codeBlocks.length; j++) {
      const similarity = calculateSimilarity(codeBlocks[i].code, codeBlocks[j].code);
      if (similarity > 0.8) { // 80% similarity threshold
        duplicates.push({
          location: codeBlocks[i].location,
          lines: codeBlocks[i].lines,
          similarity: Math.round(similarity * 100),
          duplicateLocation: codeBlocks[j].location
        });
      }
    }
  }

  return duplicates;
}

/**
 * Normalizes code for comparison by removing whitespace and comments
 * @param {string} code Code to normalize
 * @returns {string} Normalized code
 */
function normalizeCodeForComparison(code) {
  return code
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
    .replace(/\/\/.*$/gm, '') // Remove line comments
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}

/**
 * Calculates similarity between two code strings
 * @param {string} code1 First code string
 * @param {string} code2 Second code string
 * @returns {number} Similarity ratio (0-1)
 */
function calculateSimilarity(code1, code2) {
  if (code1 === code2) return 1;
  if (code1.length === 0 || code2.length === 0) return 0;

  // Simple Levenshtein distance-based similarity
  const maxLength = Math.max(code1.length, code2.length);
  const distance = levenshteinDistance(code1, code2);
  return 1 - (distance / maxLength);
}

/**
 * Calculates Levenshtein distance between two strings
 * @param {string} str1 First string
 * @param {string} str2 Second string
 * @returns {number} Levenshtein distance
 */
function levenshteinDistance(str1, str2) {
  const matrix = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
}

module.exports = {
  analyzeFile,
  shouldAnalyzeFile,
  analyzeJavaScript,
  runEnhancedAnalysis,
  detectDeadCode,
  detectUnusedImports,
  detectCodeDuplication
};
