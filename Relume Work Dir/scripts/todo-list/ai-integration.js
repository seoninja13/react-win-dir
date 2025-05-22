/**
 * AI Integration Module for To-Do List Management
 * 
 * Handles integration with AI assistants for task management.
 */

const { TodoManager } = require('./todo-manager');
const { getConfig } = require('./config');
const { Notification } = require('./notification');

/**
 * AI Integration class for To-Do List Management
 */
class AIIntegration {
  /**
   * Create a new AIIntegration instance
   * @param {TodoManager} todoManager TodoManager instance
   * @param {Object} config Configuration object
   */
  constructor(todoManager, config = null) {
    this.todoManager = todoManager;
    this.config = config || getConfig();
  }

  /**
   * Process a message from an AI assistant
   * @param {string} message Message from AI assistant
   * @returns {Promise<Object>} Processing result
   */
  async processMessage(message) {
    if (!this.config.ai.enabled) {
      return {
        success: false,
        message: 'AI integration is disabled'
      };
    }
    
    // Check for task-related commands
    if (this.isAddTaskCommand(message)) {
      return await this.handleAddTask(message);
    } else if (this.isCompleteTaskCommand(message)) {
      return await this.handleCompleteTask(message);
    } else if (this.isUpdateTaskCommand(message)) {
      return await this.handleUpdateTask(message);
    } else if (this.isListTasksCommand(message)) {
      return await this.handleListTasks(message);
    }
    
    return {
      success: false,
      message: 'No task-related command found in message'
    };
  }

  /**
   * Check if message is an add task command
   * @param {string} message Message to check
   * @returns {boolean} True if message is an add task command
   */
  isAddTaskCommand(message) {
    const addTaskPatterns = [
      /add\s+(?:a\s+)?(?:new\s+)?task(?:\s+to\s+(?:the\s+)?(?:todo|to-do)\s+list)?:\s*(.+)/i,
      /add\s+(?:to\s+(?:the\s+)?(?:todo|to-do)\s+list):\s*(.+)/i,
      /create\s+(?:a\s+)?(?:new\s+)?task(?:\s+in\s+(?:the\s+)?(?:todo|to-do)\s+list)?:\s*(.+)/i,
      /todo(?:\s+list)?:\s*add\s+(.+)/i
    ];
    
    return addTaskPatterns.some(pattern => pattern.test(message));
  }

