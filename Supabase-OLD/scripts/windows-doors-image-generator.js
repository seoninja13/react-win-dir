/**
 * Windows Doors Image Generator
 * 
 * This script implements the Google Generative AI integration for the Windows Doors CA website.
 * It processes CSV data, generates images using Google Cloud's Vertex AI, and implements
 * batch processing functionality.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';

// Get current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

// Constants
const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT || 'mold-removal-lead-gen';
const LOCATION = process.env.GOOGLE_CLOUD_LOCATION || 'us-west1';
const API_KEY = process.env.GEMINI_API_KEY;
const CSV_FILE = path.resolve(__dirname, '../data/window-world-la-images.csv');
const PROCESSED_DATA_PATH = path.resolve(__dirname, '../data/processed-images.json');
const RESULTS_DIR = path.resolve(__dirname, '../../Docs/Image generation/test-batch-results');
const RESULTS_PATH = path.resolve(RESULTS_DIR, 'batch-results.json');
const LOG_PATH = path.resolve(RESULTS_DIR, 'batch-log.txt');
const BATCH_SIZE = 5; // Number of images to process in a batch

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Ensure directories exist
if (!fs.existsSync(path.dirname(PROCESSED_DATA_PATH))) {
  fs.mkdirSync(path.dirname(PROCESSED_DATA_PATH), { recursive: true });
}

if (!fs.existsSync(RESULTS_DIR)) {
  fs.mkdirSync(RESULTS_DIR, { recursive: true });
}

// Simple logging function
function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${type === 'error' ? '❌ ERROR' : 'ℹ️ INFO'}: ${message}`;
  
  console.log(logMessage);
  
  // Append to log file
  fs.appendFileSync(LOG_PATH, logMessage + '\n');
  
  // Also log to Supabase if credentials are available
  if (supabaseUrl && supabaseAnonKey) {
    try {
      supabase
        .from('logs')
        .insert([
          {
            level: type.toUpperCase(),
            message,
            source: 'windows-doors-image-generator',
            timestamp: new Date().toISOString()
          }
        ])
        .then(() => {})
        .catch(err => console.error('Error logging to Supabase:', err.message));
    } catch (error) {
      console.error('Error logging to Supabase:', error.message);
    }
  }
}

/**
 * Process CSV data from Window World LA website
 */
async function processCSV() {
  log('Starting CSV processing...');
  
  try {
    // Check if CSV file exists
    if (!fs.existsSync(CSV_FILE)) {
      throw new Error(`CSV file not found: ${CSV_FILE}`);
    }
    
    // Read and parse CSV file
    const csvData = fs.readFileSync(CSV_FILE, 'utf8');
    const records = parse(csvData, {
      columns: true,
      skip_empty_lines: true
    });
    
    log(`Parsed ${records.length} records from CSV`);
    
    // Process each record
    const processedImages = [];
    
    for (const record of records) {
      try {
        // Extract data from record
        const {
          originalUrl,
          imageType,
          description,
          priority
        } = record;
        
        if (!originalUrl || !imageType) {
          log(`Skipping record with missing data: ${JSON.stringify(record)}`, 'warning');
          continue;
        }
        
        // Generate a new image path
        const urlParts = new URL(originalUrl).pathname.split('/');
        const originalFilename = urlParts[urlParts.length - 1];
        const newImagePath = `generated/${imageType}/${originalFilename}`;
        
        // Create enhanced prompt for image generation
        const enhancedPrompt = `A photorealistic image of a ${description || imageType} for a windows and doors website. The image should be high quality, professional, and suitable for a home improvement website.`;
        
        // Add to processed images
        processedImages.push({
          originalUrl,
          imageType,
          description,
          priority: parseInt(priority || '0', 10),
          newImagePath,
          enhancedPrompt
        });
      } catch (error) {
        log(`Error processing record: ${error.message}`, 'error');
      }
    }
    
    // Save processed data
    const processedData = {
      stats: {
        totalImages: processedImages.length,
        processedAt: new Date().toISOString()
      },
      images: processedImages
    };
    
    fs.writeFileSync(PROCESSED_DATA_PATH, JSON.stringify(processedData, null, 2));
    log(`Processed data saved to ${PROCESSED_DATA_PATH}`);
    
    return processedData;
  } catch (error) {
    log(`Error processing CSV: ${error.message}`, 'error');
    throw error;
  }
}

/**
 * Generate an image using Vertex AI
 */
