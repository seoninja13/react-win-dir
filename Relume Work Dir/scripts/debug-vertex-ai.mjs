/**
 * Debug script for Vertex AI Image Generation
 * Simple test to identify the issue with the main script
 */

// Load environment variables first
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env.local from the project root
const envPath = path.join(__dirname, '..', '.env.local');
console.log('Loading environment from:', envPath);
dotenv.config({ path: envPath });

console.log('🚀 Debug script starting...');
console.log('📅 Timestamp:', new Date().toISOString());

// Test 1: Check environment variables
console.log('\n🔍 Environment Variables:');
console.log('GOOGLE_APPLICATION_CREDENTIALS:', process.env.GOOGLE_APPLICATION_CREDENTIALS);
console.log('GOOGLE_CLOUD_PROJECT:', process.env.GOOGLE_CLOUD_PROJECT);
console.log('GOOGLE_CLOUD_LOCATION:', process.env.GOOGLE_CLOUD_LOCATION);

// Test 2: Check if we can import modules
console.log('\n📦 Testing module imports...');

try {
  console.log('Importing @google/genai...');
  const { GoogleGenAI } = await import('@google/genai');
  console.log('✅ @google/genai imported successfully');
  console.log('GoogleGenAI constructor:', typeof GoogleGenAI);
} catch (error) {
  console.error('❌ Failed to import @google/genai:', error.message);
  console.error('Error details:', error);
}

try {
  console.log('Importing fs/promises...');
  const fs = await import('fs/promises');
  console.log('✅ fs/promises imported successfully');
} catch (error) {
  console.error('❌ Failed to import fs/promises:', error.message);
}

try {
  console.log('Importing path...');
  const path = await import('path');
  console.log('✅ path imported successfully');
} catch (error) {
  console.error('❌ Failed to import path:', error.message);
}

// Test 3: Check if service account file exists and is readable
console.log('\n📄 Testing service account file...');

try {
  const fs = await import('fs/promises');
  const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

  if (!credentialsPath) {
    console.error('❌ GOOGLE_APPLICATION_CREDENTIALS not set');
  } else {
    console.log('📁 Credentials path:', credentialsPath);

    // Check if file exists
    await fs.access(credentialsPath);
    console.log('✅ Service account file exists');

    // Try to read and parse it
    const credentialsContent = await fs.readFile(credentialsPath, 'utf8');
    const credentials = JSON.parse(credentialsContent);
    console.log('✅ Service account file is valid JSON');
    console.log('📋 Project ID:', credentials.project_id);
    console.log('📧 Client email:', credentials.client_email);
  }
} catch (error) {
  console.error('❌ Service account file error:', error.message);
}

// Test 4: Try to create GoogleGenAI client
console.log('\n🔧 Testing GoogleGenAI client creation...');

try {
  const { GoogleGenAI } = await import('@google/genai');
  const fs = await import('fs/promises');

  const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  const credentials = JSON.parse(await fs.readFile(credentialsPath, 'utf8'));

  console.log('Creating GoogleGenAI client...');
  const client = new GoogleGenAI({
    projectId: credentials.project_id,
    location: 'us-west1',
    serviceAccountKey: credentials,
    apiVersion: 'v1'
  });

  console.log('✅ GoogleGenAI client created successfully');
  console.log('Client type:', typeof client);
  console.log('Client methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(client)));

} catch (error) {
  console.error('❌ Failed to create GoogleGenAI client:', error.message);
  console.error('Error stack:', error.stack);
}

console.log('\n🏁 Debug script completed');
