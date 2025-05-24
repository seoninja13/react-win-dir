/**
 * Vertex AI Image Generation with Service Account Authentication
 *
 * This script generates images using Google's Vertex AI with Imagen 3.0 model.
 * It uses explicit service account authentication from a JSON key file.
 *
 * Features:
 * - Uses @google/genai SDK with Vertex AI
 * - Service account authentication
 * - Implements token bucket rate limiting
 * - Supports batch image generation
 * - Comprehensive error handling and retries
 * - Detailed logging
 *
 * Prerequisites:
 * - Node.js 18+
 * - @google/genai package
 * - Google Cloud service account key file
 * - Project configured in us-west1 region
 *
 * Environment Variables:
 * - GOOGLE_APPLICATION_CREDENTIALS: Path to service account key file (required)
 *
 * Usage:
 *   node scripts/genai-vertexai-imagen3-imagegen-serviceaccount.mjs \
 *     --prompt="A modern window with ocean view" \
 *     --output-dir=./generated \
 *     --count=2 \
 *     --aspect-ratio=16:9
 */

// Dynamic imports will be used in the main function to avoid hanging issues

// ======================
// Configuration
// ======================
// Configuration will be loaded dynamically in the main function

// Default configuration
const DEFAULTS = {
  MODEL: 'imagen-3.0-fast-generate',
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
// Retry Helper
// ======================
async function withRetry(fn, options = {}) {
  const {
    maxRetries = DEFAULTS.MAX_RETRIES,
    initialDelay = 1000,
    maxDelay = 60000,
    factor = 2,
    retryableStatusCodes = [408, 429, 500, 502, 503, 504]
  } = options;

  let retries = 0;
  let delay = initialDelay;

  while (true) {
    try {
      return await fn();
    } catch (error) {
      const statusCode = error.status || error.statusCode || 0;
      const isRetryable = retryableStatusCodes.includes(statusCode);

      if (!isRetryable || retries >= maxRetries) {
        throw error;
      }

      console.warn(`Retry ${retries + 1}/${maxRetries} after ${delay}ms`);
      await new Promise(resolve => setTimeout(resolve, delay));

      retries++;
      delay = Math.min(delay * factor, maxDelay);
    }
  }
}

// ======================
// Vertex AI Client
// ======================
class VertexAIClient {
  constructor() {
    console.log('🏗️ Creating VertexAIClient instance...');
    this.rateLimiter = new RateLimiter(DEFAULTS.RATE_LIMIT, DEFAULTS.RATE_WINDOW_MS);
    this.initialized = false;
    console.log('✅ VertexAIClient constructor completed');
  }

  async initialize() {
    if (this.initialized) return;
    console.log('🔧 Initializing VertexAIClient...');
    await this.validateEnvironment();
    await this.initializeClient();
    this.initialized = true;
    console.log('✅ VertexAIClient initialization completed');
  }

  async validateEnvironment() {
    console.log('🔍 Validating environment...');
    console.log('GOOGLE_APPLICATION_CREDENTIALS:', process.env.GOOGLE_APPLICATION_CREDENTIALS);

    if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      throw new Error('GOOGLE_APPLICATION_CREDENTIALS environment variable is required for service account authentication');
    }

    try {
      await fs.access(process.env.GOOGLE_APPLICATION_CREDENTIALS);
      console.log('✅ Service account key file found');
    } catch (error) {
      console.error('❌ Service account key file not found:', error.message);
      throw new Error(`Service account key file not found at ${process.env.GOOGLE_APPLICATION_CREDENTIALS}`);
    }
  }

  async initializeClient() {
    try {
      console.log('🔧 Initializing Vertex AI client...');

      // Load service account credentials
      const credentials = JSON.parse(
        await fs.readFile(process.env.GOOGLE_APPLICATION_CREDENTIALS, 'utf8')
      );

      console.log('📋 Service account project:', credentials.project_id);
      console.log('🌍 Region:', DEFAULTS.REGION);
      console.log('🤖 Model:', DEFAULTS.MODEL);

      // Initialize client with service account and stable API version
      this.client = new GoogleGenAI({
        projectId: credentials.project_id,
        location: DEFAULTS.REGION,
        serviceAccountKey: credentials,
        apiVersion: 'v1'
      });

      console.log(`✅ Initialized Vertex AI client with service account for project: ${credentials.project_id}`);
    } catch (error) {
      console.error('❌ Failed to initialize Vertex AI client:', error.message);
      console.error('Error details:', error);
      throw new Error(`Failed to initialize Vertex AI client: ${error.message}`);
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
    // Ensure client is initialized
    await this.initialize();

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

      // Make the API call with retry
      return await withRetry(async () => {
        // Use the models module to generate images
        const result = await this.client.models.generateImages({
          model: DEFAULTS.MODEL,
          prompt,
          aspectRatio,
          sampleCount: count,
          ...(seed && { seed }),
          responseFormat: 'b64_json'
        });

        // Process response
        const images = result.images.map(image => ({
          image: Buffer.from(image.data, 'base64'),
          mimeType: 'image/png',
        }));

        const duration = Date.now() - startTime;
        console.log(`[${requestId}] Generated ${images.length} image(s) in ${duration}ms`);

        return images;
      });

    } catch (error) {
      console.error(`[${requestId}] Error generating images:`, error.message);
      throw error;
    }
  }

  /**
   * Generate multiple images from a batch of prompts
   * @param {Array<string>} prompts - Array of prompts
   * @param {Object} options - Generation options
   * @returns {Promise<Array<{prompt: string, images: Array<{image: Buffer, mimeType: string}>}>>}
   */
  async generateBatchImages(prompts, options = {}) {
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
// Main Function
// ======================
async function main() {
  console.log('🚀 Starting Vertex AI Image Generation Script');
  console.log('📅 Timestamp:', new Date().toISOString());

  try {
    // Dynamic imports
    console.log('📦 Loading modules...');
    const { GoogleGenAI } = await import('@google/genai');
    const fs = await import('fs/promises');
    const path = await import('path');
    const { fileURLToPath } = await import('url');
    const { createHash } = await import('crypto');
    const dotenv = await import('dotenv');

    console.log('✅ Modules loaded');

    // Setup paths and environment
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const envPath = path.join(__dirname, '..', '.env.local');

    console.log('🔧 Loading environment from:', envPath);
    dotenv.config({ path: envPath });
    console.log('✅ Environment loaded');

    // Parse command line arguments
    const args = process.argv.slice(2).reduce((acc, arg) => {
      const [key, value] = arg.split('=');
      acc[key.replace(/^--/, '')] = value || true;
      return acc;
    }, {});

    console.log('📝 Command line arguments:', args);

    // Show help if needed
    if (args.help || !args.prompt) {
      console.log(`
Usage: node script.mjs --prompt="<prompt>" [options]

Options:
  --prompt="text"     Prompt for image generation (required)
  --output-dir=path   Output directory (default: generated-images)
  --count=number      Number of images to generate (1-4, default: 1)
  --aspect-ratio=ratio Aspect ratio (1:1, 4:3, 16:9, 9:16, default: 1:1)
  --seed=number       Random seed for reproducibility
  --help              Show this help message
`);
      process.exit(0);
    }

    // Load service account
    console.log('🔑 Loading service account...');
    const credentials = JSON.parse(await fs.readFile(process.env.GOOGLE_APPLICATION_CREDENTIALS, 'utf8'));
    console.log('✅ Service account loaded for project:', credentials.project_id);

    // Create client
    console.log('🔧 Creating GoogleGenAI client...');
    const client = new GoogleGenAI({
      projectId: credentials.project_id,
      location: 'us-west1',
      serviceAccountKey: credentials,
      apiVersion: 'v1'
    });
    console.log('✅ Client created');

    // Generate images
    console.log('🎨 Generating images...');
    const result = await client.models.generateImages({
      model: 'imagen-3.0-fast-generate',
      prompt: args.prompt,
      aspectRatio: args['aspect-ratio'] || '1:1',
      sampleCount: parseInt(args.count, 10) || 1,
      responseFormat: 'b64_json'
    });

    console.log('✅ Image generation completed');

    if (result && result.images && result.images.length > 0) {
      console.log('📸 Generated', result.images.length, 'image(s)');

      // Save images
      const outputDir = args['output-dir'] || 'generated-images';
      await fs.mkdir(outputDir, { recursive: true });
      console.log('📁 Output directory:', outputDir);

      const savedPaths = [];
      for (let i = 0; i < result.images.length; i++) {
        const imageData = Buffer.from(result.images[i].data, 'base64');
        const baseName = args.prompt.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        const filename = `${baseName}-${Date.now()}-${i + 1}.png`;
        const filepath = path.join(outputDir, filename);

        await fs.writeFile(filepath, imageData);
        savedPaths.push(filepath);
        console.log('💾 Saved:', filepath);
      }

      console.log(`\n✅ Successfully generated and saved ${savedPaths.length} image(s)`);

    } else {
      console.log('⚠️ No images generated');
    }

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('🔍 Error stack:', error.stack);
    process.exit(1);
  }
}

// Run the script if this is the main module
console.log('🔍 Checking if this is the main module...');

// Use dynamic import for fileURLToPath since we removed static imports
import('url').then(({ fileURLToPath }) => {
  console.log('import.meta.url:', import.meta.url);
  console.log('process.argv[1]:', process.argv[1]);
  console.log('fileURLToPath(import.meta.url):', fileURLToPath(import.meta.url));

  if (fileURLToPath(import.meta.url) === process.argv[1]) {
    console.log('✅ This is the main module, running main()...');
    main().catch(console.error);
  } else {
    console.log('ℹ️ This module is being imported, not running main()');
  }
}).catch(console.error);

// Helper functions for external use
async function generateImage(prompt, options = {}) {
  const client = new VertexAIClient();
  const images = await client.generateImages(prompt, { count: 1, ...options });
  return images[0];
}

async function generateBatchImages(prompts, options = {}) {
  const client = new VertexAIClient();
  return client.generateBatchImages(prompts, options);
}

// Export for testing and importing
export {
  VertexAIClient,
  RateLimiter,
  withRetry,
  DEFAULTS as VertexAIDefaults,
  generateImage,
  generateBatchImages
};
