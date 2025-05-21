/**
 * Imagen Test Batch Script
 * 
 * This script runs a test batch of image generation using the Google Vertex AI Imagen API.
 * It processes 5 test entries, generates images using the imagen-3.0-fast-generate-001 model,
 * and saves them to Supabase Storage.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import { VertexAI } from '@google-cloud/vertexai';
import dotenv from 'dotenv';

// Get current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

// Constants
const TEST_DATA = [
  {
    original_url: 'https://www.windowworldla.com/',
    target_url: '/',
    image_type: 'homepage',
    prompt: 'A photorealistic image of a modern two-story house with several large, white vinyl double-hung windows. The windows should have a clean, contemporary design. The house is light gray with dark trim. The setting is a sunny day with a well-maintained lawn and landscaping. Focus on showcasing the clarity and design of the windows.'
  },
  {
    original_url: 'https://www.windowworldla.com/windows/',
    target_url: '/windows',
    image_type: 'product_category',
    prompt: 'A visually appealing arrangement of various window styles offered by Window World. Include a white vinyl double-hung window, a wood casement window, a 2-lite sliding window, a bay window with three sections, and a custom geometric arched window. Arrange them creatively to represent the diversity of their window line. Use soft, diffused lighting.'
  },
  {
    original_url: 'https://www.windowworldla.com/windows/double-hung-windows/',
    target_url: '/windows/double-hung-windows',
    image_type: 'product_detail',
    prompt: 'A close-up, high-resolution image of a white vinyl double-hung window. Highlight the features such as the sashes, locking mechanism, and tilt-in functionality. The background should be a neutral gray. Use studio lighting to minimize shadows and emphasize the details.'
  },
  {
    original_url: 'https://www.windowworldla.com/about-us/',
    target_url: '/about-us',
    image_type: 'informational',
    prompt: 'An image depicting a happy, diverse family (two adults, two children) playing with two golden retriever dogs in a bright, sunny living room. A large window with white frames is visible in the background, showcasing a view of a green garden, suggesting a connection to natural light and a comfortable home environment.'
  },
  {
    original_url: 'https://www.windowworldla.com/gallery/',
    target_url: '/gallery',
    image_type: 'gallery',
    prompt: 'A charming traditional-style house with newly installed white wood-look double-hung windows and green louvered shutters.'
  }
];
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
 * Generate an image using Vertex AI Imagen
 * 
 * @param {string} prompt - The text prompt to generate an image from
 * @returns {Promise<{imageUrl: string, enhancedPrompt?: string}>} - The generated image data
 */
async function generateImage(prompt) {
  console.log(`Generating image with prompt: "${prompt.substring(0, 50)}..."`);
  
  try {
    // Get the generative model
    const model = "imagen-3.0-fast-generate-001";
    const generationModel = vertexAI.preview.getGenerativeModel({
      model,
      generationConfig: {
        sampleCount: 1,
      },
    });
    
    // Generate content with the image generation request
    const request = {
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt }
          ]
        }
      ],
      generationConfig: {
        responseStreamingConfig: { streamMode: "NONE" },
      },
    };
    
    // Call the model
    const response = await generationModel.generateContent(request);
    const fullResponse = await response.response;
    
    // Extract image data
    let imageData = null;
    for (const part of fullResponse.candidates[0].content.parts) {
      if (part.inlineData) {
        imageData = part.inlineData;
        break;
      }
    }
    
    if (!imageData) {
      throw new Error('No image was generated in the response');
    }
    
    // Convert to data URL
    const imageUrl = `data:${imageData.mimeType};base64,${imageData.data}`;
    
    return {
      imageUrl,
      enhancedPrompt: prompt, // Original prompt, as we don't get an enhanced one
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
 * Process the test batch
 * 
 * @returns {Promise<Array>} - Array of generation results
 */
async function processTestBatch() {
  console.log('Starting test batch processing...');
  
  try {
    const testEntries = TEST_DATA;
    console.log(`Found ${testEntries.length} entries to process`);
    
    // Process each entry
    const results = [];
    
    for (let i = 0; i < testEntries.length; i++) {
      const entry = testEntries[i];
      console.log(`\nProcessing entry ${i + 1}/${testEntries.length}: ${entry.target_url}`);
      
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
  console.log('This will process 5 test entries.');
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
