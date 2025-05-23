/**
 * Configuration Module for Code Modularity Tools
 *
 * Handles loading, saving, and providing access to configuration settings.
 */

const fs = require('fs');
const path = require('path');

// Default configuration
const DEFAULT_CONFIG = {
  analysis: {
    complexityThreshold: 10,     // Cyclomatic complexity threshold
    lengthThreshold: 100,        // Line count threshold for functions
    depthThreshold: 3,           // Nesting depth threshold
    parameterThreshold: 4,       // Parameter count threshold
    enabled: true                // Enable/disable analysis
  },
  enhancedAnalysis: {
    deadCodeDetection: true,     // Enable dead code detection
    unusedImportsDetection: true, // Enable unused imports detection
    codeDuplicationDetection: true, // Enable code duplication detection
    duplicateThreshold: 5,       // Minimum lines for duplication detection
    enabled: true                // Enable/disable enhanced analysis
  },
  aiAssistance: {
    enabled: true,               // Enable/disable AI assistance
    model: "default",            // AI model to use
    customPrompt: ""             // Custom prompt for AI
  },
  notifications: {
    vscode: true,                // Show VS Code notifications
    terminal: true,              // Show terminal notifications
    frequency: "high"            // Notification frequency (low, medium, high)
  },
  fileTypes: [                   // File types to analyze
    "js", "jsx", "ts", "tsx"
  ],
  excludePaths: [                // Paths to exclude from analysis
    "node_modules",
    "dist",
    "build"
  ]
};

// Path to the configuration file
const CONFIG_FILE_PATH = path.resolve(process.cwd(), '.code-modularity.json');

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
 * @param {string} section Configuration section (e.g., 'analysis')
 * @param {string} key Setting key (e.g., 'complexityThreshold')
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
