/**
 * Vertex AI Image Generation with OAuth 2.0 Authentication
 * 
 * This script demonstrates how to use OAuth 2.0 authentication with Vertex AI
 * for image generation in the Windows Doors CA website project.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { google } from 'googleapis';
import http from 'http';
import url from 'url';
import open from 'open';
import destroyer from 'server-destroy';

// Get current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

// Constants
const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT;
const LOCATION = process.env.GOOGLE_CLOUD_LOCATION || 'us-west1';
const MODEL_VERSION = 'imagen-3.0-generate-002';
const OUTPUT_DIR = path.resolve(__dirname, '../../Docs/Image generation/test-output');
const TOKEN_PATH = path.resolve(__dirname, '../data/oauth-token.json');

// OAuth 2.0 configuration
const CLIENT_ID = '994200435445-tq3hmqo1he917bmpq2iuftnshhn1r7lm.apps.googleusercontent.com';
const CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET || '';
const REDIRECT_URI = 'http://localhost:3000/oauth2callback';
const SCOPES = [
  'https://www.googleapis.com/auth/cloud-platform'
];

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Get OAuth2 client
 * 
 * @returns {Promise<any>} OAuth2 client
 */
async function getOAuth2Client() {
  const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );
  
  // Check if we have previously stored a token
  try {
    if (fs.existsSync(TOKEN_PATH)) {
      const token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));
      oauth2Client.setCredentials(token);
      
      // Check if token is expired or will expire soon
      if (token.expiry_date && token.expiry_date < Date.now() + 300000) {
        console.log('Token is expired or will expire soon. Getting a new one...');
        return await getNewToken(oauth2Client);
      }
      
      return oauth2Client;
    } else {
      return await getNewToken(oauth2Client);
    }
  } catch (error) {
    console.error('Error reading token:', error);
    return await getNewToken(oauth2Client);
  }
}

/**
 * Get new OAuth token
 * 
 * @param {any} oauth2Client - OAuth2 client
 * @returns {Promise<any>} OAuth2 client with new token
 */
async function getNewToken(oauth2Client) {
  return new Promise((resolve, reject) => {
    // Generate the url that will be used for the consent dialog
    const authorizeUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
      prompt: 'consent'
    });
    
    console.log('Authorize this app by visiting this url:', authorizeUrl);
    
    // Open the authorization URL in the default browser
    open(authorizeUrl);
    
    // Create a local server to receive the callback
    const server = http.createServer(async (req, res) => {
      try {
        // Get the code from the callback URL
        const qs = new url.URL(req.url, 'http://localhost:3000').searchParams;
        const code = qs.get('code');
        
        if (code) {
          // Close the browser
          res.end('Authentication successful! You can close this window.');
          
          // Get the access token
          const { tokens } = await oauth2Client.getToken(code);
          oauth2Client.setCredentials(tokens);
          
          // Save the token to disk for later program executions
          fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
          console.log('Token stored to', TOKEN_PATH);
          
          // Destroy the server
          server.destroy();
          
          // Resolve with the authenticated client
          resolve(oauth2Client);
        } else {
          res.end('No code found in the callback URL');
          server.destroy();
          reject(new Error('No code found in the callback URL'));
        }
      } catch (error) {
        console.error('Error getting token:', error);
        res.end('Error getting token. Check the console for more information.');
        server.destroy();
        reject(error);
      }
    }).listen(3000, () => {
      console.log('Listening on port 3000 for OAuth callback...');
    });
    
    destroyer(server);
  });
}

/**
 * Generate an image using Vertex AI with OAuth authentication
 * 
 * @param {any} auth - OAuth2 client
 * @param {string} prompt - The text prompt for image generation
 * @param {Object} options - Additional options
 * @returns {Promise<Array<{imageUrl: string, enhancedPrompt?: string}>>} - Generated images
 */
