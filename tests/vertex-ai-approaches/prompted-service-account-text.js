// Prompted Service Account Text Generation Test
import { VertexAI } from '@google-cloud/vertexai';
import readline from 'readline';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '.env') });

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Configuration
const CONFIG = {
  projectId: process.env.GOOGLE_CLOUD_PROJECT || 'mold-removal-lead-gen',
  location: process.env.GOOGLE_CLOUD_LOCATION || 'us-west1',
  model: 'gemini-2.0-flash',
  // Service account credentials are loaded from GOOGLE_APPLICATION_CREDENTIALS
};

async function promptForInput(question) {
  return new Promise((resolve) => {
    rl.question(`\n📝 ${question} `, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function generateText(prompt) {
  try {
    console.log('\n🔍 Initializing Vertex AI...');
    
    const vertexAI = new VertexAI({
      project: CONFIG.projectId,
      location: CONFIG.location,
      apiEndpoint: `${CONFIG.location}-aiplatform.googleapis.com`
    });

    const generativeModel = vertexAI.preview.getGenerativeModel({
      model: CONFIG.model,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    });

    console.log(`\n🚀 Generating text with prompt: "${prompt}"`);
    const result = await generativeModel.generateContent({
      contents: [{
        role: 'user',
        parts: [{
          text: prompt,
        }],
      }],
    });

    const response = result.response;
    const text = response.candidates[0].content.parts[0].text;
    
    console.log('\n✅ Generated Text:');
    console.log('='.repeat(80));
    console.log(text);
    console.log('='.repeat(80));
    
    return text;
  } catch (error) {
    console.error('\n❌ Error generating text:');
    console.error(error);
    throw error;
  }
}

async function main() {
  console.log('=== Google Vertex AI Text Generation (Service Account) ===');
  
  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.error('❌ GOOGLE_APPLICATION_CREDENTIALS environment variable is not set');
    console.log('Please set it to the path of your service account key file');
    process.exit(1);
  }

  try {
    while (true) {
      const prompt = await promptForInput('Enter your text prompt:');
      if (!prompt) break;
      
      await generateText(prompt);
      
      const again = await promptForInput('🔄 Generate another text? (y/n): ');
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
