/**
 * Test Vertex AI Models
 * 
 * This script tests connectivity to Vertex AI using:
 * - Gemini 2.0 Flash for text generation
 * - Imagen for image generation
 * 
 * It supports both Service Account and Application Default Credentials (ADC)
 */

const { GoogleAuth } = require('google-auth-library');
const { VertexAI } = require('@google-cloud/vertexai');
const fs = require('fs');
const chalk = require('chalk');
require('dotenv').config({ path: '.env.local' });

// Configuration
const CONFIG = {
  // Project settings
  projectId: process.env.GOOGLE_CLOUD_PROJECT || 'mold-removal-lead-gen',
  location: 'us-central1',
  
  // Models
  models: {
    text: 'gemini-2.0-flash-001',
    image: 'imagen-3.0-generate-002'
  },
  
  // Test settings
  maxAttempts: 3,
  testPrompt: 'Generate a short test message to verify authentication.'
};

// Test results
const testResults = {
  serviceAccount: { success: false, attempts: 0, errors: [] },
  adc: { success: false, attempts: 0, errors: [] }
};

/**
 * Test Service Account Authentication
 */
async function testServiceAccountAuth() {
  console.log(chalk.blue('\n=== Testing Service Account Authentication ==='));
  
  // Check if key file exists
  const keyFile = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (!keyFile || !fs.existsSync(keyFile)) {
    const error = `Service account key file not found. Set GOOGLE_APPLICATION_CREDENTIALS`;
    console.error(chalk.red(error));
    testResults.serviceAccount.errors.push(error);
    return false;
  }

  let attempt = 0;
  while (attempt < CONFIG.maxAttempts) {
    attempt++;
    testResults.serviceAccount.attempts++;
    
    console.log(`\n${chalk.blue(`Attempt ${attempt}/${CONFIG.maxAttempts}`)}`);
    
    try {
      // Initialize Vertex AI with service account
      const vertex = new VertexAI({
        project: CONFIG.projectId,
        location: CONFIG.location,
      });
      
      console.log(chalk.blue('Testing Gemini 2.0 Flash...'));
      await testGeminiModel(vertex, 'serviceAccount');
      
      console.log(chalk.blue('\nTesting Imagen...'));
      await testImagenModel(vertex, 'serviceAccount');
      
      testResults.serviceAccount.success = true;
      return true;
      
    } catch (error) {
      const errorMsg = `Attempt ${attempt} failed: ${error.message}`;
      console.error(chalk.red(errorMsg));
      testResults.serviceAccount.errors.push(errorMsg);
      
      if (attempt < CONFIG.maxAttempts) {
        console.log(chalk.yellow('Retrying after 2 seconds...'));
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
  }
  
  return false;
}

/**
 * Test Application Default Credentials (ADC)
 */
async function testADCAuth() {
  console.log(chalk.blue('\n=== Testing Application Default Credentials (ADC) ==='));
  
  let attempt = 0;
  while (attempt < CONFIG.maxAttempts) {
    attempt++;
    testResults.adc.attempts++;
    
    console.log(`\n${chalk.blue(`Attempt ${attempt}/${CONFIG.maxAttempts}`)}`);
    
    try {
      // Initialize Vertex AI with ADC
      const vertex = new VertexAI({
        project: CONFIG.projectId,
        location: CONFIG.location,
      });
      
      console.log(chalk.blue('Testing Gemini 2.0 Flash...'));
      await testGeminiModel(vertex, 'adc');
      
      console.log(chalk.blue('\nTesting Imagen...'));
      await testImagenModel(vertex, 'adc');
      
      testResults.adc.success = true;
      return true;
      
    } catch (error) {
      const errorMsg = `Attempt ${attempt} failed: ${error.message}`;
      console.error(chalk.red(errorMsg));
      testResults.adc.errors.push(errorMsg);
      
      if (attempt < CONFIG.maxAttempts) {
        console.log(chalk.yellow('Retrying after 2 seconds...'));
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
  }
  
  return false;
}

/**
 * Test Gemini 2.0 Flash model
 */
async function testGeminiModel(vertex, authType) {
  try {
    const model = vertex.preview.getGenerativeModel({
      model: CONFIG.models.text,
      generationConfig: {
        maxOutputTokens: 256,
        temperature: 0.4,
        topP: 1,
        topK: 16,
      },
    });
    
    const prompt = {
      contents: [{
        role: 'user',
        parts: [{
          text: CONFIG.testPrompt
        }]
      }]
    };
    
    console.log(chalk.gray('Sending prompt to Gemini 2.0 Flash...'));
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    console.log(chalk.green('✅ Gemini 2.0 Flash response:'));
    console.log(chalk.gray(response.text()));
    return true;
    
  } catch (error) {
    console.error(chalk.red('❌ Gemini 2.0 Flash test failed:'));
    throw error;
  }
}

/**
 * Test Imagen model
 */
async function testImagenModel(vertex, authType) {
  try {
    console.log(chalk.gray('Initializing Imagen model...'));
    
    // Note: The actual implementation will depend on the Imagen API
    // This is a placeholder for the actual implementation
    console.log(chalk.yellow('⚠️ Imagen test not fully implemented yet'));
    console.log(chalk.gray('This is a placeholder for Imagen model testing'));
    
    return true;
    
  } catch (error) {
    console.error(chalk.red('❌ Imagen test failed:'));
    throw error;
  }
}

/**
 * Main function to run tests
 */
async function main() {
  console.log(chalk.blue('=== Vertex AI Model Testing ==='));
  console.log(chalk.gray(`Project: ${CONFIG.projectId}`));
  console.log(chalk.gray(`Location: ${CONFIG.location}`));
  
  // Test Service Account Authentication
  if (!await testServiceAccountAuth()) {
    console.error(chalk.red('\n❌ Service Account Authentication tests failed'));
  } else {
    console.log(chalk.green('\n✅ Service Account Authentication tests passed'));
  }
  
  // Test ADC Authentication
  if (!await testADCAuth()) {
    console.error(chalk.red('\n❌ ADC Authentication tests failed'));
  } else {
    console.log(chalk.green('\n✅ ADC Authentication tests passed'));
  }
  
  // Print summary
  console.log('\n=== Test Summary ===');
  console.log(JSON.stringify(testResults, null, 2));
}

// Run the tests
main().catch(console.error);
