/**
 * Code Modularity Tools
 * 
 * Main entry point for the code modularity tools functionality.
 */

const fs = require('fs');
const path = require('path');
const { analyzeFile } = require('./code-analyzer');
const { generateSuggestions } = require('./refactoring-suggester');
const { getConfig, updateConfig } = require('./config');
const { sendModularityNotification, sendSuggestionsNotification } = require('./notification');

/**
 * Command-line argument parser
 * @param {Array<string>} args Command-line arguments
 * @returns {Object} Parsed arguments
 */
function parseArgs(args) {
  const parsedArgs = {
    command: '',
    options: {},
    filePath: null
  };
  
  // Skip the first two arguments (node and script path)
  const cmdArgs = args.slice(2);
  
  if (cmdArgs.length === 0) {
    parsedArgs.command = 'help';
    return parsedArgs;
  }
  
  parsedArgs.command = cmdArgs[0];
  
  // Check for file path
  if (cmdArgs.length > 1 && !cmdArgs[1].startsWith('--')) {
    parsedArgs.filePath = cmdArgs[1];
  }
  
  // Parse options (--key=value or --flag)
  for (let i = 1; i < cmdArgs.length; i++) {
    const arg = cmdArgs[i];
    if (arg.startsWith('--')) {
      const option = arg.substring(2);
      const equalIndex = option.indexOf('=');
      
      if (equalIndex !== -1) {
        const key = option.substring(0, equalIndex);
        const value = option.substring(equalIndex + 1);
        parsedArgs.options[key] = value;
      } else {
        parsedArgs.options[option] = true;
      }
    }
  }
  
  return parsedArgs;
}

/**
 * Display help information
 */
function showHelp() {
  console.log(`
Code Modularity Tools

Usage:
  node index.js <command> [options]

Commands:
  analyze <file>     Analyze a file for modularity issues
  suggest <file>     Generate refactoring suggestions for a file
  config             View or update configuration
  help               Show this help message

Options:
  --key=value        Set a configuration value
  --section          Configuration section for the config command

Examples:
  node index.js analyze src/components/Button.js
  node index.js suggest src/components/Button.js
  node index.js config --section=analysis
  node index.js config --section=analysis --complexityThreshold=15
  `);
}

/**
 * Handle the analyze command
 * @param {string} filePath Path to the file to analyze
 * @param {Object} options Command options
 */
async function handleAnalyzeCommand(filePath, options) {
  if (!filePath) {
    console.error('Error: No file specified for analysis');
    console.log('Usage: node index.js analyze <file>');
    return;
  }
  
  if (!fs.existsSync(filePath)) {
    console.error(`Error: File not found: ${filePath}`);
    return;
  }
  
  const config = getConfig();
  const analysisResults = analyzeFile(filePath, config);
  
  if (!analysisResults.analyzed) {
    console.log(`Could not analyze ${filePath}: ${analysisResults.reason}`);
    return;
  }
  
  // Display analysis results
  console.log(`\nAnalysis Results for ${filePath}:`);
  console.log(`File Length: ${analysisResults.fileLength} lines`);
  console.log(`File Complexity: ${analysisResults.fileComplexity}`);
  console.log(`Functions: ${analysisResults.functions.length}`);
  console.log(`Classes: ${analysisResults.classes.length}`);
  console.log(`Issues: ${analysisResults.issues.length}`);
  
  // Display issues by severity
  const highSeverityIssues = analysisResults.issues.filter(issue => issue.severity === 'high');
  const mediumSeverityIssues = analysisResults.issues.filter(issue => issue.severity === 'medium');
  const lowSeverityIssues = analysisResults.issues.filter(issue => issue.severity === 'low');
  
  if (highSeverityIssues.length > 0) {
    console.log(`\nHigh Severity Issues (${highSeverityIssues.length}):`);
    for (const issue of highSeverityIssues) {
      console.log(`- [Line ${issue.location.start.line}] ${issue.message}`);
    }
  }
  
  if (mediumSeverityIssues.length > 0) {
    console.log(`\nMedium Severity Issues (${mediumSeverityIssues.length}):`);
    for (const issue of mediumSeverityIssues) {
      console.log(`- [Line ${issue.location.start.line}] ${issue.message}`);
    }
  }
  
  if (lowSeverityIssues.length > 0) {
    console.log(`\nLow Severity Issues (${lowSeverityIssues.length}):`);
    for (const issue of lowSeverityIssues) {
      console.log(`- [Line ${issue.location.start.line}] ${issue.message}`);
    }
  }
  
  // Send notification
  sendModularityNotification(analysisResults, config);
  
  // Suggest running the suggest command
  if (analysisResults.issues.length > 0) {
    console.log(`\nRun "node index.js suggest ${filePath}" to see refactoring suggestions.`);
  }
}

