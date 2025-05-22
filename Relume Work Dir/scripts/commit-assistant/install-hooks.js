/**
 * Install Git Hooks for Intelligent Commit Assistant
 * 
 * This script installs Git hooks to integrate the commit assistant
 * with the Git workflow.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Paths
const gitRootPath = execSync('git rev-parse --show-toplevel').toString().trim();
const hooksDir = path.join(gitRootPath, '.git', 'hooks');
const preCommitHookPath = path.join(hooksDir, 'pre-commit');
const commitMsgHookPath = path.join(hooksDir, 'commit-msg');

// Hook content
const preCommitHook = `#!/bin/sh
# Intelligent Commit Assistant pre-commit hook

# Run the commit check
node "${path.join(gitRootPath, 'Relume Work Dir', 'scripts', 'commit-assistant', 'index.js')}" check

# Get the number of files changed
FILES_CHANGED=$(git diff --cached --name-only | wc -l)

# If there are no files staged, exit
if [ "$FILES_CHANGED" -eq 0 ]; then
  echo "No files staged for commit. Add files with 'git add'"
  exit 1
fi

# Continue with the commit
exit 0
`;

const commitMsgHook = `#!/bin/sh
# Intelligent Commit Assistant commit-msg hook

# Get the commit message file
COMMIT_MSG_FILE=$1

# Check if the commit message follows the conventional commit format
COMMIT_MSG=$(cat $COMMIT_MSG_FILE)
PATTERN="^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\\(.+\\))?: .+"

if ! echo "$COMMIT_MSG" | grep -qE "$PATTERN"; then
  echo "Error: Commit message does not follow the conventional commit format."
  echo "Format: <type>(<scope>): <subject>"
  echo "Example: feat(windows): add double-hung windows product page"
  echo ""
  echo "Suggested commit message:"
  node "${path.join(gitRootPath, 'Relume Work Dir', 'scripts', 'commit-assistant', 'index.js')}" suggest
  exit 1
fi

exit 0
`;

/**
 * Install a Git hook
 * @param {string} hookPath Path to the hook file
 * @param {string} content Content of the hook
 */
function installHook(hookPath, content) {
  try {
    fs.writeFileSync(hookPath, content, { mode: 0o755 });
    console.log(`Installed hook: ${path.basename(hookPath)}`);
  } catch (error) {
    console.error(`Error installing ${path.basename(hookPath)} hook:`, error.message);
  }
}

/**
 * Check if Git hooks directory exists
 * @returns {boolean} True if hooks directory exists
 */
function checkHooksDir() {
  try {
    return fs.existsSync(hooksDir);
  } catch (error) {
    console.error('Error checking hooks directory:', error.message);
    return false;
  }
}

/**
 * Main function
 */
function main() {
  console.log('Installing Intelligent Commit Assistant Git hooks...');
  
  if (!checkHooksDir()) {
    console.error('Git hooks directory not found. Make sure this is a Git repository.');
    process.exit(1);
  }
  
  installHook(preCommitHookPath, preCommitHook);
  installHook(commitMsgHookPath, commitMsgHook);
  
  console.log('Git hooks installed successfully!');
}

// Run the main function if this script is executed directly
if (require.main === module) {
  main();
}

module.exports = {
  installHook,
  checkHooksDir
};
