// Official Google Gen AI SDK Test for Gemini 2.0 Flash
import { GoogleGenAI } from "@google/genai";
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
  model: 'gemini-2.0-flash'
};

async function testGeminiApi() {
  try {
    console.log('=== Testing Official Google Gen AI SDK for Gemini 2.0 Flash ===');
    
    if (!CONFIG.apiKey) {
      throw new Error('GOOGLE_API_KEY environment variable is not set');
    }
    
    // Initialize the Google Gen AI client
    const ai = new GoogleGenAI({ 
      apiKey: CONFIG.apiKey 
    });
    
    const prompt = 'Explain how AI works in a few words';
    
    console.log(`\n🔍 Sending request to Gemini API...`);
    console.log(`Model: ${CONFIG.model}`);
    console.log(`Prompt: "${prompt}"`);
    
    // Make the API call using the correct method signature from the docs
    const response = await ai.models.generateContent({
      model: CONFIG.model,
      contents: [{
        parts: [{
          text: prompt
        }]
      }]
    });
    
    console.log('\n✅ Response received:');
    console.log('='.repeat(80));
    
    // Display the response
    console.log(JSON.stringify(response, null, 2));
    
    // Extract and display just the generated text if available
    if (response.candidates?.[0]?.content?.parts?.[0]?.text) {
      const generatedText = response.candidates[0].content.parts[0].text;
      console.log('\n📝 Generated Text:');
      console.log('='.repeat(80));
      console.log(generatedText);
    } else {
      console.log('\n❌ No text generated in response');
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
testGeminiApi().catch(console.error);
