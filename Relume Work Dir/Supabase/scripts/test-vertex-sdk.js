/**
 * Test Vertex AI SDK
 * 
 * This script tests the Google Cloud SDK for Vertex AI image generation.
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Get current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

// Set up the API key
const API_KEY = process.env.GEMINI_API_KEY;

// Constants
const OUTPUT_DIR = path.resolve(__dirname, '../../Docs/Image generation/test-output');
const OUTPUT_FILE = path.resolve(OUTPUT_DIR, 'test-image.png');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Simple logging function
function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${type === 'error' ? '❌ ERROR' : 'ℹ️ INFO'}: ${message}`;
  console.log(logMessage);
}

/**
 * Main test function
 */
async function testGoogleGenerativeAI() {
  log('Starting Google Generative AI SDK test...');
  log(`Using API Key: ${API_KEY ? API_KEY.substring(0, 10) + '...' : 'Not set'}`);
  
  try {
    // Initialize the API
    log('Initializing Google Generative AI SDK...');
    const genAI = new GoogleGenerativeAI(API_KEY);
    
    // Create a simple test prompt
    const testPrompt = 'A beautiful double-hung window with white frame against a blue sky';
    log(`Test prompt: "${testPrompt}"`);
    
    // Get the model
    log('Getting generative model...');
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    
    // Generate content
    log('Generating content...');
    const result = await model.generateContent(testPrompt);
    const response = await result.response;
    const text = response.text();
    
    log('Received response from Google Generative AI');
    log(`Response: ${text.substring(0, 100)}...`);
    
    // Save the response to a file
    const outputTextFile = path.resolve(OUTPUT_DIR, 'test-response.txt');
    fs.writeFileSync(outputTextFile, text);
    
    log(`Successfully generated and saved response to: ${outputTextFile}`);
    
    return true;
  } catch (error) {
    log(`Error testing Google Generative AI: ${error.message}`, 'error');
    console.error('Full error:', error);
    return false;
  }
}

// Run the test
testGoogleGenerativeAI()
  .then(success => {
    if (success) {
      log('Test completed successfully!');
      process.exit(0);
    } else {
      log('Test failed.', 'error');
      process.exit(1);
    }
  })
  .catch(error => {
    log(`Unhandled error: ${error.message}`, 'error');
    process.exit(1);
  });
