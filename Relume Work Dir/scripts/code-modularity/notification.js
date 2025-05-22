/**
 * Notification Module for Code Modularity Tools
 * 
 * Handles sending notifications about code modularity issues and refactoring suggestions.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Notification class for sending notifications through various channels
 */
class Notification {
  /**
   * Create a new notification
   * @param {string} title Notification title
   * @param {string} message Notification message
   * @param {string} type Notification type (info, warning, error)
   * @param {Object} channels Notification channels configuration
   */
  constructor(title, message, type = 'info', channels = { vscode: true, terminal: true }) {
    this.title = title;
    this.message = message;
    this.type = type;
    this.channels = channels;
  }

  /**
   * Send the notification through all enabled channels
   */
  send() {
    if (this.channels.vscode) {
      this.sendVSCodeNotification();
    }
    
    if (this.channels.terminal) {
      this.sendTerminalNotification();
    }
  }

  /**
   * Send a notification to VS Code
   * Uses the VS Code REST API if available
   */
  sendVSCodeNotification() {
    try {
      // Check if VS Code is running and has the REST API enabled
      const vscodeProcess = execSync('tasklist | findstr /i "code.exe"').toString();
      
      if (vscodeProcess) {
        // Create a temporary file with the notification data
        const notificationData = {
          title: this.title,
          message: this.message,
          type: this.type,
          timestamp: new Date().toISOString()
        };
        
        const tempFile = path.join(process.cwd(), '.vscode', 'notifications', `${Date.now()}.json`);
        
        // Ensure the directory exists
        const dir = path.dirname(tempFile);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        
        fs.writeFileSync(tempFile, JSON.stringify(notificationData, null, 2), 'utf8');
        
        console.log(`VS Code notification sent: ${this.title}`);
      } else {
        console.log('VS Code is not running, skipping VS Code notification');
      }
    } catch (error) {
      // VS Code is not running or command failed
      console.log('Could not send VS Code notification:', error.message);
    }
  }

  /**
   * Send a notification to the terminal
   */
  sendTerminalNotification() {
    const colorMap = {
      info: '\x1b[36m', // Cyan
      warning: '\x1b[33m', // Yellow
      error: '\x1b[31m' // Red
    };
    
    const color = colorMap[this.type] || colorMap.info;
    const reset = '\x1b[0m';
    
    console.log(`\n${color}=== ${this.title} ===${reset}`);
    console.log(`${this.message}`);
    console.log(`${color}===================${reset}\n`);
  }
}

/**
 * Send a notification about code modularity issues
 * @param {Object} analysisResults Analysis results
 * @param {Object} config Configuration object
 */
function sendModularityNotification(analysisResults, config) {
  if (!analysisResults.analyzed || analysisResults.issues.length === 0) {
    return;
  }
  
  const highSeverityIssues = analysisResults.issues.filter(issue => issue.severity === 'high');
  const mediumSeverityIssues = analysisResults.issues.filter(issue => issue.severity === 'medium');
  const lowSeverityIssues = analysisResults.issues.filter(issue => issue.severity === 'low');
  
  // Determine notification type based on highest severity issue
  let type = 'info';
  if (highSeverityIssues.length > 0) {
    type = 'error';
  } else if (mediumSeverityIssues.length > 0) {
    type = 'warning';
  }
  
  // Create notification message
  const title = 'Code Modularity Issues Detected';
  let message = `Found ${analysisResults.issues.length} modularity issues in ${path.basename(analysisResults.filePath)}:\n`;
  
  if (highSeverityIssues.length > 0) {
    message += `- ${highSeverityIssues.length} high severity issues\n`;
  }
  
  if (mediumSeverityIssues.length > 0) {
    message += `- ${mediumSeverityIssues.length} medium severity issues\n`;
  }
  
  if (lowSeverityIssues.length > 0) {
    message += `- ${lowSeverityIssues.length} low severity issues\n`;
  }
  
  message += '\nRun "npm run modularity:suggest" to see refactoring suggestions.';
  
  // Send notification
  const notification = new Notification(
    title,
    message,
    type,
    config.notifications
  );
  
  notification.send();
}

/**
 * Send a notification about refactoring suggestions
 * @param {Object} suggestionsResults Suggestions results
 * @param {Object} config Configuration object
 */
function sendSuggestionsNotification(suggestionsResults, config) {
  if (!suggestionsResults.suggestions || suggestionsResults.suggestions.length === 0) {
    return;
  }
  
  // Create notification message
  const title = 'Refactoring Suggestions Available';
  let message = `Generated ${suggestionsResults.suggestions.length} refactoring suggestions for ${path.basename(suggestionsResults.filePath)}:\n`;
  
  // Group suggestions by type
  const suggestionsByType = {};
  for (const suggestion of suggestionsResults.suggestions) {
    if (!suggestionsByType[suggestion.type]) {
      suggestionsByType[suggestion.type] = [];
    }
    suggestionsByType[suggestion.type].push(suggestion);
  }
  
  // Add summary of suggestions by type
  for (const [type, suggestions] of Object.entries(suggestionsByType)) {
    message += `- ${suggestions.length} ${type} suggestions\n`;
  }
  
  message += '\nRun "npm run modularity:suggest <file>" to see detailed suggestions.';
  
  // Send notification
  const notification = new Notification(
    title,
    message,
    'info',
    config.notifications
  );
  
  notification.send();
}

module.exports = {
  Notification,
  sendModularityNotification,
  sendSuggestionsNotification
};
