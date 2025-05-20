/**
 * Vertex AI Image Generation - REST API Implementation
 * 
 * This script demonstrates how to use the Vertex AI REST API for image generation.
 * Based on: https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/imagen-api
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

// Get current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

// Constants
const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT;
const LOCATION = process.env.GOOGLE_CLOUD_LOCATION || 'us-west1';
const API_KEY = process.env.GEMINI_API_KEY;
const MODEL_VERSION = 'imagen-3.0-generate-002';
const OUTPUT_DIR = path.resolve(__dirname, '../../Docs/Image generation/test-output');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Generate an image using Vertex AI REST API
 * 
 * @param {string} prompt - The text prompt for image generation
 * @param {Object} options - Additional options
 * @returns {Promise<Array<{imageUrl: string, enhancedPrompt?: string}>>} - Generated images
 */
async function generateImageWithREST(prompt, options = {}) {
  console.log('Generating image with REST API...');
  console.log(`Prompt: "${prompt}"`);
  
  const {
    sampleCount = 1,
    aspectRatio = '1:1',
    addWatermark = false,
    enhancePrompt = true,
  } = options;
  
  try {
    // Construct the API URL with API key as query parameter
    const apiUrl = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${MODEL_VERSION}:predict?key=${API_KEY}`;
    
    console.log(`API URL: ${apiUrl.replace(API_KEY, API_KEY.substring(0, 10) + '...')}`);
    
    // Prepare the request payload according to the documentation
    const payload = {
      instances: [
        {
          prompt: prompt
        }
      ],
      parameters: {
        sampleCount: sampleCount,
        aspectRatio: aspectRatio,
        addWatermark: addWatermark,
        enhancePrompt: enhancePrompt,
        outputOptions: {
          mimeType: "image/png"
        }
      }
    };
    
    console.log('Request payload:', JSON.stringify(payload, null, 2));
    
    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // Using API key in URL query parameter instead of Authorization header
      },
      body: JSON.stringify(payload)
    });
    
    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed with status ${response.status}: ${errorText}`);
    }
    
    // Parse the response
    const data = await response.json();
    console.log('Received response from Vertex AI');
    
    // Extract the image data
    if (!data.predictions || data.predictions.length === 0) {
      throw new Error('No images were generated');
    }
    
    // Process the images - handle different response formats
    const images = [];
    
    // Check the structure of the response
    if (data.predictions) {
      // Standard format
      for (const prediction of data.predictions) {
        // The base64 data might be in different fields depending on the API version
        const base64Data = prediction.bytesBase64 || prediction.imageBytes || prediction.image;
        
        if (base64Data) {
          images.push({
            imageUrl: `data:image/png;base64,${base64Data}`,
            enhancedPrompt: prediction.promptFeedback?.enhancedPrompt
          });
        }
      }
    } else if (data.images) {
      // Alternative format
      for (const image of data.images) {
        const base64Data = image.bytesBase64 || image.imageBytes || image.image;
        
        if (base64Data) {
          images.push({
            imageUrl: `data:image/png;base64,${base64Data}`,
            enhancedPrompt: data.promptFeedback?.enhancedPrompt
          });
        }
      }
    }
    
    if (images.length === 0) {
      console.log('Response structure:', JSON.stringify(data, null, 2));
      throw new Error('Could not extract image data from response');
    }
    
    return images;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}

/**
 * Save base64 image to file
 * 
 * @param {string} imageUrl - Base64 image data URL
 * @param {string} outputPath - Path to save the image
 */
function saveImageToFile(imageUrl, outputPath) {
  console.log(`Saving image to: ${outputPath}`);
  
  try {
    // Extract base64 data from data URL
    const base64Data = imageUrl.split(',')[1];
    if (!base64Data) {
      throw new Error('Invalid image data URL');
    }
    
    // Convert base64 to buffer
    const buffer = Buffer.from(base64Data, 'base64');
    
    // Save to file
    fs.writeFileSync(outputPath, buffer);
    
    console.log('Image saved successfully!');
  } catch (error) {
    console.error('Error saving image:', error);
    throw error;
  }
}

/**
 * Main test function
 */
async function testRESTAPI() {
  console.log('Testing Vertex AI REST API for image generation...');
  console.log(`Project ID: ${PROJECT_ID}`);
  console.log(`Location: ${LOCATION}`);
  console.log(`Model Version: ${MODEL_VERSION}`);
  console.log(`API Key: ${API_KEY ? API_KEY.substring(0, 10) + '...' : 'Not set'}`);
  
  try {
    // Create a test prompt
    const testPrompt = 'A beautiful double-hung window with white frame against a blue sky, photorealistic';
    
    // Generate image
    const images = await generateImageWithREST(testPrompt, {
      sampleCount: 1,
      aspectRatio: '4:3',
      addWatermark: false,
      enhancePrompt: true
    });
    
    if (images && images.length > 0) {
      console.log(`Generated ${images.length} images successfully!`);
      
      // Save the first image
      const outputPath = path.resolve(OUTPUT_DIR, 'rest-api-test.png');
      saveImageToFile(images[0].imageUrl, outputPath);
      
      // Save enhanced prompt if available
      if (images[0].enhancedPrompt) {
        console.log(`Enhanced prompt: ${images[0].enhancedPrompt}`);
        fs.writeFileSync(
          path.resolve(OUTPUT_DIR, 'rest-enhanced-prompt.txt'),
          images[0].enhancedPrompt
        );
      }
      
      return true;
    } else {
      console.error('No images were returned');
      return false;
    }
  } catch (error) {
    console.error('Test failed:', error);
    return false;
  }
}

// Run the test
testRESTAPI()
  .then(success => {
    if (success) {
      console.log('REST API test completed successfully!');
    } else {
      console.error('REST API test failed.');
      process.exit(1);
    }
  })
  .catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
