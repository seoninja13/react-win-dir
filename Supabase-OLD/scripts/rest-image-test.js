/**
 * Vertex AI Image Generation - REST API Test
 * 
 * This script tests the Vertex AI image generation using the REST API directly.
 * Based on: https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/imagen-api
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { createClient } from '@supabase/supabase-js';

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

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
 * Generate an image using Vertex AI REST API
 */
async function generateImage(prompt, options = {}) {
  const {
    sampleCount = 1,
    aspectRatio = '1:1',
  } = options;
  
  log(`Generating image with prompt: "${prompt}"`);
  log(`Using API Key: ${API_KEY ? API_KEY.substring(0, 10) + '...' : 'Not set'}`);
  
  try {
    // Construct the API URL
    const apiUrl = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${MODEL_VERSION}:predict`;
    
    log(`API URL: ${apiUrl}`);
    
    // Prepare the request payload
    const payload = {
      instances: [
        {
          prompt: prompt
        }
      ],
      parameters: {
        sampleCount: sampleCount,
        aspectRatio: aspectRatio,
        enhancePrompt: true
      }
    };
    
    log('Sending request to Vertex AI...');
    
    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
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
    log('Received response from Vertex AI');
    
    // Extract the image data
    if (!data.predictions || data.predictions.length === 0) {
      throw new Error('No images were generated');
    }
    
    // Process the images
    const images = data.predictions.map(prediction => {
      return {
        imageUrl: `data:image/png;base64,${prediction.bytesBase64}`,
        enhancedPrompt: prediction.promptFeedback?.enhancedPrompt
      };
    });
    
    return images;
  } catch (error) {
    log(`Error generating image: ${error.message}`, 'error');
    throw error;
  }
}

/**
 * Save image to Supabase storage
 */
async function saveImageToSupabase(imageUrl, imagePath) {
  log(`Saving image to Supabase: ${imagePath}`);
  
  try {
    // Extract base64 data from data URL
    const base64Data = imageUrl.split(',')[1];
    if (!base64Data) {
      throw new Error('Invalid image data URL');
    }
    
    // Convert base64 to buffer
    const buffer = Buffer.from(base64Data, 'base64');
    
    // Ensure the path starts with a slash
    const normalizedPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
    
    // Upload to Supabase
    const { data, error } = await supabase.storage
      .from('images')
      .upload(normalizedPath, buffer, {
        contentType: 'image/png',
        upsert: true,
      });
    
    if (error) {
      throw new Error(`Supabase storage error: ${error.message}`);
    }
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(normalizedPath);
    
    return publicUrl;
  } catch (error) {
    log(`Error saving image: ${error.message}`, 'error');
    throw error;
  }
}

/**
 * Main test function
 */
async function testImageGeneration() {
  log('Starting Vertex AI REST API image generation test...');
  
  try {
    // Create a simple test prompt
    const testPrompt = 'A beautiful double-hung window with white frame against a blue sky, photorealistic';
    log(`Test prompt: "${testPrompt}"`);
    
    // Generate a single image
    const images = await generateImage(testPrompt, {
      sampleCount: 1,
      aspectRatio: '4:3'
    });
    
    if (!images || images.length === 0) {
      throw new Error('No images were generated');
    }
    
    log('Image generated successfully!');
    
    // Save the image to a file
    const image = images[0];
    const base64Data = image.imageUrl.split(',')[1];
    const imagePath = path.resolve(OUTPUT_DIR, 'rest-test-image.png');
    
    fs.writeFileSync(imagePath, Buffer.from(base64Data, 'base64'));
    log(`Image saved to: ${imagePath}`);
    
    // Save to Supabase
    const supabasePath = await saveImageToSupabase(image.imageUrl, 'test-images/rest-api-test.png');
    log(`Image saved to Supabase: ${supabasePath}`);
    
    // Log enhanced prompt if available
    if (image.enhancedPrompt) {
      log(`Enhanced prompt: ${image.enhancedPrompt}`);
      fs.writeFileSync(
        path.resolve(OUTPUT_DIR, 'rest-enhanced-prompt.txt'),
        image.enhancedPrompt
      );
    }
    
    return true;
  } catch (error) {
    log(`Error in test: ${error.message}`, 'error');
    console.error(error);
    return false;
  }
}

// Run the test
testImageGeneration()
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
