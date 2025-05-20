/**
 * Generate Test Batch Script (JavaScript Version)
 * 
 * This script generates a small batch of test images using Google Cloud's Vertex AI
 * based on the processed image data.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import { generateMultipleImages } from '../utils/vertex-ai-client.js';
import dotenv from 'dotenv';

// Get current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Constants
const RESULTS_PATH = path.resolve(__dirname, '../../Docs/Image generation/test-batch-results.json');
const LOG_PATH = path.resolve(__dirname, '../../Docs/Image generation/test-batch-log.txt');
const BATCH_SIZE = 5; // Small test batch
const PROCESSED_DATA_PATH = path.resolve(__dirname, '../../Docs/Image generation/processed-image-data.json');

// Simple logging function
function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${type === 'error' ? '❌ ERROR' : 'ℹ️ INFO'}: ${message}`;
  
  console.log(logMessage);
  
  // Append to log file if it exists
  if (fs.existsSync(path.dirname(LOG_PATH))) {
    fs.appendFileSync(LOG_PATH, logMessage + '\n');
  }
  
  // Also log to Supabase if credentials are available
  if (supabaseUrl && supabaseAnonKey) {
    try {
      supabase.from('logs').insert({
        level: type.toUpperCase(),
        message,
        source: 'generate-test-batch.js',
        timestamp: new Date().toISOString()
      }).then(() => {}, (err) => {
        console.error(`Failed to log to Supabase: ${err.message}`);
      });
    } catch (error) {
      console.error(`Failed to log to Supabase: ${error.message}`);
    }
  }
}

/**
 * Load processed data from the JSON file
 */
async function loadProcessedData() {
  try {
    if (!fs.existsSync(PROCESSED_DATA_PATH)) {
      throw new Error(`Processed data file not found: ${PROCESSED_DATA_PATH}`);
    }
    
    const data = JSON.parse(fs.readFileSync(PROCESSED_DATA_PATH, 'utf8'));
    return data.images || [];
  } catch (error) {
    log(`Error loading processed data: ${error.message}`, 'error');
    throw error;
  }
}

/**
 * Select a test batch of images from the processed data
 */
function selectTestBatch(processedData, count = 5) {
  // Sort by priority (if available) and take the first 'count' items
  const sortedData = [...processedData].sort((a, b) => {
    return (b.priority || 0) - (a.priority || 0);
  });
  
  return sortedData.slice(0, count);
}

/**
 * Save results to a JSON file
 */
async function saveResults(results) {
  try {
    fs.writeFileSync(RESULTS_PATH, JSON.stringify(results, null, 2), 'utf8');
    log(`Results saved to ${RESULTS_PATH}`);
  } catch (error) {
    log(`Error saving results: ${error.message}`, 'error');
    throw error;
  }
}

/**
 * Generate an image using Vertex AI
 */
async function generateImage(prompt, imageType) {
  log(`Generating image with prompt: "${prompt.substring(0, 50)}..."`);
  
  try {
    // Generate the image using Vertex AI
    const imageData = await generateMultipleImages(prompt, {
      numberOfImages: 1,
      aspectRatio: getAspectRatio(imageType),
      model: 'imagen-3.0-generate-002',
    });
    
    if (!imageData || imageData.length === 0 || !imageData[0].imageUrl) {
      throw new Error('No image was generated');
    }
    
    return imageData[0];
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
 * Get the appropriate aspect ratio for an image type
 */
function getAspectRatio(imageType) {
  switch (imageType.toLowerCase()) {
    case 'hero':
      return '16:9';
    case 'banner':
      return '16:9';
    case 'background':
      return '16:9';
    case 'gallery':
      return '4:3';
    case 'product':
      return '1:1';
    case 'thumbnail':
      return '1:1';
    case 'icon':
      return '1:1';
    default:
      return '1:1';
  }
}

/**
 * Main function to process the test batch
 */
async function processTestBatch() {
  // Ensure log file exists and clear it
  if (!fs.existsSync(path.dirname(LOG_PATH))) {
    fs.mkdirSync(path.dirname(LOG_PATH), { recursive: true });
  }
  fs.writeFileSync(LOG_PATH, ''); // Clear log file
  
  log('Starting test batch processing...');
  log(`Using Google Cloud Project: ${process.env.GOOGLE_CLOUD_PROJECT}`);
  log(`Using Google Cloud Location: ${process.env.GOOGLE_CLOUD_LOCATION}`);
  
  try {
    // Test the API with a simple prompt first
    log('Testing Vertex AI API with a simple prompt...');
    
    const testPrompt = 'A beautiful double-hung window with white frame against a blue sky';
    log(`Test prompt: "${testPrompt}"`);
    
    try {
      // Generate a test image
      const { imageUrl, enhancedPrompt } = await generateImage(testPrompt, 'product');
      
      // Save image to Supabase storage
      const imagePath = await saveImageToSupabase(imageUrl, 'test-images/api-test.png');
      
      log(`Successfully generated test image: ${imagePath}`);
      log(`Enhanced prompt: ${enhancedPrompt || 'None provided'}`);
      
      // If the test is successful, proceed with the batch
      log('API test successful! Proceeding with batch processing...');
      
      // Load processed data
      const processedData = await loadProcessedData();
      log(`Loaded processed data with ${processedData.length} images`);
      
      // Select a small batch for testing (just 2 for faster testing)
      const testBatch = selectTestBatch(processedData, 2);
      log(`Selected ${testBatch.length} images for test batch`);
      
      // Process each image in the test batch
      const results = [];
      let successCount = 0;
      
      for (let i = 0; i < testBatch.length; i++) {
        const item = testBatch[i];
        log(`Processing image ${i + 1}/${testBatch.length}: ${item.imageType} for ${item.originalUrl.substring(0, 50)}...`);
        
        try {
          // Generate image
          const { imageUrl, enhancedPrompt } = await generateImage(item.enhancedPrompt, item.imageType);
          
          // Save image to Supabase storage
          const imagePath = await saveImageToSupabase(imageUrl, item.newImagePath);
          
          // Update result
          results.push({
            ...item,
            generatedImageUrl: imagePath,
            enhancedPrompt,
            status: 'success',
          });
          
          successCount++;
          log(`Successfully generated image ${i + 1}: ${imagePath}`);
          
          // Add a small delay between requests to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 2000));
        } catch (error) {
          log(`Error processing image ${i + 1}: ${error.message}`, 'error');
          
          results.push({
            ...item,
            error: error.message,
            status: 'error',
          });
          
          // Add a longer delay after an error
          await new Promise(resolve => setTimeout(resolve, 5000));
        }
      }
      
      // Save results
      await saveResults(results);
      
      // Summary
      log(`Summary: ${successCount}/${testBatch.length} images generated successfully`);
      return results;
    } catch (error) {
      log(`API test failed: ${error.message}`, 'error');
      log('Error details:', 'error');
      console.error(error);
      throw error;
    }
  } catch (error) {
    log(`Fatal error: ${error.message}`, 'error');
    throw error;
  }
}

// Run the script
processTestBatch().catch(error => {
  log(`Unhandled error: ${error.message}`, 'error');
  process.exit(1);
});
