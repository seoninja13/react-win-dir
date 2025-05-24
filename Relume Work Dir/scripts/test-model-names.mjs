/**
 * Test different Imagen model names to find the correct one
 */

console.log('🔍 Testing different Imagen model names...');

async function testModelName(modelName) {
  try {
    console.log(`\n🧪 Testing model: ${modelName}`);
    
    const { VertexAI } = await import('@google-cloud/vertexai');
    const dotenv = await import('dotenv');
    const { fileURLToPath } = await import('url');
    const path = await import('path');
    
    // Setup environment
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const envPath = path.join(__dirname, '..', '.env.local');
    dotenv.config({ path: envPath });
    
    const vertexAI = new VertexAI({
      project: process.env.GOOGLE_CLOUD_PROJECT,
      location: process.env.GOOGLE_CLOUD_LOCATION,
      apiEndpoint: `${process.env.GOOGLE_CLOUD_LOCATION}-aiplatform.googleapis.com`
    });
    
    const generativeModel = vertexAI.preview.getGenerativeModel({
      model: modelName,
      generationConfig: {
        temperature: 0.4,
        topK: 32,
        topP: 1,
        maxOutputTokens: 2048,
      },
    });
    
    // Try to generate content (this will fail if model doesn't exist)
    const result = await generativeModel.generateContent({
      contents: [{
        role: 'user',
        parts: [{
          text: 'Test prompt',
        }],
      }],
    });
    
    console.log(`✅ Model ${modelName} is available!`);
    return true;
    
  } catch (error) {
    if (error.message.includes('404') || error.message.includes('NOT_FOUND')) {
      console.log(`❌ Model ${modelName} not found`);
    } else {
      console.log(`⚠️ Model ${modelName} error: ${error.message}`);
    }
    return false;
  }
}

async function main() {
  // Test different model names
  const modelNames = [
    'imagen-3.0-fast-generate',
    'imagen-3.0-fast-generate-001',
    'imagen-3.0-capability',
    'imagen-3.0-capability-001',
    'imagen-3.0-generate',
    'imagen-3.0-generate-001',
    'imagegeneration@006',
    'imagegeneration@005',
    'imagegeneration@002',
    'imagen-2.0-generate-001',
    'imagen-2.0-capability-001',
  ];
  
  console.log('🚀 Starting model availability test...');
  console.log('📋 Project:', process.env.GOOGLE_CLOUD_PROJECT);
  console.log('🌍 Location:', process.env.GOOGLE_CLOUD_LOCATION);
  
  for (const modelName of modelNames) {
    await testModelName(modelName);
    // Small delay between tests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n🏁 Model testing completed');
}

main().catch(console.error);
