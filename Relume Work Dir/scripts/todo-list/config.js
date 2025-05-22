/**
 * Configuration Module for To-Do List Management
 * 
 * Handles loading, saving, and providing access to configuration settings.
 */

const fs = require('fs');
const path = require('path');

// Default configuration
const DEFAULT_CONFIG = {
  storage: {
    format: "json",           // Format to store tasks (json, markdown, yaml)
    path: ".todo",            // Path to store tasks
    backupEnabled: true,      // Enable backups
    backupInterval: 86400     // Backup interval in seconds (1 day)
  },
  tasks: {
    defaultPriority: "medium", // Default priority for new tasks
    priorities: [              // Available priorities
      "critical",
      "high",
      "medium",
      "low"
    ],
    statuses: [                // Available statuses
      "todo",
      "in-progress",
      "blocked",
      "completed"
    ],
    categories: [              // Available categories
      "feature",
      "bug",
      "documentation",
      "refactoring",
      "testing"
    ]
  },
  notifications: {
    enabled: true,             // Enable notifications
    showOnStartup: true,       // Show tasks on startup
    reminderInterval: 3600     // Reminder interval in seconds (1 hour)
  },
  ai: {
    enabled: true,             // Enable AI integration
    allowAdd: true,            // Allow AI to add tasks
    allowComplete: true,       // Allow AI to complete tasks
    allowUpdate: true,         // Allow AI to update tasks
    requireConfirmation: true  // Require confirmation for AI changes
  }
};

// Path to the configuration file
const CONFIG_FILE_PATH = path.resolve(process.cwd(), '.todo-config.json');

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
    if (merged[section] && typeof merged[section] === 'object' && !Array.isArray(merged[section])) {
      merged[section] = { ...merged[section], ...userConfig[section] };
    } else if (Array.isArray(merged[section]) && Array.isArray(userConfig[section])) {
      merged[section] = [...userConfig[section]];
    } else {
      merged[section] = userConfig[section];
    }
  }
  
  return merged;
}

/**
 * Update specific configuration settings
 * @param {string} section Configuration section (e.g., 'storage')
 * @param {string} key Setting key (e.g., 'format')
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
