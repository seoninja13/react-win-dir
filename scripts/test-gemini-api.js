// Test script for Google AI Studio API using @google/genai SDK
import { GoogleGenAI } from '@google/genai';
import * as fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import chalk from 'chalk';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

// Get API key
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

console.log(chalk.blue('=== Testing Google AI Studio API ==='));
console.log(chalk.gray('API Key present:'), GEMINI_API_KEY ? 'Yes' : 'No');

async function testGeminiAPI() {
  try {
    // Initialize the client with Google AI Studio API key
    console.log(chalk.blue('Initializing Google GenAI client with API key...'));
    const ai = new GoogleGenAI({
      apiKey: GEMINI_API_KEY,
      // Optional: specify API version
      // apiVersion: 'v1'
    });
    
    console.log(chalk.green('Client initialized successfully'));
    
    // Test with a simple text generation request
    console.log(chalk.blue('\nSending text generation request...'));
    const prompt = 'Write a short paragraph about the benefits of energy-efficient windows.';
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-001',
      contents: prompt,
    });
    
    console.log(chalk.green('\nResponse received successfully'));
    
    // Extract and display the generated text
    const result = response.response.text();
    
    console.log(chalk.green('\n=== Generated Text ==='));
    console.log(result);
    console.log(chalk.green('======================'));
    
    return result;
  } catch (error) {
    console.error(chalk.red('\n=== Error ==='));
    console.error(chalk.red('Message:'), error.message);
    
    if (error.message.includes('401')) {
      console.error(chalk.yellow('\nAPI Key Authentication Error'));
      console.error('This error indicates your API key is invalid or has expired.');
      console.error('Please generate a new API key at: https://aistudio.google.com/apikey');
    }
    
    throw error;
  }
}

// Run the test
testGeminiAPI()
  .then(() => console.log(chalk.green('\nTest completed successfully')))
  .catch(error => {
    console.error(chalk.red('\nTest failed'));
    process.exit(1);
  });
