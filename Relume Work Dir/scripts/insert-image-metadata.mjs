/**
 * Insert Image Metadata to Supabase Database
 * 
 * Linear Issue: 1BU-58 - Save Generated Images to Supabase Database
 * 
 * This script inserts metadata for our 5 uploaded images into the newly created database table.
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

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Configuration
const CONFIG = {
  resultsFile: path.join(__dirname, '..', 'generated-images', 'test-batch', 'supabase-upload-results.json'),
  tableName: 'generated_images'
};

/**
 * Insert metadata for all images
 */
async function insertImageMetadata() {
  console.log('💾 Inserting Image Metadata to Supabase Database');
  console.log('='.repeat(50));
  
  // Load upload results
  if (!fs.existsSync(CONFIG.resultsFile)) {
    console.error('❌ Upload results file not found');
    return;
  }
  
  const uploadResults = JSON.parse(fs.readFileSync(CONFIG.resultsFile, 'utf8'));
  const successfulUploads = uploadResults.filter(img => img.uploadSuccess);
  
  console.log(`📊 Processing ${successfulUploads.length} successfully uploaded images`);
  
  const insertedRecords = [];
  
  for (let i = 0; i < successfulUploads.length; i++) {
    const imageData = successfulUploads[i];
    
    try {
      console.log(`\n💾 Inserting metadata ${i + 1}/${successfulUploads.length}: ${imageData.id}`);
      
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
        generation_cost: 0.04,
        generation_time_seconds: 12.4,
        tags: ['vertex-ai', 'test-batch', 'windows', 'doors', 'architectural', 'high-quality']
      };
      
      const { data, error } = await supabase
        .from(CONFIG.tableName)
        .insert(metadata)
        .select();
      
      if (error) {
        throw new Error(`Database insert failed: ${error.message}`);
      }
      
      console.log(`✅ Metadata inserted for ${imageData.id} (DB ID: ${data[0].id})`);
      
      insertedRecords.push({
        ...imageData,
        databaseSuccess: true,
        databaseId: data[0].id,
        databaseRecord: data[0]
      });
      
    } catch (error) {
      console.error(`❌ Failed to insert metadata for ${imageData.id}:`, error.message);
      insertedRecords.push({
        ...imageData,
        databaseSuccess: false,
        databaseError: error.message
      });
    }
    
    // Small delay between inserts
    if (i < successfulUploads.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  
  return insertedRecords;
}

/**
 * Verify inserted records
 */
async function verifyInsertedRecords() {
  console.log('\n🔍 Verifying Inserted Records');
  console.log('='.repeat(30));
  
  try {
    const { data, error } = await supabase
      .from(CONFIG.tableName)
      .select('*')
      .eq('generation_model', 'imagen-3.0-fast-generate-001')
      .order('created_at', { ascending: false });
    
    if (error) {
      throw new Error(`Query failed: ${error.message}`);
    }
    
    console.log(`✅ Found ${data.length} records in database`);
    
    data.forEach((record, index) => {
      console.log(`  ${index + 1}. ${record.image_id} (ID: ${record.id})`);
      console.log(`     URL: ${record.public_url}`);
      console.log(`     Cost: $${record.generation_cost}`);
    });
    
    return data;
    
  } catch (error) {
    console.error('❌ Verification failed:', error.message);
    return [];
  }
}

/**
 * Display final results
 */
function displayResults(insertedRecords, verifiedRecords) {
  console.log('\n' + '='.repeat(60));
  console.log('📊 SUPABASE DATABASE INTEGRATION RESULTS');
  console.log('='.repeat(60));
  
  const successfulInserts = insertedRecords.filter(img => img.databaseSuccess).length;
  
  console.log(`💾 Database Inserts: ${successfulInserts}/${insertedRecords.length}`);
  console.log(`🔍 Verified Records: ${verifiedRecords.length}`);
  console.log(`📁 Storage Bucket: generated-images`);
  console.log(`📋 Database Table: ${CONFIG.tableName}`);
  
  if (successfulInserts > 0) {
    console.log('\n✅ SUCCESSFUL DATABASE RECORDS:');
    insertedRecords
      .filter(img => img.databaseSuccess)
      .forEach(img => {
        console.log(`  • ${img.id}: DB ID ${img.databaseId}`);
        console.log(`    URL: ${img.publicUrl}`);
      });
  }
  
  if (successfulInserts < insertedRecords.length) {
    console.log('\n❌ FAILED DATABASE INSERTS:');
    insertedRecords
      .filter(img => !img.databaseSuccess)
      .forEach(img => {
        console.log(`  • ${img.id}: ${img.databaseError}`);
      });
  }
  
  console.log('\n🎯 INTEGRATION STATUS:');
  if (successfulInserts === insertedRecords.length && verifiedRecords.length === successfulInserts) {
    console.log('✅ COMPLETE SUCCESS - All images uploaded and metadata saved');
  } else {
    console.log('⚠️  PARTIAL SUCCESS - Some issues encountered');
  }
  
  console.log('\n📋 Next Steps:');
  console.log('1. Test image access from website components');
  console.log('2. Create image gallery component');
  console.log('3. Update Linear issue 1BU-58 as completed');
  console.log('4. Document integration for future use');
}

/**
 * Main execution function
 */
async function main() {
  try {
    // Insert metadata
    const insertedRecords = await insertImageMetadata();
    
    if (!insertedRecords) {
      console.error('❌ Metadata insertion failed');
      return;
    }
    
    // Verify records
    const verifiedRecords = await verifyInsertedRecords();
    
    // Display results
    displayResults(insertedRecords, verifiedRecords);
    
    // Save final results
    const finalResultsFile = path.join(__dirname, '..', 'generated-images', 'test-batch', 'final-integration-results.json');
    const finalResults = {
      insertedRecords,
      verifiedRecords,
      summary: {
        totalImages: insertedRecords.length,
        successfulInserts: insertedRecords.filter(img => img.databaseSuccess).length,
        verifiedRecords: verifiedRecords.length,
        integrationComplete: insertedRecords.filter(img => img.databaseSuccess).length === insertedRecords.length
      }
    };
    
    fs.writeFileSync(finalResultsFile, JSON.stringify(finalResults, null, 2));
    console.log(`\n💾 Final results saved to: ${finalResultsFile}`);
    
  } catch (error) {
    console.error('\n💥 Database integration failed:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
}

// Run the integration
main();
