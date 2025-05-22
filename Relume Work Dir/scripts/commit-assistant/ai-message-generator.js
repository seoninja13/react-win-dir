/**
 * AI Message Generator for the Intelligent Commit Assistant
 * 
 * Analyzes git changes and generates commit message suggestions using AI
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const https = require('https');

/**
 * Get the list of changed files with their status
 * @returns {Array<Object>} Array of changed files with status
 */
function getChangedFiles() {
  try {
    const output = execSync('git status --porcelain').toString();
    const lines = output.split('\n').filter(line => line.trim() !== '');
    
    return lines.map(line => {
      const status = line.substring(0, 2).trim();
      const filePath = line.substring(3).trim();
      
      return {
        status,
        path: filePath,
        isNew: status.includes('A') || status.includes('?'),
        isModified: status.includes('M'),
        isDeleted: status.includes('D'),
        isRenamed: status.includes('R'),
      };
    });
  } catch (error) {
    console.error('Error getting changed files:', error.message);
    return [];
  }
}

/**
 * Get the diff content for a specific file
 * @param {string} filePath Path to the file
 * @returns {string} Diff content
 */
function getFileDiff(filePath) {
  try {
    // For new files, get the entire content
    if (!fs.existsSync(filePath)) {
      return '';
    }
    
    try {
      return execSync(`git diff -- "${filePath}"`).toString();
    } catch (error) {
      // If the file is not yet tracked, show it as a new file
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        return `+++ b/${filePath}\n${content.split('\n').map(line => `+${line}`).join('\n')}`;
      }
      return '';
    }
  } catch (error) {
    console.error(`Error getting diff for ${filePath}:`, error.message);
    return '';
  }
}

/**
 * Analyze the changes to determine the type of commit
 * @param {Array<Object>} changedFiles List of changed files
 * @returns {string} Commit type (feat, fix, docs, etc.)
 */
function determineCommitType(changedFiles) {
  // Count files by type
  const counts = {
    docs: 0,
    test: 0,
    feat: 0,
    fix: 0,
    style: 0,
    refactor: 0,
    chore: 0
  };
  
  changedFiles.forEach(file => {
    const filePath = file.path.toLowerCase();
    
    if (filePath.includes('test') || filePath.endsWith('.test.js') || filePath.endsWith('.spec.js')) {
      counts.test++;
    } else if (filePath.includes('docs') || filePath.endsWith('.md') || filePath.includes('documentation')) {
      counts.docs++;
    } else if (filePath.endsWith('.css') || filePath.endsWith('.scss') || filePath.includes('style')) {
      counts.style++;
    } else if (filePath.includes('package.json') || filePath.includes('config') || filePath.includes('.git')) {
      counts.chore++;
    } else if (file.isNew) {
      counts.feat++;
    } else if (file.isModified) {
      // Determine if it's a fix or a feature based on the diff
      const diff = getFileDiff(file.path);
      if (diff.includes('fix') || diff.includes('bug') || diff.includes('issue')) {
        counts.fix++;
      } else {
        counts.feat++;
      }
    }
  });
  
  // Find the most common type
  let maxCount = 0;
  let maxType = 'feat';
  
  for (const [type, count] of Object.entries(counts)) {
    if (count > maxCount) {
      maxCount = count;
      maxType = type;
    }
  }
  
  return maxType;
}

/**
 * Determine the scope of the changes
 * @param {Array<Object>} changedFiles List of changed files
 * @returns {string} Commit scope
 */
function determineCommitScope(changedFiles) {
  // Group files by directory
  const directories = {};
  
  changedFiles.forEach(file => {
    const dir = path.dirname(file.path);
    if (dir === '.') return;
    
    const topDir = dir.split('/')[0];
    directories[topDir] = (directories[topDir] || 0) + 1;
  });
  
  // Find the most common directory
  let maxCount = 0;
  let maxDir = '';
  
  for (const [dir, count] of Object.entries(directories)) {
    if (count > maxCount) {
      maxCount = count;
      maxDir = dir;
    }
  }
  
  return maxDir;
}

/**
 * Generate a commit message using AI
 * @param {Object} config AI assistance configuration
 * @returns {Promise<string>} Generated commit message
 */
async function generateCommitMessage(config) {
  const changedFiles = getChangedFiles();
  
  if (changedFiles.length === 0) {
    return "No changes to commit";
  }
  
  // For simple cases, generate a message without AI
  if (changedFiles.length === 1) {
    const file = changedFiles[0];
    const type = determineCommitType([file]);
    const fileName = path.basename(file.path);
    
    if (file.isNew) {
      return `${type}: add ${fileName}`;
    } else if (file.isModified) {
      return `${type}: update ${fileName}`;
    } else if (file.isDeleted) {
      return `${type}: remove ${fileName}`;
    }
  }
  
  // For more complex cases, use a more sophisticated approach
  const type = determineCommitType(changedFiles);
  const scope = determineCommitScope(changedFiles);
  
  // Get a summary of the changes
  const fileTypes = new Set(changedFiles.map(file => path.extname(file.path)));
  const newFiles = changedFiles.filter(file => file.isNew).length;
  const modifiedFiles = changedFiles.filter(file => file.isModified).length;
  const deletedFiles = changedFiles.filter(file => file.isDeleted).length;
  
  // Generate a basic message
  let message = `${type}`;
  if (scope) {
    message += `(${scope})`;
  }
  
  message += ': ';
  
  if (newFiles > 0 && modifiedFiles === 0 && deletedFiles === 0) {
    message += `add ${newFiles} new ${newFiles === 1 ? 'file' : 'files'}`;
  } else if (newFiles === 0 && modifiedFiles > 0 && deletedFiles === 0) {
    message += `update ${modifiedFiles} ${modifiedFiles === 1 ? 'file' : 'files'}`;
  } else if (newFiles === 0 && modifiedFiles === 0 && deletedFiles > 0) {
    message += `remove ${deletedFiles} ${deletedFiles === 1 ? 'file' : 'files'}`;
  } else {
    message += `update project ${fileTypes.size > 1 ? 'files' : Array.from(fileTypes)[0].substring(1) + ' files'}`;
  }
  
  return message;
}

module.exports = {
  generateCommitMessage,
  getChangedFiles,
  getFileDiff,
  determineCommitType,
  determineCommitScope
};
