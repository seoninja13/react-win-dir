/**
 * To-Do List Manager
 * 
 * Core functionality for managing tasks in a project-aware to-do list.
 */

const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { getConfig } = require('./config');
const { Notification } = require('./notification');

/**
 * Task class representing a single task in the to-do list
 */
class Task {
  /**
   * Create a new task
   * @param {Object} taskData Task data
   */
  constructor(taskData = {}) {
    this.id = taskData.id || uuidv4();
    this.title = taskData.title || '';
    this.description = taskData.description || '';
    this.status = taskData.status || 'todo';
    this.priority = taskData.priority || 'medium';
    this.category = taskData.category || 'feature';
    this.createdAt = taskData.createdAt || new Date().toISOString();
    this.updatedAt = taskData.updatedAt || new Date().toISOString();
    this.completedAt = taskData.completedAt || null;
    this.createdBy = taskData.createdBy || 'user';
    this.assignedTo = taskData.assignedTo || null;
    this.tags = taskData.tags || [];
    this.notes = taskData.notes || [];
  }

  /**
   * Update task properties
   * @param {Object} updates Properties to update
   * @returns {Task} Updated task
   */
  update(updates) {
    Object.keys(updates).forEach(key => {
      if (key !== 'id' && key !== 'createdAt' && key !== 'completedAt' && this.hasOwnProperty(key)) {
        this[key] = updates[key];
      }
    });

    this.updatedAt = new Date().toISOString();
    return this;
  }

  /**
   * Mark task as complete
   * @returns {Task} Updated task
   */
  complete() {
    this.status = 'completed';
    this.completedAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
    return this;
  }

  /**
   * Add a note to the task
   * @param {string} note Note text
   * @param {string} author Note author
   * @returns {Task} Updated task
   */
  addNote(note, author = 'user') {
    this.notes.push({
      text: note,
      author,
      createdAt: new Date().toISOString()
    });
    this.updatedAt = new Date().toISOString();
    return this;
  }

  /**
   * Add a tag to the task
   * @param {string} tag Tag to add
   * @returns {Task} Updated task
   */
  addTag(tag) {
    if (!this.tags.includes(tag)) {
      this.tags.push(tag);
      this.updatedAt = new Date().toISOString();
    }
    return this;
  }

  /**
   * Remove a tag from the task
   * @param {string} tag Tag to remove
   * @returns {Task} Updated task
   */
  removeTag(tag) {
    this.tags = this.tags.filter(t => t !== tag);
    this.updatedAt = new Date().toISOString();
    return this;
  }

  /**
   * Convert task to JSON object
   * @returns {Object} JSON representation of the task
   */
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      status: this.status,
      priority: this.priority,
      category: this.category,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      completedAt: this.completedAt,
      createdBy: this.createdBy,
      assignedTo: this.assignedTo,
      tags: this.tags,
      notes: this.notes
    };
  }

  /**
   * Create a Task instance from JSON
   * @param {Object} json JSON representation of a task
   * @returns {Task} Task instance
   */
  static fromJSON(json) {
    return new Task(json);
  }
}

/**
 * To-Do List Manager class for managing tasks
 */
class TodoManager {
  /**
   * Create a new TodoManager instance
   * @param {Object} config Configuration object
   */
  constructor(config = null) {
    this.config = config || getConfig();
    this.tasks = [];
    this.loaded = false;
    this.storageAdapter = null;
    this.initializeStorageAdapter();
  }

  /**
   * Initialize the storage adapter based on configuration
   */
  initializeStorageAdapter() {
    const format = this.config.storage.format || 'json';
    
    switch (format) {
      case 'json':
        const { JsonStorageAdapter } = require('./storage-adapters/json-adapter');
        this.storageAdapter = new JsonStorageAdapter(this.config);
        break;
      case 'markdown':
        const { MarkdownStorageAdapter } = require('./storage-adapters/markdown-adapter');
        this.storageAdapter = new MarkdownStorageAdapter(this.config);
        break;
      case 'yaml':
        const { YamlStorageAdapter } = require('./storage-adapters/yaml-adapter');
        this.storageAdapter = new YamlStorageAdapter(this.config);
        break;
      default:
        const { JsonStorageAdapter: DefaultAdapter } = require('./storage-adapters/json-adapter');
        this.storageAdapter = new DefaultAdapter(this.config);
    }
  }

  /**
   * Load tasks from storage
   * @returns {Promise<Array<Task>>} Loaded tasks
   */
  async loadTasks() {
    try {
      const taskData = await this.storageAdapter.load();
      this.tasks = taskData.map(task => Task.fromJSON(task));
      this.loaded = true;
      return this.tasks;
    } catch (error) {
      console.error('Error loading tasks:', error.message);
      this.tasks = [];
      this.loaded = true;
      return this.tasks;
    }
  }

  /**
   * Save tasks to storage
   * @returns {Promise<boolean>} Success status
   */
  async saveTasks() {
    try {
      const taskData = this.tasks.map(task => task.toJSON());
      await this.storageAdapter.save(taskData);
      return true;
    } catch (error) {
      console.error('Error saving tasks:', error.message);
      return false;
    }
  }

