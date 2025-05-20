/**
 * Simple Image Generation Test
 * 
 * This script tests the Vertex AI image generation functionality
 * using our updated vertex-ai-client.js implementation.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { generateMultipleImages } from '../utils/vertex-ai-client.js';

// Get current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

// Output directory for test images
const OUTPUT_DIR = path.resolve(__dirname, '../../Docs/Image generation/test-output');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Simple test function to generate a single image
 */
async function testImageGeneration() {
  console.log('Starting simple image generation test...');
  console.log(`Using API Key: ${process.env.GEMINI_API_KEY ? '✅ Set' : '❌ Not set'}`);
  console.log(`Using Project ID: ${process.env.GOOGLE_CLOUD_PROJECT}`);
  console.log(`Using Location: ${process.env.GOOGLE_CLOUD_LOCATION}`);
  
  try {
    // Create a simple test prompt
    const testPrompt = 'A beautiful double-hung window with white frame against a blue sky, photorealistic';
    console.log(`Test prompt: "${testPrompt}"`);
    
    // Generate a single image
    console.log('Generating image...');
    const images = await generateMultipleImages(testPrompt, {
      numberOfImages: 1,
      aspectRatio: '4:3',
      model: 'imagen-3.0-generate-002',
    });
    
    if (!images || images.length === 0) {
      throw new Error('No images were generated');
    }
    
    console.log('Image generated successfully!');
    
    // Save the image to a file
    const image = images[0];
    const base64Data = image.imageUrl.split(',')[1];
    const imagePath = path.resolve(OUTPUT_DIR, 'test-image.png');
    
    fs.writeFileSync(imagePath, Buffer.from(base64Data, 'base64'));
    console.log(`Image saved to: ${imagePath}`);
    
    // Log enhanced prompt if available
    if (image.enhancedPrompt) {
      console.log(`Enhanced prompt: ${image.enhancedPrompt}`);
      fs.writeFileSync(
        path.resolve(OUTPUT_DIR, 'enhanced-prompt.txt'),
        image.enhancedPrompt
      );
    }
    
    return true;
  } catch (error) {
    console.error('Error generating image:', error);
    return false;
  }
}

// Run the test
testImageGeneration()
  .then(success => {
    if (success) {
      console.log('Test completed successfully!');
      process.exit(0);
    } else {
      console.error('Test failed.');
      process.exit(1);
    }
  })
  .catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
