import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
const envPath = path.join(__dirname, '..', '.env.local');
console.log('🔧 Loading environment from:', envPath);
dotenv.config({ path: envPath });

console.log('✅ Environment loaded');
console.log('GOOGLE_APPLICATION_CREDENTIALS:', process.env.GOOGLE_APPLICATION_CREDENTIALS ? 'SET' : 'NOT SET');

console.log('📦 Testing @google/genai import...');

try {
  const { GoogleGenAI } = await import('@google/genai');
  console.log('✅ @google/genai imported successfully');
  console.log('GoogleGenAI type:', typeof GoogleGenAI);
  
  // Test if we can create an instance (this might be where it hangs)
  console.log('🔧 Testing GoogleGenAI constructor...');
  
  // First, let's load the service account
  const fs = await import('fs/promises');
  const credentials = JSON.parse(await fs.readFile(process.env.GOOGLE_APPLICATION_CREDENTIALS, 'utf8'));
  console.log('✅ Service account loaded');
  console.log('Project ID:', credentials.project_id);
  
  // Now try to create the client
  console.log('Creating GoogleGenAI client...');
  const client = new GoogleGenAI({
    projectId: credentials.project_id,
    location: 'us-west1',
    serviceAccountKey: credentials,
    apiVersion: 'v1'
  });
  
  console.log('✅ GoogleGenAI client created successfully');
  
} catch (error) {
  console.error('❌ Error:', error.message);
  console.error('Stack:', error.stack);
}

console.log('🏁 Test completed');
