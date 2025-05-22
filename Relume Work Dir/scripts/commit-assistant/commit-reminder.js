/**
 * Intelligent Commit Reminder System
 * 
 * This script monitors file changes and time elapsed since the last commit
 * and provides notifications when it's time to commit changes.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { Notification } = require('./notification');
const { getConfig } = require('./config');
const { generateCommitMessage } = require('./ai-message-generator');

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

// State tracking
let lastCommitTime = Date.now();
let lastCheckTime = Date.now();
let isFirstRun = true;

/**
 * Get the time elapsed since the last commit in minutes
 * @returns {number} Minutes since last commit
 */
function getTimeSinceLastCommit() {
  try {
    // Get the timestamp of the last commit
    const lastCommitTimestamp = execSync('git log -1 --format=%ct').toString().trim();
    const lastCommitDate = new Date(parseInt(lastCommitTimestamp) * 1000);
    const now = new Date();
    const diffMs = now - lastCommitDate;
    return Math.floor(diffMs / (1000 * 60)); // Convert to minutes
  } catch (error) {
    console.error('Error getting last commit time:', error.message);
    return 0;
  }
}

/**
 * Get the number of files changed since the last commit
 * @returns {number} Number of files changed
 */
function getFilesChanged() {
  try {
    const output = execSync('git status --porcelain').toString();
    const lines = output.split('\n').filter(line => line.trim() !== '');
    return lines.length;
  } catch (error) {
    console.error('Error getting files changed:', error.message);
    return 0;
  }
}

/**
 * Get the number of lines changed since the last commit
 * @returns {number} Number of lines changed
 */
function getLinesChanged() {
  try {
    const output = execSync('git diff --stat').toString();
    const match = output.match(/(\d+) insertion[s]?(?:, (\d+) deletion[s]?)?/);
    if (match) {
      const insertions = parseInt(match[1]) || 0;
      const deletions = parseInt(match[2]) || 0;
      return insertions + deletions;
    }
    return 0;
  } catch (error) {
    console.error('Error getting lines changed:', error.message);
    return 0;
  }
}

/**
 * Check if it's time to commit based on configured thresholds
 * @param {Object} config Configuration object
 * @returns {boolean} True if thresholds are exceeded
 */
function shouldRemindToCommit(config) {
  if (!config.reminders.enabled) return false;
  
  const timeSinceLastCommit = getTimeSinceLastCommit();
  const filesChanged = getFilesChanged();
  const linesChanged = getLinesChanged();
  
  return (
    timeSinceLastCommit >= config.reminders.timeThreshold ||
    filesChanged >= config.reminders.fileThreshold ||
    linesChanged >= config.reminders.changeThreshold
  );
}

/**
 * Send a notification to remind the user to commit
 * @param {Object} config Configuration object
 */
function sendCommitReminder(config) {
  const filesChanged = getFilesChanged();
  const linesChanged = getLinesChanged();
  const timeSinceLastCommit = getTimeSinceLastCommit();
  
  const message = `Time to commit your changes! 
  - ${filesChanged} files changed
  - ${linesChanged} lines modified
  - ${timeSinceLastCommit} minutes since last commit`;
  
  const notification = new Notification(
    'Commit Reminder',
    message,
    'info',
    config.notifications
  );
  
  notification.send();
}

/**
 * Main function to check if a commit reminder should be sent
 */
function checkForCommitReminder() {
  const config = getConfig();
  
  // Skip the first run to avoid immediate notifications
  if (isFirstRun) {
    isFirstRun = false;
    lastCheckTime = Date.now();
    return;
  }
  
  // Only check every 5 minutes to avoid excessive processing
  const now = Date.now();
  const timeSinceLastCheck = (now - lastCheckTime) / (1000 * 60);
  if (timeSinceLastCheck < 5) return;
  
  lastCheckTime = now;
  
  if (shouldRemindToCommit(config)) {
    sendCommitReminder(config);
  }
}

/**
 * Generate a commit message suggestion based on changes
 * @returns {Promise<string>} Suggested commit message
 */
async function suggestCommitMessage() {
  const config = getConfig();
  if (!config.aiAssistance.enabled) {
    return "feat: update project files";
  }
  
  try {
    const message = await generateCommitMessage(config.aiAssistance);
    return message;
  } catch (error) {
    console.error('Error generating commit message:', error.message);
    return "feat: update project files";
  }
}

// Export functions for use in other modules
module.exports = {
  checkForCommitReminder,
  suggestCommitMessage,
  getTimeSinceLastCommit,
  getFilesChanged,
  getLinesChanged
};

// If this script is run directly, check for commit reminders
if (require.main === module) {
  checkForCommitReminder();
}
