/**
 * To-Do List Management with AI Sync
 * 
 * Main entry point for the to-do list management functionality.
 */

const { TodoManager } = require('./todo-manager');
const { AIIntegration } = require('./ai-integration');
const { getConfig, updateConfig } = require('./config');
const { Notification, sendTasksNotification } = require('./notification');

/**
 * Command-line argument parser
 * @param {Array<string>} args Command-line arguments
 * @returns {Object} Parsed arguments
 */
function parseArgs(args) {
  const parsedArgs = {
    command: '',
    options: {},
    args: []
  };
  
  // Skip the first two arguments (node and script path)
  const cmdArgs = args.slice(2);
  
  if (cmdArgs.length === 0) {
    parsedArgs.command = 'help';
    return parsedArgs;
  }
  
  parsedArgs.command = cmdArgs[0];
  
  // Parse options (--key=value or --flag)
  let i = 1;
  while (i < cmdArgs.length) {
    const arg = cmdArgs[i];
    if (arg.startsWith('--')) {
      const option = arg.substring(2);
      const equalIndex = option.indexOf('=');
      
      if (equalIndex !== -1) {
        const key = option.substring(0, equalIndex);
        const value = option.substring(equalIndex + 1);
        parsedArgs.options[key] = value;
      } else {
        parsedArgs.options[option] = true;
      }
    } else {
      parsedArgs.args.push(arg);
    }
    i++;
  }
  
  return parsedArgs;
}

/**
 * Display help information
 */
function showHelp() {
  console.log(`
To-Do List Management with AI Sync

Usage:
  node index.js <command> [options] [args]

Commands:
  add <title>           Add a new task
  list                  List all tasks
  complete <index>      Complete a task
  update <index> <title> Update a task
  delete <index>        Delete a task
  prioritize <index> <priority> Set task priority
  categorize <index> <category> Set task category
  config                View or update configuration
  help                  Show this help message

Options:
  --status=<status>     Filter tasks by status
  --priority=<priority> Filter tasks by priority
  --category=<category> Filter tasks by category
  --sort=<field>        Sort tasks by field
  --desc                Sort in descending order
  --format=<format>     Output format (text, json)
  --key=value           Set a configuration value

Examples:
  node index.js add "Implement feature X"
  node index.js list --status=todo
  node index.js complete 1
  node index.js update 1 "Implement feature X with Y"
  node index.js prioritize 1 high
  node index.js config --storage.format=markdown
  `);
}

/**
 * Handle the add command
 * @param {Array<string>} args Command arguments
 * @param {Object} options Command options
 */
async function handleAddCommand(args, options) {
  if (args.length === 0) {
    console.error('Error: No task title specified');
    console.log('Usage: node index.js add <title>');
    return;
  }
  
  const title = args.join(' ');
  const config = getConfig();
  const todoManager = new TodoManager(config);
  
  // Create task data
  const taskData = {
    title,
    priority: options.priority || config.tasks.defaultPriority,
    category: options.category || 'feature',
    description: options.description || ''
  };
  
  // Add task
  const task = await todoManager.addTask(taskData);
  
  console.log(`Task added: ${task.title}`);
  console.log(`ID: ${task.id}`);
  console.log(`Priority: ${task.priority}`);
  console.log(`Category: ${task.category}`);
}

/**
 * Handle the list command
 * @param {Array<string>} args Command arguments
 * @param {Object} options Command options
 */
async function handleListCommand(args, options) {
  const config = getConfig();
  const todoManager = new TodoManager(config);
  
  // Create filters
  const filters = {
    status: options.status,
    priority: options.priority,
    category: options.category,
    tag: options.tag,
    createdBy: options.createdBy,
    assignedTo: options.assignedTo,
    sortBy: options.sort,
    sortDirection: options.desc ? 'desc' : 'asc'
  };
  
  // List tasks
  const tasks = await todoManager.listTasks(filters);
  
  // Output format
  const format = options.format || 'text';
  
  if (format === 'json') {
    console.log(JSON.stringify(tasks, null, 2));
    return;
  }
  
  // Text format
  if (tasks.length === 0) {
    console.log('No tasks found');
    return;
  }
  
  console.log('Tasks:');
  console.log('------');
  
  tasks.forEach((task, index) => {
    const status = task.status === 'completed' ? '[x]' : '[ ]';
    const priority = task.priority !== 'medium' ? `[${task.priority.toUpperCase()}] ` : '';
    console.log(`${index + 1}. ${status} ${priority}${task.title}`);
    
    if (task.description) {
      console.log(`   Description: ${task.description}`);
    }
    
    if (task.tags && task.tags.length > 0) {
      console.log(`   Tags: ${task.tags.join(', ')}`);
    }
    
    if (task.status === 'completed' && task.completedAt) {
      console.log(`   Completed: ${new Date(task.completedAt).toLocaleString()}`);
    }
    
    console.log('');
  });
}

