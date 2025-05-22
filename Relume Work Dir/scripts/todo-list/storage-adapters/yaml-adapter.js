/**
 * YAML Storage Adapter for To-Do List Management
 * 
 * Handles storing and retrieving tasks in YAML format.
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

/**
 * YAML Storage Adapter class
 */
class YamlStorageAdapter {
  /**
   * Create a new YamlStorageAdapter instance
   * @param {Object} config Configuration object
   */
  constructor(config) {
    this.config = config;
    this.storagePath = path.resolve(process.cwd(), config.storage.path);
    this.tasksFilePath = path.join(this.storagePath, 'tasks.yaml');
    this.backupPath = path.join(this.storagePath, 'backups');
    this.lastBackupTime = 0;
  }

  /**
   * Ensure storage directories exist
   */
  ensureDirectories() {
    if (!fs.existsSync(this.storagePath)) {
      fs.mkdirSync(this.storagePath, { recursive: true });
    }
    
    if (this.config.storage.backupEnabled && !fs.existsSync(this.backupPath)) {
      fs.mkdirSync(this.backupPath, { recursive: true });
    }
  }

  /**
   * Load tasks from storage
   * @returns {Promise<Array>} Loaded tasks
   */
  async load() {
    this.ensureDirectories();
    
    try {
      if (fs.existsSync(this.tasksFilePath)) {
        const data = fs.readFileSync(this.tasksFilePath, 'utf8');
        return yaml.load(data) || [];
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error loading tasks from YAML:', error.message);
      return [];
    }
  }

  /**
   * Save tasks to storage
   * @param {Array} tasks Tasks to save
   * @returns {Promise<boolean>} Success status
   */
  async save(tasks) {
    this.ensureDirectories();
    
    try {
      const data = yaml.dump(tasks, {
        indent: 2,
        lineWidth: 120,
        noRefs: true
      });
      
      fs.writeFileSync(this.tasksFilePath, data, 'utf8');
      
      // Create backup if enabled
      if (this.config.storage.backupEnabled) {
        await this.createBackupIfNeeded();
      }
      
      return true;
    } catch (error) {
      console.error('Error saving tasks to YAML:', error.message);
      return false;
    }
  }

  /**
   * Create a backup if needed
   * @returns {Promise<boolean>} Success status
   */
  async createBackupIfNeeded() {
    const now = Date.now();
    const backupInterval = this.config.storage.backupInterval * 1000; // Convert to milliseconds
    
    if (now - this.lastBackupTime < backupInterval) {
      return false;
    }
    
    try {
      const backupFileName = `tasks_backup_${new Date().toISOString().replace(/:/g, '-')}.yaml`;
      const backupFilePath = path.join(this.backupPath, backupFileName);
      
      fs.copyFileSync(this.tasksFilePath, backupFilePath);
      this.lastBackupTime = now;
      
      // Clean up old backups (keep last 10)
      this.cleanupOldBackups();
      
      return true;
    } catch (error) {
      console.error('Error creating backup:', error.message);
      return false;
    }
  }

  /**
   * Clean up old backups (keep last 10)
   */
  cleanupOldBackups() {
    try {
      const backupFiles = fs.readdirSync(this.backupPath)
        .filter(file => file.startsWith('tasks_backup_') && file.endsWith('.yaml'))
        .map(file => ({
          name: file,
          path: path.join(this.backupPath, file),
          time: fs.statSync(path.join(this.backupPath, file)).mtime.getTime()
        }))
        .sort((a, b) => b.time - a.time); // Sort by time (newest first)
      
      // Keep only the last 10 backups
      if (backupFiles.length > 10) {
        backupFiles.slice(10).forEach(file => {
          fs.unlinkSync(file.path);
        });
      }
    } catch (error) {
      console.error('Error cleaning up old backups:', error.message);
    }
  }
}

module.exports = {
  YamlStorageAdapter
};
