/**
 * Run Test Batch Script
 * 
 * This script runs a test batch of image generation using the batch-image-generation utility.
 * It processes a small CSV file with 5 test entries, generates images using Vertex AI,
 * and saves them to Supabase Storage.
 */

import { processTestBatch, saveResultsToJson } from '../utils/batch-image-generation.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Get current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../../.env.local') });

async function main() {
  console.log('Starting test batch image generation process...');
  console.log('This will process 5 test entries from the CSV file.');
  
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
      console.log(`- ${result.entry.target_url}: ${result.imageUrl}`);
    });
    
    console.log('\nTest batch processing complete!');
  } catch (error) {
    console.error('Error running test batch:', error);
    process.exit(1);
  }
}

// Run the script
main().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
