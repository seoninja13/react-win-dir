/**
 * Simple Test Script for Vertex AI API
 * 
 * This script tests the Google Cloud Vertex AI API with a simple image generation request.
 */

import { VertexAI } from '@google-cloud/vertexai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Get current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

// Set API key as environment variable
process.env.GOOGLE_API_KEY = process.env.GEMINI_API_KEY;

// Constants
const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT || 'mold-removal-lead-gen';
const LOCATION = process.env.GOOGLE_CLOUD_LOCATION || 'us-west1';
const API_KEY = process.env.GEMINI_API_KEY;
const OUTPUT_DIR = path.resolve(__dirname, '../../Docs/Image generation/test-output');
const OUTPUT_FILE = path.resolve(OUTPUT_DIR, 'test-image.png');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Simple logging function
function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${type === 'error' ? '❌ ERROR' : 'ℹ️ INFO'}: ${message}`;
  console.log(logMessage);
}

/**
 * Main test function
 */
async function testVertexAI() {
  log('Starting Vertex AI API test...');
  log(`Using Project ID: ${PROJECT_ID}`);
  log(`Using Location: ${LOCATION}`);
  log(`Using API Key: ${API_KEY ? API_KEY.substring(0, 10) + '...' : 'Not set'}`);
  
  try {
    // Initialize Vertex AI
    log('Initializing Vertex AI client...');
    const vertexAI = new VertexAI({
      project: PROJECT_ID,
      location: LOCATION,
    });
    
    // Create a simple test prompt
    const testPrompt = 'A beautiful double-hung window with white frame against a blue sky';
    log(`Test prompt: "${testPrompt}"`);
    
    // Get the generative model
    log('Getting generative model...');
    const generativeModel = vertexAI.getGenerativeModel({
      model: 'imagen-3.0-generate-002',
    });
    
    // Generate image
    log('Generating image...');
    const request = {
      prompt: testPrompt,
      sampleCount: 1,
    };
    
    const response = await generativeModel.generateImages(request);
    log('Received response from Vertex AI');
    
    // Check if we got images
    if (!response || !response.images || response.images.length === 0) {
      throw new Error('No images were generated');
    }
    
    // Save the image
    log('Saving image to file...');
    const imageData = response.images[0].base64Data;
    fs.writeFileSync(OUTPUT_FILE, Buffer.from(imageData, 'base64'));
    
    log(`Successfully generated and saved image to: ${OUTPUT_FILE}`);
    
    // Log enhanced prompt if available
    if (response.promptFeedback && response.promptFeedback.enhancedPrompt) {
      log(`Enhanced prompt: ${response.promptFeedback.enhancedPrompt}`);
    }
    
    return true;
  } catch (error) {
    log(`Error testing Vertex AI: ${error.message}`, 'error');
    console.error('Full error:', error);
    return false;
  }
}

// Run the test
testVertexAI()
  .then(success => {
    if (success) {
      log('Test completed successfully!');
      process.exit(0);
    } else {
      log('Test failed.', 'error');
      process.exit(1);
    }
  })
  .catch(error => {
    log(`Unhandled error: ${error.message}`, 'error');
    process.exit(1);
  });
