/**
 * Gemini Text Generation Client
 * 
 * A robust client for generating text using the Google Gemini API
 * with rate limiting and retry logic.
 */

const https = require('https');

// API Key - should be moved to environment variables in production
const API_KEY = 'AIzaSyA8B_V05yct_YIo01B7HETGXtLAJg3o2_U';

// Rate limiting configuration
const RATE_LIMITS = {
  'gemini-2.0-flash': {
    requestsPerMinute: 60, // Adjust based on your quota
    lastRequestTime: 0,
    requestQueue: []
  },
  'gemini-2.0-pro': {
    requestsPerMinute: 40, // Adjust based on your quota
    lastRequestTime: 0,
    requestQueue: []
  },
  'gemini-2.5-pro-preview-05-06': {
    requestsPerMinute: 30, // Adjust based on your quota
    lastRequestTime: 0,
    requestQueue: []
  }
};

/**
 * Make a request to the Gemini API with rate limiting and retries
 */
function makeRequest(url, method, headers, data, retries = 3, retryDelay = 1000) {
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
        } else if (res.statusCode === 429 && retries > 0) {
          // Rate limit exceeded, retry after delay
          console.log(`Rate limit exceeded. Retrying in ${retryDelay / 1000} seconds...`);
          setTimeout(() => {
            makeRequest(url, method, headers, data, retries - 1, retryDelay * 2)
              .then(resolve)
              .catch(reject);
          }, retryDelay);
        } else {
          reject(new Error(`Request failed with status code ${res.statusCode}: ${responseData}`));
        }
      });
    });

    req.on('error', (error) => {
      if (retries > 0) {
        console.log(`Request error: ${error.message}. Retrying in ${retryDelay / 1000} seconds...`);
        setTimeout(() => {
          makeRequest(url, method, headers, data, retries - 1, retryDelay * 2)
            .then(resolve)
            .catch(reject);
        }, retryDelay);
      } else {
        reject(error);
      }
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

/**
 * Enforce rate limits for a specific model
 */
async function enforceRateLimit(model) {
  if (!RATE_LIMITS[model]) {
    console.warn(`No rate limit configuration found for model: ${model}. Using default.`);
    model = 'gemini-2.0-flash'; // Default model
  }

  const modelConfig = RATE_LIMITS[model];
  const now = Date.now();
  const timeWindow = 60 * 1000; // 1 minute in milliseconds
  
  // Clean up old requests from the queue
  modelConfig.requestQueue = modelConfig.requestQueue.filter(
    time => now - time < timeWindow
  );
  
  // Check if we've hit the rate limit
  if (modelConfig.requestQueue.length >= modelConfig.requestsPerMinute) {
    // Calculate delay needed to stay within rate limit
    const oldestRequest = modelConfig.requestQueue[0];
    const delayNeeded = timeWindow - (now - oldestRequest);
    
    if (delayNeeded > 0) {
      console.log(`Rate limit reached for ${model}. Waiting ${delayNeeded}ms before next request.`);
      await new Promise(resolve => setTimeout(resolve, delayNeeded));
    }
  }
  
  // Add current request to the queue
  modelConfig.requestQueue.push(Date.now());
  modelConfig.lastRequestTime = Date.now();
}

/**
 * Generate text using the Gemini API
 * 
 * @param {string} prompt - The text prompt
 * @param {string} model - The model to use (default: gemini-2.0-flash)
 * @param {Object} options - Additional options for generation
 * @returns {Promise<string>} - The generated text
 */
async function generateText(prompt, model = 'gemini-2.0-flash', options = {}) {
  try {
    // Enforce rate limits
    await enforceRateLimit(model);
    
    // Default generation config
    const defaultConfig = {
      temperature: 0.7,
      maxOutputTokens: 800,
      topP: 0.95,
      topK: 40
    };
    
    // Merge default config with user options
    const generationConfig = { ...defaultConfig, ...options };
    
    // URL with the specified model and API key
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;
    
    // Headers
    const headers = {
      'Content-Type': 'application/json',
    };
    
    // Request body
    const data = {
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig
    };
    
    // Make the API request
    const response = await makeRequest(url, 'POST', headers, data);
    
    // Extract the generated text
    if (response && 
        response.candidates && 
        response.candidates.length > 0 && 
        response.candidates[0].content && 
        response.candidates[0].content.parts && 
        response.candidates[0].content.parts.length > 0) {
      
      return response.candidates[0].content.parts[0].text;
    } else {
      throw new Error('No text was generated in the response');
    }
    
  } catch (error) {
    console.error('Error generating text:', error.message);
    throw error;
  }
}

/**
 * Generate text with structured conversation history
 * 
 * @param {Array} messages - Array of message objects with role and content
 * @param {string} model - The model to use (default: gemini-2.0-flash)
 * @param {Object} options - Additional options for generation
 * @returns {Promise<string>} - The generated text
 */
async function generateTextWithHistory(messages, model = 'gemini-2.0-flash', options = {}) {
  try {
    // Enforce rate limits
    await enforceRateLimit(model);
    
    // Default generation config
    const defaultConfig = {
      temperature: 0.7,
      maxOutputTokens: 800,
      topP: 0.95,
      topK: 40
    };
    
    // Merge default config with user options
    const generationConfig = { ...defaultConfig, ...options };
    
    // URL with the specified model and API key
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;
    
    // Headers
    const headers = {
      'Content-Type': 'application/json',
    };
    
    // Format messages for the API
    const contents = messages.map(msg => ({
      role: msg.role || 'user',
      parts: [{ text: msg.content }]
    }));
    
    // Request body
    const data = {
      contents,
      generationConfig
    };
    
    // Make the API request
    const response = await makeRequest(url, 'POST', headers, data);
    
    // Extract the generated text
    if (response && 
        response.candidates && 
        response.candidates.length > 0 && 
        response.candidates[0].content && 
        response.candidates[0].content.parts && 
        response.candidates[0].content.parts.length > 0) {
      
      return response.candidates[0].content.parts[0].text;
    } else {
      throw new Error('No text was generated in the response');
    }
    
  } catch (error) {
    console.error('Error generating text with history:', error.message);
    throw error;
  }
}

module.exports = {
  generateText,
  generateTextWithHistory
};