/**
 * Handle the suggest command
 * @param {string} filePath Path to the file to analyze
 * @param {Object} options Command options
 */
async function handleSuggestCommand(filePath, options) {
  if (!filePath) {
    console.error('Error: No file specified for suggestions');
    console.log('Usage: node index.js suggest <file>');
    return;
  }
  
  if (!fs.existsSync(filePath)) {
    console.error(`Error: File not found: ${filePath}`);
    return;
  }
  
  const config = getConfig();
  const analysisResults = analyzeFile(filePath, config);
  
  if (!analysisResults.analyzed) {
    console.log(`Could not analyze ${filePath}: ${analysisResults.reason}`);
    return;
  }
  
  const suggestionsResults = await generateSuggestions(analysisResults, config);
  
  if (suggestionsResults.suggestions.length === 0) {
    console.log(`No refactoring suggestions for ${filePath}`);
    return;
  }
  
  // Display suggestions
  console.log(`\nRefactoring Suggestions for ${filePath}:`);
  
  for (let i = 0; i < suggestionsResults.suggestions.length; i++) {
    const suggestion = suggestionsResults.suggestions[i];
    console.log(`\n${i + 1}. ${suggestion.title} (${suggestion.severity})`);
    console.log(`   ${suggestion.description}`);
    console.log(`   Location: Line ${suggestion.location.start.line}`);
    
    if (suggestion.suggestions && suggestion.suggestions.length > 0) {
      console.log('   Suggestions:');
      for (const subSuggestion of suggestion.suggestions) {
        console.log(`   - ${subSuggestion}`);
      }
    }
  }
  
  // Send notification
  sendSuggestionsNotification(suggestionsResults, config);
}

/**
 * Handle the config command
 * @param {Object} options Command options
 */
function handleConfigCommand(options) {
  const config = getConfig();
  
  if (options.section) {
    const section = options.section;
    
    // Check if we're updating a value
    const keys = Object.keys(options).filter(key => key !== 'section');
    
    if (keys.length > 0) {
      // Update configuration values
      for (const key of keys) {
        let value = options[key];
        
        // Convert string values to appropriate types
        if (value === 'true') value = true;
        if (value === 'false') value = false;
        if (!isNaN(value)) value = Number(value);
        
        updateConfig(section, key, value);
        console.log(`Updated ${section}.${key} to ${value}`);
      }
    } else {
      // Display section configuration
      console.log(`Configuration for section '${section}':`);
      console.log(JSON.stringify(config[section] || {}, null, 2));
    }
  } else {
    // Display full configuration
    console.log('Current configuration:');
    console.log(JSON.stringify(config, null, 2));
  }
}

/**
 * Main function
 */
async function main() {
  const args = parseArgs(process.argv);
  
  switch (args.command) {
    case 'analyze':
      await handleAnalyzeCommand(args.filePath, args.options);
      break;
      
    case 'suggest':
      await handleSuggestCommand(args.filePath, args.options);
      break;
      
    case 'config':
      handleConfigCommand(args.options);
      break;
      
    case 'help':
    default:
      showHelp();
      break;
  }
}

// Run the main function if this script is executed directly
if (require.main === module) {
  main().catch(error => {
    console.error('Error:', error.message);
    process.exit(1);
  });
}

// Export functions for use in other modules
module.exports = {
  analyzeFile,
  generateSuggestions,
  getConfig,
  updateConfig
};
