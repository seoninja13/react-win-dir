/**
 * Comprehensive Demo for @google/genai SDK
 * 
 * This script demonstrates both text and image generation capabilities
 * using the new Google GenAI SDK. It includes comprehensive error handling,
 * rate limiting, and follows best practices from our documentation.
 * 
 * Features:
 * - Text generation with Google AI Studio API
 * - Image generation with Vertex AI
 * - Comprehensive error handling
 * - Rate limiting for Vertex AI (50 req/min quota)
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
  // Google AI Studio API
  geminiApiKey: process.env.GEMINI_API_KEY,
  
  // Vertex AI
  project: process.env.GOOGLE_CLOUD_PROJECT,
  location: process.env.GOOGLE_CLOUD_LOCATION || 'us-west1',
  
  // Models
  textModel: 'gemini-2.0-flash-001', // Google AI Studio model
  imageModel: 'imagen-3.0-generate-002', // Vertex AI model
  
  // Output directory
  outputDir: path.join(__dirname, '..', 'generated-images'),
  
  // Rate limiting for Vertex AI (50 requests per minute)
  rateLimit: {
    maxRequests: 45, // Stay below the 50/min limit
    timeWindow: 60 * 1000, // 1 minute in milliseconds
    queue: [],
  }
};

/**
 * Initialize Google AI Studio client for text generation
 */
function initializeGeminiClient() {
  if (!CONFIG.geminiApiKey) {
    throw new Error('GEMINI_API_KEY is not set in environment variables');
  }

  console.log(chalk.blue('Initializing Google AI Studio client...'));
  
  try {
    const client = new GoogleGenAI({
      apiKey: CONFIG.geminiApiKey,
    });
    
    console.log(chalk.green('Google AI Studio client initialized successfully'));
    return client;
  } catch (error) {
    console.error(chalk.red('Error initializing Google AI Studio client:'), error);
    throw new Error(`Failed to initialize Google AI Studio client: ${error.message}`);
  }
}

/**
 * Initialize Vertex AI client for image generation
 */
