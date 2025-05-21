/**
 * Test script for Unified Vertex AI Imagen Implementation
 * 
 * This script tests the unified implementation that supports both
 * Service Account and ADC authentication with automatic fallback.
 * 
 * Prerequisites:
 * - Either GOOGLE_APPLICATION_CREDENTIALS or GOOGLE_CLOUD_PROJECT environment variable set
 * 
 * Usage:
 *   node scripts/test-vertexai-imagen-unified.mjs
 */

import { generateImage, generateBatchImages, generateAndSaveImages } from './genai-vertexai-imagen3-unified.mjs';
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
const TEST_OUTPUT_DIR = path.join(__dirname, '..', 'public', 'test-images', 'unified');

/**
 * Test single image generation
 */
async function testSingleImageGeneration() {
  console.log('\n=== Testing Single Image Generation (Unified) ===');
  console.log(`Prompt: "${TEST_PROMPTS.SINGLE}"`);
  
  try {
    console.time('Single image generation');
    const result = await generateImage(TEST_PROMPTS.SINGLE, { aspectRatio: '16:9' });
    console.timeEnd('Single image generation');
    
    if (!result || !result.image) {
      throw new Error('No image data returned');
    }
    
    console.log('✅ Single image generation successful');
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
  console.log('\n=== Testing Batch Image Generation (Unified) ===');
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
      
      successCount++;
    }
    
    console.log(`✅ Batch image generation: ${successCount}/${TEST_PROMPTS.BATCH.length} successful`);
    return successCount > 0;
  } catch (error) {
    console.error('❌ Batch image generation failed:', error.message);
    return false;
  }
}

/**
 * Test generate and save images
 */
async function testGenerateAndSaveImages() {
  console.log('\n=== Testing Generate and Save Images (Unified) ===');
  
  try {
    console.time('Generate and save');
    const savedPaths = await generateAndSaveImages(TEST_PROMPTS.SINGLE, { 
      outputDir: TEST_OUTPUT_DIR,
      aspectRatio: '1:1'
    });
    console.timeEnd('Generate and save');
    
    if (!savedPaths || savedPaths.length === 0) {
      throw new Error('No images saved');
    }
    
    console.log(`✅ Generated and saved ${savedPaths.length} image(s)`);
    console.log(`Output directory: ${TEST_OUTPUT_DIR}`);
    return true;
  } catch (error) {
    console.error('❌ Generate and save failed:', error.message);
    return false;
  }
}

/**
 * Run all tests
 */
async function runTests() {
  console.log('=== Vertex AI Imagen Unified Implementation Tests ===');
  console.log(`Time: ${new Date().toISOString()}`);
  console.log(`Service Account: ${process.env.GOOGLE_APPLICATION_CREDENTIALS || 'Not set'}`);
  console.log(`Project ID: ${process.env.GOOGLE_CLOUD_PROJECT || 'Not set'}`);
  
  try {
    const singleTestResult = await testSingleImageGeneration();
    const batchTestResult = await testBatchImageGeneration();
    const saveTestResult = await testGenerateAndSaveImages();
    
    console.log('\n=== Test Summary ===');
    console.log(`Single Image Generation: ${singleTestResult ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Batch Image Generation: ${batchTestResult ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Generate and Save: ${saveTestResult ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Overall: ${(singleTestResult || batchTestResult || saveTestResult) ? '✅ PARTIAL PASS' : '❌ FAIL'}`);
    
    process.exit((singleTestResult || batchTestResult || saveTestResult) ? 0 : 1);
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
