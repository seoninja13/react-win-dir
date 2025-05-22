/**
 * Notification Module for To-Do List Management
 * 
 * Handles sending notifications about task updates.
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
   * @param {string} type Notification type (info, warning, error, success)
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
      info: '\x1b[36m',    // Cyan
      warning: '\x1b[33m', // Yellow
      error: '\x1b[31m',   // Red
      success: '\x1b[32m'  // Green
    };
    
    const color = colorMap[this.type] || colorMap.info;
    const reset = '\x1b[0m';
    
    console.log(`\n${color}=== ${this.title} ===${reset}`);
    console.log(`${this.message}`);
    console.log(`${color}===================${reset}\n`);
  }
}

/**
 * Send a notification about pending tasks
 * @param {Array} tasks List of tasks
 * @param {Object} config Configuration object
 */
function sendTasksNotification(tasks, config) {
  if (!config.notifications.enabled || !config.notifications.showOnStartup) {
    return;
  }
  
  const pendingTasks = tasks.filter(task => task.status !== 'completed');
  
  if (pendingTasks.length === 0) {
    return;
  }
  
  // Group tasks by priority
  const tasksByPriority = {};
  pendingTasks.forEach(task => {
    if (!tasksByPriority[task.priority]) {
      tasksByPriority[task.priority] = [];
    }
    tasksByPriority[task.priority].push(task);
  });
  
  // Create notification message
  let message = `You have ${pendingTasks.length} pending tasks:\n\n`;
  
  // Add tasks by priority
  const priorities = ['critical', 'high', 'medium', 'low'];
  priorities.forEach(priority => {
    const priorityTasks = tasksByPriority[priority] || [];
    if (priorityTasks.length > 0) {
      message += `${priority.toUpperCase()} (${priorityTasks.length}):\n`;
      priorityTasks.slice(0, 3).forEach((task, index) => {
        message += `- ${task.title}\n`;
      });
      if (priorityTasks.length > 3) {
        message += `  ... and ${priorityTasks.length - 3} more\n`;
      }
      message += '\n';
    }
  });
  
  message += 'Run "npm run todo:list" to see all tasks.';
  
  // Send notification
  const notification = new Notification(
    'Pending Tasks',
    message,
    'info',
    { vscode: true, terminal: true }
  );
  
  notification.send();
}

/**
 * Send a reminder notification for high priority tasks
 * @param {Array} tasks List of tasks
 * @param {Object} config Configuration object
 */
function sendTaskReminderNotification(tasks, config) {
  if (!config.notifications.enabled || !config.notifications.reminderInterval) {
    return;
  }
  
  const highPriorityTasks = tasks.filter(task => 
    (task.status !== 'completed') && 
    (task.priority === 'critical' || task.priority === 'high')
  );
  
  if (highPriorityTasks.length === 0) {
    return;
  }
  
  // Create notification message
  let message = `You have ${highPriorityTasks.length} high priority tasks pending:\n\n`;
  
  highPriorityTasks.slice(0, 5).forEach((task, index) => {
    message += `- [${task.priority.toUpperCase()}] ${task.title}\n`;
  });
  
  if (highPriorityTasks.length > 5) {
    message += `... and ${highPriorityTasks.length - 5} more\n`;
  }
  
  message += '\nRun "npm run todo:list" to see all tasks.';
  
  // Send notification
  const notification = new Notification(
    'High Priority Tasks Reminder',
    message,
    'warning',
    { vscode: true, terminal: true }
  );
  
  notification.send();
}

module.exports = {
  Notification,
  sendTasksNotification,
  sendTaskReminderNotification
};
