/**
 * Vertex AI Image Generation Test - 5 Specific Images
 * 
 * This script tests Vertex AI image generation with 5 specific prompts
 * for windows and doors to evaluate the service for our website.
 * 
 * Based on successful past implementations with systematic approach.
 */

import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  project: process.env.GOOGLE_CLOUD_PROJECT,
  location: process.env.GOOGLE_CLOUD_LOCATION || 'us-west1',
  model: 'imagen-3.0-generate-001',
  outputDir: path.join(__dirname, '..', 'generated-images', 'test-batch'),
  
  // Rate limiting (conservative approach)
  delayBetweenRequests: 10000, // 10 seconds between requests
  maxRetries: 3,
  retryDelay: 5000, // 5 seconds between retries
};

// Test prompts for windows and doors business
const TEST_PROMPTS = [
  {
    id: 'double-hung-windows',
    prompt: 'Modern white double-hung windows on a contemporary home exterior, professional architectural photography, high quality, clean lines, natural lighting',
    description: 'Double-hung windows for main windows page'
  },
  {
    id: 'french-patio-doors',
    prompt: 'Elegant French patio doors opening to a garden view, professional interior photography, warm lighting, inviting atmosphere, high quality',
    description: 'French doors for patio doors page'
  },
  {
    id: 'casement-windows',
    prompt: 'Energy-efficient casement windows with clean lines, modern home exterior, professional architectural photography, bright natural lighting',
    description: 'Casement windows for windows category'
  },
  {
    id: 'entry-door',
    prompt: 'Traditional entry door with decorative glass panels, welcoming home entrance, professional exterior photography, high quality details',
    description: 'Entry door for doors category'
  },
  {
    id: 'sliding-windows',
    prompt: 'Sliding windows in a modern kitchen setting, interior view, natural lighting, contemporary design, professional photography',
    description: 'Sliding windows for kitchen/interior applications'
  }
];

// Results tracking
const results = {
  successful: [],
  failed: [],
  startTime: null,
  endTime: null,
  totalTime: null
};

/**
 * Initialize Vertex AI client
 */
function initializeClient() {
  console.log('🔧 Initializing Vertex AI client...');
  console.log(`📍 Project: ${CONFIG.project}`);
  console.log(`📍 Location: ${CONFIG.location}`);
  console.log(`📍 Model: ${CONFIG.model}`);
  
  if (!CONFIG.project) {
    throw new Error('GOOGLE_CLOUD_PROJECT environment variable is required');
  }
  
  return new GoogleGenAI({
    vertexai: true,
    project: CONFIG.project,
    location: CONFIG.location,
  });
}

/**
 * Ensure output directory exists
 */
function ensureOutputDirectory() {
  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
    console.log(`📁 Created output directory: ${CONFIG.outputDir}`);
  }
}

/**
 * Generate a single image with retries
 */
