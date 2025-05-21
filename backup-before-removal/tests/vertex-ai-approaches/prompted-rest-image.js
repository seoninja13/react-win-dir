// Prompted REST API Image Generation Test
import { GoogleGenerativeAI } from '@google/generative-ai';
import readline from 'readline';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '.env') });

// Configuration
const CONFIG = {
  apiKey: process.env.GOOGLE_API_KEY,
  projectId: process.env.GOOGLE_CLOUD_PROJECT || 'mold-removal-lead-gen',
  model: 'imagen-3.0-capability',
  region: process.env.GOOGLE_CLOUD_LOCATION || 'us-west1',
  outputDir: path.join(__dirname, 'output')
};

async function promptForInput(question) {
  return new Promise((resolve) => {
    rl.question(`\n📝 ${question} `, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function generateImage(prompt) {
  try {
    await fs.mkdir(CONFIG.outputDir, { recursive: true });
    
    console.log('\n🔍 Initializing Google Generative AI...');
    const genAI = new GoogleGenerativeAI({
      apiKey: CONFIG.apiKey,
      apiEndpoint: `${CONFIG.region}-aiplatform.googleapis.com`
    });

    const model = genAI.getGenerativeModel({
      model: `projects/${CONFIG.projectId}/locations/${CONFIG.region}/publishers/google/models/${CONFIG.model}`
    });

    console.log(`\n🎨 Generating image with prompt: "${prompt}"`);
    const result = await model.generateContent({
      contents: [{
        role: 'user',
        parts: [{
          text: prompt,
        }],
      }],
    });

    if (result.response && result.response.candidates && result.response.candidates[0].content.parts[0].text) {
      const imageData = result.response.candidates[0].content.parts[0].text;
      const imageBuffer = Buffer.from(imageData, 'base64');
      
      const outputFile = `generated-${Date.now()}.png`;
      const outputPath = path.join(CONFIG.outputDir, outputFile);
      
      await fs.writeFile(outputPath, imageBuffer);
      console.log(`\n✅ Image saved to: ${outputPath}`);
      return outputPath;
    } else {
      throw new Error('No image data received in the response');
    }
  } catch (error) {
    console.error('\n❌ Error generating image:');
    console.error(error);
    throw error;
  }
}

async function main() {
  console.log('=== Google Vertex AI Image Generation (REST API) ===');
  
  if (!CONFIG.apiKey) {
    console.error('❌ Google API Key is required');
    process.exit(1);
  }

  try {
    while (true) {
      const prompt = await promptForInput('Enter your image prompt:');
      if (!prompt) break;
      
      await generateImage(prompt);
      
      const again = await promptForInput('🔄 Generate another image? (y/n): ');
      if (again.toLowerCase() !== 'y') break;
    }
  } catch (error) {
    console.error('\n❌ Test failed:', error);
  } finally {
    rl.close();
    console.log('\n👋 Exiting...');
  }
}

main();
