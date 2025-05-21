// Prompted REST API Text Generation Test
import readline from 'readline';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

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
  apiKey: process.env.GOOGLE_API_KEY,
  model: 'gemini-2.0-flash',  // Using Gemini 2.0 Flash model
  apiUrl: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'
};

async function promptForText() {
  return new Promise((resolve) => {
    rl.question('\n📝 Enter your text prompt: ', (answer) => {
      if (answer.toLowerCase() === 'exit') {
        console.log('\n👋 Exiting...');
        process.exit(0);
      }
      resolve(answer);
    });
  });
}

async function generateText(prompt) {
  try {
    console.log('\n🔍 Initializing Gemini API...');
    console.log(`Using API Key: ${CONFIG.apiKey ? '✅ (set)' : '❌ (not set)'}`);
    console.log(`Model: ${CONFIG.model}`);
    
    const url = `${CONFIG.apiUrl}?key=${CONFIG.apiKey}`;
    console.log(`\n🔧 Using API URL: ${url.replace(CONFIG.apiKey, '***')}`);
    
    console.log(`\n🚀 Generating text with prompt: "${prompt}"`);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API request failed with status ${response.status}: ${JSON.stringify(errorData)}`);
    }
    
    const data = await response.json();
    
    // Extract the generated text from the response
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No text returned';
    
    console.log('\n✅ Generated Text:');
    console.log('='.repeat(80));
    console.log(generatedText);
    console.log('='.repeat(80));
    
    return generatedText;
    
  } catch (error) {
    console.error('\n❌ Error generating text:');
    console.error(error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    throw error;
  }
}

async function main() {
  console.log('=== Google Gemini Text Generation (REST API) ===');
  
  if (!CONFIG.apiKey) {
    console.error('\n❌ Error: GOOGLE_API_KEY environment variable is not set');
    process.exit(1);
  }
  
  try {
    while (true) {
      const prompt = await promptForText();
      await generateText(prompt);
      
      const again = await new Promise((resolve) => {
        rl.question('\n🔄 Generate another? (y/n): ', (answer) => {
          resolve(answer.toLowerCase() === 'y');
        });
      });
      
      if (!again) {
        console.log('\n👋 Exiting...');
        break;
      }
    }
  } catch (error) {
    console.error('\n❌ An error occurred:', error);
  } finally {
    rl.close();
  }
}

main().catch(console.error);
