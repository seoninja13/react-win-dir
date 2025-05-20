/**
 * Upload Sample Images to Supabase Storage
 *
 * This script reads images from local 'sample-images/windows' and 'sample-images/doors'
 * directories and uploads them to dedicated Supabase Storage buckets.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { 
  uploadFileFromPath, 
  createBucketIfNotExists, 
  SAMPLE_WINDOWS_IMAGES_BUCKET, 
  SAMPLE_DOORS_IMAGES_BUCKET 
} from './storage.js'; // Assuming .js extension after TS compilation if in ESM project

// Get current file path and directory, and project root
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..'); // Corrected: Go up one level

const SAMPLE_IMAGES_BASE_PATH = path.join(projectRoot, 'sample-images');

console.log('--- Path Debugging ---');
console.log('Runtime __filename:', __filename);
console.log('Runtime __dirname:', __dirname);
console.log('Runtime projectRoot:', projectRoot);
console.log('Runtime SAMPLE_IMAGES_BASE_PATH:', SAMPLE_IMAGES_BASE_PATH);
console.log('--- End Path Debugging ---');

/**
 * Determines the content type of a file based on its extension.
 * @param filePath The path to the file.
 * @returns The content type string (e.g., 'image/jpeg') or null if not recognized.
 */
function getContentType(filePath: string): string | null {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    // Add other image types if needed
    default:
      return null;
  }
}

/**
 * Processes a directory of sample images and uploads them to the specified Supabase bucket.
 * @param imageCategory - The category of images (e.g., 'windows', 'doors').
 * @param sourceDirectoryPath - The full path to the source directory containing the images.
 * @param targetBucketName - The Supabase bucket name to upload to.
 */
async function processImageDirectory(
  imageCategory: string,
  sourceDirectoryPath: string,
  targetBucketName: string
): Promise<void> {
  console.log(`Processing directory: ${sourceDirectoryPath} for category: ${imageCategory}`);
  console.log(`Target Supabase bucket: ${targetBucketName}`);

  try {
    // Ensure the target bucket exists
    await createBucketIfNotExists(targetBucketName, true);

    const files = fs.readdirSync(sourceDirectoryPath);
    let uploadedCount = 0;
    let skippedCount = 0;

    for (const file of files) {
      const fullFilePath = path.join(sourceDirectoryPath, file);
      const stat = fs.statSync(fullFilePath);

      if (stat.isFile()) {
        const contentType = getContentType(fullFilePath);
        if (!contentType) {
          console.log(`Skipping non-image or unsupported file: ${fullFilePath}`);
          skippedCount++;
          continue;
        }

        const metadata = { 'source-script': 'upload-sample-images.ts' };

        try {
          // Construct the path within the bucket, including the category subfolder
          const filePathInBucket = path.join(imageCategory, path.basename(fullFilePath));

          console.log(`Uploading ${fullFilePath} to ${targetBucketName}/${filePathInBucket}...`);
          const publicURL = await uploadFileFromPath(
            fullFilePath,         // 1. localFilePath
            targetBucketName,     // 2. bucketName
            filePathInBucket,     // 3. storagePath (path within bucket, including subfolder)
            contentType,          // 4. contentType
            metadata              // 5. metadata
          );
          console.log(`Successfully uploaded ${file} to ${publicURL}`);
          uploadedCount++;
        } catch (uploadError) {
          console.error(`Failed to upload ${file}:`, uploadError);
        }
      } else {
        console.log(`Skipping directory: ${fullFilePath}`);
        skippedCount++;
      }
    }
    console.log(`Finished processing ${imageCategory}. Uploaded: ${uploadedCount}, Skipped: ${skippedCount}`);
  } catch (error) {
    console.error(`Error processing directory ${sourceDirectoryPath}:`, error);
  }
}

/**
 * Main function to orchestrate the upload of all sample images.
 */
async function uploadAllSampleImages() {
  console.log('Starting upload of all sample images...');

  const windowsSourceDir = path.join(SAMPLE_IMAGES_BASE_PATH, 'Windows');
  const doorsSourceDir = path.join(SAMPLE_IMAGES_BASE_PATH, 'Doors');

  console.log('--- Directory Path Construction ---');
  console.log('Using SAMPLE_IMAGES_BASE_PATH:', SAMPLE_IMAGES_BASE_PATH); // Log it again just before use
  console.log('Constructed windowsSourceDir:', windowsSourceDir);
  console.log('Constructed doorsSourceDir:', doorsSourceDir);
  console.log('--- End Directory Path Construction ---');

  // Process Windows images
  if (fs.existsSync(windowsSourceDir)) {
    await processImageDirectory('windows', windowsSourceDir, SAMPLE_WINDOWS_IMAGES_BUCKET);
  } else {
    console.warn(`Windows sample images directory not found: ${windowsSourceDir}`);
  }

  // Process Doors images
  if (fs.existsSync(doorsSourceDir)) {
    await processImageDirectory('doors', doorsSourceDir, SAMPLE_DOORS_IMAGES_BUCKET);
  } else {
    console.warn(`Doors sample images directory not found: ${doorsSourceDir}`);
  }

  console.log('All sample image uploads attempted.');
}

// Execute the main function
uploadAllSampleImages()
  .then(() => {
    console.log('Sample image upload script finished.');
  })
  .catch(error => {
    console.error('Critical error in sample image upload script:', error);
    process.exit(1);
  });
