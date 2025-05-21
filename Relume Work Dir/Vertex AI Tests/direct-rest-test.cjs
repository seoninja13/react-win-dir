/**
 * Direct REST API Test for Gemini 2.0 Flash
 * 
 * This script makes a direct REST API call to the Gemini API using the format
 * provided in the curl example.
 */

const https = require('https');

// API Key
const API_KEY = 'AIzaSyA8B_V05yct_YIo01B7HETGXtLAJg3o2_U';

/**
 * Make a request to the Gemini API
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
 * Generate content using the Gemini 2.0 Flash model
 */
async function generateContent() {
  try {
    console.log('Generating content with Gemini 2.0 Flash...');
    
    // URL with the specified model and API key
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
    
    // Headers
    const headers = {
      'Content-Type': 'application/json',
    };
    
    // Request body
    const data = {
      contents: [{
        parts: [{ text: "Explain how AI works" }]
      }]
    };
    
    console.log('Sending request to Gemini API...');
    console.log(`URL: ${url}`);
    console.log('Request data:', JSON.stringify(data, null, 2));
    
    // Make the API request
    const response = await makeRequest(url, 'POST', headers, data);
    
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
      
      console.log('\n✅ Content generation completed successfully!');
    } else {
      console.log('\n❌ No text was generated in the response.');
    }
    
  } catch (error) {
    console.error('\n❌ Request failed:');
    console.error(error.message);
    
    if (error.message.includes('429')) {
      console.log('\nQuota limit reached. Recommendations:');
      console.log('1. Wait for quota to reset');
      console.log('2. Request a quota increase through Google Cloud Console');
    } else if (error.message.includes('403')) {
      console.log('\nPermission denied. Recommendations:');
      console.log('1. Check if your API key is valid');
      console.log('2. Verify that your API key has access to the Gemini API');
    } else if (error.message.includes('404')) {
      console.log('\nModel not found. Recommendations:');
      console.log('1. Check if the model name is correct');
      console.log('2. Verify that the model is available in your region');
    }
  }
}

// Run the test
generateContent();
