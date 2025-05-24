/**
 * Vertex AI Direct HTTP Implementation
 * Based on successful Cloud Shell curl test
 * 
 * Linear Issue: 1BU-55 - Create Node.js Direct HTTP Script for Vertex AI Imagen
 * Linear Issue: 1BU-56 - Generate 5 Test Images for Windows Doors Website
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleAuth } from 'google-auth-library';

// Load environment variables
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration based on successful Cloud Shell test
const CONFIG = {
  project: process.env.GOOGLE_CLOUD_PROJECT,
  location: process.env.GOOGLE_CLOUD_LOCATION || 'us-west1',
  model: 'imagen-3.0-fast-generate-001',
  endpoint: `https://us-west1-aiplatform.googleapis.com/v1/projects/${process.env.GOOGLE_CLOUD_PROJECT}/locations/us-west1/publishers/google/models/imagen-3.0-fast-generate-001:predict`,
  outputDir: path.join(__dirname, '..', 'generated-images', 'test-batch'),
  
  // Rate limiting (conservative approach)
  delayBetweenRequests: 10000, // 10 seconds between requests
  maxRetries: 3,
  retryDelay: 5000, // 5 seconds between retries
};

// Test prompts for 5 specific images (Linear: 1BU-56)
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
 * Initialize Google Auth client
 */
async function initializeAuth() {
  console.log('🔧 Initializing Google Auth...');
  console.log(`📍 Project: ${CONFIG.project}`);
  console.log(`📍 Location: ${CONFIG.location}`);
  console.log(`📍 Credentials: ${process.env.GOOGLE_APPLICATION_CREDENTIALS}`);
  
  if (!CONFIG.project) {
    throw new Error('GOOGLE_CLOUD_PROJECT environment variable is required');
  }
  
  const auth = new GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
  });
  
  const authClient = await auth.getClient();
  const accessToken = await authClient.getAccessToken();
  
  console.log('✅ Authentication successful');
  return accessToken.token;
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
 * Generate a single image using direct HTTP request
 */
async function generateImageWithRetries(accessToken, promptData, attempt = 1) {
  const { id, prompt, description } = promptData;
  
  try {
    console.log(`\n🎨 Generating image ${attempt}/${CONFIG.maxRetries}: ${id}`);
    console.log(`📝 Prompt: ${prompt}`);
    
    // Prepare request body (same format as successful Cloud Shell test)
    const requestBody = {
      instances: [{ prompt }],
      parameters: { sampleCount: 1 }
    };
    
    console.log('📡 Making HTTP request to Vertex AI...');
    
    const response = await fetch(CONFIG.endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const responseData = await response.json();
    console.log('✅ Response received');
    
    // Parse response (same format as Cloud Shell success)
    if (!responseData.predictions || responseData.predictions.length === 0) {
      throw new Error('No predictions in response');
    }
    
    const prediction = responseData.predictions[0];
    if (!prediction.bytesBase64Encoded) {
      throw new Error('No bytesBase64Encoded in prediction');
    }
    
    // Save the image
    const filename = `${id}_${Date.now()}.png`;
    const filepath = path.join(CONFIG.outputDir, filename);
    
    const imageBuffer = Buffer.from(prediction.bytesBase64Encoded, 'base64');
    fs.writeFileSync(filepath, imageBuffer);
    
    console.log(`✅ Success: ${id} saved to ${filename} (${(imageBuffer.length/1024).toFixed(1)}KB)`);
    
    return {
      id,
      description,
      prompt,
      filename,
      filepath,
      size: imageBuffer.length,
      success: true,
      attempt,
      mimeType: prediction.mimeType || 'image/png'
    };
    
  } catch (error) {
    console.log(`❌ Attempt ${attempt} failed for ${id}: ${error.message}`);
    
    if (attempt < CONFIG.maxRetries) {
      console.log(`⏳ Retrying in ${CONFIG.retryDelay/1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, CONFIG.retryDelay));
      return generateImageWithRetries(accessToken, promptData, attempt + 1);
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
  console.log('🚀 Starting Vertex AI Direct HTTP Image Generation');
  console.log(`📊 Testing ${TEST_PROMPTS.length} images with ${CONFIG.maxRetries} max retries each`);
  console.log(`🔗 Endpoint: ${CONFIG.endpoint}`);
  
  results.startTime = new Date();
  
  try {
    const accessToken = await initializeAuth();
    ensureOutputDirectory();
    
    for (let i = 0; i < TEST_PROMPTS.length; i++) {
      const promptData = TEST_PROMPTS[i];
      
      console.log(`\n📋 Processing ${i + 1}/${TEST_PROMPTS.length}: ${promptData.id}`);
      
      const result = await generateImageWithRetries(accessToken, promptData);
      
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
  console.log('📊 VERTEX AI DIRECT HTTP TEST RESULTS');
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
  console.log('3. Update Linear issues 1BU-55 and 1BU-56 with results');
  console.log('4. Update project documentation with findings');
}

/**
 * Main execution function
 */
async function main() {
  try {
    await generateAllImages();
    displayResults();
    
    // Save results to JSON file
    const resultsFile = path.join(CONFIG.outputDir, 'direct-http-test-results.json');
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
