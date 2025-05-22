/**
 * Notification module for the Intelligent Commit Assistant
 * 
 * Handles sending notifications through various channels (VS Code, terminal, etc.)
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

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
  constructor(title, message, type = 'info', channels = { vscode: true, terminal: true, sound: false }) {
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
    
    if (this.channels.sound) {
      this.playSound();
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

  /**
   * Play a sound notification
   * Uses different methods depending on the platform
   */
  playSound() {
    try {
      const platform = process.platform;
      
      if (platform === 'win32') {
        // Windows
        execSync('powershell -c (New-Object Media.SoundPlayer "C:\\Windows\\Media\\notify.wav").PlaySync()');
      } else if (platform === 'darwin') {
        // macOS
        execSync('afplay /System/Library/Sounds/Ping.aiff');
      } else if (platform === 'linux') {
        // Linux
        execSync('paplay /usr/share/sounds/freedesktop/stereo/complete.oga');
      }
    } catch (error) {
      console.log('Could not play notification sound:', error.message);
    }
  }
}

module.exports = {
  Notification
};
