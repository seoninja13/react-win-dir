// Test 2: REST API Approach - Image Generation
// This test uses the direct REST API with an API key

import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Configuration
const CONFIG = {
  apiKey: process.env.GOOGLE_API_KEY,
  model: 'imagen-3.0-capability',
  region: 'us-west1',
  prompt: 'A beautiful, energy-efficient window with wooden frame',
  outputDir: path.join(__dirname, 'output'),
  outputFile: 'generated-image.png'
};

// Helper function to convert image to base64
async function fileToBase64(filePath) {
  const fileData = await fs.readFile(filePath);
  return fileData.toString('base64');
}

async function testRestImageGeneration() {
  console.log('=== Testing REST API Image Generation ===');
  
  if (!CONFIG.apiKey) {
    console.error('❌ GOOGLE_API_KEY environment variable is not set');
    process.exit(1);
  }

  try {
    // Create output directory if it doesn't exist
    await fs.mkdir(CONFIG.outputDir, { recursive: true });
    
    console.log('\n1. Initializing Google Generative AI...');
    const genAI = new GoogleGenerativeAI({
      apiKey: CONFIG.apiKey,
      apiEndpoint: `us-west1-aiplatform.googleapis.com`
    });
    const model = genAI.getGenerativeModel({ 
      model: `projects/${process.env.GOOGLE_CLOUD_PROJECT}/locations/us-west1/publishers/google/models/${CONFIG.model}`
    });
    
    console.log(`2. Generating image with prompt: "${CONFIG.prompt}"`);
    
    // For image generation, we'll use the text-to-image model
    const result = await model.generateContent({
      contents: [{
        role: 'user',
        parts: [
          { text: CONFIG.prompt },
          // You can also include an image part if needed
          // { inlineData: { mimeType: 'image/png', data: await fileToBase64('path/to/your/image.png') }}
        ]
      }]
    });
    
    const response = await result.response;
    
    // Note: The actual implementation might vary based on the API response format
    // This is a simplified example
    console.log('\n✅ Success! Image generation response:');
    console.log(JSON.stringify(response, null, 2));
    
    // In a real implementation, you would save the generated image
    // await fs.writeFile(path.join(CONFIG.outputDir, CONFIG.outputFile), imageBuffer);
    
    return { success: true, response };
  } catch (error) {
    console.error('\n❌ Error in REST API Image Generation:');
    console.error(error);
    return { success: false, error: error.message };
  }
}

// Run the test
testRestImageGeneration()
  .then(result => {
    console.log('\nTest completed with result:', result.success ? 'SUCCESS' : 'FAILED');
    if (!result.success) {
      process.exit(1);
    }
  })
  .catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