async function generateImage(prompt, imageType) {
  log(`Generating image with prompt: "${prompt.substring(0, 50)}..."`);
  
  try {
    // Get the appropriate aspect ratio
    const aspectRatio = getAspectRatio(imageType);
    
    // Construct the API URL with API key
    const apiUrl = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/imagen-3.0-generate-002:predict?key=${API_KEY}`;
    
    // Prepare the request payload
    const payload = {
      instances: [
        { prompt }
      ],
      parameters: {
        sampleCount: 1,
        aspectRatio,
        addWatermark: false,
        enhancePrompt: true
      }
    };
    
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
    
    // Extract image data
    if (!data.predictions || data.predictions.length === 0) {
      throw new Error('No images were generated');
    }
    
    const prediction = data.predictions[0];
    const imageBase64 = prediction.bytesBase64 || prediction.imageBytes || prediction.image;
    const enhancedPrompt = prediction.promptFeedback?.enhancedPrompt;
    
    if (!imageBase64) {
      throw new Error('No image data found in the response');
    }
    
    return {
      imageUrl: `data:image/png;base64,${imageBase64}`,
      enhancedPrompt
    };
  } catch (error) {
    log(`Error generating image: ${error.message}`, 'error');
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
      return '4:3';
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
 * Select a batch of images to process
 */
function selectBatch(processedData, batchSize = BATCH_SIZE) {
  const { images } = processedData;
  
  // Sort by priority (highest first)
  const sortedImages = [...images].sort((a, b) => (b.priority || 0) - (a.priority || 0));
  
  // Take the first batchSize images
  return sortedImages.slice(0, batchSize);
}

/**
 * Process a batch of images
 */
async function processBatch() {
  log('Starting batch processing...');
  
  try {
    // Process CSV data if needed
    let processedData;
    if (!fs.existsSync(PROCESSED_DATA_PATH)) {
      processedData = await processCSV();
    } else {
      processedData = JSON.parse(fs.readFileSync(PROCESSED_DATA_PATH, 'utf8'));
      log(`Loaded processed data with ${processedData.images.length} images`);
    }
    
    // Select a batch of images to process
    const batch = selectBatch(processedData);
    log(`Selected ${batch.length} images for batch processing`);
    
    // Process each image in the batch
    const results = [];
    let successCount = 0;
    
    for (let i = 0; i < batch.length; i++) {
      const item = batch[i];
      log(`Processing image ${i + 1}/${batch.length}: ${item.imageType} for ${item.originalUrl.substring(0, 50)}...`);
      
      try {
        // Generate image
        const { imageUrl, enhancedPrompt } = await generateImage(item.enhancedPrompt, item.imageType);
        
        // Save image to Supabase storage
        const publicUrl = await saveImageToSupabase(imageUrl, item.newImagePath);
        
        // Add to results
        results.push({
          originalUrl: item.originalUrl,
          imageType: item.imageType,
          description: item.description,
          newImagePath: item.newImagePath,
          publicUrl,
          enhancedPrompt,
          success: true,
          timestamp: new Date().toISOString()
        });
        
        successCount++;
        log(`Successfully generated and saved image ${i + 1}: ${publicUrl}`);
        
        // Add a small delay between requests to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        log(`Error processing image ${i + 1}: ${error.message}`, 'error');
        
        // Add to results
        results.push({
          originalUrl: item.originalUrl,
          imageType: item.imageType,
          description: item.description,
          newImagePath: item.newImagePath,
          error: error.message,
          success: false,
          timestamp: new Date().toISOString()
        });
        
        // Add a longer delay after an error
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }
    
    // Save results
    fs.writeFileSync(RESULTS_PATH, JSON.stringify(results, null, 2));
    log(`Batch processing completed. Results saved to ${RESULTS_PATH}`);
    
    // Summary
    log(`Summary: ${successCount}/${batch.length} images generated successfully`);
    
    return results;
  } catch (error) {
    log(`Error processing batch: ${error.message}`, 'error');
    throw error;
  }
}

/**
 * Create a review page for generated images
 */
async function createReviewPage(results) {
  log('Creating image review page...');
  
  try {
    // Create HTML content
    let html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Generated Images Review</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; }
          h1, h2 { color: #333; }
          .image-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
          .image-card { border: 1px solid #ddd; border-radius: 8px; overflow: hidden; }
          .image-card img { width: 100%; height: auto; }
          .image-info { padding: 15px; }
          .success { color: green; }
          .error { color: red; }
          .prompt { background: #f5f5f5; padding: 10px; border-radius: 4px; margin-top: 10px; font-size: 0.9em; }
        </style>
      </head>
      <body>
        <h1>Generated Images Review</h1>
        <p>Generated on: ${new Date().toISOString()}</p>
        <p>Total images: ${results.length}</p>
        <p>Successful: ${results.filter(r => r.success).length}</p>
        <p>Failed: ${results.filter(r => !r.success).length}</p>
        
        <h2>Images</h2>
        <div class="image-grid">
    `;
    
    // Add each image
    for (const result of results) {
      html += `
        <div class="image-card">
          <div class="image-info">
            <h3>${result.imageType}</h3>
            <p>${result.description || 'No description'}</p>
            <p class="${result.success ? 'success' : 'error'}">
              ${result.success ? 'Success' : `Error: ${result.error}`}
            </p>
      `;
      
      if (result.success && result.publicUrl) {
        html += `
          <img src="${result.publicUrl}" alt="${result.description || result.imageType}">
        `;
      }
      
      if (result.enhancedPrompt) {
        html += `
          <div class="prompt">
            <strong>Enhanced Prompt:</strong>
            <p>${result.enhancedPrompt}</p>
          </div>
        `;
      }
      
      html += `
          </div>
        </div>
      `;
    }
    
    html += `
        </div>
      </body>
      </html>
    `;
    
    // Save HTML file
    const htmlPath = path.resolve(RESULTS_DIR, 'review.html');
    fs.writeFileSync(htmlPath, html);
    
    log(`Review page created: ${htmlPath}`);
    
    return htmlPath;
  } catch (error) {
    log(`Error creating review page: ${error.message}`, 'error');
    throw error;
  }
}

/**
 * Main function
 */
async function main() {
  try {
    // Clear log file
    fs.writeFileSync(LOG_PATH, '');
    
    log('Starting Windows Doors Image Generator...');
    
    // Process a batch of images
    const results = await processBatch();
    
    // Create a review page
    const reviewPage = await createReviewPage(results);
    
    log('Image generation process completed successfully!');
    log(`Review page: ${reviewPage}`);
    
    return true;
  } catch (error) {
    log(`Fatal error: ${error.message}`, 'error');
    return false;
  }
}

// Run the script
main()
  .then(success => {
    if (success) {
      log('Script completed successfully!');
      process.exit(0);
    } else {
      log('Script failed.', 'error');
      process.exit(1);
    }
  })
  .catch(error => {
    log(`Unhandled error: ${error.message}`, 'error');
    process.exit(1);
  });
