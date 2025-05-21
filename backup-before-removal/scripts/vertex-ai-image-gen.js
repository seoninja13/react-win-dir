/**
 * Vertex AI Image Generation with @google/genai SDK
 * 
 * This script demonstrates production-grade image generation using
 * Google Cloud's Vertex AI with the new @google/genai SDK.
 * 
 * Features:
 * - Vertex AI authentication
 * - Rate limiting for quota management (50 req/min)
 * - Comprehensive error handling
 * - Detailed logging and debugging
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
  // Vertex AI settings
  project: process.env.GOOGLE_CLOUD_PROJECT,
  location: process.env.GOOGLE_CLOUD_LOCATION || 'us-west1',
  
  // Model settings
  model: 'imagen-3.0-fast-generate-001', // Using the fast generate model which might have a separate quota
  
  // Output directory
  outputDir: path.join(__dirname, '..', 'generated-images'),
  
  // Rate limiting for Vertex AI (50 requests per minute)
  rateLimit: {
    maxRequests: 10, // Much more conservative due to quota limits
    timeWindow: 60 * 1000, // 1 minute in milliseconds
    queue: [],
    // Add initial delay to ensure we're not hitting quota limits
    initialDelay: 10 * 1000, // 10 seconds
  }
};

/**
 * Rate limiting implementation for Vertex AI
 * 
 * Implements a conservative approach to stay well under the 50 req/min quota
 * Includes an initial delay to ensure we're not hitting quota limits
 */
async function rateLimit() {
  // Apply initial delay on first request
  if (CONFIG.rateLimit.queue.length === 0 && CONFIG.rateLimit.initialDelay > 0) {
    console.log(chalk.yellow(`Applying initial delay of ${CONFIG.rateLimit.initialDelay / 1000} seconds to avoid quota issues...`));
    await new Promise(resolve => setTimeout(resolve, CONFIG.rateLimit.initialDelay));
  }
  
  const now = Date.now();
  
  // Remove old requests from the queue
  CONFIG.rateLimit.queue = CONFIG.rateLimit.queue.filter(
    timestamp => now - timestamp < CONFIG.rateLimit.timeWindow
  );
  
  // Calculate current requests per minute
  const currentRequestsPerMinute = CONFIG.rateLimit.queue.length;
  console.log(chalk.gray(`Current request rate: ${currentRequestsPerMinute} requests/minute (max: ${CONFIG.rateLimit.maxRequests})`));
  
  // If we've hit the rate limit, wait until we're under it
  if (currentRequestsPerMinute >= CONFIG.rateLimit.maxRequests) {
    const oldestRequest = CONFIG.rateLimit.queue[0];
    const timeToWait = CONFIG.rateLimit.timeWindow - (now - oldestRequest);
    
    if (timeToWait > 0) {
      console.log(chalk.yellow(`Rate limit reached. Waiting ${Math.ceil(timeToWait / 1000)} seconds...`));
      await new Promise(resolve => setTimeout(resolve, timeToWait));
    }
  } else {
    // Even if we haven't hit the limit, add a small delay between requests
    const delayBetweenRequests = 2000; // 2 seconds between requests
    console.log(chalk.gray(`Adding ${delayBetweenRequests/1000} second delay between requests...`));
    await new Promise(resolve => setTimeout(resolve, delayBetweenRequests));
  }
  
  // Add this request to the queue
  CONFIG.rateLimit.queue.push(now);
}

/**
 * Initialize Vertex AI client
 */
function initializeVertexClient() {
  // Validate required environment variables
  if (!CONFIG.project) {
    throw new Error('GOOGLE_CLOUD_PROJECT environment variable is not set');
  }
  
  console.log(chalk.blue('Initializing Vertex AI client...'));
  console.log(chalk.gray('Project:'), CONFIG.project);
  console.log(chalk.gray('Location:'), CONFIG.location);
  console.log(chalk.gray('Model:'), CONFIG.model);
  
  try {
    // Initialize with Vertex AI configuration
    const client = new GoogleGenAI({
      vertexai: true,
      project: CONFIG.project,
      location: CONFIG.location,
    });
    
    console.log(chalk.green('Vertex AI client initialized successfully'));
    return client;
  } catch (error) {
    console.error(chalk.red('Error initializing Vertex AI client:'), error);
    throw new Error(`Failed to initialize Vertex AI client: ${error.message}`);
  }
}

/**
 * Generate an image using Vertex AI
 */
