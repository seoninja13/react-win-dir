/**
 * Check Supabase Bucket Script
 * 
 * This script checks if the generated-images bucket exists in Supabase Storage
 * and creates it if it doesn't exist.
 */

import { createBucketIfNotExists } from '../utils/storage.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Get current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../../.env.local') });

async function main() {
  console.log('Checking if Supabase bucket exists...');
  
  try {
    const result = await createBucketIfNotExists('generated-images', true);
    
    if (result) {
      console.log('Supabase bucket "generated-images" is ready for use.');
    } else {
      console.error('Failed to create or verify Supabase bucket.');
    }
  } catch (error) {
    console.error('Error checking Supabase bucket:', error);
    process.exit(1);
  }
}

// Run the script
main().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
