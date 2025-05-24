#!/usr/bin/env node

/**
 * Doors Page Image Generation - Batch 1 (15 images)
 *
 * Generates 15 high-quality images for the Doors page using Vertex AI Imagen API
 * Increased batch size from 10 to 15 images as requested
 *
 * Target Components:
 * - Layout4.jsx: Entry doors showcase
 * - Layout25.jsx: Patio doors showcase
 * - Layout16.jsx: Garage doors showcase
 * - Testimonial4.jsx: Customer testimonial avatar
 * - Additional door-related images for comprehensive coverage
 */

import { GoogleAuth } from 'google-auth-library';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const PROJECT_ID = 'windows-doors-website-dir-v2';
const LOCATION = 'us-west1';
const MODEL = 'imagen-3.0-fast-generate-001';
const OUTPUT_DIR = path.join(__dirname, '../public/images/doors');
const BATCH_SIZE = 15;

// Ensure output directory exists
await fs.mkdir(OUTPUT_DIR, { recursive: true });

// Image generation prompts for Doors page (15 images)
const imagePrompts = [
  // Core component images (4 images)
  {
    filename: 'doors-entry-showcase.png',
    prompt: 'Professional photograph of an elegant entry door on a beautiful Sacramento home. Modern front door with glass panels, rich wood finish, stylish hardware, welcoming entrance with landscaping, bright natural lighting, high-end residential photography style',
    component: 'Layout4.jsx',
    description: 'Entry doors showcase image'
  },
  {
    filename: 'doors-patio-showcase.png',
    prompt: 'Professional photograph of stunning patio doors connecting indoor and outdoor spaces. Large sliding glass doors or French doors opening to a beautiful patio, Sacramento home setting, natural light streaming through, elegant interior visible, outdoor living space',
    component: 'Layout25.jsx',
    description: 'Patio doors showcase image'
  },
  {
    filename: 'doors-garage-showcase.png',
    prompt: 'Professional photograph of premium garage doors on a Sacramento home. Modern garage door with clean lines, attractive finish, well-maintained driveway, beautiful home exterior, professional residential photography, curb appeal focus',
    component: 'Layout16.jsx',
    description: 'Garage doors showcase image'
  },
  {
    filename: 'doors-customer-testimonial.png',
    prompt: 'Professional headshot of a satisfied female homeowner, Jessica Brown, middle-aged, friendly smile, professional appearance, Sacramento resident, high-quality portrait photography, neutral background, trustworthy and approachable',
    component: 'Testimonial4.jsx',
    description: 'Customer testimonial avatar'
  },

  // Additional door images for comprehensive coverage (11 images)
  {
    filename: 'doors-entry-styles-1.png',
    prompt: 'Professional photograph of a classic wooden entry door with decorative glass inserts, traditional style, rich mahogany finish, brass hardware, welcoming front entrance, Sacramento home architecture',
    description: 'Entry door style variation 1'
  },
  {
    filename: 'doors-entry-styles-2.png',
    prompt: 'Professional photograph of a modern steel entry door with sleek design, contemporary style, dark finish, stainless steel hardware, minimalist entrance design, Sacramento modern home',
    description: 'Entry door style variation 2'
  },
  {
    filename: 'doors-patio-sliding.png',
    prompt: 'Professional photograph of large sliding patio doors, floor-to-ceiling glass panels, aluminum frame, smooth operation, connecting living room to outdoor deck, Sacramento home interior',
    description: 'Sliding patio doors'
  },
  {
    filename: 'doors-patio-french.png',
    prompt: 'Professional photograph of elegant French patio doors, traditional style with divided glass panels, white frame, opening to garden patio, Sacramento home with classic architecture',
    description: 'French patio doors'
  },
  {
    filename: 'doors-garage-traditional.png',
    prompt: 'Professional photograph of traditional garage door with raised panel design, neutral color, automatic opener, two-car garage, Sacramento suburban home, well-maintained exterior',
    description: 'Traditional garage door'
  },
  {
    filename: 'doors-garage-modern.png',
    prompt: 'Professional photograph of contemporary garage door with clean lines, modern design, dark color, sleek hardware, single-car garage, Sacramento modern home architecture',
    description: 'Modern garage door'
  },
  {
    filename: 'doors-security-features.png',
    prompt: 'Professional close-up photograph of door security features, high-quality deadbolt lock, reinforced door frame, security hardware, professional installation, home security focus',
    description: 'Door security features'
  },
  {
    filename: 'doors-energy-efficiency.png',
    prompt: 'Professional photograph showing door energy efficiency features, weatherstripping, insulated glass, thermal break technology, cross-section view or detailed shot, energy savings concept',
    description: 'Energy efficient door features'
  },
  {
    filename: 'doors-installation-process.png',
    prompt: 'Professional photograph of door installation in progress, skilled technician installing entry door, professional tools, Sacramento home setting, quality craftsmanship, installation service',
    description: 'Door installation process'
  },
  {
    filename: 'doors-before-after.png',
    prompt: 'Professional before and after comparison photograph of door replacement, old door vs new door, dramatic improvement, Sacramento home transformation, increased curb appeal',
    description: 'Door replacement before/after'
  },
  {
    filename: 'doors-variety-display.png',
    prompt: 'Professional photograph of door showroom or display, multiple door styles and finishes, entry doors, patio doors, garage doors, variety of options, Sacramento door dealer showroom',
    description: 'Door variety and options display'
  }
];

