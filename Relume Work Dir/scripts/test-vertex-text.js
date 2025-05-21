/**
 * Test script for Vertex AI text generation using @google/genai SDK
 * 
 * This script tests the connection to Vertex AI using the new @google/genai SDK
 * for text generation with the Gemini model. It includes comprehensive error
 * handling and diagnostics to verify connectivity and check for any limits.
 */

// Import the Google GenAI SDK
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

// Environment variables
const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT || 'mold-removal-lead-gen';

// Try multiple regions to find one that works
const REGIONS = [
  process.env.GOOGLE_CLOUD_LOCATION || 'us-west1',
  'us-central1',
  'us-east1',
  'europe-west4'
];

// Models to try
const MODELS = [
  'gemini-1.5-pro',
  'gemini-1.5-flash',
  'gemini-pro'
];

/**
 * Generate text using Vertex AI Gemini model with the new @google/genai SDK
 * 
 * @param {string} prompt - The text prompt to generate a response for
 * @param {string} region - The region to use for Vertex AI
 * @param {string} model - The model to use for text generation
 * @returns {Promise<{success: boolean, text?: string, error?: string}>} - Result object
 */
async function generateText(prompt, region, model) {
  console.log(chalk.blue(`\n=== Testing Vertex AI Text Generation ===`));
  console.log(chalk.gray(`Prompt: "${prompt}"`));
  console.log(chalk.gray(`Project: ${PROJECT_ID}`));
  console.log(chalk.gray(`Region: ${region}`));
  console.log(chalk.gray(`Model: ${model}`));
  
  try {
    // Initialize Google GenAI client with Vertex AI configuration
    console.log(chalk.blue('\nInitializing Google GenAI client with Vertex AI...'));
    
    const ai = new GoogleGenAI({
      vertexai: true,
      project: PROJECT_ID,
      location: region,
    });
    
    console.log(chalk.green('Client initialized successfully'));
    
    // Generate content
    console.log(chalk.blue('\nSending request to Vertex AI...'));
    console.time('Request duration');
    
    const response = await ai.models.generateContent({
      model: model,
      contents: [{
        role: 'user',
        parts: [{ text: prompt }]
      }],
    });
    
    console.timeEnd('Request duration');
    console.log(chalk.green('Response received successfully'));
    
    // Extract the generated text
    let text = '';
    
    if (response.response) {
      console.log(chalk.gray('Found response.response property'));
      text = response.response.text();
    } else if (response.candidates && response.candidates.length > 0) {
      console.log(chalk.gray('Found candidates array'));
      text = response.candidates[0].content.parts[0].text;
    } else if (response.text) {
      console.log(chalk.gray('Found direct text property'));
      text = response.text;
    } else {
      console.log(chalk.yellow('Could not find text in response, dumping full response:'));
      console.log(JSON.stringify(response, null, 2));
      return { success: false, error: 'No text content found in response' };
    }
    
    console.log(chalk.green('\n=== Generated Text ==='));
    console.log(text.substring(0, 500) + (text.length > 500 ? '...' : ''));
    console.log(chalk.green('======================'));
    
    return { success: true, text };
  } catch (error) {
    console.error(chalk.red('\n=== Error generating text ==='));
    
    // Categorize errors
    if (error.message.includes('permission') || error.message.includes('credential') || error.message.includes('authenticate')) {
      console.error(chalk.red('Authentication Error:'), error.message);
      console.error(chalk.yellow('Troubleshooting steps:'));
      console.error('1. Verify your Google Cloud project has Vertex AI API enabled');
      console.error('2. Ensure you have proper authentication set up');
      console.error('3. Check if your service account has the required permissions');
    } else if (error.message.includes('model')) {
      console.error(chalk.red('Model Error:'), error.message);
      console.error(chalk.yellow('Troubleshooting steps:'));
      console.error('1. Verify model name is correct');
      console.error('2. Check if model is available in your region');
      console.error('3. Try a different model version');
    } else if (error.message.includes('rate') || error.message.includes('quota') || error.message.includes('RESOURCE_EXHAUSTED')) {
      console.error(chalk.red('Rate Limit Error:'), error.message);
      console.error(chalk.yellow('Troubleshooting steps:'));
      console.error('1. Implement rate limiting');
      console.error('2. Consider batching requests');
      console.error('3. Monitor usage in Google Cloud Console');
    } else {
      console.error(chalk.red('Unexpected Error:'), error.message);
      console.error(chalk.gray('Stack trace:'), error.stack);
    }
    
    return { success: false, error: error.message };
  }
}

/**
 * Test text generation with a simple prompt
 * Tries multiple regions and models to find one that works
 */
async function testTextGeneration() {
  const prompt = 'Write a short paragraph about the benefits of energy-efficient windows.';
  
  console.log(chalk.blue('=== Testing Vertex AI Text Generation ==='));
  console.log(chalk.blue('Environment: Node.js ' + process.version));
  console.log(chalk.blue('@google/genai version: 0.14.1'));
  console.log(chalk.gray(`Prompt: "${prompt}"`));
  
  // Check environment variables
  console.log(chalk.blue('\nChecking environment variables...'));
  console.log(chalk.gray('GOOGLE_CLOUD_PROJECT:'), PROJECT_ID || 'Missing');
  
  if (!PROJECT_ID) {
    console.error(chalk.red('ERROR: GOOGLE_CLOUD_PROJECT is not set in .env.local'));
    process.exit(1);
  }
  
  // Try each region and model combination until one works
  for (const region of REGIONS) {
    console.log(chalk.blue(`\n=== Trying region: ${region} ===`));
    
    for (const model of MODELS) {
      console.log(chalk.blue(`\n=== Trying model: ${model} ===`));
      
      const result = await generateText(prompt, region, model);
      
      if (result.success) {
        console.log(chalk.green(`\n✅ Text generation successful with region ${region} and model ${model}!`));
        return result.text;
      } else {
        console.log(chalk.yellow(`\n⚠️ Failed with region ${region} and model ${model}. Trying next combination...`));
        // Wait a bit before trying the next combination to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
  }
  
  console.error(chalk.red('\n❌ All region and model combinations failed!'));
  console.error(chalk.red('Please check your Google Cloud project configuration and quota limits.'));
  return null;
}

// Run the test
testTextGeneration().catch(console.error);
