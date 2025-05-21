console.log('Script starting...');

// Test script for Imagen 3 model using the latest Gemini API
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import ora from 'ora';
import chalk from 'chalk';

console.log('Modules imported successfully');

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

console.log('Loading configuration...');

// Configuration
const CONFIG = {
  apiKey: process.env.GEMINI_API_KEY, // Using GEMINI_API_KEY from .env.local
  model: 'gemini-1.5-pro-vision', // Using the latest Gemini model for image generation
  outputDir: path.join(__dirname, '..', 'generated-images'),
  defaultPrompt: 'A modern double-hung window with white vinyl frame, installed in a contemporary home',
};

// Test cases
const TEST_CASES = [
  {
    name: 'Window Detail',
    prompt: 'A close-up view of a modern double-hung window with white vinyl frame, showing the locking mechanism and tilt-in feature',
  },
  {
    name: 'House Exterior',
    prompt: 'A beautiful two-story house with multiple white vinyl windows, professional real estate photography style',
  },
  {
    name: 'Interior View',
    prompt: 'A bright living room interior with large bay windows, showing natural light streaming in',
  }
];

/**
 * Initialize the Gemini API client
 */
function initializeClient() {
  if (!CONFIG.apiKey) {
    throw new Error('GOOGLE_API_KEY environment variable is not set');
  }
  return new GoogleGenerativeAI(CONFIG.apiKey);
}

/**
 * Generate an image using Imagen 3
 * @param {string} prompt - The text prompt for image generation
 * @returns {Promise<{base64: string}>} - Generated image data
 */
async function generateImage(prompt) {
  console.log('API Key:', CONFIG.apiKey ? 'Present' : 'Missing');
  console.log('Using Gemini model:', CONFIG.model);
  console.log('Generating image for prompt:', prompt);
  const genAI = initializeClient();
  const model = genAI.getGenerativeModel({ model: CONFIG.model });
  
  const result = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.4,
      topK: 32,
      topP: 1,
      maxOutputTokens: 2048,
    },
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
    ],
  });

  const response = await result.response;
  const imageData = response.candidates[0].content;
  
  return imageData;
}

/**
 * Save the generated image
 * @param {string} base64Data - Base64 encoded image data
 * @param {string} name - Name for the image file
 * @returns {Promise<string>} - Path to the saved image
 */
async function saveImage(base64Data, name) {
  // Ensure output directory exists
  await fs.mkdir(CONFIG.outputDir, { recursive: true });
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `${name.toLowerCase().replace(/\s+/g, '-')}-${timestamp}.png`;
  const filepath = path.join(CONFIG.outputDir, filename);
  
  await fs.writeFile(filepath, base64Data, 'base64');
  return filepath;
}

/**
 * Run all test cases
 */
async function runTests() {
  console.log(chalk.blue('\n🎨 Testing Imagen 3 Image Generation\n'));
  
  for (const test of TEST_CASES) {
    const spinner = ora({
      text: `Generating "${test.name}"...`,
      color: 'cyan'
    }).start();
    
    try {
      const startTime = Date.now();
      const imageData = await generateImage(test.prompt);
      const imagePath = await saveImage(imageData.base64, test.name);
      const duration = ((Date.now() - startTime) / 1000).toFixed(2);
      
      spinner.succeed(chalk.green(`Generated "${test.name}" in ${duration}s`));
      console.log(chalk.dim(`  → Saved to: ${imagePath}`));
      
    } catch (error) {
      spinner.fail(chalk.red(`Failed to generate "${test.name}": ${error.message}`));
    }
  }
}

console.log('Preparing to run tests...');

// Run the tests
const isMainModule = process.argv[1] === fileURLToPath(import.meta.url);
console.log('Main module check:', { isMainModule, argv1: process.argv[1], metaUrl: import.meta.url });

if (isMainModule) {
  console.log('Main script detected, executing tests...');
  console.log('Starting Gemini API Image Generation test...');
  console.log('Environment variables:', {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY ? 'Present' : 'Missing',
    GOOGLE_CLOUD_PROJECT: process.env.GOOGLE_CLOUD_PROJECT,
    GOOGLE_CLOUD_LOCATION: process.env.GOOGLE_CLOUD_LOCATION
  });
  
  runTests().catch(error => {
    console.error('Error running tests:', error);
    console.error('Full error:', error.stack);
    process.exit(1);
  });
}
