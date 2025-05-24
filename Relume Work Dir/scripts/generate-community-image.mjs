/**
 * Generate Community Image for About Page
 * 
 * This script generates the missing community image for Layout10_1 component
 * "Giving Back to Our Sacramento Community" section
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

// Configuration
const CONFIG = {
  project: process.env.GOOGLE_CLOUD_PROJECT || 'windows-doors-website-dir-v2',
  location: process.env.GOOGLE_CLOUD_LOCATION || 'us-west1',
  model: 'imagen-3.0-fast-generate-001',
  endpoint: `https://us-west1-aiplatform.googleapis.com/v1/projects/windows-doors-website-dir-v2/locations/us-west1/publishers/google/models/imagen-3.0-fast-generate-001:predict`,
  outputDir: path.join(__dirname, '..', 'generated-images', 'about-page'),
  maxRetries: 3,
  retryDelay: 5000,
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
 * Generate community image
 */
async function generateCommunityImageWithRetries(accessToken, attempt = 1) {
  const imageConfig = {
    prompt: `Professional photograph of Windows and Doors California team giving back to Sacramento community, community service event, team volunteering at local charity, helping local families, community partnership activities, bright natural lighting, high quality corporate photography style, professional team in branded shirts helping community members`,
    filename: 'about-community-giving-back.png',
    targetPath: 'public/images/about/about-community-giving-back.png'
  };

  try {
    console.log(`🎨 Generating community image ${attempt}/${CONFIG.maxRetries}: ${imageConfig.filename}`);
    console.log(`📝 Prompt: ${imageConfig.prompt.substring(0, 80)}...`);

    // Prepare request body
    const requestBody = {
      instances: [{ prompt: imageConfig.prompt }],
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

    // Save the image to both locations
    const imageBuffer = Buffer.from(prediction.bytesBase64Encoded, 'base64');
    
    // Save to generated-images directory (backup)
    const backupPath = path.join(CONFIG.outputDir, imageConfig.filename);
    fs.writeFileSync(backupPath, imageBuffer);
    console.log(`✅ Backup saved: ${backupPath} (${(imageBuffer.length/1024).toFixed(1)}KB)`);

    // Save to public/images/about directory (active image)
    const publicPath = path.join(__dirname, '..', imageConfig.targetPath);
    const publicDir = path.dirname(publicPath);
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    fs.writeFileSync(publicPath, imageBuffer);
    console.log(`✅ Active image saved: ${publicPath} (${(imageBuffer.length/1024).toFixed(1)}KB)`);

    return {
      success: true,
      filename: imageConfig.filename,
      size: Math.round(imageBuffer.length / 1024),
      attempt,
      backupPath,
      publicPath
    };

  } catch (error) {
    console.log(`❌ Attempt ${attempt} failed for ${imageConfig.filename}: ${error.message}`);

    if (attempt < CONFIG.maxRetries) {
      console.log(`⏳ Retrying in ${CONFIG.retryDelay/1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, CONFIG.retryDelay));
      return generateCommunityImageWithRetries(accessToken, attempt + 1);
    } else {
      console.log(`💥 All attempts failed for ${imageConfig.filename}`);
      return {
        success: false,
        filename: imageConfig.filename,
        error: error.message,
        attempts: attempt
      };
    }
  }
}

async function generateCommunityImage() {
  try {
    console.log('🚀 Starting Community Image Generation');
    console.log('📅 Timestamp:', new Date().toISOString());
    console.log(`🔗 Endpoint: ${CONFIG.endpoint}`);
    console.log(`💰 Estimated cost: $0.04`);
    console.log(`⏱️ Estimated time: ~30 seconds\n`);

    const accessToken = await initializeAuth();
    ensureOutputDirectory();

    const result = await generateCommunityImageWithRetries(accessToken);

    // Summary report
    console.log('\n📊 COMMUNITY IMAGE GENERATION SUMMARY');
    console.log('====================================');

    if (result.success) {
      console.log(`✅ Success: ${result.filename} generated successfully`);
      console.log(`📁 Backup: ${result.backupPath}`);
      console.log(`📁 Active: ${result.publicPath}`);
      console.log(`📏 Size: ${result.size} KB`);
      console.log(`💰 Cost: $0.04`);
      console.log('\n🎉 Community image generation complete!');
      console.log('🔄 The new image should now be visible in the "Giving Back to Our Sacramento Community" section');
    } else {
      console.log(`❌ Failed: ${result.error}`);
      console.log(`🔄 Attempts: ${result.attempts}`);
      console.log('\n⚠️ Image generation failed. Please check configuration and try again.');
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
generateCommunityImage();
