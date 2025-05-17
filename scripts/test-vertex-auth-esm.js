/**
 * Simple Vertex AI Authentication Test (ES Module version)
 * Tests Vertex AI access using the Google GenAI SDK
 */

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

// Configuration
const CONFIG = {
  project: process.env.GOOGLE_CLOUD_PROJECT,
  location: process.env.GOOGLE_CLOUD_LOCATION || 'us-west1',
  model: 'gemini-1.5-pro', // Using a model available in Vertex AI
};

async function testVertexAuth() {
  console.log(chalk.blue('=== Testing Vertex AI Authentication ==='));
  
  // Verify environment variables
  console.log(chalk.gray('Environment variables:'));
  console.log(chalk.gray('GOOGLE_CLOUD_PROJECT:'), CONFIG.project || 'Missing');
  console.log(chalk.gray('GOOGLE_CLOUD_LOCATION:'), CONFIG.location);
  
  if (!CONFIG.project) {
    console.error(chalk.red('ERROR: GOOGLE_CLOUD_PROJECT is not set in .env.local'));
    process.exit(1);
  }
  
  try {
    console.log(chalk.blue('\nInitializing GoogleGenAI client with Vertex AI...'));
    
    // Initialize with Vertex AI configuration
    const ai = new GoogleGenAI({
      vertexai: true,
      project: CONFIG.project,
      location: CONFIG.location,
    });
    
    console.log(chalk.green('Client initialized successfully'));
    
    // Test with a simple text generation request
    console.log(chalk.blue('\nSending test request to Vertex AI...'));
    const prompt = 'Write a short description of energy-efficient windows.';
    
    const response = await ai.models.generateContent({
      model: CONFIG.model,
      contents: [{
        role: 'user',
        parts: [{ text: prompt }]
      }],
    });
    
    console.log(chalk.green('\nResponse received successfully'));
    console.log(chalk.gray('Response type:'), typeof response);
    console.log(chalk.gray('Response keys:'), Object.keys(response));
    
    // Try to extract the text using different methods
    let generatedText;
    
    if (response.response) {
      console.log(chalk.gray('Found response.response property'));
      generatedText = response.response.text();
    } else if (response.candidates && response.candidates.length > 0) {
      console.log(chalk.gray('Found candidates array'));
      generatedText = response.candidates[0].content.parts[0].text;
    } else if (response.text) {
      console.log(chalk.gray('Found direct text property'));
      generatedText = response.text;
    } else {
      console.log(chalk.yellow('Could not find text in response, dumping full response:'));
      console.log(JSON.stringify(response, null, 2));
      generatedText = 'No text content found in response';
    }
    
    console.log(chalk.green('\n=== Generated Text ==='));
    console.log(generatedText);
    console.log(chalk.green('======================'));
    
    console.log(chalk.green('\n✅ Vertex AI authentication and test successful'));
    
  } catch (error) {
    console.error(chalk.red('\n❌ Vertex AI test failed'));
    
    // Categorize errors
    if (error.message.includes('permission') || error.message.includes('credential')) {
      console.error(chalk.red('Authentication Error:'), error.message);
      console.error(chalk.yellow('Troubleshooting steps:'));
      console.error('1. Verify your Google Cloud project has Vertex AI API enabled');
      console.error('2. Ensure your credentials have access to Vertex AI');
      console.error('3. Check if you need to set up application default credentials');
    } else if (error.message.includes('model')) {
      console.error(chalk.red('Model Error:'), error.message);
      console.error(chalk.yellow('Troubleshooting steps:'));
      console.error('1. Verify model name is correct');
      console.error('2. Check if model is available in your region');
      console.error('3. Try a different model version');
    } else if (error.message.includes('rate') || error.message.includes('quota')) {
      console.error(chalk.red('Rate Limit Error:'), error.message);
      console.error(chalk.yellow('Troubleshooting steps:'));
      console.error('1. Implement rate limiting (50 requests per minute limit)');
      console.error('2. Consider batching requests');
      console.error('3. Monitor usage in Google Cloud Console');
    } else {
      console.error(chalk.red('Unexpected Error:'), error.message);
      console.error(chalk.gray('Stack trace:'), error.stack);
    }
    
    process.exit(1);
  }
}

// Run the test
testVertexAuth();
