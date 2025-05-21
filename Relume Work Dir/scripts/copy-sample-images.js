/**
 * Copy Sample Images Script
 *
 * This script uploads sample images from the Sample-images directory to Supabase storage.
 * It's intended to be run as a one-time setup or whenever new sample images are added.
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env.local') });

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables. Please check your .env.local file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Define source path and bucket name
const SAMPLE_IMAGES_DIR = path.join(__dirname, '..', '..', 'Sample-images');
const STORAGE_BUCKET = 'sample-images';

// Define image categories
const IMAGE_CATEGORIES = ['Windows', 'Doors'];

/**
 * Create a bucket if it doesn't exist
 *
 * @param {string} bucketName - The name of the bucket to create
 */
async function createBucketIfNotExists(bucketName) {
  try {
    // Check if bucket exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();

    if (listError) {
      throw listError;
    }

    const bucketExists = buckets.some(bucket => bucket.name === bucketName);

    if (!bucketExists) {
      console.log(`Creating bucket: ${bucketName}`);
      const { error: createError } = await supabase.storage.createBucket(bucketName, {
        public: true,
        fileSizeLimit: 10485760, // 10MB
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
      });

      if (createError) {
        throw createError;
      }

      console.log(`Bucket created: ${bucketName}`);
    } else {
      console.log(`Bucket already exists: ${bucketName}`);
    }
  } catch (error) {
    console.error('Error creating bucket:', error);
    throw error;
  }
}

/**
 * Upload sample images to Supabase storage
 */
async function uploadSampleImages() {
  try {
    console.log('Starting to upload sample images to Supabase storage...');

    // Create bucket if it doesn't exist
    await createBucketIfNotExists(STORAGE_BUCKET);

    // Process each category
    for (const category of IMAGE_CATEGORIES) {
      const sourceCategoryDir = path.join(SAMPLE_IMAGES_DIR, category);

      // Skip if source directory doesn't exist
      if (!fs.existsSync(sourceCategoryDir)) {
        console.warn(`Source directory not found: ${sourceCategoryDir}`);
        continue;
      }

      console.log(`Processing category: ${category}`);

      // Get list of image files
      const files = fs.readdirSync(sourceCategoryDir);
      let uploadedCount = 0;
      let skippedCount = 0;

      // Upload each file
      for (const file of files) {
        const sourceFilePath = path.join(sourceCategoryDir, file);

        // Skip if not a file
        if (!fs.statSync(sourceFilePath).isFile()) {
          continue;
        }

        // Determine file type
        const fileExtension = path.extname(file).toLowerCase();
        let contentType;

        switch (fileExtension) {
          case '.jpg':
          case '.jpeg':
            contentType = 'image/jpeg';
            break;
          case '.png':
            contentType = 'image/png';
            break;
          case '.gif':
            contentType = 'image/gif';
            break;
          case '.webp':
            contentType = 'image/webp';
            break;
          default:
            console.warn(`Skipping file with unsupported extension: ${file}`);
            continue;
        }

        // Create storage path
        const storagePath = `${category.toLowerCase()}/${file}`;

        try {
          // Check if file already exists
          const { data: existingFiles } = await supabase.storage
            .from(STORAGE_BUCKET)
            .list(category.toLowerCase());

          const fileExists = existingFiles && existingFiles.some(f => f.name === file);

          if (!fileExists) {
            // Read file
            const fileBuffer = fs.readFileSync(sourceFilePath);

            // Upload to Supabase
            const { error: uploadError } = await supabase.storage
              .from(STORAGE_BUCKET)
              .upload(storagePath, fileBuffer, {
                contentType,
                upsert: true
              });

            if (uploadError) {
              throw uploadError;
            }

            console.log(`Uploaded: ${file}`);
            uploadedCount++;
          } else {
            console.log(`Skipped (already exists): ${file}`);
            skippedCount++;
          }
        } catch (error) {
          console.error(`Error uploading ${file}:`, error);
        }
      }

      console.log(`Category ${category}: Uploaded ${uploadedCount} files, skipped ${skippedCount} files`);
    }

    console.log('Sample images upload completed successfully!');
  } catch (error) {
    console.error('Error uploading sample images:', error);
    process.exit(1);
  }
}

// Run the script
uploadSampleImages();