console.log(`🚀 Starting Doors Page Image Generation - Batch 1`);
console.log(`📊 Generating ${BATCH_SIZE} images for comprehensive door coverage`);
console.log(`💰 Estimated cost: $${(BATCH_SIZE * 0.04).toFixed(2)} (${BATCH_SIZE} images × $0.04)`);
console.log(`📁 Output directory: ${OUTPUT_DIR}`);

// Initialize Google Auth
const auth = new GoogleAuth({
  keyFilename: path.join(__dirname, '../Service accounts/vertex-ai-imagen-service-account-key.json'),
  scopes: ['https://www.googleapis.com/auth/cloud-platform'],
});

const authClient = await auth.getClient();
const endpoint = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${MODEL}:predict`;

let successCount = 0;
let errorCount = 0;

for (let i = 0; i < imagePrompts.length; i++) {
  const imageData = imagePrompts[i];
  console.log(`\n🎨 Generating image ${i + 1}/${imagePrompts.length}: ${imageData.filename}`);
  console.log(`📝 Prompt: ${imageData.prompt.substring(0, 100)}...`);

  try {
    const requestBody = {
      instances: [{
        prompt: imageData.prompt
      }],
      parameters: {
        sampleCount: 1,
        aspectRatio: "1:1",
        safetyFilterLevel: "block_some",
        personGeneration: "allow_adult"
      }
    };

    const response = await authClient.request({
      url: endpoint,
      method: 'POST',
      data: requestBody,
    });

    if (response.data?.predictions?.[0]?.bytesBase64Encoded) {
      const imageBuffer = Buffer.from(response.data.predictions[0].bytesBase64Encoded, 'base64');
      const outputPath = path.join(OUTPUT_DIR, imageData.filename);

      await fs.writeFile(outputPath, imageBuffer);
      console.log(`✅ Successfully generated: ${imageData.filename}`);
      console.log(`📍 Component: ${imageData.component || 'Additional coverage'}`);
      console.log(`📄 Description: ${imageData.description}`);
      successCount++;
    } else {
      console.log(`❌ No image data received for ${imageData.filename}`);
      errorCount++;
    }
  } catch (error) {
    console.error(`❌ Error generating ${imageData.filename}:`, error.message);
    errorCount++;
  }

  // Rate limiting: Wait 1.5 seconds between requests (40 images/minute limit)
  if (i < imagePrompts.length - 1) {
    await new Promise(resolve => setTimeout(resolve, 1500));
  }
}

console.log(`\n🎉 Doors Page Batch 1 Generation Complete!`);
console.log(`✅ Successful: ${successCount}/${imagePrompts.length} images`);
console.log(`❌ Failed: ${errorCount}/${imagePrompts.length} images`);
console.log(`💰 Actual cost: $${(successCount * 0.04).toFixed(2)}`);
console.log(`📁 Images saved to: ${OUTPUT_DIR}`);
console.log(`\n🔄 Next steps:`);
console.log(`1. Update Doors page components with generated images`);
console.log(`2. Test page functionality`);
console.log(`3. Follow 3-step completion process`);
