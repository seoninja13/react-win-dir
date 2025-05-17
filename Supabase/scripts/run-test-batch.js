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
import { createLogger, logErrorObject } from '../utils/logger.js';

// Get current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

// Constants
const TEST_CSV_PATH = path.join(__dirname, '../test-data/test-images.csv');
const RESULTS_JSON_PATH = path.join(__dirname, '../test-data/generation-results.json');
const GENERATED_IMAGES_BUCKET = 'generated-images';

// Create a logger for this script
const logger = createLogger('run-test-batch');

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
  await logger.info('Generating image', { promptPreview: prompt.substring(0, 50) + '...' });
  
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
    
    await logger.info('Image generated successfully', { 
      hasEnhancedPrompt: !!response.promptFeedback?.enhancedPrompt 
    });
    
    return {
      imageUrl,
      enhancedPrompt: response.promptFeedback?.enhancedPrompt,
    };
  } catch (error) {
    console.error('Error generating image:', error.message);
    await logErrorObject(error, 'run-test-batch', { stage: 'image-generation', promptPreview: prompt.substring(0, 100) });
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
  await logger.info('Uploading image to Supabase', { fileName });
  
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
    
    await logger.info('Image uploaded successfully', { fileName, publicUrl: publicUrlData.publicUrl });
    return publicUrlData.publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error.message);
    await logErrorObject(error, 'run-test-batch', { stage: 'upload-image', fileName });
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
  await logger.info('Starting test batch processing', { csvPath: TEST_CSV_PATH });
  
  try {
    
    // Read and parse the CSV file
    const fileContent = fs.readFileSync(TEST_CSV_PATH, 'utf8');
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    });
    
    console.log(`Found ${records.length} entries to process`);
    await logger.info('Parsed CSV file', { recordCount: records.length });
    
    // Process each entry
    const results = [];
    
    for (let i = 0; i < records.length; i++) {
      const entry = records[i];
      console.log(`\nProcessing entry ${i + 1}/${records.length}: ${entry.target_url}`);
      await logger.info(`Processing entry ${i + 1}/${records.length}`, { targetUrl: entry.target_url, imageType: entry.image_type });
      
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
        await logger.info('Successfully processed entry', { targetUrl: entry.target_url, processingTimeMs: Date.now() - startTime });
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
        await logErrorObject(error, 'run-test-batch', { 
          stage: 'process-entry', 
          targetUrl: entry.target_url, 
          imageType: entry.image_type 
        });
      }
    }
    
    return results;
  } catch (error) {
    console.error(`❌ Fatal error: ${error.message}`);
    console.error(error.stack);
    await logErrorObject(error, 'run-test-batch', { stage: 'process-test-batch' });
    throw error;
  }
}

/**
 * Save results to a JSON file
 * 
 * @param {Array} results - Array of generation results
 */
async function saveResultsToJson(results) {
  try {
    await logger.info('Saving results to JSON file', { path: RESULTS_JSON_PATH });
    
    // Create directory if it doesn't exist
    const dir = path.dirname(RESULTS_JSON_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Write results to file
    fs.writeFileSync(RESULTS_JSON_PATH, JSON.stringify(results, null, 2), 'utf8');
    await logger.info('Results saved successfully', { fileSize: fs.statSync(RESULTS_JSON_PATH).size });
  } catch (error) {
    console.error(`Error saving results to JSON: ${error.message}`);
    await logErrorObject(error, 'run-test-batch', { stage: 'save-results' });
    throw error;
  }
}

/**
 * Main function
 */
async function main() {
  try {
    await logger.info('Starting run-test-batch script');
    
    // Check environment variables
    const requiredEnvVars = [
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      'SUPABASE_SERVICE_ROLE_KEY',
      'GOOGLE_CLOUD_PROJECT',
    ];
    
    const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingEnvVars.length > 0) {
      const error = new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
      console.error(`❌ Error: ${error.message}`);
      await logger.error('Missing required environment variables', { missingVars: missingEnvVars });
      process.exit(1);
    }
    
    await logger.info('Environment validation successful');
    
    // Check if CSV file exists
    if (!fs.existsSync(TEST_CSV_PATH)) {
      const error = new Error(`Test CSV file not found at ${TEST_CSV_PATH}`);
      console.error(`❌ Error: ${error.message}`);
      await logger.error('Test CSV file not found', { path: TEST_CSV_PATH });
      process.exit(1);
    }
    
    // Process test batch
    const results = await processTestBatch();
    
    // Save results to JSON file
    await saveResultsToJson(results);
    
    // Print summary
    const successCount = results.filter(r => r.success).length;
    console.log(`\n✨ Test batch processing completed!`);
    console.log(`📊 Summary: ${successCount}/${results.length} images generated successfully`);
    console.log(`📄 Results saved to: ${RESULTS_JSON_PATH}`);
    
    await logger.info('Test batch processing completed', { 
      total: results.length,
      success: successCount,
      failed: results.length - successCount,
      successRate: `${Math.round((successCount / results.length) * 100)}%`,
      resultsPath: RESULTS_JSON_PATH
    });
    
    return results;
  } catch (error) {
    console.error(`❌ Fatal error in main: ${error.message}`);
    console.error(error.stack);
    await logErrorObject(error, 'run-test-batch', { stage: 'main' });
    process.exit(1);
  }
}

// Run the script
main();
