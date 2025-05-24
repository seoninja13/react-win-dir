/**
 * Generate Missing Navbar Dropdown Images
 * Generate the remaining 4 placeholder images in the navigation dropdown
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

console.log('🧭 Generating Missing Navbar Dropdown Images...');

// Missing navbar dropdown images (4 more needed)
const NAVBAR_IMAGES = [
  {
    component: 'Navbar10',
    filename: 'home-nav-dropdown-3.png',
    prompt: 'Professional photograph of window installation process, skilled technicians working on home improvement, technical photography style, high quality, detailed craftsmanship',
    alt: 'Professional window installation service'
  },
  {
    component: 'Navbar10',
    filename: 'home-nav-dropdown-4.png',
    prompt: 'Professional photograph of door installation and replacement service, expert craftsmanship, residential entrance improvement, high quality work photography',
    alt: 'Expert door installation service'
  },
  {
    component: 'Navbar10',
    filename: 'home-nav-dropdown-5.png',
    prompt: 'Professional photograph of vinyl siding installation project, home exterior improvement, architectural photography style, high quality residential work',
    alt: 'Premium vinyl siding installation'
  },
  {
    component: 'Navbar10',
    filename: 'home-nav-dropdown-6.png',
    prompt: 'Professional photograph of completed home renovation project, satisfied customer with new windows and doors, customer service photography, high quality result',
    alt: 'Satisfied customer with home renovation'
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
  maxRetries: 3,
  retryDelay: 5000,
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
    
    // Prepare request body
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
    
    // Parse response
    if (!responseData.predictions || responseData.predictions.length === 0) {
      throw new Error('No predictions in response');
    }
    
    const prediction = responseData.predictions[0];
    if (!prediction.bytesBase64Encoded) {
      throw new Error('No bytesBase64Encoded in prediction');
    }
    
    // Save the image
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
    console.log('🚀 Starting Missing Navbar Images Generation');
    console.log(`📊 Generating ${NAVBAR_IMAGES.length} navbar dropdown images`);
    console.log(`💰 Cost: $${(NAVBAR_IMAGES.length * 0.04).toFixed(2)}`);
    console.log(`⏱️ Estimated time: ~${NAVBAR_IMAGES.length * 3} seconds\n`);
    
    const accessToken = await initializeAuth();
    const results = [];
    
    for (let i = 0; i < NAVBAR_IMAGES.length; i++) {
      const imageConfig = NAVBAR_IMAGES[i];
      
      console.log(`\n📋 Processing ${i + 1}/${NAVBAR_IMAGES.length}: ${imageConfig.filename}`);
      
      const result = await generateNavbarImage(accessToken, imageConfig);
      results.push(result);
      
      // Add delay between requests (except for last one)
      if (i < NAVBAR_IMAGES.length - 1) {
        console.log(`⏳ Waiting ${CONFIG.delayBetweenRequests/1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, CONFIG.delayBetweenRequests));
      }
    }
    
    console.log('\n📊 NAVBAR IMAGES GENERATION SUMMARY');
    console.log('==================================');
    
    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);
    
    console.log(`✅ Successful: ${successful.length}/${NAVBAR_IMAGES.length}`);
    console.log(`❌ Failed: ${failed.length}/${NAVBAR_IMAGES.length}`);
    console.log(`💰 Actual cost: $${(successful.length * 0.04).toFixed(2)}`);
    
    if (successful.length > 0) {
      console.log('\n✅ SUCCESSFUL IMAGES:');
      successful.forEach(result => {
        console.log(`  📸 ${result.filename} - ${result.size} KB`);
      });
    }
    
    if (failed.length > 0) {
      console.log('\n❌ FAILED IMAGES:');
      failed.forEach(result => {
        console.log(`  ⚠️ ${result.filename} - ${result.error}`);
      });
    }
    
    console.log('\n🎯 NEXT STEP: Update Navbar10 component with new images');
    console.log('\n🎉 Missing navbar images generation complete!');
    
  } catch (error) {
    console.error('\n❌ Fatal Error:', error.message);
    process.exit(1);
  }
}

// Run the function
main();
