/**
 * Intelligent Commit Assistant
 * 
 * Main entry point for the commit assistant functionality
 */

const { checkForCommitReminder, suggestCommitMessage } = require('./commit-reminder');
const { getConfig, updateConfig } = require('./config');
const { Notification } = require('./notification');

/**
 * Command-line argument parser
 * @param {Array<string>} args Command-line arguments
 * @returns {Object} Parsed arguments
 */
function parseArgs(args) {
  const parsedArgs = {
    command: '',
    options: {}
  };
  
  // Skip the first two arguments (node and script path)
  const cmdArgs = args.slice(2);
  
  if (cmdArgs.length === 0) {
    parsedArgs.command = 'help';
    return parsedArgs;
  }
  
  parsedArgs.command = cmdArgs[0];
  
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
Intelligent Commit Assistant

Usage:
  node index.js <command> [options]

Commands:
  check       Check if it's time to commit
  suggest     Generate a commit message suggestion
  config      View or update configuration
  stats       View commit statistics
  help        Show this help message

Options:
  --key=value Set a configuration value
  --section   Configuration section for the config command

Examples:
  node index.js check
  node index.js suggest
  node index.js config --section=reminders
  node index.js config --section=reminders --timeThreshold=45
  node index.js stats
  `);
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
 * Handle the stats command
 */
function handleStatsCommand() {
  const { getTimeSinceLastCommit, getFilesChanged, getLinesChanged } = require('./commit-reminder');
  
  const timeSinceLastCommit = getTimeSinceLastCommit();
  const filesChanged = getFilesChanged();
  const linesChanged = getLinesChanged();
  
  console.log('Commit Statistics:');
  console.log(`- Time since last commit: ${timeSinceLastCommit} minutes`);
  console.log(`- Files changed: ${filesChanged}`);
  console.log(`- Lines changed: ${linesChanged}`);
}

/**
 * Main function
 */
async function main() {
  const args = parseArgs(process.argv);
  
  switch (args.command) {
    case 'check':
      checkForCommitReminder();
      break;
      
    case 'suggest':
      const message = await suggestCommitMessage();
      console.log('Suggested commit message:');
      console.log(message);
      break;
      
    case 'config':
      handleConfigCommand(args.options);
      break;
      
    case 'stats':
      handleStatsCommand();
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
  checkForCommitReminder,
  suggestCommitMessage,
  getConfig,
  updateConfig
};
