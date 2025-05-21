/**
 * Imagen Quota Handler
 * 
 * This script provides a simple implementation for handling quota limits
 * for Google Cloud Vertex AI Imagen models.
 */

const { VertexAI } = require('@google-cloud/vertexai');
require('dotenv').config({ path: '.env.local' });

// Environment variables
const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT || 'mold-removal-lead-gen';
const LOCATION = 'us-central1'; // Primary region for Vertex AI

// Quota limits for Imagen models (requests per minute)
const IMAGEN_QUOTA_LIMITS = {
  'imagen-3.0-capability': 10,
  'imagen-3.0-fast-generate': 20,
  'imagen-3.0-fast-generate-001': 20, // Assuming same as fast-generate
  'imagen-3.0-generate': 1,
  'imagen-3.0-generate-001': 1, // Assuming same as generate
  'imagen-exp': 1,
  'default': 1 // Default conservative limit
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
 * Initialize the Vertex AI client
 * 
 * @returns {VertexAI} - The Vertex AI client
 */
function initializeVertexAI() {
  return new VertexAI({
    project: PROJECT_ID,
    location: LOCATION
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
 * Generate an image with rate limiting to handle quota limits
 * 
 * @param {string} prompt - The text prompt to generate an image from
 * @param {string} model - The model to use for image generation
 * @param {Object} options - Additional options for image generation
 * @returns {Promise<{imageUrl: string, enhancedPrompt?: string}>} - The generated image data
 */
async function generateImage(prompt, model = 'imagen-3.0-fast-generate-001', options = {}) {
  try {
    // Enforce rate limits before making the request
    await enforceRateLimit(model);
    
    // Initialize Vertex AI client
    const vertexAI = initializeVertexAI();
    
    // Get the generative model
    const generativeModel = vertexAI.getGenerativeModel({
      model
    });
    
    // Generate the image
    console.log(`Generating image with prompt: "${prompt.substring(0, 50)}..."`);
    console.log(`Using model: ${model}`);
    
    const response = await generativeModel.generateImages({
      prompt,
      sampleCount: 1,
      ...options
    });
    
    // Process the response
    if (!response || !response.images || response.images.length === 0) {
      throw new Error('No images were generated');
    }
    
    return {
      imageUrl: `data:image/png;base64,${response.images[0].bytesBase64}`,
      enhancedPrompt: response.promptFeedback?.enhancedPrompt
    };
    
  } catch (error) {
    console.error('Error generating image:', error.message);
    throw error;
  }
}

/**
 * Generate multiple images with rate limiting
 * 
 * @param {string} prompt - The text prompt to generate images from
 * @param {number} count - Number of images to generate
 * @param {string} model - The model to use for image generation
 * @param {Object} options - Additional options for image generation
 * @returns {Promise<Array<{imageUrl: string, enhancedPrompt?: string}>>} - Array of generated image data
 */
async function generateMultipleImages(prompt, count = 4, model = 'imagen-3.0-fast-generate-001', options = {}) {
  const results = [];
  
  for (let i = 0; i < count; i++) {
    try {
      console.log(`Generating image ${i + 1}/${count}...`);
      
      // Generate the image with rate limiting
      const result = await generateImage(prompt, model, options);
      results.push(result);
      
    } catch (error) {
      console.error(`Error generating image ${i + 1}/${count}:`, error.message);
      
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

// Test function to demonstrate usage
async function testImageGeneration() {
  try {
    console.log('Testing image generation with quota handling...');
    
    const prompt = 'A beautiful landscape with mountains and a lake, digital art style';
    const model = 'imagen-3.0-fast-generate-001';
    
    console.log(`Generating 3 images with model: ${model}`);
    const results = await generateMultipleImages(prompt, 3, model);
    
    console.log(`Successfully generated ${results.length} images.`);
    
  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

// Export functions
module.exports = {
  generateImage,
  generateMultipleImages,
  testImageGeneration
};

// If this script is run directly, run the test
if (require.main === module) {
  testImageGeneration();
}
