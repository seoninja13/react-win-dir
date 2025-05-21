/**
 * Vertex AI Service Account Authentication Test
 * 
 * This script tests Vertex AI connectivity using explicit service account authentication
 * with the @google/genai SDK. It includes comprehensive error handling and diagnostics
 * to verify connectivity and check for any limits.
 * 
 * Service Account: 994200435445-compute@developer.gserviceaccount.com
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
  // Service account details
  serviceAccount: '994200435445-compute@developer.gserviceaccount.com',
  
  // Project details
  project: process.env.GOOGLE_CLOUD_PROJECT || 'mold-removal-lead-gen',
  
  // Try multiple regions to find one that works
  regions: [
    'us-central1',  // Try this first as it often has the best availability
    process.env.GOOGLE_CLOUD_LOCATION || 'us-west1',
    'us-east1',
    'europe-west4'
  ],
  
  // Models to try
  models: [
    'gemini-1.5-flash',  // Try this first as it often has better quota
    'gemini-1.5-pro',
    'gemini-pro'
  ],
  
  // Test prompt
  prompt: 'Write a short paragraph about the benefits of energy-efficient windows for modern homes.'
};

/**
 * Test Vertex AI connectivity with service account authentication
 */
async function testVertexAIWithServiceAccount() {
  console.log(chalk.blue('=== Vertex AI Service Account Authentication Test ==='));
  console.log(chalk.blue('Environment: Node.js ' + process.version));
  console.log(chalk.blue('@google/genai version: 0.14.1'));
  
  // Check environment variables and configuration
  console.log(chalk.blue('\nChecking configuration...'));
  console.log(chalk.gray('Service Account:'), CONFIG.serviceAccount);
  console.log(chalk.gray('Project ID:'), CONFIG.project);
  console.log(chalk.gray('GOOGLE_APPLICATION_CREDENTIALS:'), 
    process.env.GOOGLE_APPLICATION_CREDENTIALS || 'Not set');
  
  if (!CONFIG.project) {
    console.error(chalk.red('ERROR: GOOGLE_CLOUD_PROJECT is not set in .env.local'));
    process.exit(1);
  }
  
  // Try each region and model combination until one works
  for (const region of CONFIG.regions) {
    console.log(chalk.blue(`\n=== Testing region: ${region} ===`));
    
    for (const model of CONFIG.models) {
      console.log(chalk.blue(`\n=== Testing model: ${model} ===`));
      
      try {
        // Initialize Google GenAI client with Vertex AI
        console.log(chalk.blue('Initializing Google GenAI client...'));
        
        const ai = new GoogleGenAI({
          vertexai: true,
          project: CONFIG.project,
          location: region,
        });
        
        console.log(chalk.green('Client initialized successfully'));
        
        // Generate text
        console.log(chalk.blue(`\nGenerating text with prompt: "${CONFIG.prompt}"`));
        console.time('Request duration');
        
        const response = await ai.models.generateContent({
          model: model,
          contents: [{
            role: 'user',
            parts: [{ text: CONFIG.prompt }]
          }],
        });
        
        console.timeEnd('Request duration');
        console.log(chalk.green('Response received successfully'));
        
        // Extract text from response
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
          throw new Error('No text content found in response');
        }
        
        console.log(chalk.green('\n=== Generated Text ==='));
        console.log(text);
        console.log(chalk.green('======================'));
        
        console.log(chalk.green(`\n✅ SUCCESS with region ${region} and model ${model}!`));
        
        // Return successful configuration for future reference
        return {
          success: true,
          region,
          model,
          text
        };
        
      } catch (error) {
        console.error(chalk.red('\n=== Error with this configuration ==='));
        console.error(chalk.red(`Region: ${region}, Model: ${model}`));
        console.error(chalk.red('Error message:'), error.message);
        
        // Categorize errors
        if (error.message.includes('permission') || error.message.includes('credential') || 
            error.message.includes('authenticate')) {
          console.error(chalk.yellow('Authentication Error. Troubleshooting steps:'));
          console.error('1. Verify the service account has the necessary permissions');
          console.error('2. Ensure the Vertex AI API is enabled for your project');
        } else if (error.message.includes('model') || error.message.includes('NOT_FOUND')) {
          console.error(chalk.yellow('Model Error. Troubleshooting steps:'));
          console.error('1. Verify the model name is correct');
          console.error('2. Check if the model is available in your region');
        } else if (error.message.includes('rate') || error.message.includes('quota') || 
                  error.message.includes('RESOURCE_EXHAUSTED')) {
          console.error(chalk.yellow('Rate Limit Error. Troubleshooting steps:'));
          console.error('1. Check your quota limits in Google Cloud Console');
          console.error('2. Request a quota increase if needed');
        }
        
        console.log(chalk.yellow('\nTrying next configuration...'));
        
        // Add a delay before trying the next configuration to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
  }
  
  // If we get here, all configurations failed
  console.error(chalk.red('\n❌ All region and model combinations failed!'));
  console.error(chalk.red('Please check your Google Cloud project configuration and quota limits.'));
  
  return {
    success: false,
    error: 'All configurations failed'
  };
}

// Run the test and print results
testVertexAIWithServiceAccount()
  .then(result => {
    if (result.success) {
      console.log(chalk.green('\n=== Test Summary ==='));
      console.log(chalk.green('Successfully connected to Vertex AI!'));
      console.log(chalk.gray('Working configuration:'));
      console.log(chalk.gray('- Region:'), result.region);
      console.log(chalk.gray('- Model:'), result.model);
      console.log(chalk.green('\nYou can use this configuration for your image generation tasks.'));
    } else {
      console.error(chalk.red('\n=== Test Summary ==='));
      console.error(chalk.red('Failed to connect to Vertex AI with any configuration.'));
      console.error(chalk.red('Error:'), result.error);
    }
  })
  .catch(error => {
    console.error(chalk.red('\n=== Unexpected Error ==='));
    console.error(error);
    process.exit(1);
  });
