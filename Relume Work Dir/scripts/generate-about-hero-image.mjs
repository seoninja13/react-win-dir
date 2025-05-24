/**
 * Generate About Page Missing Images
 *
 * This script generates the three missing images for the About page:
 * 1. Layout24 - Team/company image
 * 2. Layout27 - Service/installation image
 * 3. Layout6 - Showroom interior image
 * Uses proven direct HTTP methodology from home-page-image-generation.mjs
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

// Configuration based on proven working direct HTTP approach
const CONFIG = {
  project: process.env.GOOGLE_CLOUD_PROJECT || 'windows-doors-website-dir-v2',
  location: process.env.GOOGLE_CLOUD_LOCATION || 'us-west1',
  model: 'imagen-3.0-fast-generate-001',
  endpoint: `https://us-west1-aiplatform.googleapis.com/v1/projects/windows-doors-website-dir-v2/locations/us-west1/publishers/google/models/imagen-3.0-fast-generate-001:predict`,
  outputDir: path.join(__dirname, '..', 'generated-images', 'about-page'),
  maxRetries: 3,
  retryDelay: 5000, // 5 seconds between retries
};

/**
 * Initialize Google Auth client (proven working approach)
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
 * Generate About page images using direct HTTP request (proven working approach)
 */
async function generateAboutImageWithRetries(accessToken, imageConfig, attempt = 1) {
  const { prompt, filename } = imageConfig;

  try {
    console.log(`🎨 Generating About hero image ${attempt}/${CONFIG.maxRetries}: ${filename}`);
    console.log(`📝 Prompt: ${prompt.substring(0, 80)}...`);

    // Prepare request body (same format as successful test)
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

    // Parse response (same format as successful test)
    if (!responseData.predictions || responseData.predictions.length === 0) {
      throw new Error('No predictions in response');
    }

    const prediction = responseData.predictions[0];
    if (!prediction.bytesBase64Encoded) {
      throw new Error('No bytesBase64Encoded in prediction');
    }

    // Save the image to both locations
    const imageBuffer = Buffer.from(prediction.bytesBase64Encoded, 'base64');

    // Save to generated-images directory (backup)
    const backupPath = path.join(CONFIG.outputDir, filename);
    fs.writeFileSync(backupPath, imageBuffer);
    console.log(`✅ Backup saved: ${backupPath} (${(imageBuffer.length/1024).toFixed(1)}KB)`);

    // Save to public/images/about directory (active image)
    const publicPath = path.join(__dirname, '..', imageConfig.targetPath || `public/images/about/${filename}`);
    const publicDir = path.dirname(publicPath);
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    fs.writeFileSync(publicPath, imageBuffer);
    console.log(`✅ Active image saved: ${publicPath} (${(imageBuffer.length/1024).toFixed(1)}KB)`);

    return {
      success: true,
      filename,
      size: Math.round(imageBuffer.length / 1024),
      attempt,
      backupPath,
      publicPath
    };

  } catch (error) {
    console.log(`❌ Attempt ${attempt} failed for ${filename}: ${error.message}`);

    if (attempt < CONFIG.maxRetries) {
      console.log(`⏳ Retrying in ${CONFIG.retryDelay/1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, CONFIG.retryDelay));
      return generateAboutHeroImageWithRetries(accessToken, attempt + 1);
    } else {
      console.log(`💥 All attempts failed for ${filename}`);
      return {
        success: false,
        filename,
        error: error.message,
        attempts: attempt
      };
    }
  }
}

async function generateAboutImages() {
  try {
    console.log('🚀 Starting About Page Missing Images Generation');
    console.log('📅 Timestamp:', new Date().toISOString());
    console.log(`🔗 Endpoint: ${CONFIG.endpoint}`);
    console.log(`💰 Estimated cost: $0.12 (3 images × $0.04)`);
    console.log(`⏱️ Estimated time: ~90 seconds\n`);

    const accessToken = await initializeAuth();
    ensureOutputDirectory();

    // Define the three missing images
    const imageConfigs = [
      {
        prompt: `Professional team of Windows and Doors California employees in business attire, diverse group of friendly staff members, modern office setting, high quality corporate photography, bright professional lighting, welcoming smiles, company branded uniforms or polo shirts, clean modern background`,
        filename: 'about-team-professional.png',
        targetPath: 'public/images/about/about-team-professional.png'
      },
      {
        prompt: `Professional window installation service in progress, Windows and Doors California technicians installing high-quality windows, modern home exterior, skilled craftsmen at work, professional tools and equipment, clean installation process, high quality commercial photography style, bright natural lighting`,
        filename: 'about-service-installation.png',
        targetPath: 'public/images/about/about-service-installation.png'
      },
      {
        prompt: `Modern showroom interior for Windows and Doors California, display of various window and door samples, well-lit professional retail space, organized product displays, contemporary interior design, welcoming customer area, high quality commercial photography, bright professional lighting`,
        filename: 'about-showroom-interior.png',
        targetPath: 'public/images/about/about-showroom-interior.png'
      }
    ];

    const results = [];

    for (let i = 0; i < imageConfigs.length; i++) {
      const config = imageConfigs[i];
      console.log(`\n📸 Generating image ${i + 1}/3: ${config.filename}`);
      const result = await generateAboutImageWithRetries(accessToken, config);
      results.push(result);

      // Add delay between requests to respect rate limits
      if (i < imageConfigs.length - 1) {
        console.log('⏳ Waiting 2 seconds before next image...');
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    // Summary report
    console.log('\n📊 ABOUT PAGE MISSING IMAGES GENERATION SUMMARY');
    console.log('===============================================');

    const successCount = results.filter(r => r.success).length;
    const failedCount = results.filter(r => !r.success).length;

    console.log(`✅ Successful: ${successCount}/3 images`);
    console.log(`❌ Failed: ${failedCount}/3 images`);
    console.log(`💰 Total Cost: $${(successCount * 0.04).toFixed(2)}`);

    results.forEach((result, index) => {
      const config = imageConfigs[index];
      if (result.success) {
        console.log(`\n📸 Image ${index + 1}: ${result.filename}`);
        console.log(`   ✅ Status: Generated successfully`);
        console.log(`   📁 Backup: ${result.backupPath}`);
        console.log(`   📁 Active: ${result.publicPath}`);
        console.log(`   📏 Size: ${result.size} KB`);
      } else {
        console.log(`\n📸 Image ${index + 1}: ${result.filename}`);
        console.log(`   ❌ Status: Failed - ${result.error}`);
        console.log(`   🔄 Attempts: ${result.attempts}`);
      }
    });

    if (successCount === 3) {
      console.log('\n🎉 All About page missing images generated successfully!');
      console.log('🔄 The new images should now be visible on the About page');
    } else if (successCount > 0) {
      console.log('\n⚠️ Some images generated successfully, but some failed.');
      console.log('🔄 Please check the failed images and try again if needed.');
    } else {
      console.log('\n❌ All image generation failed. Please check configuration and try again.');
    }

  } catch (error) {
    console.error('\n❌ Fatal Error:', error.message);
    if (error.stack) {
      console.error('🔍 Stack trace:', error.stack);
    }
    process.exit(1);
  }
}

// Run the script
generateAboutImages();
