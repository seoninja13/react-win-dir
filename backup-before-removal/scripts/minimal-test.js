// Minimal test script for @google/genai
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

console.log('Starting minimal test...');
console.log('API Key present:', GEMINI_API_KEY ? 'Yes' : 'No');

async function main() {
  try {
    // Initialize the client exactly as shown in the documentation
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    console.log('Client initialized successfully');
    
    // Use the simplest possible request format
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-001',
      contents: 'Why is the sky blue?',
    });
    
    console.log('Response received successfully');
    console.log('Response type:', typeof response);
    console.log('Response keys:', Object.keys(response));
    
    // Try different ways to access the text
    if (response.response) {
      console.log('Text via response.response:', response.response.text());
    }
    
    if (response.text) {
      console.log('Text via response.text:', response.text);
    }
    
    if (response.candidates) {
      console.log('Text via candidates:', response.candidates[0].content.parts[0].text);
    }
    
    console.log('Test completed successfully');
  } catch (error) {
    console.error('Error during test:', error.message);
    console.error('Error details:', error);
  }
}

main();
