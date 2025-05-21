// Multi-modal Test for Gemini API
import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import { Buffer } from 'buffer';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '.env') });

// Configuration
const CONFIG = {
  apiKey: process.env.GOOGLE_API_KEY,
  model: 'gemini-2.0-flash',
  // Use a public test image URL
  imagePath: 'https://storage.googleapis.com/generativeai-downloads/images/landmark1.jpg',
  // Uncomment to use a local image file instead
  // imagePath: path.join(__dirname, 'test-image.jpg'),
};

/**
 * Helper function to check if a string is a URL
 */
function isUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

/**
 * Helper function to get MIME type from file extension
 */
function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
  };
  return mimeTypes[ext] || 'application/octet-stream';
}

async function testMultimodalInput() {
  try {
    console.log('=== Testing Multi-modal Input with Gemini 2.0 Flash ===');
    
    if (!CONFIG.apiKey) {
      throw new Error('GOOGLE_API_KEY environment variable is not set');
    }
    
    // Initialize the Google Gen AI client
    const ai = new GoogleGenAI({ 
      apiKey: CONFIG.apiKey 
    });
    
    const prompt = 'What is in this image? Describe it in detail.';
    
    console.log(`\n🔍 Preparing multi-modal request...`);
    console.log(`Model: ${CONFIG.model}`);
    console.log(`Prompt: "${prompt}"`);
    console.log(`Image: ${CONFIG.imagePath}`);
    
    let response;
    
    if (isUrl(CONFIG.imagePath)) {
      // Handle remote image URL
      console.log('\n🌐 Using remote image URL');
      
      // For remote URLs, we need to download the image first
      try {
        const fetch = (await import('node-fetch')).default;
        const imageResponse = await fetch(CONFIG.imagePath);
        const imageBuffer = await imageResponse.arrayBuffer();
        const base64Data = Buffer.from(imageBuffer).toString('base64');
        const contentType = imageResponse.headers.get('content-type') || 'image/jpeg';
        
        // Create the request payload with inline data
        const request = {
          model: CONFIG.model,
          contents: [
            {
              role: 'user',
              parts: [
                { text: prompt },
                {
                  inlineData: {
                    mimeType: contentType,
                    data: base64Data
                  }
                }
              ]
            }
          ]
        };
        
        console.log('Sending request with remote image data...');
        
        // Make the API call
        response = await ai.models.generateContent(request);
      } catch (fetchError) {
        console.error('\n❌ Error fetching remote image:');
        console.error(fetchError.message);
        return;
      }
    } else {
      // Handle local file
      console.log('\n💾 Using local image file');
      
      try {
        // Read the file as base64
        const imageData = await fs.readFile(CONFIG.imagePath);
        const mimeType = getMimeType(CONFIG.imagePath);
        
        // Convert to base64 string
        const base64Data = imageData.toString('base64');
        
        // Create the request payload with inline data
        const request = {
          model: CONFIG.model,
          contents: [
            {
              role: 'user',
              parts: [
                { text: prompt },
                {
                  inlineData: {
                    mimeType: mimeType,
                    data: base64Data
                  }
                }
              ]
            }
          ]
        };
        
        console.log('Sending request with base64 image data...');
        
        // Make the API call
        response = await ai.models.generateContent(request);
      } catch (fileError) {
        console.error('\n❌ Error reading image file:');
        console.error(fileError.message);
        return;
      }
    }
    
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
testMultimodalInput().catch(console.error);
