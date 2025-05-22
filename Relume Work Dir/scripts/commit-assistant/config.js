/**
 * Configuration module for the Intelligent Commit Assistant
 * 
 * Handles loading, saving, and providing access to configuration settings
 */

const fs = require('fs');
const path = require('path');

// Default configuration
const DEFAULT_CONFIG = {
  reminders: {
    timeThreshold: 30,        // Minutes before time-based reminder
    changeThreshold: 50,      // Number of lines changed before reminder
    fileThreshold: 5,         // Number of files changed before reminder
    enabled: true             // Enable/disable reminders
  },
  aiAssistance: {
    enabled: true,            // Enable/disable AI assistance
    model: "default",         // AI model to use
    customPrompt: ""          // Custom prompt for AI
  },
  notifications: {
    vscode: true,             // Show VS Code notifications
    terminal: true,           // Show terminal notifications
    sound: false              // Play sound with notifications
  }
};

// Path to the configuration file
const CONFIG_FILE_PATH = path.resolve(process.cwd(), '.commit-assistant.json');

/**
 * Load configuration from file or create default if it doesn't exist
 * @returns {Object} Configuration object
 */
function getConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE_PATH)) {
      const configData = fs.readFileSync(CONFIG_FILE_PATH, 'utf8');
      const config = JSON.parse(configData);
      return mergeWithDefaults(config);
    } else {
      // Create default config file if it doesn't exist
      saveConfig(DEFAULT_CONFIG);
      return DEFAULT_CONFIG;
    }
  } catch (error) {
    console.error('Error loading configuration:', error.message);
    return DEFAULT_CONFIG;
  }
}

/**
 * Save configuration to file
 * @param {Object} config Configuration object to save
 */
function saveConfig(config) {
  try {
    const configData = JSON.stringify(config, null, 2);
    fs.writeFileSync(CONFIG_FILE_PATH, configData, 'utf8');
    console.log('Configuration saved successfully');
  } catch (error) {
    console.error('Error saving configuration:', error.message);
  }
}

/**
 * Merge user configuration with defaults to ensure all properties exist
 * @param {Object} userConfig User configuration object
 * @returns {Object} Merged configuration
 */
function mergeWithDefaults(userConfig) {
  const merged = { ...DEFAULT_CONFIG };
  
  // Merge top-level sections
  for (const section in userConfig) {
    if (merged[section] && typeof merged[section] === 'object') {
      merged[section] = { ...merged[section], ...userConfig[section] };
    } else {
      merged[section] = userConfig[section];
    }
  }
  
  return merged;
}

/**
 * Update specific configuration settings
 * @param {string} section Configuration section (e.g., 'reminders')
 * @param {string} key Setting key (e.g., 'timeThreshold')
 * @param {any} value New value
 */
function updateConfig(section, key, value) {
  const config = getConfig();
  
  if (!config[section]) {
    config[section] = {};
  }
  
  config[section][key] = value;
  saveConfig(config);
}

module.exports = {
  getConfig,
  saveConfig,
  updateConfig,
  DEFAULT_CONFIG
};
