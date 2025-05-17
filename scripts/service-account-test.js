/**
 * Test Vertex AI using explicit service account authentication
 * 
 * This script uses the service account credentials to authenticate with Vertex AI
 * and test text generation capabilities.
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
  location: 'us-central1', // Try a different region
  
  // Model to use
  model: 'gemini-1.5-flash', // Try a different model
};

/**
 * Test text generation with service account authentication
 */
async function testServiceAccountAuth() {
  console.log(chalk.blue('=== Testing Vertex AI with Service Account Authentication ==='));
  console.log(chalk.gray('Service Account:'), CONFIG.serviceAccount);
  console.log(chalk.gray('Project:'), CONFIG.project);
  console.log(chalk.gray('Location:'), CONFIG.location);
  console.log(chalk.gray('Model:'), CONFIG.model);
  
  try {
    // Check if GOOGLE_APPLICATION_CREDENTIALS is set
    const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    console.log(chalk.gray('GOOGLE_APPLICATION_CREDENTIALS:'), credentialsPath || 'Not set');
    
    if (!credentialsPath) {
      console.log(chalk.yellow('Warning: GOOGLE_APPLICATION_CREDENTIALS environment variable is not set.'));
      console.log(chalk.yellow('Using Application Default Credentials instead.'));
    }
    
    // Initialize Google GenAI client with Vertex AI
    console.log(chalk.blue('\nInitializing Google GenAI client with Vertex AI...'));
    
    const ai = new GoogleGenAI({
      vertexai: true,
      project: CONFIG.project,
      location: CONFIG.location,
    });
    
    console.log(chalk.green('Client initialized successfully'));
    
    // Generate text
    const prompt = 'Write a short paragraph about the benefits of energy-efficient windows.';
    console.log(chalk.blue(`\nGenerating text with prompt: "${prompt}"`));
    
    console.time('Request duration');
    const response = await ai.models.generateContent({
      model: CONFIG.model,
      contents: [{
        role: 'user',
        parts: [{ text: prompt }]
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
    
    console.log(chalk.green('\n✅ Text generation successful!'));
    return text;
  } catch (error) {
    console.error(chalk.red('\n=== Error generating text ==='));
    console.error(chalk.red('Error message:'), error.message);
    
    // Provide specific troubleshooting steps based on error
    if (error.message.includes('permission') || error.message.includes('credential') || error.message.includes('authenticate')) {
      console.error(chalk.yellow('\nAuthentication Error. Troubleshooting steps:'));
      console.error('1. Verify the service account has the necessary permissions:');
      console.error('   - roles/aiplatform.user');
      console.error('   - roles/serviceAccountTokenCreator');
      console.error('2. Ensure the Vertex AI API is enabled for your project');
      console.error('3. Check if the service account key file is valid and accessible');
    } else if (error.message.includes('model')) {
      console.error(chalk.yellow('\nModel Error. Troubleshooting steps:'));
      console.error('1. Verify the model name is correct');
      console.error('2. Check if the model is available in your region');
      console.error('3. Try a different model version');
    } else if (error.message.includes('rate') || error.message.includes('quota') || error.message.includes('RESOURCE_EXHAUSTED')) {
      console.error(chalk.yellow('\nRate Limit Error. Troubleshooting steps:'));
      console.error('1. Check your quota limits in Google Cloud Console');
      console.error('2. Request a quota increase if needed');
      console.error('3. Implement rate limiting in your application');
    }
    
    throw error;
  }
}

// Run the test
testServiceAccountAuth()
  .then(() => console.log(chalk.green('\nTest completed successfully')))
  .catch(error => {
    console.error(chalk.red('\nTest failed'));
    process.exit(1);
  });