function initializeVertexClient() {
  if (!CONFIG.project) {
    throw new Error('GOOGLE_CLOUD_PROJECT is not set in environment variables');
  }

  console.log(chalk.blue('Initializing Vertex AI client...'));
  
  try {
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
 * Rate limiting implementation for Vertex AI
 */
async function rateLimit() {
  const now = Date.now();
  
  // Remove old requests from the queue
  CONFIG.rateLimit.queue = CONFIG.rateLimit.queue.filter(
    timestamp => now - timestamp < CONFIG.rateLimit.timeWindow
  );
  
  // If we've hit the rate limit, wait until we're under it
  if (CONFIG.rateLimit.queue.length >= CONFIG.rateLimit.maxRequests) {
    const oldestRequest = CONFIG.rateLimit.queue[0];
    const timeToWait = CONFIG.rateLimit.timeWindow - (now - oldestRequest);
    
    if (timeToWait > 0) {
      console.log(chalk.yellow(`Rate limit reached. Waiting ${Math.ceil(timeToWait / 1000)} seconds...`));
      await new Promise(resolve => setTimeout(resolve, timeToWait));
    }
  }
  
  // Add this request to the queue
  CONFIG.rateLimit.queue.push(now);
}

/**
 * Generate text using Google AI Studio API
 */
async function generateText(prompt) {
  console.log(chalk.blue('\n=== Text Generation with Google AI Studio API ==='));
  console.log(chalk.gray(`Prompt: "${prompt}"`));
  
  try {
    // Initialize client
    const ai = initializeGeminiClient();
    
    // Send request
    console.log(chalk.blue('Sending request to Google AI Studio API...'));
    console.time('Text generation time');
    
    const response = await ai.models.generateContent({
      model: CONFIG.textModel,
      contents: prompt,
    });
    
    console.timeEnd('Text generation time');
    console.log(chalk.green('Request successful'));
    
    // Extract and display the generated text
    const result = response.response.text();
    
    console.log(chalk.green('\n=== Generated Text ==='));
    console.log(result);
    console.log(chalk.green('======================'));
    
    return result;
  } catch (error) {
    console.error(chalk.red('\n=== Error generating text ==='));
    
    // Categorize errors
    if (error.message.includes('401')) {
      console.error(chalk.red('API Key Authentication Error:'), error.message);
      console.error(chalk.yellow('Troubleshooting steps:'));
      console.error('1. Generate a new API key at https://aistudio.google.com/apikey');
      console.error('2. Update the GEMINI_API_KEY in your .env.local file');
      console.error('3. Ensure the API key has permissions for the model you\'re using');
    } else if (error.message.includes('model')) {
      console.error(chalk.red('Model Error:'), error.message);
      console.error(chalk.yellow('Troubleshooting steps:'));
      console.error('1. Verify model name is correct');
      console.error('2. Check if model is available in your region');
      console.error('3. Try a different model version');
    } else {
      console.error(chalk.red('Unexpected Error:'), error.message);
      console.error(chalk.gray('Stack trace:'), error.stack);
    }
    
    throw error;
  }
}

/**
 * Generate an image using Vertex AI
 */
async function generateImage(prompt) {
  console.log(chalk.blue('\n=== Image Generation with Vertex AI ==='));
  console.log(chalk.gray(`Prompt: "${prompt}"`));
  
  try {
    // Initialize client
    const ai = initializeVertexClient();
    
    // Ensure output directory exists
    await fs.mkdir(CONFIG.outputDir, { recursive: true });
    
    // Apply rate limiting
    await rateLimit();
    
    // Send request
    console.log(chalk.blue('Sending request to Vertex AI...'));
    console.time('Image generation time');
    
    const response = await ai.models.generateContent({
      model: CONFIG.imageModel,
      contents: [{
        role: 'user',
        parts: [{ text: prompt }]
      }],
    });
    
    console.timeEnd('Image generation time');
    console.log(chalk.green('Request successful'));
    
    // Save the generated image
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `generated-image-${timestamp}.png`;
    const filepath = path.join(CONFIG.outputDir, filename);
    
    // Extract image data from response
    let imageData = null;
    
    if (response.response) {
      const parts = response.response.candidates?.[0]?.content?.parts;
      if (parts && parts.length > 0) {
        for (const part of parts) {
          if (part.inlineData && part.inlineData.data) {
            imageData = part.inlineData.data;
            break;
          }
        }
      }
    }
    
    if (imageData) {
      await fs.writeFile(filepath, imageData, 'base64');
      console.log(chalk.green(`\nImage saved to: ${filepath}`));
      return filepath;
    } else {
      console.log(chalk.yellow('\nNo image data found in response'));
      throw new Error('No image data found in response');
    }
  } catch (error) {
    console.error(chalk.red('\n=== Error generating image ==='));
    
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
  console.log(chalk.blue('=== Google GenAI SDK Demo ==='));
  console.log(chalk.blue('Environment: Node.js ' + process.version));
  console.log(chalk.blue('@google/genai version: 0.14.1'));
  
  // Check environment variables
  console.log(chalk.blue('\nChecking environment variables...'));
  console.log(chalk.gray('GEMINI_API_KEY:'), CONFIG.geminiApiKey ? 'Present' : 'Missing');
  console.log(chalk.gray('GOOGLE_CLOUD_PROJECT:'), CONFIG.project || 'Missing');
  console.log(chalk.gray('GOOGLE_CLOUD_LOCATION:'), CONFIG.location);
  
  try {
    // Test text generation with Google AI Studio API
    console.log(chalk.blue('\nRunning text generation test...'));
    const textPrompt = 'Write a short paragraph about the benefits of energy-efficient windows.';
    
    try {
      await generateText(textPrompt);
      console.log(chalk.green('Text generation test completed successfully'));
    } catch (error) {
      console.error(chalk.red('Text generation test failed'));
      // Continue with image generation even if text generation fails
    }
    
    // Test image generation with Vertex AI
    console.log(chalk.blue('\nRunning image generation test...'));
    const imagePrompt = 'A modern double-hung window with white vinyl frame, installed in a contemporary home';
    
    try {
      await generateImage(imagePrompt);
      console.log(chalk.green('Image generation test completed successfully'));
    } catch (error) {
      console.error(chalk.red('Image generation test failed'));
    }
    
    console.log(chalk.green('\n=== Demo completed ==='));
  } catch (error) {
    console.error(chalk.red('\n=== Demo failed ==='));
    process.exit(1);
  }
}

// Run the demo
main();
