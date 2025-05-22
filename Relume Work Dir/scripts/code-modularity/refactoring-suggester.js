/**
 * Refactoring Suggester Module
 * 
 * Generates AI-powered refactoring suggestions based on code analysis.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { parse } = require('@babel/parser');
const generate = require('@babel/generator').default;
const traverse = require('@babel/traverse').default;
const t = require('@babel/types');

/**
 * Generate refactoring suggestions for a file
 * @param {Object} analysisResults Analysis results from code-analyzer
 * @param {Object} config Configuration object
 * @returns {Object} Refactoring suggestions
 */
async function generateSuggestions(analysisResults, config) {
  if (!analysisResults.analyzed) {
    return {
      filePath: analysisResults.filePath,
      suggestions: [],
      message: `Could not generate suggestions: ${analysisResults.reason}`
    };
  }
  
  const suggestions = [];
  
  // Generate suggestions for each issue
  for (const issue of analysisResults.issues) {
    switch (issue.type) {
      case 'complexity':
        suggestions.push(generateComplexitySuggestion(issue, analysisResults, config));
        break;
      case 'length':
        suggestions.push(generateLengthSuggestion(issue, analysisResults, config));
        break;
      case 'nesting':
        suggestions.push(generateNestingSuggestion(issue, analysisResults, config));
        break;
      case 'parameters':
        suggestions.push(generateParametersSuggestion(issue, analysisResults, config));
        break;
      case 'fileLength':
        suggestions.push(generateFileLengthSuggestion(issue, analysisResults, config));
        break;
      case 'fileComplexity':
        suggestions.push(generateFileComplexitySuggestion(issue, analysisResults, config));
        break;
    }
  }
  
  // If AI assistance is enabled, enhance suggestions with AI
  if (config.aiAssistance.enabled) {
    try {
      const enhancedSuggestions = await enhanceSuggestionsWithAI(suggestions, analysisResults, config);
      return {
        filePath: analysisResults.filePath,
        suggestions: enhancedSuggestions,
        message: 'Suggestions generated successfully with AI assistance'
      };
    } catch (error) {
      console.error('Error enhancing suggestions with AI:', error.message);
      // Fall back to basic suggestions
      return {
        filePath: analysisResults.filePath,
        suggestions,
        message: 'Suggestions generated without AI assistance due to an error'
      };
    }
  }
  
  return {
    filePath: analysisResults.filePath,
    suggestions,
    message: 'Suggestions generated successfully'
  };
}

/**
 * Generate a suggestion for high complexity
 * @param {Object} issue Issue object
 * @param {Object} analysisResults Analysis results
 * @param {Object} config Configuration object
 * @returns {Object} Suggestion object
 */
function generateComplexitySuggestion(issue, analysisResults, config) {
  // Find the function with this issue
  const func = analysisResults.functions.find(f => 
    f.location.start.line === issue.location.start.line
  );
  
  if (!func) {
    return {
      type: 'complexity',
      title: 'Reduce Complexity',
      description: 'This code has high cyclomatic complexity. Consider breaking it down into smaller, more focused functions.',
      location: issue.location,
      severity: issue.severity
    };
  }
  
  return {
    type: 'complexity',
    title: `Reduce Complexity in ${func.name || 'anonymous function'}`,
    description: `This function has a complexity of ${func.complexity}, which exceeds the threshold of ${config.analysis.complexityThreshold}. Consider breaking it down into smaller, more focused functions.`,
    location: issue.location,
    severity: issue.severity,
    suggestions: [
      'Extract conditional logic into separate helper functions',
      'Use early returns to reduce nesting',
      'Consider using a strategy pattern for complex conditional logic',
      'Break down large switch statements into separate functions'
    ]
  };
}

/**
 * Generate a suggestion for excessive function length
 * @param {Object} issue Issue object
 * @param {Object} analysisResults Analysis results
 * @param {Object} config Configuration object
 * @returns {Object} Suggestion object
 */
function generateLengthSuggestion(issue, analysisResults, config) {
  // Find the function with this issue
  const func = analysisResults.functions.find(f => 
    f.location.start.line === issue.location.start.line
  );
  
  if (!func) {
    return {
      type: 'length',
      title: 'Reduce Function Length',
      description: 'This function is too long. Consider breaking it down into smaller, more focused functions.',
      location: issue.location,
      severity: issue.severity
    };
  }
  
  return {
    type: 'length',
    title: `Reduce Length of ${func.name || 'anonymous function'}`,
    description: `This function is ${func.length} lines long, which exceeds the threshold of ${config.analysis.lengthThreshold}. Consider breaking it down into smaller, more focused functions.`,
    location: issue.location,
    severity: issue.severity,
    suggestions: [
      'Identify logical sections and extract them into separate functions',
      'Group related operations and extract them into helper methods',
      'Consider if the function is doing too many things and violating the Single Responsibility Principle',
      'Look for repeated code patterns that could be extracted and reused'
    ]
  };
}

