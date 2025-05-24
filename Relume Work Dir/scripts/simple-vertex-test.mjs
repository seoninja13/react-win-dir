/**
 * Simple Vertex AI Connection Test - Fixed API
 */

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

console.log('=== VERTEX AI CONNECTION TEST ===');
console.log('Project:', process.env.GOOGLE_CLOUD_PROJECT);
console.log('Location:', process.env.GOOGLE_CLOUD_LOCATION);
console.log('Credentials:', process.env.GOOGLE_APPLICATION_CREDENTIALS);

try {
  console.log('Attempting to import @google-cloud/vertexai...');
  const { VertexAI } = await import('@google-cloud/vertexai');
  console.log('✅ Successfully imported @google-cloud/vertexai');

  console.log('Creating Vertex AI client...');
  const vertexAI = new VertexAI({
    project: process.env.GOOGLE_CLOUD_PROJECT,
    location: process.env.GOOGLE_CLOUD_LOCATION || 'us-west1',
  });
  console.log('✅ Vertex AI client created');

  console.log('Getting generative model...');
  const model = vertexAI.getGenerativeModel({
    model: 'imagen-3.0-fast-generate-001',
  });
  console.log('✅ Model obtained');

  console.log('Testing image generation...');
  const result = await model.generateContent({
    contents: [{
      role: 'user',
      parts: [{
        text: 'A simple white window on a house exterior, professional photography'
      }]
    }]
  });

  console.log('✅ Generation completed');
  console.log('Response received:', !!result.response);

  if (result.response && result.response.candidates) {
    console.log('Candidates found:', result.response.candidates.length);

    // Check if we have image data
    const candidate = result.response.candidates[0];
    if (candidate && candidate.content && candidate.content.parts) {
      const part = candidate.content.parts[0];
      if (part.inlineData) {
        console.log('✅ Image data received! Size:', part.inlineData.data.length, 'characters');
        console.log('🎉 Vertex AI image generation is working!');
      } else {
        console.log('❌ No image data in response');
      }
    }
  }

} catch (error) {
  console.error('❌ Error:', error.message);
  console.error('Stack:', error.stack);
}
