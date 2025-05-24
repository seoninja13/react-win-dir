/**
 * Test Authentication Only
 */

import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config({ path: '.env.local' });

console.log('=== AUTHENTICATION TEST ===');
console.log('Project:', process.env.GOOGLE_CLOUD_PROJECT);
console.log('Location:', process.env.GOOGLE_CLOUD_LOCATION);
console.log('Credentials path:', process.env.GOOGLE_APPLICATION_CREDENTIALS);

// Check if credentials file exists
if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  const credentialsExist = fs.existsSync(process.env.GOOGLE_APPLICATION_CREDENTIALS);
  console.log('Credentials file exists:', credentialsExist);
  
  if (credentialsExist) {
    try {
      const credentialsContent = fs.readFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS, 'utf8');
      const credentials = JSON.parse(credentialsContent);
      console.log('Credentials project_id:', credentials.project_id);
      console.log('Credentials type:', credentials.type);
      console.log('✅ Credentials file is valid JSON');
    } catch (error) {
      console.error('❌ Error reading credentials:', error.message);
    }
  }
} else {
  console.log('❌ GOOGLE_APPLICATION_CREDENTIALS not set');
}

// Test basic import
try {
  console.log('Testing @google-cloud/vertexai import...');
  const { VertexAI } = await import('@google-cloud/vertexai');
  console.log('✅ Import successful');
  
  console.log('Creating client...');
  const vertexAI = new VertexAI({
    project: process.env.GOOGLE_CLOUD_PROJECT,
    location: process.env.GOOGLE_CLOUD_LOCATION || 'us-west1',
  });
  console.log('✅ Client created successfully');
  
} catch (error) {
  console.error('❌ Error:', error.message);
  console.error('Stack:', error.stack);
}
