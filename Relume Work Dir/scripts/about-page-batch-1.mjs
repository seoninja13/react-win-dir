#!/usr/bin/env node

/**
 * About Page Image Generation - Batch 1 (15 images)
 * 
 * Generates 15 high-quality images for the About page using Vertex AI Imagen API
 * Using proven 15-image batch workflow established for Doors page
 * 
 * Target Components:
 * - Header5.jsx: Hero background image
 * - Layout1.jsx: Why choose us showcase
 * - Layout6.jsx: Showroom location image
 * - Layout10.jsx: Commitment and service image
 * - Contact16.jsx: Map/location image
 * - Additional about-related images for comprehensive coverage
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
const OUTPUT_DIR = path.join(__dirname, '../public/images/about');
const BATCH_SIZE = 15;

// Ensure output directory exists
await fs.mkdir(OUTPUT_DIR, { recursive: true });

// Image generation prompts for About page (15 images)
const imagePrompts = [
  // Core component images (5 images)
  {
    filename: 'about-hero-background.png',
    prompt: 'Professional photograph of Window World of Greater Sacramento office building exterior, modern commercial building, welcoming entrance, professional signage, Sacramento business district, bright natural lighting, corporate photography style',
    component: 'Header5.jsx',
    description: 'Hero background image for About page'
  },
  {
    filename: 'about-why-choose-us.png', 
    prompt: 'Professional photograph showcasing quality window installation work, skilled technician installing premium windows, attention to detail, professional tools, Sacramento home setting, quality craftsmanship focus, customer satisfaction',
    component: 'Layout1.jsx',
    description: 'Why choose us showcase image'
  },
  {
    filename: 'about-showroom-interior.png',
    prompt: 'Professional photograph of Window World showroom interior in Sacramento, display of various window and door samples, well-organized showroom, professional lighting, customer consultation area, modern retail space',
    component: 'Layout6.jsx', 
    description: 'Showroom location interior image'
  },
  {
    filename: 'about-commitment-service.png',
    prompt: 'Professional photograph of Window World team providing excellent customer service, friendly staff helping customers, consultation in progress, professional appearance, Sacramento office setting, customer satisfaction focus',
    component: 'Layout10.jsx',
    description: 'Commitment and service image'
  },
  {
    filename: 'about-location-map.png',
    prompt: 'Professional map image of Sacramento area showing Window World location, clean map design, location marker, Sacramento streets and landmarks, professional cartography style, business location focus',
    component: 'Contact16.jsx',
    description: 'Location map image'
  },
  
  // Additional about images for comprehensive coverage (10 images)
  {
    filename: 'about-company-history.png',
    prompt: 'Professional photograph representing company history and heritage, established business concept, timeline visual, professional corporate imagery, Sacramento business community, trust and reliability',
    description: 'Company history and heritage'
  },
  {
    filename: 'about-team-photo.png',
    prompt: 'Professional group photograph of Window World Sacramento team, diverse group of employees, professional attire, friendly and approachable, office or showroom setting, team unity and professionalism',
    description: 'Team photo'
  },
  {
    filename: 'about-awards-certifications.png',
    prompt: 'Professional photograph of awards and certifications display, industry recognition, quality certifications, professional achievements, wall display in office, credibility and trust focus',
    description: 'Awards and certifications'
  },
  {
    filename: 'about-community-involvement.png',
    prompt: 'Professional photograph of community involvement activities, Window World team participating in Sacramento community events, giving back, local charity work, community partnership',
    description: 'Community involvement'
  },
  {
    filename: 'about-installation-expertise.png',
    prompt: 'Professional photograph of installation expertise, experienced technician demonstrating proper installation techniques, professional tools and equipment, quality workmanship, Sacramento home setting',
    description: 'Installation expertise'
  },
  {
    filename: 'about-customer-testimonials.png',
    prompt: 'Professional photograph of satisfied customers with their new windows, happy homeowners, beautiful Sacramento home exterior, successful installation project, customer satisfaction testimonial setting',
    description: 'Customer testimonials visual'
  },
  {
    filename: 'about-quality-products.png',
    prompt: 'Professional close-up photograph of high-quality window and door products, premium materials, attention to detail, craftsmanship focus, product quality showcase, professional product photography',
    description: 'Quality products showcase'
  },
  {
    filename: 'about-warranty-guarantee.png',
    prompt: 'Professional photograph representing warranty and guarantee concept, protection and security, quality assurance, professional documentation, trust and reliability, customer protection focus',
    description: 'Warranty and guarantee'
  },
  {
    filename: 'about-consultation-process.png',
    prompt: 'Professional photograph of consultation process, Window World representative meeting with homeowners, in-home consultation, measuring and planning, professional consultation tools, customer service',
    description: 'Consultation process'
  },
  {
    filename: 'about-sacramento-service-area.png',
    prompt: 'Professional photograph of Sacramento area homes and neighborhoods, diverse residential areas served by Window World, beautiful Sacramento homes, service area coverage, local community focus',
    description: 'Sacramento service area'
  }
];

console.log(`🚀 Starting About Page Image Generation - Batch 1`);
console.log(`📊 Generating ${BATCH_SIZE} images for comprehensive about page coverage`);
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

console.log(`\n🎉 About Page Batch 1 Generation Complete!`);
console.log(`✅ Successful: ${successCount}/${imagePrompts.length} images`);
console.log(`❌ Failed: ${errorCount}/${imagePrompts.length} images`);
console.log(`💰 Actual cost: $${(successCount * 0.04).toFixed(2)}`);
console.log(`📁 Images saved to: ${OUTPUT_DIR}`);
console.log(`\n🔄 Next steps:`);
console.log(`1. Update About page components with generated images`);
console.log(`2. Test page functionality`);
console.log(`3. Follow 3-step completion process`);
