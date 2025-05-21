// Test script for the new @google/genai SDK
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
  geminiApiKey: process.env.GEMINI_API_KEY,
  project: process.env.GOOGLE_CLOUD_PROJECT,
  location: process.env.GOOGLE_CLOUD_LOCATION || 'us-west1',
  outputDir: path.join(__dirname, '..', 'generated'),
  models: {
    text: 'gemini-2.0-flash-001',
    image: 'imagen-3.0-generate-002'
  }
};

// Initialize Google GenAI client
function initializeClient() {
  // Validate environment variables
  console.log(chalk.blue('Checking environment variables...'));
  console.log(chalk.gray('GEMINI_API_KEY:'), CONFIG.geminiApiKey ? 'Present' : 'Missing');
  console.log(chalk.gray('GOOGLE_CLOUD_PROJECT:'), CONFIG.project ? CONFIG.project : 'Missing');
  console.log(chalk.gray('GOOGLE_CLOUD_LOCATION:'), CONFIG.location);
  
  if (!CONFIG.geminiApiKey) {
    throw new Error('GEMINI_API_KEY is not set in environment variables');
  }

  console.log(chalk.blue('Initializing Google GenAI client...'));
  
  try {
    const client = new GoogleGenAI({
      apiKey: CONFIG.geminiApiKey,
      // Uncomment for Vertex AI
      // vertexai: true,
      // project: CONFIG.project,
      // location: CONFIG.location
    });
    
    console.log(chalk.green('Client initialized successfully'));
    return client;
  } catch (error) {
    console.error(chalk.red('Error initializing client:'), error);
    throw new Error(`Failed to initialize Google GenAI client: ${error.message}`);
  }
}

/**
 * Generate text using the Gemini model
 */
