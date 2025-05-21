/**
 * Imagen Client for Windows & Doors Website
 * 
 * This module provides a robust client for generating images using Google Cloud's Vertex AI Imagen models.
 * It implements rate limiting to handle quota limits gracefully.
 * 
 * Documentation:
 * - Vertex AI: https://cloud.google.com/vertex-ai/docs/reference/rest/?apix=true#rest-resource:-v1.media
 * - Authentication: https://cloud.google.com/vertex-ai/docs/authentication
 */

import { VertexAI } from '@google-cloud/vertexai';
import dotenv from 'dotenv';

// Load environment variables if not already loaded
if (!process.env.GOOGLE_CLOUD_PROJECT) {
  dotenv.config({ path: '.env.local' });
}

// Environment variables
const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT || 'mold-removal-lead-gen';
const LOCATION = process.env.GOOGLE_CLOUD_LOCATION || 'us-central1';

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

/**
 * Generate a product image with rate limiting
 * 
 * @param {string} productName - The name of the product
 * @param {string} productDescription - The description of the product
 * @param {string} productCategory - The category of the product (windows, doors, etc.)
 * @param {Object} options - Additional options for image generation
 * @returns {Promise<{imageUrl: string, enhancedPrompt?: string}>} - The generated image data
 */
async function generateProductImage(productName, productDescription, productCategory, options = {}) {
  try {
    // Create a detailed prompt for the product
    const enhancedPrompt = `A high-quality, professional product image of a ${productName} for a windows and doors website. ${productDescription}. The image should be well-lit, with a clean background, and showcase the ${productCategory} from a flattering angle. Use photorealistic style with attention to detail.`;
    
    // Set default model
    const model = options.model || 'imagen-3.0-fast-generate-001';
    
    // Generate image with rate limiting
    return await generateImage(enhancedPrompt, model, options);
    
  } catch (error) {
    console.error('Product image generation failed:', error);
    throw error;
  }
}

/**
 * Generate multiple product images with variations using rate limiting
 * 
 * @param {string} productName - The name of the product
 * @param {string} productDescription - The description of the product
 * @param {string} productCategory - The category of the product (windows, doors, etc.)
 * @param {number} count - Number of variations to generate
 * @param {Object} options - Additional options for image generation
 * @returns {Promise<Array<{imageUrl: string, enhancedPrompt?: string}>>} - Array of generated image data
 */
async function generateProductImageVariations(productName, productDescription, productCategory, count = 4, options = {}) {
  try {
    // Create a detailed prompt for the product
    const prompt = `High-quality professional product image of ${productName}, a ${productCategory} product. ${productDescription}. The image should be well-lit, with a clean background, showing the product from a clear angle. Photorealistic, detailed, product photography style.`;
    
    // Set default model and options
    const model = options.model || 'imagen-3.0-fast-generate-001';
    const mergedOptions = {
      aspectRatio: '1:1',
      ...options
    };
    
    // Generate multiple images with rate limiting
    return await generateMultipleImages(prompt, count, model, mergedOptions);
    
  } catch (error) {
    console.error('Product image variations generation failed:', error);
    throw error;
  }
}

// Export functions
export {
  generateImage,
  generateMultipleImages,
  generateProductImage,
  generateProductImageVariations
};
