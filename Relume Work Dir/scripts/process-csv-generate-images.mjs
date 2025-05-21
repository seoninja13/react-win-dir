/**
 * CSV Data Processing and Image Generation
 * 
 * This script processes CSV data from the Window World LA website
 * and generates images using Google Cloud's Vertex AI Imagen API.
 * 
 * Features:
 * - Processes CSV data with URLs, images, and prompts
 * - Generates images using Vertex AI Imagen
 * - Implements batch processing with configurable batch size
 * - Supports URL mapping between original site and our implementation
 * - Saves generated images to Supabase storage
 * - Comprehensive error handling and logging
 * 
 * Prerequisites:
 * - Node.js 18+
 * - @google/genai package
 * - Google Cloud credentials (either Service Account or ADC)
 * - CSV file with Window World LA website URLs, images, and prompts
 * - Supabase storage configured
 * 
 * Environment Variables:
 * - GOOGLE_CLOUD_PROJECT: Your GCP project ID (required for ADC)
 * - GOOGLE_APPLICATION_CREDENTIALS: Path to service account key file (optional)
 * - SUPABASE_URL: Supabase project URL
 * - SUPABASE_KEY: Supabase service role key
 * 
 * Usage:
 *   node scripts/process-csv-generate-images.mjs --csv-file=path/to/data.csv --batch-size=10
 */

import { generateImage, generateBatchImages } from './genai-vertexai-imagen3-unified.mjs';
import fs from 'fs/promises';
import { createReadStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse';
import { createClient } from '@supabase/supabase-js';

// ======================
// Configuration
// ======================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEFAULTS = {
  CSV_FILE: path.join(__dirname, '..', 'data', 'window-world-la-data.csv'),
  OUTPUT_DIR: path.join(__dirname, '..', 'public', 'generated-images'),
  BATCH_SIZE: 5,
  ASPECT_RATIO: '16:9',
  SUPABASE_BUCKET: 'generated-images',
};

// ======================
// Supabase Client
// ======================
function initializeSupabase() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase credentials not found. Images will only be saved locally.');
    return null;
  }
  
  return createClient(supabaseUrl, supabaseKey);
}

// ======================
// CSV Processing
// ======================
async function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    
    createReadStream(filePath)
      .pipe(parse({
        columns: true,
        skip_empty_lines: true,
        trim: true,
      }))
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

/**
 * Map URLs between Window World LA and Windows Doors CA
 */
function mapURL(originalURL) {
  // Extract the path from the original URL
  const urlPath = new URL(originalURL).pathname;
  
  // Map the path to our implementation
  // This is a simple example - you may need more complex mapping logic
  return urlPath;
}

/**
 * Process CSV data and generate images
 */