async function generateImage(prompt) {
  console.log(chalk.blue('\n=== Image Generation with Vertex AI ==='));
  console.log(chalk.gray(`Prompt: "${prompt}"`));
  
  try {
    // Step 1: Initialize client
    const ai = initializeVertexClient();
    
    // Step 2: Ensure output directory exists
    console.log(chalk.blue('Ensuring output directory exists...'));
    await fs.mkdir(CONFIG.outputDir, { recursive: true });
    console.log(chalk.green(`Output directory ready: ${CONFIG.outputDir}`));
    
    // Step 3: Apply rate limiting
    console.log(chalk.blue('Applying rate limiting...'));
    await rateLimit();
    
    // Step 4: Send request
    console.log(chalk.blue('Sending request to Vertex AI...'));
    console.time('Image generation time');
    
    const response = await ai.models.generateContent({
      model: CONFIG.model,
      contents: [{
        role: 'user',
        parts: [{ text: prompt }]
      }],
    });
    
    console.timeEnd('Image generation time');
    console.log(chalk.green('Request successful'));
    
    // Step 5: Process response
    console.log(chalk.blue('Processing response...'));
    console.log(chalk.gray('Response type:'), typeof response);
    console.log(chalk.gray('Response keys:'), Object.keys(response));
    
    // Save the generated image
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `generated-image-${timestamp}.png`;
    const filepath = path.join(CONFIG.outputDir, filename);
    
    // Extract image data from response
    let imageData = null;
    
    if (response.response) {
      console.log(chalk.gray('Found response.response property'));
      const parts = response.response.candidates?.[0]?.content?.parts;
      if (parts && parts.length > 0) {
        for (const part of parts) {
          if (part.inlineData && part.inlineData.data) {
            console.log(chalk.gray('Found inline image data'));
            imageData = part.inlineData.data;
            break;
          }
        }
      }
    } else if (response.candidates && response.candidates.length > 0) {
      console.log(chalk.gray('Found candidates array'));
      const parts = response.candidates[0].content?.parts;
      if (parts && parts.length > 0) {
        for (const part of parts) {
          if (part.inlineData && part.inlineData.data) {
            console.log(chalk.gray('Found inline image data'));
            imageData = part.inlineData.data;
            break;
          }
        }
      }
    }
    
    if (imageData) {
      console.log(chalk.blue('Saving image to file...'));
      await fs.writeFile(filepath, imageData, 'base64');
      console.log(chalk.green(`Image saved to: ${filepath}`));
      return filepath;
    } else {
      console.log(chalk.yellow('No image data found in response. Full response:'));
      console.log(JSON.stringify(response, null, 2));
      throw new Error('No image data found in response');
    }
  } catch (error) {
    console.error(chalk.red('\n=== Error generating image ==='));
    
    // Categorize errors based on message
    if (error.message.includes('permission') || error.message.includes('credential') || error.message.includes('authenticate')) {
      console.error(chalk.red('Authentication Error:'), error.message);
      console.error(chalk.yellow('Troubleshooting steps:'));
      console.error('1. Verify your Google Cloud project has Vertex AI API enabled');
      console.error('2. Ensure you have proper authentication set up:');
      console.error('   - Run `gcloud auth application-default login` for local development');
      console.error('   - Or set up a service account with Vertex AI permissions');
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
      console.error('1. Implement rate limiting (50 requests per minute limit)');
      console.error('2. Consider batching requests');
      console.error('3. Monitor usage in Google Cloud Console');
    } else {
      console.error(chalk.red('Unexpected Error:'), error.message);
      console.error(chalk.gray('Stack trace:'), error.stack);
    }
    
    throw error;
  }
}

/**
 * Main function
 */
async function main() {
  console.log(chalk.blue('=== Vertex AI Image Generation Demo ==='));
  console.log(chalk.blue('Environment: Node.js ' + process.version));
  console.log(chalk.blue('@google/genai version: 0.14.1'));
  
  // Check environment variables
  console.log(chalk.blue('\nChecking environment variables...'));
  console.log(chalk.gray('GOOGLE_CLOUD_PROJECT:'), CONFIG.project || 'Missing');
  console.log(chalk.gray('GOOGLE_CLOUD_LOCATION:'), CONFIG.location);
  
  if (!CONFIG.project) {
    console.error(chalk.red('ERROR: GOOGLE_CLOUD_PROJECT is not set in .env.local'));
    process.exit(1);
  }
  
  try {
    // Generate an image
    const prompt = 'A modern double-hung window with white vinyl frame, installed in a contemporary home';
    await generateImage(prompt);
    
    console.log(chalk.green('\n=== Image generation completed successfully ==='));
  } catch (error) {
    console.error(chalk.red('\n=== Image generation failed ==='));
    process.exit(1);
  }
}

// Run the demo
main();