/**
 * Handle the complete command
 * @param {Array<string>} args Command arguments
 * @param {Object} options Command options
 */
async function handleCompleteCommand(args, options) {
  if (args.length === 0) {
    console.error('Error: No task index specified');
    console.log('Usage: node index.js complete <index>');
    return;
  }
  
  const index = parseInt(args[0], 10);
  if (isNaN(index) || index <= 0) {
    console.error('Error: Invalid task index');
    return;
  }
  
  const config = getConfig();
  const todoManager = new TodoManager(config);
  
  // Get task by index
  const task = await todoManager.getTaskByIndex(index);
  if (!task) {
    console.error(`Error: Task #${index} not found`);
    return;
  }
  
  // Complete task
  const completedTask = await todoManager.completeTask(task.id);
  
  console.log(`Task #${index} completed: ${completedTask.title}`);
}

/**
 * Handle the update command
 * @param {Array<string>} args Command arguments
 * @param {Object} options Command options
 */
async function handleUpdateCommand(args, options) {
  if (args.length < 2) {
    console.error('Error: Task index and title required');
    console.log('Usage: node index.js update <index> <title>');
    return;
  }
  
  const index = parseInt(args[0], 10);
  if (isNaN(index) || index <= 0) {
    console.error('Error: Invalid task index');
    return;
  }
  
  const title = args.slice(1).join(' ');
  const config = getConfig();
  const todoManager = new TodoManager(config);
  
  // Get task by index
  const task = await todoManager.getTaskByIndex(index);
  if (!task) {
    console.error(`Error: Task #${index} not found`);
    return;
  }
  
  // Create update data
  const updateData = {
    title
  };
  
  // Add optional updates
  if (options.description) {
    updateData.description = options.description;
  }
  
  if (options.priority) {
    updateData.priority = options.priority;
  }
  
  if (options.category) {
    updateData.category = options.category;
  }
  
  // Update task
  const updatedTask = await todoManager.updateTask(task.id, updateData);
  
  console.log(`Task #${index} updated: ${updatedTask.title}`);
}

/**
 * Handle the delete command
 * @param {Array<string>} args Command arguments
 * @param {Object} options Command options
 */
async function handleDeleteCommand(args, options) {
  if (args.length === 0) {
    console.error('Error: No task index specified');
    console.log('Usage: node index.js delete <index>');
    return;
  }
  
  const index = parseInt(args[0], 10);
  if (isNaN(index) || index <= 0) {
    console.error('Error: Invalid task index');
    return;
  }
  
  const config = getConfig();
  const todoManager = new TodoManager(config);
  
  // Get task by index
  const task = await todoManager.getTaskByIndex(index);
  if (!task) {
    console.error(`Error: Task #${index} not found`);
    return;
  }
  
  // Delete task
  const success = await todoManager.deleteTask(task.id);
  
  if (success) {
    console.log(`Task #${index} deleted: ${task.title}`);
  } else {
    console.error(`Error: Failed to delete task #${index}`);
  }
}

/**
 * Handle the prioritize command
 * @param {Array<string>} args Command arguments
 * @param {Object} options Command options
 */
async function handlePrioritizeCommand(args, options) {
  if (args.length < 2) {
    console.error('Error: Task index and priority required');
    console.log('Usage: node index.js prioritize <index> <priority>');
    return;
  }
  
  const index = parseInt(args[0], 10);
  if (isNaN(index) || index <= 0) {
    console.error('Error: Invalid task index');
    return;
  }
  
  const priority = args[1].toLowerCase();
  const config = getConfig();
  
  // Validate priority
  if (!config.tasks.priorities.includes(priority)) {
    console.error(`Error: Invalid priority. Valid priorities are: ${config.tasks.priorities.join(', ')}`);
    return;
  }
  
  const todoManager = new TodoManager(config);
  
  // Get task by index
  const task = await todoManager.getTaskByIndex(index);
  if (!task) {
    console.error(`Error: Task #${index} not found`);
    return;
  }
  
  // Update task priority
  const updatedTask = await todoManager.updateTask(task.id, { priority });
  
  console.log(`Task #${index} priority set to ${priority}: ${updatedTask.title}`);
}

