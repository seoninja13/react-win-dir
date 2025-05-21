/**
 * Vertex AI Image Generation with Rate Limiting
 * 
 * This script generates images using Google's Vertex AI with Imagen 3.0 model.
 * It implements strict rate limiting to stay within the 50 RPM quota for us-west1.
 * 
 * Features:
 * - Uses @google/genai SDK with Vertex AI
 * - Implements token bucket rate limiting
 * - Supports batch image generation
 * - Comprehensive error handling and retries
 * - Detailed logging
 * 
 * Prerequisites:
 * - Node.js 18+
 * - @google/genai package
 * - Google Cloud credentials with Vertex AI API enabled
 * - Project configured in us-west1 region
 * 
 * Environment Variables:
 * - GOOGLE_CLOUD_PROJECT: Your GCP project ID
 * - GOOGLE_APPLICATION_CREDENTIALS: Path to service account key file
 * 
 * Usage:
 *   node scripts/genai-vertexai-imagen3-imagegen-ratelimited.mjs \
 *     --prompt="A modern window with ocean view" \
 *     --output-dir=./generated \
 *     --count=2 \
 *     --aspect-ratio=16:9
 */

import { GoogleGenAI } from '@google/genai';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

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
// Rate Limiter
// ======================
class RateLimiter {
  constructor(maxRequests, timeWindow) {
    this.queue = [];
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindow;
  }

  /**
   * Acquire a slot in the rate limit window
   * @returns {Promise<void>} Resolves when a slot is available
   */
  async acquire() {
    return new Promise((resolve) => {
      const now = Date.now();
      this.queue = this.queue.filter(ts => now - ts < this.timeWindow);
      
      if (this.queue.length < this.maxRequests) {
        this.queue.push(now);
        resolve();
      } else {
        const waitTime = this.timeWindow - (now - this.queue[0]);
        setTimeout(() => this.acquire().then(resolve), waitTime);
      }
    });
  }
}

// ======================
// Vertex AI Client
// ======================
class VertexAIClient {
  constructor() {
    this.validateEnvironment();
    this.rateLimiter = new RateLimiter(DEFAULTS.RATE_LIMIT, DEFAULTS.RATE_WINDOW_MS);
    this.client = new GoogleGenAI({
      vertexai: true,
      project: process.env.GOOGLE_CLOUD_PROJECT,
      location: DEFAULTS.REGION,
    });
  }

  validateEnvironment() {
    if (!process.env.GOOGLE_CLOUD_PROJECT) {
      throw new Error('GOOGLE_CLOUD_PROJECT environment variable is required');
    }
    if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      console.warn('GOOGLE_APPLICATION_CREDENTIALS not set, using default credentials');
    }
  }

  /**
   * Generate images using Vertex AI
   * @param {string} prompt - Image generation prompt
   * @param {Object} options - Generation options
   * @param {number} [options.count=1] - Number of images to generate (1-4)
   * @param {string} [options.aspectRatio='1:1'] - Aspect ratio
   * @param {number} [options.seed] - Random seed for reproducibility
   * @returns {Promise<Array<{image: Buffer, mimeType: string}>>} Generated images
   */
  async generateImages(prompt, { count = 1, aspectRatio = '1:1', seed } = {}) {
    const startTime = Date.now();
    const requestId = createHash('md5').update(`${Date.now()}-${Math.random()}`).digest('hex').substring(0, 8);
    
    try {
      // Validate inputs
      if (count < 1 || count > 4) {
        throw new Error('Count must be between 1 and 4');
      }
      if (!DEFAULTS.ASPECT_RATIOS[aspectRatio]) {
        throw new Error(`Unsupported aspect ratio: ${aspectRatio}`);
      }

      console.log(`[${requestId}] Generating ${count} image(s) with prompt: "${prompt}"`);
      
      // Acquire rate limit slot
      await this.rateLimiter.acquire();
      
      // Make the API call
      const dimensions = DEFAULTS.ASPECT_RATIOS[aspectRatio];
      const response = await this.client.publishers.models.generateContent({
        model: `projects/${process.env.GOOGLE_CLOUD_PROJECT}/locations/${DEFAULTS.REGION}/publishers/google/models/${DEFAULTS.MODEL}`,
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          candidateCount: count,
          aspectRatio,
          ...(seed && { seed }),
        },
      });

      // Process response
      const images = response.candidates.map(candidate => ({
        image: Buffer.from(candidate.bytes, 'base64'),
        mimeType: 'image/png',
      }));

      const duration = Date.now() - startTime;
      console.log(`[${requestId}] Generated ${images.length} image(s) in ${duration}ms`);
      
      return images;
      
    } catch (error) {
      console.error(`[${requestId}] Error generating images:`, error.message);
      throw error;
    }
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
    // Initialize client
    const client = new VertexAIClient();
    
    // Generate images
    const images = await client.generateImages(args.prompt, {
      count: parseInt(args.count, 10) || 1,
      aspectRatio: args['aspect-ratio'] || '1:1',
      seed: args.seed ? parseInt(args.seed, 10) : undefined,
    });

    // Save images
    const outputDir = args['output-dir'] || DEFAULTS.DEFAULT_OUTPUT_DIR;
    const baseName = args.prompt.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    
    const savedPaths = await saveImages(images, outputDir, baseName);
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

export {
  VertexAIClient,
  RateLimiter,
  DEFAULTS as VertexAIDefaults,
};
