/**
 * Simple Vertex AI Test
 * 
 * This script tests the Vertex AI image generation with your OAuth credentials.
 * It uses a simplified approach focused on getting a working implementation.
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
const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT || 'mold-removal-lead-gen';
const LOCATION = process.env.GOOGLE_CLOUD_LOCATION || 'us-west1';
const API_KEY = process.env.GEMINI_API_KEY;
const MODEL_VERSION = 'imagen-3.0-generate-002';
const OUTPUT_DIR = path.resolve(__dirname, '../../Docs/Image generation/test-output');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Generate an image using Vertex AI
 */
async function generateImage(prompt) {
  console.log(`Generating image with prompt: "${prompt}"`);
  console.log(`Project ID: ${PROJECT_ID}`);
  console.log(`Location: ${LOCATION}`);
  console.log(`Model: ${MODEL_VERSION}`);
  
  try {
    // Construct the API URL
    const apiUrl = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${MODEL_VERSION}:predict?key=${API_KEY}`;
    
    // Prepare the request payload
    const payload = {
      instances: [
        { prompt }
      ],
      parameters: {
        sampleCount: 1,
        aspectRatio: "4:3"
      }
    };
    
    console.log('Sending request to Vertex AI...');
    
    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
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
    console.log('Response structure:', JSON.stringify(data, null, 2));
    
    // Save the response to a file for inspection
    fs.writeFileSync(
      path.resolve(OUTPUT_DIR, 'api-response.json'),
      JSON.stringify(data, null, 2)
    );
    
    console.log('Response saved to api-response.json');
    
    // Try to extract image data
    let imageBase64 = null;
    let enhancedPrompt = null;
    
    if (data.predictions && data.predictions.length > 0) {
      const prediction = data.predictions[0];
      imageBase64 = prediction.bytesBase64 || prediction.imageBytes || prediction.image;
      enhancedPrompt = prediction.promptFeedback?.enhancedPrompt;
    }
    
    if (imageBase64) {
      // Save the image
      const outputPath = path.resolve(OUTPUT_DIR, 'simple-test.png');
      fs.writeFileSync(outputPath, Buffer.from(imageBase64, 'base64'));
      console.log(`Image saved to: ${outputPath}`);
      
      // Save enhanced prompt if available
      if (enhancedPrompt) {
        console.log(`Enhanced prompt: ${enhancedPrompt}`);
        fs.writeFileSync(
          path.resolve(OUTPUT_DIR, 'enhanced-prompt.txt'),
          enhancedPrompt
        );
      }
      
      return true;
    } else {
      console.error('No image data found in the response');
      return false;
    }
  } catch (error) {
    console.error('Error generating image:', error);
    return false;
  }
}

// Run the test
const testPrompt = 'A beautiful double-hung window with white frame against a blue sky, photorealistic';
generateImage(testPrompt)
  .then(success => {
    if (success) {
      console.log('Image generation test completed successfully!');
    } else {
      console.error('Image generation test failed.');
      process.exit(1);
    }
  })
  .catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