/**
 * Handle the categorize command
 * @param {Array<string>} args Command arguments
 * @param {Object} options Command options
 */
async function handleCategorizeCommand(args, options) {
  if (args.length < 2) {
    console.error('Error: Task index and category required');
    console.log('Usage: node index.js categorize <index> <category>');
    return;
  }
  
  const index = parseInt(args[0], 10);
  if (isNaN(index) || index <= 0) {
    console.error('Error: Invalid task index');
    return;
  }
  
  const category = args[1].toLowerCase();
  const config = getConfig();
  
  // Validate category
  if (!config.tasks.categories.includes(category)) {
    console.error(`Error: Invalid category. Valid categories are: ${config.tasks.categories.join(', ')}`);
    return;
  }
  
  const todoManager = new TodoManager(config);
  
  // Get task by index
  const task = await todoManager.getTaskByIndex(index);
  if (!task) {
    console.error(`Error: Task #${index} not found`);
    return;
  }
  
  // Update task category
  const updatedTask = await todoManager.updateTask(task.id, { category });
  
  console.log(`Task #${index} category set to ${category}: ${updatedTask.title}`);
}

/**
 * Handle the config command
 * @param {Array<string>} args Command arguments
 * @param {Object} options Command options
 */
async function handleConfigCommand(args, options) {
  const config = getConfig();
  
  // Check if we're updating config
  const updateKeys = Object.keys(options).filter(key => key.includes('.'));
  
  if (updateKeys.length > 0) {
    // Update config
    for (const key of updateKeys) {
      const [section, setting] = key.split('.');
      let value = options[key];
      
      // Convert string values to appropriate types
      if (value === 'true') value = true;
      if (value === 'false') value = false;
      if (!isNaN(value)) value = Number(value);
      
      updateConfig(section, setting, value);
      console.log(`Updated ${section}.${setting} to ${value}`);
    }
  } else if (args.length > 0) {
    // Display specific section
    const section = args[0];
    if (config[section]) {
      console.log(`Configuration for section '${section}':`);
      console.log(JSON.stringify(config[section], null, 2));
    } else {
      console.error(`Error: Section '${section}' not found in configuration`);
    }
  } else {
    // Display full config
    console.log('Current configuration:');
    console.log(JSON.stringify(config, null, 2));
  }
}

/**
 * Handle the ai command
 * @param {Array<string>} args Command arguments
 * @param {Object} options Command options
 */
async function handleAICommand(args, options) {
  if (args.length === 0) {
    console.error('Error: No AI message specified');
    console.log('Usage: node index.js ai <message>');
    return;
  }
  
  const message = args.join(' ');
  const config = getConfig();
  const todoManager = new TodoManager(config);
  const aiIntegration = new AIIntegration(todoManager, config);
  
  // Process AI message
  const result = await aiIntegration.processMessage(message);
  
  console.log(result.message);
  
  if (result.success && result.formattedTasks) {
    console.log('\n' + result.formattedTasks);
  }
}

/**
 * Main function
 */
async function main() {
  const args = parseArgs(process.argv);
  
  // Show startup notifications if enabled
  if (args.command !== 'help' && args.command !== 'config') {
    const config = getConfig();
    if (config.notifications.showOnStartup) {
      const todoManager = new TodoManager(config);
      const tasks = await todoManager.loadTasks();
      sendTasksNotification(tasks, config);
    }
  }
  
  switch (args.command) {
    case 'add':
      await handleAddCommand(args.args, args.options);
      break;
      
    case 'list':
      await handleListCommand(args.args, args.options);
      break;
      
    case 'complete':
      await handleCompleteCommand(args.args, args.options);
      break;
      
    case 'update':
      await handleUpdateCommand(args.args, args.options);
      break;
      
    case 'delete':
      await handleDeleteCommand(args.args, args.options);
      break;
      
    case 'prioritize':
      await handlePrioritizeCommand(args.args, args.options);
      break;
      
    case 'categorize':
      await handleCategorizeCommand(args.args, args.options);
      break;
      
    case 'config':
      await handleConfigCommand(args.args, args.options);
      break;
      
    case 'ai':
      await handleAICommand(args.args, args.options);
      break;
      
    case 'help':
    default:
      showHelp();
      break;
  }
}

// Run the main function if this script is executed directly
if (require.main === module) {
  main().catch(error => {
    console.error('Error:', error.message);
    process.exit(1);
  });
}

// Export functions for use in other modules
module.exports = {
  TodoManager,
  AIIntegration,
  getConfig,
  updateConfig
};
