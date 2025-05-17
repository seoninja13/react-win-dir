/**
 * Simple test for Google GenAI SDK based on official documentation
 * https://github.com/google/generative-ai-js
 */

const { GoogleGenerativeAI } = require('@google/genai');

// Access your API key directly
const genAI = new GoogleGenerativeAI('AIzaSyADnIR2zPzAldt2vqDqLYUe24vsSDvWub0');

async function run() {
  try {
    console.log('Starting simple test...');
    
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    console.log('Model initialized');
    
    const prompt = "Write a short paragraph about energy-efficient windows.";
    console.log(`Prompt: "${prompt}"`);
    
    console.log('Generating content...');
    const result = await model.generateContent(prompt);
    console.log('Content generated');
    
    const response = await result.response;
    console.log('Response received');
    
    const text = response.text();
    console.log('\n=== Generated Text ===');
    console.log(text);
    console.log('======================');
    
  } catch (error) {
    console.error('Error during test:');
    console.error(error.message);
    console.error('Stack trace:');
    console.error(error.stack);
    
    if (error.response) {
      console.error('API Response:', error.response);
    }
  }
}

run();
