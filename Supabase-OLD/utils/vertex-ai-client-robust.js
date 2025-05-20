/**
 * Robust Vertex AI Client Utility
 * 
 * This file provides a more robust implementation of the Vertex AI client
 * with retry logic, rate limiting, and proper error handling for quota limits.
 * 
 * Documentation:
 * - Google Generative AI SDK: https://cloud.google.com/vertex-ai/generative-ai/docs/sdks/overview
 * - Vertex AI: https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/imagen-api
 */

const { VertexAI } = require('@google-cloud/vertexai');
const dotenv = require('dotenv');

// Load environment variables if not already loaded
if (!process.env.GOOGLE_CLOUD_PROJECT) {
  dotenv.config({ path: '.env.local' });
}

// Environment variables
const GOOGLE_CLOUD_PROJECT = process.env.GOOGLE_CLOUD_PROJECT;
const GOOGLE_CLOUD_LOCATION = process.env.GOOGLE_CLOUD_LOCATION || 'us-central1';

// Retry configuration
const DEFAULT_RETRY_CONFIG = {
  maxRetries: 5,
  initialDelayMs: 1000, // 1 second
  maxDelayMs: 60000, // 60 seconds
  backoffMultiplier: 2,
};

// Quota limits for Imagen models (requests per minute)
const IMAGEN_QUOTA_LIMITS = {
  'imagen-3.0-capability': 10,
  'imagen-3.0-fast-generate': 20,
  'imagen-3.0-fast-generate-001': 20, // Assuming same as fast-generate
  'imagen-3.0-generate': 1,
  'imagen-3.0-generate-001': 1, // Assuming same as generate
  'imagen-exp': 1,
  'default': 1, // Default conservative limit
};

// Request tracking for rate limiting
const requestTracking = {
  lastRequestTime: {},
  requestsThisMinute: {},
  resetTimers: {}
};

/**
 * Sleep for a specified number of milliseconds
 * 
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise<void>}
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Calculate the delay for the next retry using exponential backoff
 * 
 * @param {number} retryCount - Current retry count
 * @param {Object} config - Retry configuration
 * @returns {number} - Delay in milliseconds
 */
const calculateBackoffDelay = (retryCount, config) => {
  const { initialDelayMs, maxDelayMs, backoffMultiplier } = config;
  const delay = initialDelayMs * Math.pow(backoffMultiplier, retryCount);
  return Math.min(delay, maxDelayMs);
};

/**
 * Initialize the Vertex AI client
 * 
 * @returns {VertexAI} - The Vertex AI client
 */
function initializeVertexAIClient() {
  if (!GOOGLE_CLOUD_PROJECT) {
    throw new Error('GOOGLE_CLOUD_PROJECT environment variable is required');
  }
  
  // Use API key authentication if available
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    console.log('Using API key authentication for Vertex AI');
    // When using API key, we need to set it as an environment variable
    process.env.GOOGLE_API_KEY = apiKey;
  } else {
    console.log('Using default authentication for Vertex AI');
  }
  
  return new VertexAI({
    project: GOOGLE_CLOUD_PROJECT,
    location: GOOGLE_CLOUD_LOCATION,
  });
}

/**
 * Check and enforce rate limits for a specific model
 * 
 * @param {string} model - The model name
 * @returns {Promise<void>} - Resolves when it's safe to make a request
 */
async function enforceRateLimit(model) {
  // Get the quota limit for this model
  const quotaLimit = IMAGEN_QUOTA_LIMITS[model] || IMAGEN_QUOTA_LIMITS.default;
  
  // Initialize tracking for this model if it doesn't exist
  if (!requestTracking.requestsThisMinute[model]) {
    requestTracking.requestsThisMinute[model] = 0;
    requestTracking.lastRequestTime[model] = 0;
    
    // Set up a timer to reset the counter every minute
    requestTracking.resetTimers[model] = setInterval(() => {
      requestTracking.requestsThisMinute[model] = 0;
      console.log(`Rate limit counter reset for model: ${model}`);
    }, 60000); // Reset every minute
  }
  
  // Check if we've reached the quota limit
  if (requestTracking.requestsThisMinute[model] >= quotaLimit) {
    // Calculate time until next minute
    const now = Date.now();
    const timeElapsedSinceLastRequest = now - requestTracking.lastRequestTime[model];
    const timeUntilReset = Math.max(60000 - timeElapsedSinceLastRequest, 0);
    
    console.log(`Rate limit reached for model ${model}. Waiting ${timeUntilReset / 1000} seconds until reset...`);
    await sleep(timeUntilReset + 1000); // Add 1 second buffer
    
    // Reset counter after waiting
    requestTracking.requestsThisMinute[model] = 0;
  }
  
  // Update tracking
  requestTracking.requestsThisMinute[model]++;
  requestTracking.lastRequestTime[model] = Date.now();
  
  console.log(`Request ${requestTracking.requestsThisMinute[model]}/${quotaLimit} for model ${model} this minute`);
}

/**
 * Generate an image with retry logic and rate limiting for handling quota limits
 * 
 * @param {string} prompt - The text prompt to generate an image from
 * @param {string} model - The model to use for image generation
 * @param {Object} options - Additional options for image generation
 * @param {Object} retryConfig - Configuration for retry logic
 * @returns {Promise<{imageUrl: string, enhancedPrompt?: string}>} - The generated image data
 */
