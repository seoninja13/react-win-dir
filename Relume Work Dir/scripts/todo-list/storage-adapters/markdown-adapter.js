/**
 * Markdown Storage Adapter for To-Do List Management
 * 
 * Handles storing and retrieving tasks in Markdown format.
 */

const fs = require('fs');
const path = require('path');

/**
 * Markdown Storage Adapter class
 */
class MarkdownStorageAdapter {
  /**
   * Create a new MarkdownStorageAdapter instance
   * @param {Object} config Configuration object
   */
  constructor(config) {
    this.config = config;
    this.storagePath = path.resolve(process.cwd(), config.storage.path);
    this.tasksFilePath = path.join(this.storagePath, 'tasks.md');
    this.metadataFilePath = path.join(this.storagePath, 'tasks-metadata.json');
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
      // Load metadata (contains all task data)
      if (fs.existsSync(this.metadataFilePath)) {
        const metadataData = fs.readFileSync(this.metadataFilePath, 'utf8');
        return JSON.parse(metadataData);
      }
      
      // If metadata doesn't exist but markdown file does, parse it
      if (fs.existsSync(this.tasksFilePath)) {
        return this.parseMarkdownToTasks();
      }
      
      return [];
    } catch (error) {
      console.error('Error loading tasks from Markdown:', error.message);
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
      // Save metadata (contains all task data)
      const metadataData = JSON.stringify(tasks, null, 2);
      fs.writeFileSync(this.metadataFilePath, metadataData, 'utf8');
      
      // Generate and save markdown
      const markdownContent = this.tasksToMarkdown(tasks);
      fs.writeFileSync(this.tasksFilePath, markdownContent, 'utf8');
      
      // Create backup if enabled
      if (this.config.storage.backupEnabled) {
        await this.createBackupIfNeeded();
      }
      
      return true;
    } catch (error) {
      console.error('Error saving tasks to Markdown:', error.message);
      return false;
    }
  }

  /**
   * Convert tasks to Markdown format
   * @param {Array} tasks Tasks to convert
   * @returns {string} Markdown content
   */
  tasksToMarkdown(tasks) {
    let markdown = '# Tasks\n\n';
    
    // Group tasks by status
    const tasksByStatus = {};
    tasks.forEach(task => {
      if (!tasksByStatus[task.status]) {
        tasksByStatus[task.status] = [];
      }
      tasksByStatus[task.status].push(task);
    });
    
    // Add tasks by status
    const statuses = ['todo', 'in-progress', 'blocked', 'completed'];
    const statusTitles = {
      'todo': 'To Do',
      'in-progress': 'In Progress',
      'blocked': 'Blocked',
      'completed': 'Completed'
    };
    
    statuses.forEach(status => {
      const statusTasks = tasksByStatus[status] || [];
      if (statusTasks.length > 0) {
        markdown += `## ${statusTitles[status]}\n\n`;
        
        // Sort tasks by priority
        const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
        statusTasks.sort((a, b) => {
          // First sort by priority
          const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
          if (priorityDiff !== 0) return priorityDiff;
          
          // Then sort by creation date (newest first)
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        
        // Add tasks
        statusTasks.forEach(task => {
          const checkbox = status === 'completed' ? '[x]' : '[ ]';
          const priorityLabel = task.priority !== 'medium' ? `[${task.priority.toUpperCase()}] ` : '';
          markdown += `- ${checkbox} ${priorityLabel}${task.title}`;
          
          // Add task ID as HTML comment
          markdown += ` <!-- ${task.id} -->\n`;
          
          // Add description if available
          if (task.description) {
            markdown += `  - ${task.description.replace(/\n/g, '\n  - ')}\n`;
          }
          
          // Add tags if available
          if (task.tags && task.tags.length > 0) {
            markdown += `  - Tags: ${task.tags.map(tag => `#${tag}`).join(', ')}\n`;
          }
          
          // Add notes if available
          if (task.notes && task.notes.length > 0) {
            markdown += '  - Notes:\n';
            task.notes.forEach(note => {
              markdown += `    - ${note.author}: ${note.text}\n`;
            });
          }
          
          markdown += '\n';
        });
      }
    });
    
    markdown += '\n---\n\n';
    markdown += `Last updated: ${new Date().toISOString()}\n`;
    
    return markdown;
  }

  /**
   * Parse Markdown to tasks
   * @returns {Array} Parsed tasks
   */
  parseMarkdownToTasks() {
    const markdown = fs.readFileSync(this.tasksFilePath, 'utf8');
    const tasks = [];
    
    // Simple regex-based parsing (not robust, but works for basic cases)
    const taskRegex = /- \[([ x])\] (?:\[([A-Z]+)\] )?(.+?)<!-- ([0-9a-f-]+) -->/g;
    let match;
    
    while ((match = taskRegex.exec(markdown)) !== null) {
      const isCompleted = match[1] === 'x';
      const priority = match[2] ? match[2].toLowerCase() : 'medium';
      const title = match[3].trim();
      const id = match[4];
      
      tasks.push({
        id,
        title,
        status: isCompleted ? 'completed' : 'todo',
        priority,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        completedAt: isCompleted ? new Date().toISOString() : null,
        createdBy: 'user',
        description: '',
        category: 'feature',
        assignedTo: null,
        tags: [],
        notes: []
      });
    }
    
    return tasks;
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
      const timestamp = new Date().toISOString().replace(/:/g, '-');
      
      // Backup markdown file
      const markdownBackupFileName = `tasks_backup_${timestamp}.md`;
      const markdownBackupFilePath = path.join(this.backupPath, markdownBackupFileName);
      fs.copyFileSync(this.tasksFilePath, markdownBackupFilePath);
      
      // Backup metadata file
      const metadataBackupFileName = `tasks-metadata_backup_${timestamp}.json`;
      const metadataBackupFilePath = path.join(this.backupPath, metadataBackupFileName);
      fs.copyFileSync(this.metadataFilePath, metadataBackupFilePath);
      
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
        .filter(file => file.startsWith('tasks') && (file.endsWith('.md') || file.endsWith('.json')))
        .map(file => ({
          name: file,
          path: path.join(this.backupPath, file),
          time: fs.statSync(path.join(this.backupPath, file)).mtime.getTime(),
          type: file.endsWith('.md') ? 'markdown' : 'metadata'
        }));
      
      // Group by timestamp
      const backupGroups = {};
      backupFiles.forEach(file => {
        const timestamp = file.name.split('_backup_')[1].split('.')[0];
        if (!backupGroups[timestamp]) {
          backupGroups[timestamp] = [];
        }
        backupGroups[timestamp].push(file);
      });
      
      // Sort timestamps by time (newest first)
      const sortedTimestamps = Object.keys(backupGroups)
        .sort((a, b) => {
          const timeA = backupGroups[a][0].time;
          const timeB = backupGroups[b][0].time;
          return timeB - timeA;
        });
      
      // Keep only the last 10 backup sets
      if (sortedTimestamps.length > 10) {
        sortedTimestamps.slice(10).forEach(timestamp => {
          backupGroups[timestamp].forEach(file => {
            fs.unlinkSync(file.path);
          });
        });
      }
    } catch (error) {
      console.error('Error cleaning up old backups:', error.message);
    }
  }
}

module.exports = {
  MarkdownStorageAdapter
};
