// API Key Verification Script
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import chalk from 'chalk';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

console.log(chalk.blue('=== API Key Verification ==='));

// Check if API key exists
if (!GEMINI_API_KEY) {
  console.error(chalk.red('ERROR: GEMINI_API_KEY is not set in .env.local'));
  process.exit(1);
}

// Check API key format (Gemini API keys typically start with "AI")
if (!GEMINI_API_KEY.startsWith('AI')) {
  console.warn(chalk.yellow('WARNING: API key format may be incorrect.'));
  console.warn(chalk.yellow('Gemini API keys typically start with "AI"'));
}

// Check for whitespace
if (GEMINI_API_KEY.trim() !== GEMINI_API_KEY) {
  console.error(chalk.red('ERROR: API key contains leading or trailing whitespace'));
  console.log(chalk.blue('Actual length:'), GEMINI_API_KEY.length);
  console.log(chalk.blue('Trimmed length:'), GEMINI_API_KEY.trim().length);
  process.exit(1);
}

// Display API key info (safely)
console.log(chalk.green('API key exists and has been loaded'));
console.log(chalk.blue('API key length:'), GEMINI_API_KEY.length);
console.log(chalk.blue('First 4 characters:'), GEMINI_API_KEY.substring(0, 4));
console.log(chalk.blue('Last 4 characters:'), GEMINI_API_KEY.substring(GEMINI_API_KEY.length - 4));

console.log(chalk.green('\nAPI key format verification completed'));
console.log(chalk.yellow('Note: This script only verifies the format, not the actual validity with Google servers'));
console.log(chalk.yellow('If you continue to experience 401 Unauthorized errors, please:'));
console.log('1. Check if the API key is active in Google AI Studio');
console.log('2. Ensure the API key has permissions for the models you\'re trying to use');
console.log('3. Generate a new API key if necessary at https://aistudio.google.com/apikey');
