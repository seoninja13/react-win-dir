/**
 * Test script for Vertex AI Imagen with Service Account Authentication
 * 
 * This script tests the service account authentication implementation
 * for generating images using Google's Vertex AI Imagen 3.0 model.
 * 
 * Prerequisites:
 * - GOOGLE_APPLICATION_CREDENTIALS environment variable set to a valid service account key file
 * 
 * Usage:
 *   node scripts/test-vertexai-imagen-serviceaccount.mjs
 */

import { generateImage, generateBatchImages } from './genai-vertexai-imagen3-imagegen-serviceaccount.mjs';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Test prompts
const TEST_PROMPTS = {
  SINGLE: 'A modern double-hung window with white frame against a blue sky, photorealistic',
  BATCH: [
    'A classic entry door with sidelights, traditional style, photorealistic',
    'A contemporary sliding patio door with energy-efficient glass, modern home, photorealistic'
  ]
};

// Output directory for test images
const TEST_OUTPUT_DIR = path.join(__dirname, '..', 'public', 'test-images', 'serviceaccount');

/**
 * Save a test image to disk
 */
async function saveTestImage(imageData, filename) {
  await fs.mkdir(TEST_OUTPUT_DIR, { recursive: true });
  const filePath = path.join(TEST_OUTPUT_DIR, filename);
  await fs.writeFile(filePath, imageData.image);
  console.log(`Saved test image: ${filePath}`);
  return filePath;
}

/**
 * Test single image generation
 */
async function testSingleImageGeneration() {
  console.log('\n=== Testing Single Image Generation (Service Account) ===');
  console.log(`Prompt: "${TEST_PROMPTS.SINGLE}"`);
  
  try {
    console.time('Single image generation');
    const result = await generateImage(TEST_PROMPTS.SINGLE, { aspectRatio: '16:9' });
    console.timeEnd('Single image generation');
    
    if (!result || !result.image) {
      throw new Error('No image data returned');
    }
    
    console.log('✅ Single image generation successful');
    await saveTestImage(result, `single-${Date.now()}.png`);
    return true;
  } catch (error) {
    console.error('❌ Single image generation failed:', error.message);
    return false;
  }
}

/**
 * Test batch image generation
 */
async function testBatchImageGeneration() {
  console.log('\n=== Testing Batch Image Generation (Service Account) ===');
  console.log(`Number of prompts: ${TEST_PROMPTS.BATCH.length}`);
  
  try {
    console.time('Batch image generation');
    const results = await generateBatchImages(TEST_PROMPTS.BATCH, { aspectRatio: '4:3' });
    console.timeEnd('Batch image generation');
    
    if (!results || results.length === 0) {
      throw new Error('No results returned');
    }
    
    let successCount = 0;
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      if (result.error) {
        console.error(`❌ Prompt ${i + 1} failed:`, result.error);
        continue;
      }
      
      if (!result.images || result.images.length === 0) {
        console.error(`❌ Prompt ${i + 1} returned no images`);
        continue;
      }
      
      await saveTestImage(result.images[0], `batch-${i + 1}-${Date.now()}.png`);
      successCount++;
    }
    
    console.log(`✅ Batch image generation: ${successCount}/${TEST_PROMPTS.BATCH.length} successful`);
    return successCount === TEST_PROMPTS.BATCH.length;
  } catch (error) {
    console.error('❌ Batch image generation failed:', error.message);
    return false;
  }
}

/**
 * Run all tests
 */
async function runTests() {
  console.log('=== Vertex AI Imagen Service Account Authentication Tests ===');
  console.log(`Time: ${new Date().toISOString()}`);
  console.log(`Service Account: ${process.env.GOOGLE_APPLICATION_CREDENTIALS}`);
  
  try {
    const singleTestResult = await testSingleImageGeneration();
    const batchTestResult = await testBatchImageGeneration();
    
    console.log('\n=== Test Summary ===');
    console.log(`Single Image Generation: ${singleTestResult ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Batch Image Generation: ${batchTestResult ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Overall: ${singleTestResult && batchTestResult ? '✅ PASS' : '❌ FAIL'}`);
    
    process.exit(singleTestResult && batchTestResult ? 0 : 1);
  } catch (error) {
    console.error('\n❌ Tests failed with unexpected error:', error);
    process.exit(1);
  }
}

// Run the tests
runTests().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