/**
 * Generate a suggestion for excessive nesting
 * @param {Object} issue Issue object
 * @param {Object} analysisResults Analysis results
 * @param {Object} config Configuration object
 * @returns {Object} Suggestion object
 */
function generateNestingSuggestion(issue, analysisResults, config) {
  // Find the function with this issue
  const func = analysisResults.functions.find(f => 
    f.location.start.line === issue.location.start.line
  );
  
  if (!func) {
    return {
      type: 'nesting',
      title: 'Reduce Nesting Depth',
      description: 'This code has deep nesting. Consider refactoring to reduce the nesting level.',
      location: issue.location,
      severity: issue.severity
    };
  }
  
  return {
    type: 'nesting',
    title: `Reduce Nesting in ${func.name || 'anonymous function'}`,
    description: `This function has a nesting depth of ${func.maxDepth}, which exceeds the threshold of ${config.analysis.depthThreshold}. Deep nesting makes code harder to read and maintain.`,
    location: issue.location,
    severity: issue.severity,
    suggestions: [
      'Use early returns to reduce nesting',
      'Extract nested conditions into separate functions',
      'Consider using guard clauses to handle edge cases early',
      'Use Array methods like map, filter, and reduce instead of nested loops',
      'Consider restructuring the logic to be more linear'
    ]
  };
}

/**
 * Generate a suggestion for too many parameters
 * @param {Object} issue Issue object
 * @param {Object} analysisResults Analysis results
 * @param {Object} config Configuration object
 * @returns {Object} Suggestion object
 */
function generateParametersSuggestion(issue, analysisResults, config) {
  // Find the function with this issue
  const func = analysisResults.functions.find(f => 
    f.location.start.line === issue.location.start.line
  );
  
  if (!func) {
    return {
      type: 'parameters',
      title: 'Reduce Parameter Count',
      description: 'This function has too many parameters. Consider refactoring to reduce the parameter count.',
      location: issue.location,
      severity: issue.severity
    };
  }
  
  return {
    type: 'parameters',
    title: `Reduce Parameters in ${func.name || 'anonymous function'}`,
    description: `This function has ${func.params} parameters, which exceeds the threshold of ${config.analysis.parameterThreshold}. Too many parameters make a function harder to use and understand.`,
    location: issue.location,
    severity: issue.severity,
    suggestions: [
      'Group related parameters into an options object',
      'Consider if the function is doing too many things and should be split',
      'Use default parameter values for optional parameters',
      'Consider using the builder pattern for complex object construction',
      'Extract some parameters into a context or configuration object'
    ]
  };
}

/**
 * Generate a suggestion for excessive file length
 * @param {Object} issue Issue object
 * @param {Object} analysisResults Analysis results
 * @param {Object} config Configuration object
 * @returns {Object} Suggestion object
 */
function generateFileLengthSuggestion(issue, analysisResults, config) {
  return {
    type: 'fileLength',
    title: 'Split File into Multiple Modules',
    description: `This file is ${analysisResults.fileLength} lines long, which is excessive. Consider splitting it into multiple modules.`,
    location: issue.location,
    severity: issue.severity,
    suggestions: [
      'Identify groups of related functions and extract them into separate modules',
      'Consider if the file has multiple responsibilities that could be separated',
      'Look for natural boundaries in the code that could indicate separate modules',
      'Create a directory structure that reflects the domain model',
      'Consider using the facade pattern to provide a simple interface to complex subsystems'
    ]
  };
}

/**
 * Generate a suggestion for excessive file complexity
 * @param {Object} issue Issue object
 * @param {Object} analysisResults Analysis results
 * @param {Object} config Configuration object
 * @returns {Object} Suggestion object
 */
function generateFileComplexitySuggestion(issue, analysisResults, config) {
  return {
    type: 'fileComplexity',
    title: 'Reduce Overall File Complexity',
    description: `This file has an overall complexity of ${analysisResults.fileComplexity}, which is excessive. Consider refactoring to reduce complexity.`,
    location: issue.location,
    severity: issue.severity,
    suggestions: [
      'Break down complex functions into smaller, more focused functions',
      'Extract complex logic into separate modules',
      'Consider if the file is doing too many things and violating the Single Responsibility Principle',
      'Look for opportunities to use design patterns to simplify the code',
      'Consider if some functionality could be replaced with libraries or framework features'
    ]
  };
}

/**
 * Enhance suggestions with AI
 * @param {Array} suggestions Basic suggestions
 * @param {Object} analysisResults Analysis results
 * @param {Object} config Configuration object
 * @returns {Promise<Array>} Enhanced suggestions
 */
async function enhanceSuggestionsWithAI(suggestions, analysisResults, config) {
  // For now, we'll just return the basic suggestions
  // In a future implementation, this would call an AI service
  return suggestions;
}

module.exports = {
  generateSuggestions,
  generateComplexitySuggestion,
  generateLengthSuggestion,
  generateNestingSuggestion,
  generateParametersSuggestion,
  generateFileLengthSuggestion,
  generateFileComplexitySuggestion
};
