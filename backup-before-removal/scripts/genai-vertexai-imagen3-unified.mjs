/**
 * Unified Vertex AI Image Generation Interface
 * 
 * This script provides a unified interface for generating images using Google's Vertex AI
 * with Imagen 3.0 model. It supports both Service Account and ADC authentication methods
 * with automatic fallback between them.
 * 
 * Features:
 * - Supports both Service Account and ADC authentication
 * - Automatic fallback between authentication methods
 * - Implements token bucket rate limiting
 * - Supports batch image generation
 * - Comprehensive error handling and retries
 * - Detailed logging
 * 
 * Prerequisites:
 * - Node.js 18+
 * - @google/genai package
 * - Google Cloud credentials (either Service Account or ADC)
 * - Project configured in us-west1 region
 * 
 * Environment Variables:
 * - GOOGLE_CLOUD_PROJECT: Your GCP project ID (required for ADC)
 * - GOOGLE_APPLICATION_CREDENTIALS: Path to service account key file (optional)
 * 
 * Usage:
 *   import { generateImage, generateBatchImages } from './genai-vertexai-imagen3-unified.mjs';
 *   
 *   // Generate a single image
 *   const image = await generateImage('A modern window with ocean view');
 *   
 *   // Generate multiple images from different prompts
 *   const batchResults = await generateBatchImages([
 *     'A classic entry door with sidelights',
 *     'A contemporary sliding patio door with energy-efficient glass'
 *   ]);
 */

import { GoogleGenAI } from '@google/genai';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

// Import both authentication implementations
import * as serviceAccountAuth from './genai-vertexai-imagen3-imagegen-serviceaccount.mjs';
import * as adcAuth from './genai-vertexai-imagen3-imagegen-adc.mjs';

// ======================
// Configuration
// ======================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Default configuration
const DEFAULTS = {
  MODEL: 'imagen-3.0-generate-002',
  REGION: 'us-west1',
  MAX_RETRIES: 3,
  TIMEOUT_MS: 30000,
  // Rate limiting: 45 RPM to stay under 50 RPM quota
  RATE_LIMIT: 45,
  RATE_WINDOW_MS: 60 * 1000, // 1 minute
  // Output
  DEFAULT_OUTPUT_DIR: path.join(__dirname, '..', 'public', 'generated-images'),
  // Supported aspect ratios
  ASPECT_RATIOS: {
    '1:1': { width: 1024, height: 1024 },
    '4:3': { width: 1024, height: 768 },
    '16:9': { width: 1024, height: 576 },
    '9:16': { width: 576, height: 1024 },
  },
};

// ======================
// Unified Client
// ======================
class UnifiedVertexAIClient {
  constructor() {
    this.serviceAccountClient = null;
    this.adcClient = null;
    this.activeClient = null;
    this.authMethod = null;
  }

  /**
   * Initialize the client with available authentication methods
   */
  async initialize() {
    // Try service account authentication first if credentials are available
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      try {
        console.log('Attempting to initialize with Service Account authentication...');
        const serviceAccountClient = new serviceAccountAuth.VertexAIClient();
        await serviceAccountClient.validateEnvironment();
        await serviceAccountClient.initializeClient();
        this.serviceAccountClient = serviceAccountClient;
        this.activeClient = this.serviceAccountClient;
        this.authMethod = 'serviceAccount';
        console.log('Successfully initialized with Service Account authentication');
        return;
      } catch (error) {
        console.warn('Service Account authentication failed:', error.message);
        console.log('Falling back to ADC authentication...');
      }
    }

    // Fall back to ADC authentication
    if (process.env.GOOGLE_CLOUD_PROJECT) {
      try {
        console.log('Attempting to initialize with ADC authentication...');
        const adcClient = new adcAuth.VertexAIClient();
        adcClient.validateEnvironment();
        adcClient.initializeClient();
        this.adcClient = adcClient;
        this.activeClient = this.adcClient;
        this.authMethod = 'adc';
        console.log('Successfully initialized with ADC authentication');
        return;
      } catch (error) {
        console.warn('ADC authentication failed:', error.message);
      }
    }

    // If both authentication methods fail, throw an error
    throw new Error('Failed to initialize Vertex AI client. No valid authentication method available.');
  }

  /**
   * Generate images using the active client
   */
  async generateImages(prompt, options = {}) {
    if (!this.activeClient) {
      await this.initialize();
    }

    try {
      return await this.activeClient.generateImages(prompt, options);
    } catch (error) {
      // If the active client fails, try the other authentication method
      if (this.authMethod === 'serviceAccount' && this.adcClient) {
        console.warn('Service Account authentication failed, falling back to ADC...');
        this.activeClient = this.adcClient;
        this.authMethod = 'adc';
        return this.activeClient.generateImages(prompt, options);
      } else if (this.authMethod === 'adc' && this.serviceAccountClient) {
        console.warn('ADC authentication failed, falling back to Service Account...');
        this.activeClient = this.serviceAccountClient;
        this.authMethod = 'serviceAccount';
        return this.activeClient.generateImages(prompt, options);
      }

      // If no fallback is available or fallback also failed, rethrow the error
      throw error;
    }
  }

  /**
   * Generate multiple images from a batch of prompts
   */
  async generateBatchImages(prompts, options = {}) {
    if (!this.activeClient) {
      await this.initialize();
    }

    const results = [];
    
    for (const prompt of prompts) {
      try {
        const images = await this.generateImages(prompt, options);
        results.push({ prompt, images });
      } catch (error) {
        console.error(`Error generating image for prompt "${prompt}":`, error.message);
        results.push({ prompt, error: error.message });
      }
    }
    
    return results;
  }
}

