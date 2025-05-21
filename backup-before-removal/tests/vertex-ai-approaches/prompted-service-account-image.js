// Prompted Service Account Image Generation Test
import { VertexAI } from '@google-cloud/vertexai';
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
  projectId: process.env.GOOGLE_CLOUD_PROJECT || 'mold-removal-lead-gen',
  location: process.env.GOOGLE_CLOUD_LOCATION || 'us-west1',
  model: 'imagen-3.0-capability',
  outputDir: path.join(__dirname, 'output')
  // Service account credentials are loaded from GOOGLE_APPLICATION_CREDENTIALS
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
    
    console.log('\n🔍 Initializing Vertex AI...');
    const vertexAI = new VertexAI({
      project: CONFIG.projectId,
      location: CONFIG.location,
      apiEndpoint: `${CONFIG.location}-aiplatform.googleapis.com`
    });

    const generativeModel = vertexAI.preview.getGenerativeModel({
      model: CONFIG.model,
      generationConfig: {
        temperature: 0.4,
        topK: 32,
        topP: 1,
        maxOutputTokens: 2048,
      },
    });

    console.log(`\n🎨 Generating image with prompt: "${prompt}"`);
    const result = await generativeModel.generateContent({
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
  console.log('=== Google Vertex AI Image Generation (Service Account) ===');
  
  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.error('❌ GOOGLE_APPLICATION_CREDENTIALS environment variable is not set');
    console.log('Please set it to the path of your service account key file');
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