  /**
   * Ensure tasks are loaded
   * @returns {Promise<void>}
   */
  async ensureLoaded() {
    if (!this.loaded) {
      await this.loadTasks();
    }
  }

  /**
   * Add a new task
   * @param {Object} taskData Task data
   * @param {string} createdBy Creator of the task
   * @returns {Promise<Task>} Created task
   */
  async addTask(taskData, createdBy = 'user') {
    await this.ensureLoaded();
    
    // Set default values from config
    const config = this.config.tasks;
    const task = new Task({
      ...taskData,
      priority: taskData.priority || config.defaultPriority,
      createdBy
    });
    
    this.tasks.push(task);
    await this.saveTasks();
    
    // Send notification
    if (this.config.notifications.enabled) {
      const notification = new Notification(
        'Task Added',
        `New task added: ${task.title}`,
        'info',
        { vscode: true, terminal: true }
      );
      notification.send();
    }
    
    return task;
  }

  /**
   * Get a task by ID
   * @param {string} id Task ID
   * @returns {Promise<Task|null>} Task or null if not found
   */
  async getTask(id) {
    await this.ensureLoaded();
    return this.tasks.find(task => task.id === id) || null;
  }

  /**
   * Get a task by index
   * @param {number} index Task index (1-based)
   * @returns {Promise<Task|null>} Task or null if not found
   */
  async getTaskByIndex(index) {
    await this.ensureLoaded();
    const taskIndex = index - 1; // Convert to 0-based index
    return this.tasks[taskIndex] || null;
  }

  /**
   * Update a task
   * @param {string} id Task ID
   * @param {Object} updates Updates to apply
   * @returns {Promise<Task|null>} Updated task or null if not found
   */
  async updateTask(id, updates) {
    await this.ensureLoaded();
    const task = await this.getTask(id);
    
    if (!task) {
      return null;
    }
    
    task.update(updates);
    await this.saveTasks();
    
    // Send notification
    if (this.config.notifications.enabled) {
      const notification = new Notification(
        'Task Updated',
        `Task updated: ${task.title}`,
        'info',
        { vscode: true, terminal: true }
      );
      notification.send();
    }
    
    return task;
  }

  /**
   * Complete a task
   * @param {string} id Task ID
   * @returns {Promise<Task|null>} Completed task or null if not found
   */
  async completeTask(id) {
    await this.ensureLoaded();
    const task = await this.getTask(id);
    
    if (!task) {
      return null;
    }
    
    task.complete();
    await this.saveTasks();
    
    // Send notification
    if (this.config.notifications.enabled) {
      const notification = new Notification(
        'Task Completed',
        `Task completed: ${task.title}`,
        'success',
        { vscode: true, terminal: true }
      );
      notification.send();
    }
    
    return task;
  }

  /**
   * Delete a task
   * @param {string} id Task ID
   * @returns {Promise<boolean>} Success status
   */
  async deleteTask(id) {
    await this.ensureLoaded();
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
      return false;
    }
    
    const task = this.tasks[taskIndex];
    this.tasks.splice(taskIndex, 1);
    await this.saveTasks();
    
    // Send notification
    if (this.config.notifications.enabled) {
      const notification = new Notification(
        'Task Deleted',
        `Task deleted: ${task.title}`,
        'warning',
        { vscode: true, terminal: true }
      );
      notification.send();
    }
    
    return true;
  }

  /**
   * List all tasks
   * @param {Object} filters Filters to apply
   * @returns {Promise<Array<Task>>} Filtered tasks
   */
  async listTasks(filters = {}) {
    await this.ensureLoaded();
    
    let filteredTasks = [...this.tasks];
    
    // Apply filters
    if (filters.status) {
      filteredTasks = filteredTasks.filter(task => task.status === filters.status);
    }
    
    if (filters.priority) {
      filteredTasks = filteredTasks.filter(task => task.priority === filters.priority);
    }
    
    if (filters.category) {
      filteredTasks = filteredTasks.filter(task => task.category === filters.category);
    }
    
    if (filters.tag) {
      filteredTasks = filteredTasks.filter(task => task.tags.includes(filters.tag));
    }
    
    if (filters.createdBy) {
      filteredTasks = filteredTasks.filter(task => task.createdBy === filters.createdBy);
    }
    
    if (filters.assignedTo) {
      filteredTasks = filteredTasks.filter(task => task.assignedTo === filters.assignedTo);
    }
    
    // Sort tasks
    if (filters.sortBy) {
      const sortField = filters.sortBy;
      const sortDirection = filters.sortDirection === 'desc' ? -1 : 1;
      
      filteredTasks.sort((a, b) => {
        if (a[sortField] < b[sortField]) return -1 * sortDirection;
        if (a[sortField] > b[sortField]) return 1 * sortDirection;
        return 0;
      });
    } else {
      // Default sort by priority (high to low) and then by creation date (newest first)
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      
      filteredTasks.sort((a, b) => {
        // First sort by priority
        const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
        if (priorityDiff !== 0) return priorityDiff;
        
        // Then sort by creation date (newest first)
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    }
    
    return filteredTasks;
  }
}

module.exports = {
  Task,
  TodoManager
};