  /**
   * Check if message is a complete task command
   * @param {string} message Message to check
   * @returns {boolean} True if message is a complete task command
   */
  isCompleteTaskCommand(message) {
    const completeTaskPatterns = [
      /(?:mark|set)\s+task\s+(?:number\s+)?(?:#)?(\d+)\s+(?:as\s+)?(?:complete|completed|done)/i,
      /complete\s+task\s+(?:number\s+)?(?:#)?(\d+)/i,
      /task\s+(?:number\s+)?(?:#)?(\d+)\s+(?:is\s+)?(?:complete|completed|done)/i,
      /finish\s+task\s+(?:number\s+)?(?:#)?(\d+)/i
    ];
    
    return completeTaskPatterns.some(pattern => pattern.test(message));
  }

  /**
   * Check if message is an update task command
   * @param {string} message Message to check
   * @returns {boolean} True if message is an update task command
   */
  isUpdateTaskCommand(message) {
    const updateTaskPatterns = [
      /update\s+task\s+(?:number\s+)?(?:#)?(\d+)\s+(?:to|with)?\s*(?:title|description)?:?\s*(.+)/i,
      /change\s+task\s+(?:number\s+)?(?:#)?(\d+)\s+(?:to|with)?\s*(?:title|description)?:?\s*(.+)/i,
      /modify\s+task\s+(?:number\s+)?(?:#)?(\d+)\s+(?:to|with)?\s*(?:title|description)?:?\s*(.+)/i,
      /edit\s+task\s+(?:number\s+)?(?:#)?(\d+)\s+(?:to|with)?\s*(?:title|description)?:?\s*(.+)/i
    ];
    
    return updateTaskPatterns.some(pattern => pattern.test(message));
  }

  /**
   * Check if message is a list tasks command
   * @param {string} message Message to check
   * @returns {boolean} True if message is a list tasks command
   */
  isListTasksCommand(message) {
    const listTasksPatterns = [
      /(?:show|list|display)\s+(?:all\s+)?(?:the\s+)?(?:todo|to-do)?\s*(?:list|tasks)/i,
      /what(?:'s|\s+is|\s+are)\s+(?:in\s+)?(?:the\s+)?(?:current\s+)?(?:todo|to-do)?\s*(?:list|tasks)/i,
      /(?:get|fetch)\s+(?:all\s+)?(?:the\s+)?(?:todo|to-do)?\s*(?:list|tasks)/i
    ];
    
    return listTasksPatterns.some(pattern => pattern.test(message));
  }

  /**
   * Handle add task command
   * @param {string} message Message containing add task command
   * @returns {Promise<Object>} Processing result
   */
  async handleAddTask(message) {
    if (!this.config.ai.allowAdd) {
      return {
        success: false,
        message: 'AI is not allowed to add tasks'
      };
    }
    
    // Extract task title
    let taskTitle = '';
    const addTaskPatterns = [
      /add\s+(?:a\s+)?(?:new\s+)?task(?:\s+to\s+(?:the\s+)?(?:todo|to-do)\s+list)?:\s*(.+)/i,
      /add\s+(?:to\s+(?:the\s+)?(?:todo|to-do)\s+list):\s*(.+)/i,
      /create\s+(?:a\s+)?(?:new\s+)?task(?:\s+in\s+(?:the\s+)?(?:todo|to-do)\s+list)?:\s*(.+)/i,
      /todo(?:\s+list)?:\s*add\s+(.+)/i
    ];
    
    for (const pattern of addTaskPatterns) {
      const match = message.match(pattern);
      if (match && match[1]) {
        taskTitle = match[1].trim();
        break;
      }
    }
    
    if (!taskTitle) {
      return {
        success: false,
        message: 'Could not extract task title from message'
      };
    }
    
    // Check if confirmation is required
    if (this.config.ai.requireConfirmation) {
      // In a real implementation, this would show a confirmation dialog
      // For now, we'll just simulate confirmation
      console.log(`AI wants to add task: "${taskTitle}"`);
      console.log('Simulating user confirmation: Approved');
    }
    
    // Add the task
    const task = await this.todoManager.addTask({
      title: taskTitle,
      createdBy: 'ai'
    });
    
    // Send notification
    const notification = new Notification(
      'AI Added Task',
      `AI assistant added a new task: ${taskTitle}`,
      'info',
      { vscode: true, terminal: true }
    );
    notification.send();
    
    return {
      success: true,
      message: `Task added: ${taskTitle}`,
      task
    };
  }

  /**
   * Handle complete task command
   * @param {string} message Message containing complete task command
   * @returns {Promise<Object>} Processing result
   */
  async handleCompleteTask(message) {
    if (!this.config.ai.allowComplete) {
      return {
        success: false,
        message: 'AI is not allowed to complete tasks'
      };
    }
    
    // Extract task index
    let taskIndex = -1;
    const completeTaskPatterns = [
      /(?:mark|set)\s+task\s+(?:number\s+)?(?:#)?(\d+)\s+(?:as\s+)?(?:complete|completed|done)/i,
      /complete\s+task\s+(?:number\s+)?(?:#)?(\d+)/i,
      /task\s+(?:number\s+)?(?:#)?(\d+)\s+(?:is\s+)?(?:complete|completed|done)/i,
      /finish\s+task\s+(?:number\s+)?(?:#)?(\d+)/i
    ];
    
    for (const pattern of completeTaskPatterns) {
      const match = message.match(pattern);
      if (match && match[1]) {
        taskIndex = parseInt(match[1], 10);
        break;
      }
    }
    
    if (taskIndex <= 0) {
      return {
        success: false,
        message: 'Could not extract valid task index from message'
      };
    }
    
    // Get the task
    const task = await this.todoManager.getTaskByIndex(taskIndex);
    if (!task) {
      return {
        success: false,
        message: `Task #${taskIndex} not found`
      };
    }
    
    // Check if confirmation is required
    if (this.config.ai.requireConfirmation) {
      // In a real implementation, this would show a confirmation dialog
      // For now, we'll just simulate confirmation
      console.log(`AI wants to complete task #${taskIndex}: "${task.title}"`);
      console.log('Simulating user confirmation: Approved');
    }
    
    // Complete the task
    const completedTask = await this.todoManager.completeTask(task.id);
    
    // Send notification
    const notification = new Notification(
      'AI Completed Task',
      `AI assistant completed task #${taskIndex}: ${task.title}`,
      'success',
      { vscode: true, terminal: true }
    );
    notification.send();
    
    return {
      success: true,
      message: `Task #${taskIndex} completed: ${task.title}`,
      task: completedTask
    };
  }

  /**
   * Handle update task command
   * @param {string} message Message containing update task command
   * @returns {Promise<Object>} Processing result
   */
  async handleUpdateTask(message) {
    if (!this.config.ai.allowUpdate) {
      return {
        success: false,
        message: 'AI is not allowed to update tasks'
      };
    }
    
    // Extract task index and new title
    let taskIndex = -1;
    let newTitle = '';
    const updateTaskPatterns = [
      /update\s+task\s+(?:number\s+)?(?:#)?(\d+)\s+(?:to|with)?\s*(?:title|description)?:?\s*(.+)/i,
      /change\s+task\s+(?:number\s+)?(?:#)?(\d+)\s+(?:to|with)?\s*(?:title|description)?:?\s*(.+)/i,
      /modify\s+task\s+(?:number\s+)?(?:#)?(\d+)\s+(?:to|with)?\s*(?:title|description)?:?\s*(.+)/i,
      /edit\s+task\s+(?:number\s+)?(?:#)?(\d+)\s+(?:to|with)?\s*(?:title|description)?:?\s*(.+)/i
    ];
    
    for (const pattern of updateTaskPatterns) {
      const match = message.match(pattern);
      if (match && match[1] && match[2]) {
        taskIndex = parseInt(match[1], 10);
        newTitle = match[2].trim();
        break;
      }
    }
    
    if (taskIndex <= 0 || !newTitle) {
      return {
        success: false,
        message: 'Could not extract valid task index and new title from message'
      };
    }
    
    // Get the task
    const task = await this.todoManager.getTaskByIndex(taskIndex);
    if (!task) {
      return {
        success: false,
        message: `Task #${taskIndex} not found`
      };
    }
    
    // Check if confirmation is required
    if (this.config.ai.requireConfirmation) {
      // In a real implementation, this would show a confirmation dialog
      // For now, we'll just simulate confirmation
      console.log(`AI wants to update task #${taskIndex} from "${task.title}" to "${newTitle}"`);
      console.log('Simulating user confirmation: Approved');
    }
    
    // Update the task
    const updatedTask = await this.todoManager.updateTask(task.id, { title: newTitle });
    
    // Send notification
    const notification = new Notification(
      'AI Updated Task',
      `AI assistant updated task #${taskIndex} from "${task.title}" to "${newTitle}"`,
      'info',
      { vscode: true, terminal: true }
    );
    notification.send();
    
    return {
      success: true,
      message: `Task #${taskIndex} updated from "${task.title}" to "${newTitle}"`,
      task: updatedTask
    };
  }

  /**
   * Handle list tasks command
   * @param {string} message Message containing list tasks command
   * @returns {Promise<Object>} Processing result
   */
  async handleListTasks(message) {
    // List tasks
    const tasks = await this.todoManager.listTasks();
    
    // Format tasks for display
    const formattedTasks = tasks.map((task, index) => {
      const status = task.status === 'completed' ? '[x]' : '[ ]';
      const priority = task.priority !== 'medium' ? `[${task.priority.toUpperCase()}] ` : '';
      return `${index + 1}. ${status} ${priority}${task.title}`;
    }).join('\n');
    
    return {
      success: true,
      message: 'Tasks retrieved successfully',
      tasks,
      formattedTasks: formattedTasks || 'No tasks found'
    };
  }
}

module.exports = {
  AIIntegration
};
