/**
 * Test Supabase Connection Script
 * 
 * This script tests basic CRUD operations with Supabase to verify that
 * our connection and permissions are working correctly before proceeding
 * with the image generation process.
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

// Initialize Supabase clients
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Create two clients: one with anon key for public operations, one with service role key for admin operations
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Constants
const GENERATED_IMAGES_BUCKET = 'generated-images';
const TEST_FILE_NAME = 'test-image.txt';

/**
 * Test bucket operations
 */
async function testBucketOperations() {
  console.log('\n=== Testing Bucket Operations ===');
  
  try {
    // 1. List buckets
    console.log('1. Listing buckets...');
    const { data: buckets, error: listError } = await supabaseAdmin.storage.listBuckets();
    
    if (listError) {
      throw listError;
    }
    
    console.log(`Found ${buckets.length} buckets:`, buckets.map(b => b.name).join(', '));
    
    // 2. Check if our bucket exists
    const bucketExists = buckets.some(bucket => bucket.name === GENERATED_IMAGES_BUCKET);
    console.log(`2. Bucket '${GENERATED_IMAGES_BUCKET}' exists: ${bucketExists}`);
    
    // 3. Create bucket if it doesn't exist
    if (!bucketExists) {
      console.log(`3. Creating bucket '${GENERATED_IMAGES_BUCKET}'...`);
      const { error: createError } = await supabaseAdmin.storage.createBucket(GENERATED_IMAGES_BUCKET, {
        public: true
      });
      
      if (createError) {
        throw createError;
      }
      
      console.log(`Bucket '${GENERATED_IMAGES_BUCKET}' created successfully.`);
    } else {
      console.log(`3. Bucket '${GENERATED_IMAGES_BUCKET}' already exists, skipping creation.`);
    }
    
    console.log('✅ Bucket operations test passed!');
    return true;
  } catch (error) {
    console.error('❌ Bucket operations test failed:', error.message);
    return false;
  }
}

/**
 * Test file operations
 */
async function testFileOperations() {
  console.log('\n=== Testing File Operations ===');
  
  try {
    // 1. Upload a test file
    console.log(`1. Uploading test file '${TEST_FILE_NAME}'...`);
    const testContent = 'This is a test file to verify Supabase Storage permissions.';
    const { error: uploadError } = await supabaseAdmin.storage
      .from(GENERATED_IMAGES_BUCKET)
      .upload(TEST_FILE_NAME, Buffer.from(testContent), {
        contentType: 'text/plain',
        upsert: true
      });
    
    if (uploadError) {
      throw uploadError;
    }
    
    console.log('Test file uploaded successfully.');
    
    // 2. Get public URL
    console.log('2. Getting public URL...');
    const { data: publicUrlData } = supabaseAdmin.storage
      .from(GENERATED_IMAGES_BUCKET)
      .getPublicUrl(TEST_FILE_NAME);
    
    console.log('Public URL:', publicUrlData.publicUrl);
    
    // 3. List files in bucket
    console.log('3. Listing files in bucket...');
    const { data: files, error: listError } = await supabaseAdmin.storage
      .from(GENERATED_IMAGES_BUCKET)
      .list();
    
    if (listError) {
      throw listError;
    }
    
    console.log(`Found ${files.length} files:`, files.map(f => f.name).join(', '));
    
    // 4. Delete the test file
    console.log('4. Deleting test file...');
    const { error: deleteError } = await supabaseAdmin.storage
      .from(GENERATED_IMAGES_BUCKET)
      .remove([TEST_FILE_NAME]);
    
    if (deleteError) {
      throw deleteError;
    }
    
    console.log('Test file deleted successfully.');
    
    console.log('✅ File operations test passed!');
    return true;
  } catch (error) {
    console.error('❌ File operations test failed:', error.message);
    return false;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('Starting Supabase connection test...');
  console.log('Supabase URL:', supabaseUrl);
  
  try {
    // Test bucket operations
    const bucketTestPassed = await testBucketOperations();
    
    // Test file operations if bucket test passed
    let fileTestPassed = false;
    if (bucketTestPassed) {
      fileTestPassed = await testFileOperations();
    }
    
    // Summary
    console.log('\n=== Test Summary ===');
    console.log('Bucket operations:', bucketTestPassed ? '✅ PASSED' : '❌ FAILED');
    console.log('File operations:', fileTestPassed ? '✅ PASSED' : '❌ FAILED');
    
    if (bucketTestPassed && fileTestPassed) {
      console.log('\n🎉 All tests passed! Supabase connection and permissions are working correctly.');
      console.log('You can now proceed with the image generation process.');
    } else {
      console.log('\n❌ Some tests failed. Please check the error messages above and fix the issues before proceeding.');
    }
  } catch (error) {
    console.error('Unhandled error:', error);
  }
}

// Run the script
main();