async function processCSVAndGenerateImages(csvFile, options = {}) {
  const {
    outputDir = DEFAULTS.OUTPUT_DIR,
    batchSize = DEFAULTS.BATCH_SIZE,
    aspectRatio = DEFAULTS.ASPECT_RATIO,
  } = options;
  
  console.log(`Processing CSV file: ${csvFile}`);
  console.log(`Output directory: ${outputDir}`);
  console.log(`Batch size: ${batchSize}`);
  
  // Parse CSV data
  const csvData = await parseCSV(csvFile);
  console.log(`Found ${csvData.length} entries in CSV file`);
  
  // Initialize Supabase client
  const supabase = initializeSupabase();
  
  // Create output directory if it doesn't exist
  await fs.mkdir(outputDir, { recursive: true });
  
  // Process data in batches
  const batches = [];
  for (let i = 0; i < csvData.length; i += batchSize) {
    batches.push(csvData.slice(i, i + batchSize));
  }
  
  console.log(`Processing ${batches.length} batches of data`);
  
  const results = {
    total: csvData.length,
    successful: 0,
    failed: 0,
    skipped: 0,
    images: [],
  };
  
  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    console.log(`\nProcessing batch ${i + 1}/${batches.length} (${batch.length} entries)`);
    
    const prompts = [];
    const entries = [];
    
    for (const entry of batch) {
      // Skip entries without prompts
      if (!entry.prompt) {
        console.warn(`Skipping entry without prompt: ${entry.url}`);
        results.skipped++;
        continue;
      }
      
      prompts.push(entry.prompt);
      entries.push(entry);
    }
    
    if (prompts.length === 0) {
      console.log('No valid prompts in this batch, skipping');
      continue;
    }
    
    try {
      // Generate images for the batch
      console.log(`Generating ${prompts.length} images...`);
      const batchResults = await generateBatchImages(prompts, { aspectRatio });
      
      // Process results
      for (let j = 0; j < batchResults.length; j++) {
        const result = batchResults[j];
        const entry = entries[j];
        
        if (result.error) {
          console.error(`Failed to generate image for ${entry.url}: ${result.error}`);
          results.failed++;
          continue;
        }
        
        if (!result.images || result.images.length === 0) {
          console.error(`No images generated for ${entry.url}`);
          results.failed++;
          continue;
        }
        
        // Save image locally
        const localPath = await saveImageLocally(
          result.images[0].image,
          outputDir,
          entry
        );
        
        // Upload to Supabase if available
        let supabasePath = null;
        if (supabase) {
          supabasePath = await uploadToSupabase(
            result.images[0].image,
            entry,
            supabase
          );
        }
        
        results.successful++;
        results.images.push({
          url: entry.url,
          mappedURL: mapURL(entry.url),
          prompt: entry.prompt,
          localPath,
          supabasePath,
        });
        
        console.log(`✅ Generated image for ${entry.url}`);
      }
    } catch (error) {
      console.error(`Error processing batch ${i + 1}:`, error.message);
      results.failed += prompts.length;
    }
    
    // Add a small delay between batches to avoid rate limiting issues
    if (i < batches.length - 1) {
      console.log('Waiting before processing next batch...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  console.log('\n=== Processing Complete ===');
  console.log(`Total entries: ${results.total}`);
  console.log(`Successful: ${results.successful}`);
  console.log(`Failed: ${results.failed}`);
  console.log(`Skipped: ${results.skipped}`);
  
  return results;
}

/**
 * Save image locally
 */
async function saveImageLocally(imageBuffer, outputDir, entry) {
  // Create a safe filename from the URL
  const urlObj = new URL(entry.url);
  const urlPath = urlObj.pathname.replace(/\//g, '-').replace(/^-|-$/g, '');
  const filename = `${urlPath}-${Date.now()}.png`;
  const filePath = path.join(outputDir, filename);
  
  await fs.writeFile(filePath, imageBuffer);
  return filePath;
}

/**
 * Upload image to Supabase storage
 */
async function uploadToSupabase(imageBuffer, entry, supabase) {
  try {
    // Create a safe filename from the URL
    const urlObj = new URL(entry.url);
    const urlPath = urlObj.pathname.replace(/\//g, '-').replace(/^-|-$/g, '');
    const filename = `${urlPath}-${Date.now()}.png`;
    
    // Upload to Supabase
    const { data, error } = await supabase.storage
      .from(DEFAULTS.SUPABASE_BUCKET)
      .upload(filename, imageBuffer, {
        contentType: 'image/png',
        upsert: false,
      });
    
    if (error) {
      console.error('Error uploading to Supabase:', error.message);
      return null;
    }
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from(DEFAULTS.SUPABASE_BUCKET)
      .getPublicUrl(filename);
    
    return urlData.publicUrl;
  } catch (error) {
    console.error('Error uploading to Supabase:', error.message);
    return null;
  }
}

// ======================
// Main Function
// ======================
async function main() {
  // Parse command line arguments
  const args = process.argv.slice(2).reduce((acc, arg) => {
    const [key, value] = arg.split('=');
    acc[key.replace(/^--/, '')] = value || true;
    return acc;
  }, {});

  // Show help if needed
  if (args.help) {
    console.log(`
Usage: node ${path.basename(__filename)} [options]

Options:
  --csv-file=path     Path to CSV file (default: ${DEFAULTS.CSV_FILE})
  --output-dir=path   Output directory (default: ${DEFAULTS.OUTPUT_DIR})
  --batch-size=number Number of images to generate in each batch (default: ${DEFAULTS.BATCH_SIZE})
  --aspect-ratio=ratio Aspect ratio for generated images (default: ${DEFAULTS.ASPECT_RATIO})
  --help              Show this help message
`);
    process.exit(0);
  }

  try {
    // Process CSV and generate images
    await processCSVAndGenerateImages(
      args['csv-file'] || DEFAULTS.CSV_FILE,
      {
        outputDir: args['output-dir'] || DEFAULTS.OUTPUT_DIR,
        batchSize: parseInt(args['batch-size'], 10) || DEFAULTS.BATCH_SIZE,
        aspectRatio: args['aspect-ratio'] || DEFAULTS.ASPECT_RATIO,
      }
    );
  } catch (error) {
    console.error('\nError:', error.message);
    process.exit(1);
  }
}

// Run the script if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

// Export for testing and importing
export {
  processCSVAndGenerateImages,
  parseCSV,
  mapURL,
};
