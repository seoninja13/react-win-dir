/**
 * Markdown Linting Fixer Script
 * 
 * This script automatically fixes common markdown linting issues across the project.
 * It addresses the issues identified in the "Common Errors to Avoid" section of the IDE instructions.
 * 
 * Usage:
 *   node scripts/fix-markdown-linting.js [directory]
 * 
 * If no directory is specified, it will default to the entire project.
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const readdirAsync = promisify(fs.readdir);
const statAsync = promisify(fs.stat);

// Common linting issues to fix
const LINTING_FIXES = {
  // MD022: Headings should be surrounded by blank lines
  fixHeadingSpacing: (content) => {
    // Fix headings not having blank lines before them
    content = content.replace(/^([^\n])(#{1,6} )/gm, '$1\n$2');
    
    // Fix headings not having blank lines after them
    content = content.replace(/(#{1,6} .+)(\n[^#\n])/gm, '$1\n$2');
    
    return content;
  },
  
  // MD031: Fenced code blocks should be surrounded by blank lines
  fixCodeBlockSpacing: (content) => {
    // Fix code blocks not having blank lines before them
    content = content.replace(/([^\n])(\n```)/g, '$1\n$2');
    
    // Fix code blocks not having blank lines after them
    content = content.replace(/(```\n)([^\n])/g, '$1\n$2');
    
    return content;
  },
  
  // MD032: Lists should be surrounded by blank lines
  fixListSpacing: (content) => {
    // Fix lists not having blank lines before them
    content = content.replace(/([^\n])(\n[*-] )/g, '$1\n$2');
    
    // Fix lists not having blank lines after them
    content = content.replace(/(\n[*-] .+)(\n[^*\n-\s])/g, '$1\n$2');
    
    return content;
  },
  
  // MD040: Fenced code blocks should have a language specified
  fixCodeBlockLanguage: (content) => {
    // Replace code blocks without language specification
    return content.replace(/```\s*\n/g, '```javascript\n');
  },
  
  // MD034: No bare URLs
  fixBareUrls: (content) => {
    // Replace bare URLs with markdown links
    return content.replace(
      /(\s)(https?:\/\/[^\s<]+)(\s)/g, 
      (match, before, url, after) => `${before}<${url}>${after}`
    );
  },
  
  // MD009: No trailing spaces
  fixTrailingSpaces: (content) => {
    // Remove trailing spaces
    return content.replace(/[ \t]+$/gm, '');
  },
  
  // MD029: Ordered list item prefix
  fixOrderedListPrefix: (content) => {
    // This is a more complex fix that would require parsing the document structure
    // For simplicity, we'll just warn about this issue rather than fixing it automatically
    return content;
  }
};

// Apply all fixes to a file
async function fixMarkdownFile(filePath) {
  try {
    console.log(`Processing ${filePath}...`);
    let content = await readFileAsync(filePath, 'utf8');
    const originalContent = content;
    
    // Apply all fixes
    content = LINTING_FIXES.fixHeadingSpacing(content);
    content = LINTING_FIXES.fixCodeBlockSpacing(content);
    content = LINTING_FIXES.fixListSpacing(content);
    content = LINTING_FIXES.fixCodeBlockLanguage(content);
    content = LINTING_FIXES.fixBareUrls(content);
    content = LINTING_FIXES.fixTrailingSpaces(content);
    
    // Only write the file if changes were made
    if (content !== originalContent) {
      await writeFileAsync(filePath, content, 'utf8');
      console.log(`Fixed linting issues in ${filePath}`);
      return 1;
    }
    
    return 0;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return 0;
  }
}

// Recursively process all markdown files in a directory
async function processDirectory(dirPath) {
  let fixedFiles = 0;
  
  try {
    const entries = await readdirAsync(dirPath);
    
    for (const entry of entries) {
      const entryPath = path.join(dirPath, entry);
      const stats = await statAsync(entryPath);
      
      if (stats.isDirectory()) {
        // Skip node_modules and .git directories
        if (entry !== 'node_modules' && entry !== '.git') {
          fixedFiles += await processDirectory(entryPath);
        }
      } else if (stats.isFile() && /\.md$/i.test(entry)) {
        fixedFiles += await fixMarkdownFile(entryPath);
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${dirPath}:`, error);
  }
  
  return fixedFiles;
}

// Main function
async function main() {
  const startDir = process.argv[2] || '.';
  console.log(`Starting markdown linting fixes in ${startDir}...`);
  
  const startTime = Date.now();
  const fixedFiles = await processDirectory(startDir);
  const endTime = Date.now();
  
  console.log(`\nFixed linting issues in ${fixedFiles} files`);
  console.log(`Time taken: ${(endTime - startTime) / 1000} seconds`);
  
  if (fixedFiles > 0) {
    console.log('\nRun markdownlint-cli2 to verify the fixes:');
    console.log('npx markdownlint-cli2 "**/*.md"');
  }
}

main().catch(console.error);