async function generateImageWithOAuth(auth, prompt, options = {}) {
  console.log('Generating image with OAuth authentication...');
  console.log(`Prompt: "${prompt}"`);
  
  const {
    sampleCount = 1,
    aspectRatio = '1:1',
    addWatermark = false,
    enhancePrompt = true,
  } = options;
  
  try {
    // Get access token
    const token = await auth.getAccessToken();
    
    // Construct the API URL
    const apiUrl = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${MODEL_VERSION}:predict`;
    
    console.log(`API URL: ${apiUrl}`);
    
    // Prepare the request payload according to the documentation
    const payload = {
      instances: [
        {
          prompt: prompt
        }
      ],
      parameters: {
        sampleCount: sampleCount,
        aspectRatio: aspectRatio,
        addWatermark: addWatermark,
        enhancePrompt: enhancePrompt,
        outputOptions: {
          mimeType: "image/png"
        }
      }
    };
    
    console.log('Request payload:', JSON.stringify(payload, null, 2));
    
    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.token}`
      },
      body: JSON.stringify(payload)
    });
    
    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed with status ${response.status}: ${errorText}`);
    }
    
    // Parse the response
    const data = await response.json();
    console.log('Received response from Vertex AI');
    
    // Extract the image data
    if (!data.predictions || data.predictions.length === 0) {
      throw new Error('No images were generated');
    }
    
    // Process the images
    const images = data.predictions.map(prediction => {
      // The base64 data might be in different fields depending on the API version
      const base64Data = prediction.bytesBase64 || prediction.imageBytes || prediction.image;
      
      return {
        imageUrl: `data:image/png;base64,${base64Data}`,
        enhancedPrompt: prediction.promptFeedback?.enhancedPrompt
      };
    });
    
    return images;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}

/**
 * Save base64 image to file
 * 
 * @param {string} imageUrl - Base64 image data URL
 * @param {string} outputPath - Path to save the image
 */
function saveImageToFile(imageUrl, outputPath) {
  console.log(`Saving image to: ${outputPath}`);
  
  try {
    // Extract base64 data from data URL
    const base64Data = imageUrl.split(',')[1];
    if (!base64Data) {
      throw new Error('Invalid image data URL');
    }
    
    // Convert base64 to buffer
    const buffer = Buffer.from(base64Data, 'base64');
    
    // Save to file
    fs.writeFileSync(outputPath, buffer);
    
    console.log('Image saved successfully!');
  } catch (error) {
    console.error('Error saving image:', error);
    throw error;
  }
}

/**
 * Main test function
 */
async function testOAuthAPI() {
  console.log('Testing Vertex AI with OAuth 2.0 authentication...');
  console.log(`Project ID: ${PROJECT_ID}`);
  console.log(`Location: ${LOCATION}`);
  console.log(`Model Version: ${MODEL_VERSION}`);
  
  try {
    // Get OAuth2 client
    const auth = await getOAuth2Client();
    console.log('OAuth authentication successful!');
    
    // Create a test prompt
    const testPrompt = 'A beautiful double-hung window with white frame against a blue sky, photorealistic';
    
    // Generate image
    const images = await generateImageWithOAuth(auth, testPrompt, {
      sampleCount: 1,
      aspectRatio: '4:3',
      addWatermark: false,
      enhancePrompt: true
    });
    
    if (images && images.length > 0) {
      console.log(`Generated ${images.length} images successfully!`);
      
      // Save the first image
      const outputPath = path.resolve(OUTPUT_DIR, 'oauth-test.png');
      saveImageToFile(images[0].imageUrl, outputPath);
      
      // Save enhanced prompt if available
      if (images[0].enhancedPrompt) {
        console.log(`Enhanced prompt: ${images[0].enhancedPrompt}`);
        fs.writeFileSync(
          path.resolve(OUTPUT_DIR, 'oauth-enhanced-prompt.txt'),
          images[0].enhancedPrompt
        );
      }
      
      return true;
    } else {
      console.error('No images were returned');
      return false;
    }
  } catch (error) {
    console.error('Test failed:', error);
    return false;
  }
}

// Run the test
testOAuthAPI()
  .then(success => {
    if (success) {
      console.log('OAuth API test completed successfully!');
    } else {
      console.error('OAuth API test failed.');
      process.exit(1);
    }
  })
  .catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