async function generateImageWithRetry(
  prompt,
  model = 'imagen-3.0-fast-generate-001',
  options = {},
  retryConfig = DEFAULT_RETRY_CONFIG
) {
  const { maxRetries, initialDelayMs, maxDelayMs, backoffMultiplier } = {
    ...DEFAULT_RETRY_CONFIG,
    ...retryConfig,
  };
  
  let retryCount = 0;
  let lastError = null;
  
  while (retryCount <= maxRetries) {
    try {
      // Enforce rate limits before making the request
      await enforceRateLimit(model);
      
      // Initialize Vertex AI client
      const vertexAI = initializeVertexAIClient();
      
      // Get the generative model
      const generativeModel = vertexAI.getGenerativeModel({
        model,
      });
      
      // Generate the image
      console.log(`Generating image with prompt: "${prompt.substring(0, 50)}..."`);
      console.log(`Using model: ${model}`);
      
      const response = await generativeModel.generateImages({
        prompt,
        sampleCount: 1,
        ...options,
      });
      
      // Process the response
      if (!response || !response.images || response.images.length === 0) {
        throw new Error('No images were generated');
      }
      
      return {
        imageUrl: `data:image/png;base64,${response.images[0].bytesBase64}`,
        enhancedPrompt: response.promptFeedback?.enhancedPrompt,
      };
      
    } catch (error) {
      lastError = error;
      
      // Check if the error is a quota limit error
      const isQuotaError = 
        error.message.includes('429') || 
        error.message.includes('Too Many Requests') ||
        error.message.includes('RESOURCE_EXHAUSTED');
      
      // If it's not a quota error or we've reached max retries, throw the error
      if (!isQuotaError || retryCount >= maxRetries) {
        break;
      }
      
      // Calculate delay for exponential backoff
      const delayMs = calculateBackoffDelay(retryCount, {
        initialDelayMs,
        maxDelayMs,
        backoffMultiplier,
      });
      
      console.log(`Quota limit reached. Retrying in ${delayMs / 1000} seconds... (Attempt ${retryCount + 1}/${maxRetries})`);
      
      // Wait before retrying
      await sleep(delayMs);
      
      // Increment retry count
      retryCount++;
    }
  }
  
  // If we've exhausted all retries, throw the last error
  throw lastError;
}

/**
 * Generate multiple images with retry logic for handling quota limits
 * 
 * @param {string} prompt - The text prompt to generate images from
 * @param {Object} options - Additional options for image generation
 * @param {Object} retryConfig - Configuration for retry logic
 * @returns {Promise<Array<{imageUrl: string, enhancedPrompt?: string}>>} - Array of generated image data
 */
async function generateMultipleImagesWithRetry(
  prompt,
  options = {},
  retryConfig = DEFAULT_RETRY_CONFIG
) {
  const {
    numberOfImages = 4,
    model = 'imagen-3.0-fast-generate-001',
    ...otherOptions
  } = options;
  
  // For multiple images, we'll generate them one at a time to avoid quota issues
  const results = [];
  
  for (let i = 0; i < numberOfImages; i++) {
    try {
      console.log(`Generating image ${i + 1}/${numberOfImages}...`);
      
      // Add a small delay between requests to avoid quota issues
      if (i > 0) {
        await sleep(2000); // 2 seconds between requests
      }
      
      const result = await generateImageWithRetry(
        prompt,
        model,
        otherOptions,
        retryConfig
      );
      
      results.push(result);
      
    } catch (error) {
      console.error(`Error generating image ${i + 1}/${numberOfImages}:`, error.message);
      
      // If we've already generated at least one image, return what we have
      if (results.length > 0) {
        console.log(`Returning ${results.length} images that were successfully generated.`);
        return results;
      }
      
      // Otherwise, rethrow the error
      throw error;
    }
  }
  
  return results;
}

/**
 * Generate a batch of images with optimized quota usage
 * 
 * @param {Array<{prompt: string, options?: Object}>} batch - Array of prompts and options
 * @param {Object} globalOptions - Global options for all images
 * @param {Object} retryConfig - Configuration for retry logic
 * @returns {Promise<Array<{prompt: string, result: {imageUrl: string, enhancedPrompt?: string} | null, error?: Error}>>}
 */
async function generateImageBatch(
  batch,
  globalOptions = {},
  retryConfig = DEFAULT_RETRY_CONFIG
) {
  const results = [];
  let successCount = 0;
  let failureCount = 0;
  
  console.log(`Processing batch of ${batch.length} images...`);
  
  for (let i = 0; i < batch.length; i++) {
    const { prompt, options = {} } = batch[i];
    
    try {
      console.log(`Processing item ${i + 1}/${batch.length}...`);
      
      // Add a delay between requests to avoid quota issues
      if (i > 0) {
        await sleep(3000); // 3 seconds between requests
      }
      
      // Merge global options with item-specific options
      const mergedOptions = {
        ...globalOptions,
        ...options,
      };
      
      // Generate the image
      const result = await generateImageWithRetry(
        prompt,
        mergedOptions.model || 'imagen-3.0-fast-generate-001',
        mergedOptions,
        retryConfig
      );
      
      results.push({
        prompt,
        result,
        error: null,
      });
      
      successCount++;
      
    } catch (error) {
      console.error(`Error processing item ${i + 1}/${batch.length}:`, error.message);
      
      results.push({
        prompt,
        result: null,
        error: error.message,
      });
      
      failureCount++;
      
      // If we've had multiple consecutive failures, add a longer delay
      if (failureCount > 2) {
        console.log('Multiple failures detected. Adding a longer delay...');
        await sleep(10000); // 10 seconds
        failureCount = 0; // Reset failure count
      }
    }
    
    // Log progress
    console.log(`Batch progress: ${i + 1}/${batch.length} (${successCount} successful, ${failureCount} failed)`);
  }
  
  return results;
}

module.exports = {
  initializeVertexAIClient,
  generateImageWithRetry,
  generateMultipleImagesWithRetry,
  generateImageBatch
};
