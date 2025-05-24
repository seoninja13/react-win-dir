/**
 * Save Generated Images to Supabase Database
 * 
 * Linear Issue: 1BU-58 - Save Generated Images to Supabase Database
 * 
 * This script uploads our 5 high-quality generated images to Supabase storage
 * and creates database records for them.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Configuration
const CONFIG = {
  inputDir: path.join(__dirname, '..', 'generated-images', 'test-batch'),
  resultsFile: path.join(__dirname, '..', 'generated-images', 'test-batch', 'direct-http-test-results.json'),
  storageBucket: 'generated-images',
  storageFolder: 'vertex-ai-test-batch',
  tableName: 'generated_images'
};

/**
 * Ensure Supabase storage bucket exists
 */
async function ensureStorageBucket() {
  console.log('🪣 Checking Supabase storage bucket...');
  
  try {
    const { data: buckets, error } = await supabase.storage.listBuckets();
    
    if (error) {
      console.error('❌ Error listing buckets:', error.message);
      return false;
    }
    
    const bucketExists = buckets.some(bucket => bucket.name === CONFIG.storageBucket);
    
    if (!bucketExists) {
      console.log(`📁 Creating storage bucket: ${CONFIG.storageBucket}`);
      const { error: createError } = await supabase.storage.createBucket(CONFIG.storageBucket, {
        public: true,
        allowedMimeTypes: ['image/png', 'image/jpeg'],
        fileSizeLimit: 10485760 // 10MB
      });
      
      if (createError) {
        console.error('❌ Error creating bucket:', createError.message);
        return false;
      }
    }
    
    console.log('✅ Storage bucket ready');
    return true;
    
  } catch (error) {
    console.error('❌ Storage bucket error:', error.message);
    return false;
  }
}

/**
 * Upload a single image to Supabase storage
 */
