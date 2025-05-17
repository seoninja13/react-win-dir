/**
 * Vertex AI Client Utility (JavaScript Version)
 * 
 * This file provides utilities for initializing and using the Google Generative AI SDK
 * with Vertex AI for image generation and other generative AI tasks.
 * 
 * Documentation:
 * - Google Generative AI SDK: https://cloud.google.com/vertex-ai/generative-ai/docs/sdks/overview
 * - Vertex AI: https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/imagen-api
 * - Quickstart: https://cloud.google.com/vertex-ai/generative-ai/docs/image/quickstart-image-generate-console
 */

import { VertexAI } from '@google-cloud/vertexai';
import dotenv from 'dotenv';

// Load environment variables if not already loaded
if (!process.env.GOOGLE_CLOUD_PROJECT) {
  dotenv.config({ path: '.env.local' });
}

// Environment variables
const GOOGLE_CLOUD_PROJECT = process.env.GOOGLE_CLOUD_PROJECT;
const GOOGLE_CLOUD_LOCATION = process.env.GOOGLE_CLOUD_LOCATION || 'us-central1';

/**
 * Initialize the Vertex AI client
 * 
 * This function initializes the Vertex AI client for more advanced Vertex AI features.
 * 
 * @returns The Vertex AI client
 */
export function initializeVertexAIClient() {
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
 * Generate multiple images using Vertex AI
 * 
 * @param {string} prompt - The text prompt to generate images from
 * @param {Object} options - Additional options for image generation
 * @param {number} [options.numberOfImages=4] - Number of images to generate (1-4)
 * @param {string} [options.aspectRatio='1:1'] - Aspect ratio of the images ('1:1', '9:16', '16:9', '3:4', or '4:3')
 * @param {string} [options.model='imagen-3.0-generate-002'] - Model to use
 * @returns {Promise<Array<{imageUrl: string, enhancedPrompt?: string}>>} - Array of generated image data
 */
export async function generateMultipleImages(
  prompt,
  options = {}
) {
  console.log('Initializing Vertex AI client...');
  const vertexAI = initializeVertexAIClient();
  
  const {
    numberOfImages = 4,
    aspectRatio = '1:1',
    model = 'imagen-3.0-generate-002',
  } = options;
  
  console.log(`Using model: ${model}`);
  console.log(`Generating ${numberOfImages} images with aspect ratio ${aspectRatio}`);
  
  try {
    // Initialize the generative model
    const generativeModel = vertexAI.getGenerativeModel({
      model,
    });
    
    console.log('Sending request to Vertex AI...');
    
    // Use the same parameter names as in the TypeScript implementation
    const response = await generativeModel.generateImages({
      prompt,
      numberOfImages,
      aspectRatio,
    });
    
    console.log('Received response from Vertex AI');
    
    if (!response || !response.images || response.images.length === 0) {
      throw new Error('No images were generated');
    }
    
    // Process the response
    return response.images.map(image => ({
      imageUrl: `data:image/png;base64,${image.bytesBase64}`,
      enhancedPrompt: response.promptFeedback?.enhancedPrompt,
    }));
  } catch (error) {
    console.error('Error generating images:', error);
    throw error;
  }
}

/**
 * Generate a single image using Vertex AI
 * 
 * @param {string} prompt - The text prompt to generate an image from
 * @param {Object} options - Additional options for image generation
 * @param {string} [options.aspectRatio='1:1'] - Aspect ratio of the image
 * @param {string} [options.model='imagen-3.0-generate-002'] - Model to use
 * @returns {Promise<{imageUrl: string, enhancedPrompt?: string}>} - The generated image data
 */
export async function generateImage(
  prompt,
  options = {}
) {
  const results = await generateMultipleImages(prompt, {
    ...options,
    numberOfImages: 1,
  });
  
  return results[0];
}
