// Direct REST API Test using node-fetch
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '.env') });

// Configuration
const CONFIG = {
  apiKey: process.env.GOOGLE_API_KEY,
  model: 'gemini-2.0-flash',
  apiUrl: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'
};

async function testDirectRestApi() {
  try {
    console.log('=== Testing Direct REST API to Gemini 2.0 Flash ===');
    
    if (!CONFIG.apiKey) {
      throw new Error('GOOGLE_API_KEY environment variable is not set');
    }
    
    const url = `${CONFIG.apiUrl}?key=${CONFIG.apiKey}`;
    const prompt = 'Explain how AI works';
    
    console.log(`\n🔍 Sending request to Gemini API...`);
    console.log(`URL: ${url.replace(CONFIG.apiKey, '***')}`);
    console.log(`Prompt: "${prompt}"`);
    
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
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}: ${JSON.stringify(data)}`);
    }
    
    console.log('\n✅ Response received:');
    console.log('='.repeat(80));
    
    // Pretty print the response
    console.log(JSON.stringify(data, null, 2));
    
    // Extract and display just the generated text if available
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (generatedText) {
      console.log('\n📝 Generated Text:');
      console.log('='.repeat(80));
      console.log(generatedText);
    }
    
    console.log('='.repeat(80));
    
  } catch (error) {
    console.error('\n❌ Error:');
    console.error(error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

// Run the test
testDirectRestApi().catch(console.error);
