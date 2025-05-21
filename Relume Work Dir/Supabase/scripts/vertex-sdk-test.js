/**
 * Vertex AI SDK Test
 * 
 * This script tests the connection to Vertex AI using the existing Google Gen AI SDK implementation.
 * Based on: https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/getting-started/intro_genai_sdk.ipynb
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
// Import the existing Vertex AI client
import { initializeVertexAIClient, generateMultipleImages } from '../utils/vertex-ai-client.js';

// Get current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

// Constants
const API_KEY = process.env.GEMINI_API_KEY;
const OUTPUT_DIR = path.resolve(__dirname, '../../Docs/Image generation/test-output');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Generate an image using the existing Vertex AI client
 */
async function generateImage(prompt) {
  console.log(`Generating image with prompt: "${prompt}"`);
  
  try {
    // Initialize the client using the existing implementation
    await initializeVertexAIClient();
    
    console.log('Sending request to generate image...');
    
    // Generate the image using the existing implementation
    const images = await generateMultipleImages(prompt, {
      numberOfImages: 1,
      aspectRatio: '4:3',
      model: 'imagen-3.0-generate-002'
    });
    
    console.log('Image generation successful!');
    
    if (images && images.length > 0) {
      // Get the image data
      const imageUrl = images[0].imageUrl;
      
      // Extract base64 data from data URL
      const base64Data = imageUrl.split(',')[1];
      
      // Save the image
      const outputPath = path.resolve(OUTPUT_DIR, 'sdk-test.png');
      fs.writeFileSync(outputPath, Buffer.from(base64Data, 'base64'));
      console.log(`Image saved to: ${outputPath}`);
      
      return true;
    } else {
      console.error('No images were returned');
      return false;
    }
  } catch (error) {
    console.error('Error generating image:', error);
    console.error('Error details:', error.message);
    if (error.stack) {
      console.error('Stack trace:', error.stack);
    }
    return false;
  }
}

/**
 * Main test function
 */
async function main() {
  console.log('Testing Vertex AI with Google Generative AI SDK...');
  
  try {
    // Create a test prompt
    const testPrompt = 'A beautiful double-hung window with white frame against a blue sky, photorealistic';
    
    // Generate image
    const success = await generateImage(testPrompt);
    
    if (success) {
      console.log('Test completed successfully!');
      return true;
    } else {
      console.error('Test failed.');
      return false;
    }
  } catch (error) {
    console.error('Unhandled error:', error);
    return false;
  }
}

// Run the test
main()
  .then(success => {
    if (success) {
      console.log('Script completed successfully!');
      process.exit(0);
    } else {
      console.error('Script failed.');
      process.exit(1);
    }
  })
  .catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
