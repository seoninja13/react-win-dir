/**
 * Direct API Key Test for Google Generative AI - Approach 4
 * 
 * This script tests the connection to Google's Generative AI using a direct API key
 * for text generation.
 */

const https = require('https');

// Direct API key (normally this would be in an environment variable)
const API_KEY = 'AIzaSyADnIR2zPzAldt2vqDqLYUe24vsSDvWub0';

/**
 * Make a request to the Google AI API
 */
function makeRequest(url, method, headers, data) {
  return new Promise((resolve, reject) => {
    const options = {
      method: method,
      headers: headers,
    };

    const req = https.request(url, options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const parsedData = JSON.parse(responseData);
            resolve(parsedData);
          } catch (error) {
            resolve(responseData);
          }
        } else {
          reject(new Error(`Request failed with status code ${res.statusCode}: ${responseData}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

/**
 * List available models
 */
async function listModels() {
  try {
    console.log('Listing available models...');
    
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;
    
    const headers = {
      'Content-Type': 'application/json',
    };
    
    const response = await makeRequest(url, 'GET', headers);
    return response;
  } catch (error) {
    console.error('Error listing models:', error.message);
    throw error;
  }
}

/**
 * Generate text using Google Generative AI
 */
async function generateText(prompt) {
  try {
    console.log(`Generating text with prompt: "${prompt}"`);
    
    // Try with gemini-1.0-pro model
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent?key=${API_KEY}`;
    
    const headers = {
      'Content-Type': 'application/json',
    };
    
    const data = {
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 800,
        topP: 0.95,
        topK: 40
      }
    };
    
    console.log('\nSending request to Google AI API...');
    
    // Make the API request
    const response = await makeRequest(url, 'POST', headers, data);
    
    return response;
  } catch (error) {
    console.error('Error generating text:', error.message);
    throw error;
  }
}

/**
 * Run the test
 */
async function run() {
  console.log('=== Testing Google Generative AI with Direct API Key ===');
  
  try {
    // First, list available models
    console.log('\n1. Listing available models...');
    const modelsResponse = await listModels();
    
    if (modelsResponse && modelsResponse.models) {
      console.log(`Found ${modelsResponse.models.length} available models:`);
      modelsResponse.models.forEach((model, index) => {
        console.log(`${index + 1}. ${model.name} - ${model.displayName || 'No display name'}`);
      });
    } else {
      console.log('No models found or unexpected response format.');
      console.log(JSON.stringify(modelsResponse, null, 2));
    }
    
    // Then, try text generation
    console.log('\n2. Testing text generation...');
    const prompt = "Write a short paragraph about energy-efficient windows.";
    
    console.log(`\nPrompt: "${prompt}"`);
    
    const response = await generateText(prompt);
    
    console.log('\n=== Response Object ===');
    console.log(JSON.stringify(response, null, 2));
    
    // Extract the generated text
    if (response && 
        response.candidates && 
        response.candidates.length > 0 && 
        response.candidates[0].content && 
        response.candidates[0].content.parts && 
        response.candidates[0].content.parts.length > 0) {
      
      const generatedText = response.candidates[0].content.parts[0].text;
      
      console.log('\n=== Generated Text ===');
      console.log(generatedText);
      console.log('======================');
      
      console.log('\n✅ Text generation test completed successfully!');
    } else {
      console.log('\n❌ No text was generated in the response.');
    }
    
  } catch (error) {
    console.error('\n❌ Test failed:');
    console.error(error.message);
    
    if (error.message.includes('429')) {
      console.log('\nQuota limit reached. Recommendations:');
      console.log('1. Wait for quota to reset');
      console.log('2. Request a quota increase through Google Cloud Console');
    } else if (error.message.includes('403')) {
      console.log('\nPermission denied. Recommendations:');
      console.log('1. Check if your API key is valid');
      console.log('2. Verify that your API key has access to the Gemini API');
    }
  }
}

// Run the test
run().catch(console.error);