// ======================
// File Operations
// ======================
async function ensureDirectoryExists(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}

async function saveImages(images, outputDir, baseName) {
  await ensureDirectoryExists(outputDir);
  const savedPaths = [];
  
  for (let i = 0; i < images.length; i++) {
    const filename = `${baseName}-${Date.now()}-${i + 1}.png`;
    const filePath = path.join(outputDir, filename);
    
    await fs.writeFile(filePath, images[i].image);
    savedPaths.push(filePath);
    console.log(`Saved: ${filePath}`);
  }
  
  return savedPaths;
}

// ======================
// Unified API
// ======================

// Singleton client instance
let unifiedClient = null;

/**
 * Get or create the unified client instance
 */
async function getClient() {
  if (!unifiedClient) {
    unifiedClient = new UnifiedVertexAIClient();
    await unifiedClient.initialize();
  }
  return unifiedClient;
}

/**
 * Generate a single image using Vertex AI Imagen
 * @param {string} prompt - The text prompt for image generation
 * @param {Object} options - Configuration options
 * @returns {Promise<Object>} The generated image data
 */
export async function generateImage(prompt, options = {}) {
  const client = await getClient();
  const images = await client.generateImages(prompt, { count: 1, ...options });
  return images[0];
}

/**
 * Generate multiple images from a batch of prompts
 * @param {Array<string>} prompts - Array of prompts
 * @param {Object} options - Configuration options
 * @returns {Promise<Array<{prompt: string, images: Array<Object>}>>}
 */
export async function generateBatchImages(prompts, options = {}) {
  const client = await getClient();
  return client.generateBatchImages(prompts, options);
}

/**
 * Generate and save images to disk
 * @param {string|Array<string>} prompts - Single prompt or array of prompts
 * @param {Object} options - Configuration options
 * @returns {Promise<Array<string>>} Array of saved file paths
 */
export async function generateAndSaveImages(prompts, options = {}) {
  const {
    outputDir = DEFAULTS.DEFAULT_OUTPUT_DIR,
    ...genOptions
  } = options;
  
  // Handle single prompt or array of prompts
  const promptArray = Array.isArray(prompts) ? prompts : [prompts];
  const results = await generateBatchImages(promptArray, genOptions);
  
  const savedPaths = [];
  
  for (const result of results) {
    if (result.error) {
      console.error(`Error generating image for prompt "${result.prompt}":`, result.error);
      continue;
    }
    
    const baseName = result.prompt.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    const paths = await saveImages(result.images, outputDir, baseName);
    savedPaths.push(...paths);
  }
  
  return savedPaths;
}

// ======================
// Main Function
// ======================
async function main() {
  // Parse command line arguments
  const args = process.argv.slice(2).reduce((acc, arg) => {
    const [key, value] = arg.split('=');
    acc[key.replace(/^--/, '')] = value || true;
    return acc;
  }, {});

  // Show help if needed
  if (args.help || !args.prompt) {
    console.log(`
Usage: node ${path.basename(__filename)} --prompt="<prompt>" [options]

Options:
  --prompt="text"     Prompt for image generation (required)
  --output-dir=path   Output directory (default: ${DEFAULTS.DEFAULT_OUTPUT_DIR})
  --count=number      Number of images to generate (1-4, default: 1)
  --aspect-ratio=ratio Aspect ratio (1:1, 4:3, 16:9, 9:16, default: 1:1)
  --seed=number       Random seed for reproducibility
  --help              Show this help message
`);
    process.exit(0);
  }

  try {
    // Generate and save images
    const savedPaths = await generateAndSaveImages(args.prompt, {
      outputDir: args['output-dir'],
      count: parseInt(args.count, 10) || 1,
      aspectRatio: args['aspect-ratio'] || '1:1',
      seed: args.seed ? parseInt(args.seed, 10) : undefined,
    });
    
    console.log(`\nSuccessfully generated and saved ${savedPaths.length} image(s)`);
    
  } catch (error) {
    console.error('\nError:', error.message);
    process.exit(1);
  }
}

// Run the script if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

// Export for testing and importing
export {
  UnifiedVertexAIClient,
  DEFAULTS as VertexAIDefaults,
};