async function uploadImage(imageData) {
  const { id, filename, filepath, size, prompt, description } = imageData;
  
  try {
    console.log(`📤 Uploading ${filename}...`);
    
    // Read the image file
    const imageBuffer = fs.readFileSync(filepath);
    
    // Upload to Supabase storage
    const storagePath = `${CONFIG.storageFolder}/${filename}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(CONFIG.storageBucket)
      .upload(storagePath, imageBuffer, {
        contentType: 'image/png',
        upsert: true
      });
    
    if (uploadError) {
      throw new Error(`Upload failed: ${uploadError.message}`);
    }
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from(CONFIG.storageBucket)
      .getPublicUrl(storagePath);
    
    console.log(`✅ Uploaded: ${filename}`);
    
    return {
      ...imageData,
      storagePath,
      publicUrl: urlData.publicUrl,
      uploadSuccess: true
    };
    
  } catch (error) {
    console.error(`❌ Upload failed for ${filename}:`, error.message);
    return {
      ...imageData,
      uploadSuccess: false,
      uploadError: error.message
    };
  }
}

/**
 * Save image metadata to database
 */
async function saveImageMetadata(imageData) {
  if (!imageData.uploadSuccess) {
    console.log(`⏭️  Skipping database insert for failed upload: ${imageData.filename}`);
    return imageData;
  }
  
  try {
    console.log(`💾 Saving metadata for ${imageData.filename}...`);
    
    const metadata = {
      image_id: imageData.id,
      filename: imageData.filename,
      original_prompt: imageData.prompt,
      description: imageData.description,
      file_size: imageData.size,
      mime_type: imageData.mimeType || 'image/png',
      storage_path: imageData.storagePath,
      public_url: imageData.publicUrl,
      generation_model: 'imagen-3.0-fast-generate-001',
      generation_cost: 0.04, // $0.04 per image
      generation_time_seconds: 12.4, // average from our test
      created_at: new Date().toISOString(),
      tags: ['vertex-ai', 'test-batch', 'windows', 'doors', 'architectural']
    };
    
    const { data, error } = await supabase
      .from(CONFIG.tableName)
      .insert(metadata)
      .select();
    
    if (error) {
      throw new Error(`Database insert failed: ${error.message}`);
    }
    
    console.log(`✅ Metadata saved for ${imageData.filename}`);
    
    return {
      ...imageData,
      databaseSuccess: true,
      databaseId: data[0]?.id
    };
    
  } catch (error) {
    console.error(`❌ Database save failed for ${imageData.filename}:`, error.message);
    return {
      ...imageData,
      databaseSuccess: false,
      databaseError: error.message
    };
  }
}

/**
 * Process all images
 */
async function processAllImages() {
  console.log('🚀 Starting Supabase Upload Process');
  console.log('='.repeat(50));
  
  // Load test results
  if (!fs.existsSync(CONFIG.resultsFile)) {
    console.error('❌ Test results file not found');
    return;
  }
  
  const results = JSON.parse(fs.readFileSync(CONFIG.resultsFile, 'utf8'));
  const images = results.successful;
  
  console.log(`📊 Processing ${images.length} images`);
  console.log(`📁 Storage bucket: ${CONFIG.storageBucket}`);
  console.log(`📋 Database table: ${CONFIG.tableName}`);
  
  // Ensure storage bucket exists
  const bucketReady = await ensureStorageBucket();
  if (!bucketReady) {
    console.error('❌ Storage bucket setup failed');
    return;
  }
  
  const processedImages = [];
  
  // Process each image
  for (let i = 0; i < images.length; i++) {
    const imageData = images[i];
    console.log(`\n📋 Processing ${i + 1}/${images.length}: ${imageData.id}`);
    
    // Upload to storage
    const uploadedImage = await uploadImage(imageData);
    
    // Save metadata to database
    const finalImage = await saveImageMetadata(uploadedImage);
    
    processedImages.push(finalImage);
    
    // Small delay between uploads
    if (i < images.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  return processedImages;
}

/**
 * Display final results
 */
function displayResults(processedImages) {
  console.log('\n' + '='.repeat(60));
  console.log('📊 SUPABASE UPLOAD RESULTS');
  console.log('='.repeat(60));
  
  const uploadSuccesses = processedImages.filter(img => img.uploadSuccess).length;
  const databaseSuccesses = processedImages.filter(img => img.databaseSuccess).length;
  
  console.log(`📤 Storage Uploads: ${uploadSuccesses}/${processedImages.length}`);
  console.log(`💾 Database Records: ${databaseSuccesses}/${processedImages.length}`);
  
  if (uploadSuccesses > 0) {
    console.log('\n✅ SUCCESSFUL UPLOADS:');
    processedImages
      .filter(img => img.uploadSuccess)
      .forEach(img => {
        console.log(`  • ${img.filename}: ${img.publicUrl}`);
      });
  }
  
  if (uploadSuccesses < processedImages.length) {
    console.log('\n❌ FAILED UPLOADS:');
    processedImages
      .filter(img => !img.uploadSuccess)
      .forEach(img => {
        console.log(`  • ${img.filename}: ${img.uploadError}`);
      });
  }
  
  console.log('\n📋 Next Steps:');
  console.log('1. Verify images in Supabase Storage dashboard');
  console.log('2. Check database records in Supabase Table Editor');
  console.log('3. Update Linear issue 1BU-58 with results');
  console.log('4. Test image access from website components');
}

/**
 * Main execution function
 */
async function main() {
  try {
    const processedImages = await processAllImages();
    
    if (processedImages) {
      displayResults(processedImages);
      
      // Save processing results
      const reportFile = path.join(CONFIG.inputDir, 'supabase-upload-results.json');
      fs.writeFileSync(reportFile, JSON.stringify(processedImages, null, 2));
      console.log(`\n💾 Upload results saved to: ${reportFile}`);
    }
    
  } catch (error) {
    console.error('\n💥 Upload process failed:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
}

// Run the upload process
main();
