/**
 * Vertex AI Image Generation Test
 * 
 * This script uses the existing Google Gen-AI SDK authentication
 * to test image generation with Vertex AI.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { initializeVertexAIClient, generateMultipleImages } from '../utils/vertex-ai-client.js';

// Get current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

// Constants
const OUTPUT_DIR = path.resolve(__dirname, '../../Docs/Image generation/test-output');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
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
async function testVertexAI() {
  console.log('Testing Vertex AI image generation with existing Gen-AI SDK...');
  console.log(`Project ID: ${process.env.GOOGLE_CLOUD_PROJECT}`);
  console.log(`Location: ${process.env.GOOGLE_CLOUD_LOCATION}`);
  
  try {
    // Create a test prompt
    const testPrompt = 'A beautiful double-hung window with white frame against a blue sky, photorealistic';
    console.log(`Test prompt: "${testPrompt}"`);
    
    // Generate images using the existing client
    console.log('Generating images...');
    const images = await generateMultipleImages(testPrompt, {
      numberOfImages: 1,
      aspectRatio: '4:3',
      model: 'imagen-3.0-generate-002'
    });
    
    if (images && images.length > 0) {
      console.log(`Generated ${images.length} images successfully!`);
      
      // Save the first image
      const outputPath = path.resolve(OUTPUT_DIR, 'genai-sdk-test.png');
      saveImageToFile(images[0].imageUrl, outputPath);
      
      // Save enhanced prompt if available
      if (images[0].enhancedPrompt) {
        console.log(`Enhanced prompt: ${images[0].enhancedPrompt}`);
        fs.writeFileSync(
          path.resolve(OUTPUT_DIR, 'genai-enhanced-prompt.txt'),
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
    console.error(error.stack);
    return false;
  }
}

// Run the test
testVertexAI()
  .then(success => {
    if (success) {
      console.log('Vertex AI test completed successfully!');
    } else {
      console.error('Vertex AI test failed.');
      process.exit(1);
    }
  })
  .catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