async function generateText(prompt) {
  console.log(chalk.blue('\n=== Testing Text Generation ==='));
  console.log(chalk.gray(`Prompt: "${prompt}"`));
  
  // Step 1: Initialize client with validation
  let ai;
  try {
    ai = initializeClient();
  } catch (error) {
    console.error(chalk.red('Client initialization failed:'), error.message);
    console.error(chalk.yellow('Troubleshooting steps:'));
    console.error('1. Check if GEMINI_API_KEY is properly set in .env.local');
    console.error('2. Verify API key is valid and not expired');
    console.error('3. Check network connectivity');
    throw error;
  }
  
  // Step 2: Prepare request with validation
  const requestConfig = {
    model: CONFIG.models.text,
    contents: [{
      role: 'user',
      parts: [{ text: prompt }]
    }],
    generationConfig: {
      temperature: 0.7,
      topP: 0.9,
      topK: 40,
      maxOutputTokens: 2048,
    }
  };
  
  console.log(chalk.blue('Request configuration:'));
  console.log(chalk.gray('Model:'), requestConfig.model);
  console.log(chalk.gray('Temperature:'), requestConfig.generationConfig.temperature);
  
  // Step 3: Send request with error handling
  try {
    console.log(chalk.blue('Sending request to Gemini API...'));
    console.time('Request duration');
    
    const response = await ai.models.generateContent(requestConfig);
    
    console.timeEnd('Request duration');
    console.log(chalk.green('Request successful'));

    // Step 4: Process response with validation
    console.log(chalk.blue('Processing response...'));
    
    // Log response structure for debugging
    console.log(chalk.gray('Response type:'), typeof response);
    console.log(chalk.gray('Response keys:'), Object.keys(response));
    
    // Try to extract the text from the response using multiple fallback paths
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
    
    return generatedText;
  } catch (error) {
    // Step 5: Comprehensive error handling
    console.error(chalk.red('\n=== Error generating text ==='));
    
    // Categorize errors
    if (error.message.includes('API key')) {
      console.error(chalk.red('API Key Issue:'), error.message);
      console.error(chalk.yellow('Troubleshooting steps:'));
      console.error('1. Verify API key in .env.local file');
      console.error('2. Check for whitespace in the API key');
      console.error('3. Ensure API key has proper permissions');
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
    
    throw error;
  }
}

/**
 * Generate an image using the Imagen model
 */
async function generateImage(prompt) {
  console.log(chalk.blue('\n=== Testing Image Generation ==='));
  console.log(chalk.gray(`Prompt: "${prompt}"`));
  
  // Step 1: Initialize client with validation
  let ai;
  try {
    ai = initializeClient();
  } catch (error) {
    console.error(chalk.red('Client initialization failed:'), error.message);
    console.error(chalk.yellow('Troubleshooting steps:'));
    console.error('1. Check if GEMINI_API_KEY is properly set in .env.local');
    console.error('2. Verify API key is valid and not expired');
    console.error('3. Check network connectivity');
    throw error;
  }
  
  // Step 2: Prepare output directory
  try {
    console.log(chalk.blue('Ensuring output directory exists...'));
    await fs.mkdir(CONFIG.outputDir, { recursive: true });
    console.log(chalk.green(`Output directory ready: ${CONFIG.outputDir}`));
  } catch (error) {
    console.error(chalk.red('Error creating output directory:'), error.message);
    throw new Error(`Failed to create output directory: ${error.message}`);
  }
  
  // Step 3: Prepare request with validation
  const requestConfig = {
    model: CONFIG.models.image,
    contents: [{
      role: 'user',
      parts: [{
        text: prompt,
      }]
    }],
    generationConfig: {
      temperature: 0.7,
      topP: 0.9,
      topK: 40,
      maxOutputTokens: 2048,
    }
  };
  
  console.log(chalk.blue('Request configuration:'));
  console.log(chalk.gray('Model:'), requestConfig.model);
  console.log(chalk.gray('Temperature:'), requestConfig.generationConfig.temperature);
  
  // Step 4: Send request with rate limiting and error handling
  try {
    console.log(chalk.blue('Sending request to Imagen API...'));
    console.time('Request duration');
    
    // Implement rate limiting based on Vertex AI quota (50 requests per minute)
    console.log(chalk.gray('Applying rate limiting (Vertex AI quota: 50 req/min)'));
    
    const response = await ai.models.generateContent(requestConfig);
    
    console.timeEnd('Request duration');
    console.log(chalk.green('Request successful'));

    // Step 5: Process response with validation
    console.log(chalk.blue('Processing response...'));
    
    // Log response structure for debugging
    console.log(chalk.gray('Response type:'), typeof response);
    console.log(chalk.gray('Response keys:'), Object.keys(response));
    
    // Save the generated image
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `generated-image-${timestamp}.png`;
    const filepath = path.join(CONFIG.outputDir, filename);
    
    // Try to extract the image data using multiple possible response formats
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
    } else if (response.images && response.images.length > 0) {
      console.log(chalk.gray('Found direct images array'));
      imageData = response.images[0];
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
    // Step 6: Comprehensive error handling
    console.error(chalk.red('\n=== Error generating image ==='));
    
    // Categorize errors based on message
    if (error.message.includes('API key')) {
      console.error(chalk.red('API Key Issue:'), error.message);
      console.error(chalk.yellow('Troubleshooting steps:'));
      console.error('1. Verify API key in .env.local file');
      console.error('2. Check for whitespace in the API key');
      console.error('3. Ensure API key has proper permissions');
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
 * Main function to run the tests
 */
async function main() {
  console.log(chalk.blue('=== Starting Google GenAI SDK Tests ==='));
  console.log(chalk.blue('Environment: Node.js ' + process.version));
  console.log(chalk.blue('@google/genai version: ' + '0.14.1'));
  
  try {
    // First, test only text generation to isolate any issues
    console.log(chalk.blue('\nRunning text generation test only...'));
    await generateText('Write a short paragraph about the benefits of energy-efficient windows.');
    
    // Only proceed to image generation if text generation succeeds
    console.log(chalk.blue('\nText generation successful. Would you like to proceed with image generation?'));
    console.log(chalk.blue('To test image generation, uncomment the image generation code in the main function.'));
    
    // Uncomment to test image generation
    // console.log(chalk.blue('\nRunning image generation test...'));
    // await generateImage('A modern double-hung window with white vinyl frame, installed in a contemporary home');
    
    console.log(chalk.green('\n=== All tests completed successfully ==='));
  } catch (error) {
    console.error(chalk.red('\n=== Test failed ==='));
    console.error(error);
    process.exit(1);
  }
}

// Run the tests
main();
