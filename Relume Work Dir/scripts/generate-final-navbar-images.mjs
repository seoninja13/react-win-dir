/**
 * Generate Final 2 Navbar Images
 * Generate the last 2 placeholder images in the navigation dropdown
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

console.log('🎯 Generating Final 2 Navbar Images...');

// Final 2 navbar dropdown images
const FINAL_NAVBAR_IMAGES = [
  {
    component: 'Navbar10',
    filename: 'home-nav-dropdown-7.png',
    prompt: 'Professional photograph of energy-efficient window technology, modern glass technology, technical photography style, high quality, detailed window features and benefits',
    alt: 'Energy-efficient window technology'
  },
  {
    component: 'Navbar10',
    filename: 'home-nav-dropdown-8.png',
    prompt: 'Professional photograph of home warranty and service guarantee, customer service excellence, business photography style, high quality, professional service commitment',
    alt: 'Professional warranty and service guarantee'
  }
];

// Configuration (proven working setup)
const CONFIG = {
  project: process.env.GOOGLE_CLOUD_PROJECT,
  location: process.env.GOOGLE_CLOUD_LOCATION || 'us-west1',
  model: 'imagen-3.0-fast-generate-001',
  endpoint: `https://us-west1-aiplatform.googleapis.com/v1/projects/${process.env.GOOGLE_CLOUD_PROJECT}/locations/us-west1/publishers/google/models/imagen-3.0-fast-generate-001:predict`,
  outputDir: path.join(__dirname, '..', 'generated-images', 'home-page'),
  delayBetweenRequests: 2000,
};

/**
 * Initialize Google Auth client
 */
async function initializeAuth() {
  console.log('🔧 Initializing Google Auth...');
  
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
 * Generate a single navbar image
 */
async function generateNavbarImage(accessToken, imageConfig) {
  const { filename, prompt, component, alt } = imageConfig;
  
  try {
    console.log(`🎨 Generating: ${filename}`);
    console.log(`📝 Prompt: ${prompt.substring(0, 80)}...`);
    
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
    
    if (!responseData.predictions || responseData.predictions.length === 0) {
      throw new Error('No predictions in response');
    }
    
    const prediction = responseData.predictions[0];
    if (!prediction.bytesBase64Encoded) {
      throw new Error('No bytesBase64Encoded in prediction');
    }
    
    const filepath = path.join(CONFIG.outputDir, filename);
    const imageBuffer = Buffer.from(prediction.bytesBase64Encoded, 'base64');
    fs.writeFileSync(filepath, imageBuffer);
    
    console.log(`✅ Success: ${filename} saved (${(imageBuffer.length/1024).toFixed(1)}KB)`);
    
    return {
      success: true,
      filename,
      component,
      size: Math.round(imageBuffer.length / 1024),
      alt
    };
    
  } catch (error) {
    console.log(`❌ Failed to generate ${filename}: ${error.message}`);
    return {
      success: false,
      filename,
      component,
      error: error.message
    };
  }
}

async function main() {
  try {
    console.log('🚀 Starting Final Navbar Images Generation');
    console.log(`📊 Generating ${FINAL_NAVBAR_IMAGES.length} final navbar images`);
    console.log(`💰 Cost: $${(FINAL_NAVBAR_IMAGES.length * 0.04).toFixed(2)}`);
    console.log(`⏱️ Estimated time: ~${FINAL_NAVBAR_IMAGES.length * 3} seconds\n`);
    
    const accessToken = await initializeAuth();
    const results = [];
    
    for (let i = 0; i < FINAL_NAVBAR_IMAGES.length; i++) {
      const imageConfig = FINAL_NAVBAR_IMAGES[i];
      
      console.log(`\n📋 Processing ${i + 1}/${FINAL_NAVBAR_IMAGES.length}: ${imageConfig.filename}`);
      
      const result = await generateNavbarImage(accessToken, imageConfig);
      results.push(result);
      
      if (i < FINAL_NAVBAR_IMAGES.length - 1) {
        console.log(`⏳ Waiting ${CONFIG.delayBetweenRequests/1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, CONFIG.delayBetweenRequests));
      }
    }
    
    console.log('\n📊 FINAL NAVBAR IMAGES SUMMARY');
    console.log('=============================');
    
    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);
    
    console.log(`✅ Successful: ${successful.length}/${FINAL_NAVBAR_IMAGES.length}`);
    console.log(`❌ Failed: ${failed.length}/${FINAL_NAVBAR_IMAGES.length}`);
    console.log(`💰 Actual cost: $${(successful.length * 0.04).toFixed(2)}`);
    
    if (successful.length > 0) {
      console.log('\n✅ SUCCESSFUL IMAGES:');
      successful.forEach(result => {
        console.log(`  📸 ${result.filename} - ${result.size} KB`);
      });
    }
    
    console.log('\n🎯 READY TO COMPLETE: Update final 2 navbar placeholders');
    console.log('\n🎉 Final navbar images generation complete!');
    
  } catch (error) {
    console.error('\n❌ Fatal Error:', error.message);
    process.exit(1);
  }
}

main();