async function generateImageWithRetries(client, promptData, attempt = 1) {
  const { id, prompt, description } = promptData;
  
  try {
    console.log(`\n🎨 Generating image ${attempt}/${CONFIG.maxRetries}: ${id}`);
    console.log(`📝 Prompt: ${prompt}`);
    
    const model = client.getGenerativeModel({
      model: CONFIG.model,
    });
    
    const result = await model.generateContent({
      contents: [{
        role: 'user',
        parts: [{
          text: prompt
        }]
      }]
    });
    
    const response = await result.response;
    
    if (!response.candidates || response.candidates.length === 0) {
      throw new Error('No image candidates returned');
    }
    
    const imageData = response.candidates[0].content.parts[0];
    
    if (!imageData || !imageData.inlineData) {
      throw new Error('No image data in response');
    }
    
    // Save the image
    const filename = `${id}_${Date.now()}.png`;
    const filepath = path.join(CONFIG.outputDir, filename);
    
    const imageBuffer = Buffer.from(imageData.inlineData.data, 'base64');
    fs.writeFileSync(filepath, imageBuffer);
    
    console.log(`✅ Success: ${id} saved to ${filename}`);
    
    return {
      id,
      description,
      prompt,
      filename,
      filepath,
      size: imageBuffer.length,
      success: true,
      attempt
    };
    
  } catch (error) {
    console.log(`❌ Attempt ${attempt} failed for ${id}: ${error.message}`);
    
    if (attempt < CONFIG.maxRetries) {
      console.log(`⏳ Retrying in ${CONFIG.retryDelay/1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, CONFIG.retryDelay));
      return generateImageWithRetries(client, promptData, attempt + 1);
    } else {
      console.log(`💥 All attempts failed for ${id}`);
      return {
        id,
        description,
        prompt,
        success: false,
        error: error.message,
        attempts: attempt
      };
    }
  }
}

/**
 * Generate all test images
 */
async function generateAllImages() {
  console.log('🚀 Starting Vertex AI Image Generation Test');
  console.log(`📊 Testing ${TEST_PROMPTS.length} images with ${CONFIG.maxRetries} max retries each`);
  
  results.startTime = new Date();
  
  try {
    const client = initializeClient();
    ensureOutputDirectory();
    
    for (let i = 0; i < TEST_PROMPTS.length; i++) {
      const promptData = TEST_PROMPTS[i];
      
      console.log(`\n📋 Processing ${i + 1}/${TEST_PROMPTS.length}: ${promptData.id}`);
      
      const result = await generateImageWithRetries(client, promptData);
      
      if (result.success) {
        results.successful.push(result);
      } else {
        results.failed.push(result);
      }
      
      // Add delay between requests (except for last one)
      if (i < TEST_PROMPTS.length - 1) {
        console.log(`⏳ Waiting ${CONFIG.delayBetweenRequests/1000} seconds before next request...`);
        await new Promise(resolve => setTimeout(resolve, CONFIG.delayBetweenRequests));
      }
    }
    
  } catch (error) {
    console.error('💥 Fatal error during image generation:', error.message);
    throw error;
  }
  
  results.endTime = new Date();
  results.totalTime = results.endTime - results.startTime;
}

/**
 * Display final results and recommendations
 */
function displayResults() {
  console.log('\n' + '='.repeat(60));
  console.log('📊 VERTEX AI IMAGE GENERATION TEST RESULTS');
  console.log('='.repeat(60));
  
  console.log(`⏱️  Total Time: ${(results.totalTime / 1000).toFixed(1)} seconds`);
  console.log(`✅ Successful: ${results.successful.length}/${TEST_PROMPTS.length}`);
  console.log(`❌ Failed: ${results.failed.length}/${TEST_PROMPTS.length}`);
  console.log(`📁 Output Directory: ${CONFIG.outputDir}`);
  
  if (results.successful.length > 0) {
    console.log('\n✅ SUCCESSFUL GENERATIONS:');
    results.successful.forEach(result => {
      console.log(`  • ${result.id}: ${result.filename} (${(result.size/1024).toFixed(1)}KB)`);
    });
  }
  
  if (results.failed.length > 0) {
    console.log('\n❌ FAILED GENERATIONS:');
    results.failed.forEach(result => {
      console.log(`  • ${result.id}: ${result.error}`);
    });
  }
  
  // Recommendation based on results
  console.log('\n🎯 RECOMMENDATION:');
  const successRate = results.successful.length / TEST_PROMPTS.length;
  
  if (successRate >= 0.8) {
    console.log('✅ PROCEED WITH VERTEX AI: High success rate, use for all image generation');
  } else if (successRate >= 0.4) {
    console.log('⚠️  MIXED APPROACH: Use Vertex AI for working types, sample images for failed types');
  } else {
    console.log('❌ USE SAMPLE IMAGES: Low success rate, investigate issues before using Vertex AI');
  }
  
  console.log('\n📋 Next Steps:');
  console.log('1. Review generated images in output directory');
  console.log('2. Check image quality and relevance');
  console.log('3. Make decision based on recommendation above');
  console.log('4. Update project documentation with results');
}

/**
 * Main execution function
 */
async function main() {
  try {
    await generateAllImages();
    displayResults();
    
    // Save results to JSON file
    const resultsFile = path.join(CONFIG.outputDir, 'test-results.json');
    fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));
    console.log(`\n💾 Results saved to: ${resultsFile}`);
    
  } catch (error) {
    console.error('\n💥 Test failed:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
}

// Run the test
main();
