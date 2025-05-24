/**
 * Simple Vertex AI Connection Test
 * 
 * This script tests basic connectivity to Vertex AI before running the full image generation test.
 */

import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

console.log('🔧 Testing Vertex AI Connection...');
console.log(`📍 Project: ${process.env.GOOGLE_CLOUD_PROJECT}`);
console.log(`📍 Location: ${process.env.GOOGLE_CLOUD_LOCATION}`);
console.log(`📍 Credentials: ${process.env.GOOGLE_APPLICATION_CREDENTIALS}`);

try {
  const client = new GoogleGenAI({
    vertexai: true,
    project: process.env.GOOGLE_CLOUD_PROJECT,
    location: process.env.GOOGLE_CLOUD_LOCATION,
  });
  
  console.log('✅ Client initialized successfully');
  
  // Try to get a model (this will test authentication)
  const model = client.getGenerativeModel({
    model: 'gemini-pro',
  });
  
  console.log('✅ Model access successful');
  console.log('🎯 Vertex AI connection is working!');
  
} catch (error) {
  console.error('❌ Connection failed:', error.message);
  console.error('Stack:', error.stack);
}
