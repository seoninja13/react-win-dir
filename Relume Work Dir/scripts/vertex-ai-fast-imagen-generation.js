console.log('Starting Vertex AI script...');

// Fast Image Generation using Vertex AI's imagen-3.0-fast-generate-001 model
import { VertexAI } from '@google-cloud/vertexai';
import * as fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import ora from 'ora';
import chalk from 'chalk';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

// Configuration
const CONFIG = {
  // Rate limiting configuration (50 requests per minute)
  rateLimit: {
    maxRequests: 45, // Stay below the 50/min limit
    timeWindow: 60 * 1000, // 1 minute in milliseconds
    queue: [],
  },
  project: process.env.GOOGLE_CLOUD_PROJECT,
  location: process.env.GOOGLE_CLOUD_LOCATION || 'us-west1',
  model: 'imagen-3.0-fast-generate-001',
  outputDir: path.join(__dirname, '..', 'generated-images', 'fast-generate'),
};

// Test cases with different styles and subjects
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
 * Initialize Vertex AI client
 */
/**
 * Rate limiting implementation
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
      console.log(`Rate limit reached. Waiting ${Math.ceil(timeToWait / 1000)} seconds...`);
      await new Promise(resolve => setTimeout(resolve, timeToWait));
    }
  }
  
  // Add this request to the queue
  CONFIG.rateLimit.queue.push(now);
}

function initializeClient() {
  // Check required environment variables
  const requiredEnvVars = ['GOOGLE_CLOUD_PROJECT', 'GOOGLE_CLOUD_LOCATION'];
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }

  console.log('Initializing Vertex AI client...');

  if (!CONFIG.project) {
    throw new Error('GOOGLE_CLOUD_PROJECT environment variable is not set');
  }
  return new VertexAI({
    project: CONFIG.project,
    location: CONFIG.location,
  });
}

/**
 * Generate an image using Imagen 3.0 Fast Generate
 * @param {string} prompt - The text prompt for image generation
 * @returns {Promise<{imageUrl: string}>} - Generated image data
 */
async function generateImage(prompt) {
  // Apply rate limiting
  await rateLimit();
  console.log('Project:', CONFIG.project);
  console.log('Location:', CONFIG.location);
  console.log('Using Vertex AI model:', CONFIG.model);
  console.log('Generating image for prompt:', prompt);
  const vertexAI = initializeClient();
  
  // Get the generative model
  const generationModel = vertexAI.preview.getGenerativeModel({
    model: CONFIG.model,
    generation_config: {
      sampleCount: 1,
    },
    safety_settings: [
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

  // Generate the image
  const result = await generationModel.generateContent({
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
  });

  const response = await result.response;
  return response.candidates[0].content;
}

/**
 * Save the generated image
 * @param {string} imageUrl - Base64 or URL of the generated image
 * @param {string} name - Name for the image file
 * @returns {Promise<string>} - Path to the saved image
 */
async function saveImage(imageUrl, name) {
  // Ensure output directory exists
  await fs.mkdir(CONFIG.outputDir, { recursive: true });
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `${name.toLowerCase().replace(/\s+/g, '-')}-${timestamp}.png`;
  const filepath = path.join(CONFIG.outputDir, filename);
  
  // Handle both base64 and URL formats
  if (imageUrl.startsWith('data:image')) {
    const base64Data = imageUrl.split(',')[1];
    await fs.writeFile(filepath, base64Data, 'base64');
  } else {
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();
    await fs.writeFile(filepath, Buffer.from(buffer));
  }
  
  return filepath;
}

/**
 * Run all test cases
 */
async function runTests() {
  console.log(chalk.blue('\n🚀 Testing Fast Imagen 3.0 Image Generation\n'));
  
  for (const test of TEST_CASES) {
    const spinner = ora({
      text: `Generating "${test.name}"...`,
      color: 'cyan'
    }).start();
    
    try {
      const startTime = Date.now();
      const imageData = await generateImage(test.prompt);
      const imagePath = await saveImage(imageData.inlineData.data || imageData.fileData.url, test.name);
      const duration = ((Date.now() - startTime) / 1000).toFixed(2);
      
      spinner.succeed(chalk.green(`Generated "${test.name}" in ${duration}s`));
      console.log(chalk.dim(`  → Saved to: ${imagePath}`));
      
    } catch (error) {
      spinner.fail(chalk.red(`Failed to generate "${test.name}": ${error.message}`));
    }
  }
}

// Run the tests
const isMainModule = process.argv[1] === fileURLToPath(import.meta.url);
console.log('Main module check:', { isMainModule, argv1: process.argv[1], metaUrl: import.meta.url });

if (isMainModule) {
  console.log('Starting test execution...');
  console.log('Environment variables:', {
    GOOGLE_CLOUD_PROJECT: process.env.GOOGLE_CLOUD_PROJECT,
    GOOGLE_CLOUD_LOCATION: process.env.GOOGLE_CLOUD_LOCATION
  });

  runTests().catch(error => {
    console.error('Error running tests:', error.message);
    console.error('Error running tests:', error);
    console.error('Full error:', error.stack);
    process.exit(1);
  });
}
