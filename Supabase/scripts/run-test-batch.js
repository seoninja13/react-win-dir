/**
 * Run Test Batch Script (JavaScript Version)
 * 
 * This script runs a test batch of image generation using the Google Vertex AI API.
 * It processes a small CSV file with 5 test entries, generates images using the
 * imagen-3.0-fast-generate-001 model, and saves them to Supabase Storage.
 */

// Import required modules
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync';
import { VertexAI } from '@google-cloud/vertexai';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Get current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

// Constants
const TEST_CSV_PATH = path.join(__dirname, '../test-data/test-images.csv');
const RESULTS_JSON_PATH = path.join(__dirname, '../test-data/generation-results.json');
const GENERATED_IMAGES_BUCKET = 'generated-images';

// Initialize Supabase clients
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Create two clients: one with anon key for public operations, one with service role key for admin operations
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Initialize Vertex AI client
const vertexAI = new VertexAI({
  project: process.env.GOOGLE_CLOUD_PROJECT,
  location: process.env.GOOGLE_CLOUD_LOCATION || 'us-central1',
});

/**
 * Generate an image using Vertex AI
 * 
 * @param {string} prompt - The text prompt to generate an image from
 * @returns {Promise<{imageUrl: string, enhancedPrompt?: string}>} - The generated image data
 */
async function generateImage(prompt) {
  console.log(`Generating image with prompt: "${prompt.substring(0, 50)}..."`);
  
  try {
    // Get the generative model
    const generativeModel = vertexAI.preview.getGenerativeModel({
      model: "imagen-3.0-fast-generate-001",
    });
    
    // Generate the image
    const request = {
      prompt: {
        text: prompt,
      },
      sampleCount: 1,
    };
    
    const response = await generativeModel.generateImage(request);
    
    if (!response.images || response.images.length === 0) {
      throw new Error('No image was generated');
    }
    
    // Convert the image to a base64 data URL
    const imageUrl = `data:image/png;base64,${response.images[0].bytesBase64}`;
    
    return {
      imageUrl,
      enhancedPrompt: response.promptFeedback?.enhancedPrompt,
    };
  } catch (error) {
    console.error('Error generating image:', error.message);
    throw error;
  }
}

/**
 * Upload an image to Supabase Storage
 * 
 * @param {string} imageUrl - The image URL (data URL)
 * @param {string} fileName - The file name to save the image as
 * @returns {Promise<string>} - The URL of the uploaded image
 */
async function uploadImage(imageUrl, fileName) {
  console.log(`Uploading image: ${fileName}`);
  
  try {
    // Create bucket if it doesn't exist
    const { error: bucketError } = await supabaseAdmin.storage.createBucket(
      GENERATED_IMAGES_BUCKET,
      { public: true }
    );
    
    if (bucketError && bucketError.message !== 'Bucket already exists') {
      throw bucketError;
    }
    
    // Convert data URL to blob
    const base64Data = imageUrl.split(',')[1];
    const blob = Buffer.from(base64Data, 'base64');
    
    // Upload to Supabase using admin client for higher privileges
    const filePath = `${Date.now()}-${fileName}`;
    const { data, error } = await supabaseAdmin.storage
      .from(GENERATED_IMAGES_BUCKET)
      .upload(filePath, blob, {
        contentType: 'image/png',
        upsert: true,
      });
    
    if (error) {
      throw error;
    }
    
    // Get public URL
    const { data: publicUrlData } = supabaseAdmin.storage
      .from(GENERATED_IMAGES_BUCKET)
      .getPublicUrl(filePath);
    
    return publicUrlData.publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error.message);
    throw error;
  }
}

/**
 * Process the test batch CSV file
 * 
 * @returns {Promise<Array>} - Array of generation results
 */
async function processTestBatch() {
  console.log('Starting test batch processing...');
  console.log(`Reading CSV file: ${TEST_CSV_PATH}`);
  
  try {
    // Read and parse the CSV file
    const fileContent = fs.readFileSync(TEST_CSV_PATH, 'utf8');
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    });
    
    console.log(`Found ${records.length} entries to process`);
    
    // Process each entry
    const results = [];
    
    for (let i = 0; i < records.length; i++) {
      const entry = records[i];
      console.log(`\nProcessing entry ${i + 1}/${records.length}: ${entry.target_url}`);
      
      const startTime = Date.now();
      
      try {
        // Generate image
        const { imageUrl, enhancedPrompt } = await generateImage(entry.prompt);
        
        // Upload to Supabase
        const fileName = `${entry.image_type}-${entry.target_url.replace(/\//g, '-')}.png`;
        const supabaseUrl = await uploadImage(imageUrl, fileName);
        
        // Record result
        const endTime = Date.now();
        results.push({
          entry,
          imageUrl,
          supabaseUrl,
          enhancedPrompt,
          success: true,
          timestamp: new Date().toISOString(),
          processingTimeMs: endTime - startTime,
        });
        
        console.log(`✅ Successfully generated and uploaded image for ${entry.target_url}`);
      } catch (error) {
        // Record error
        results.push({
          entry,
          success: false,
          error: {
            message: error.message,
            stack: error.stack,
          },
          timestamp: new Date().toISOString(),
        });
        
        console.error(`❌ Failed to process ${entry.target_url}: ${error.message}`);
      }
    }
    
    return results;
  } catch (error) {
    console.error('Error processing test batch:', error);
    throw error;
  }
}

/**
 * Save results to a JSON file
 * 
 * @param {Array} results - Array of generation results
 */
function saveResultsToJson(results) {
  console.log(`Saving results to: ${RESULTS_JSON_PATH}`);
  
  try {
    const resultsJson = JSON.stringify(results, null, 2);
    fs.writeFileSync(RESULTS_JSON_PATH, resultsJson, 'utf8');
    console.log('Results saved successfully');
  } catch (error) {
    console.error('Error saving results:', error.message);
  }
}

/**
 * Main function
 */
async function main() {
  console.log('Starting test batch image generation process...');
  console.log('This will process 5 test entries from the CSV file.');
  console.log('Using model: imagen-3.0-fast-generate-001');
  
  try {
    // Process test batch
    const results = await processTestBatch();
    
    // Save results to JSON
    saveResultsToJson(results);
    
    // Log summary
    const successCount = results.filter(r => r.success).length;
    console.log('\n===== SUMMARY =====');
    console.log(`Total entries processed: ${results.length}`);
    console.log(`Successfully generated: ${successCount}`);
    console.log(`Failed: ${results.length - successCount}`);
    
    if (successCount < results.length) {
      console.log('\nFailed entries:');
      results.filter(r => !r.success).forEach(result => {
        console.log(`- ${result.entry.target_url}: ${result.error?.message || 'Unknown error'}`);
      });
    }
    
    console.log('\nSuccessfully generated images:');
    results.filter(r => r.success).forEach(result => {
      console.log(`- ${result.entry.target_url}: ${result.supabaseUrl || result.imageUrl.substring(0, 50) + '...'}`);
    });
    
    console.log('\nTest batch processing complete!');
  } catch (error) {
    console.error('Unhandled error:', error);
    process.exit(1);
  }
}

// Run the script
main();
