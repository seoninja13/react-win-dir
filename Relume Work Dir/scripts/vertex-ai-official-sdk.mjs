/**
 * Vertex AI Image Generation using Official Google Cloud SDK
 * Using @google-cloud/vertexai instead of @google/genai
 */

console.log('🚀 Starting Vertex AI with official Google Cloud SDK...');

async function generateImage() {
  try {
    console.log('📦 Loading modules...');
    
    // Load modules dynamically
    const { VertexAI } = await import('@google-cloud/vertexai');
    const fs = await import('fs/promises');
    const path = await import('path');
    const { fileURLToPath } = await import('url');
    const dotenv = await import('dotenv');
    
    console.log('✅ Modules loaded');
    
    // Setup environment
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const envPath = path.join(__dirname, '..', '.env.local');
    
    console.log('🔧 Loading environment from:', envPath);
    dotenv.config({ path: envPath });
    console.log('✅ Environment loaded');
    
    // Parse arguments
    const args = process.argv.slice(2);
    const promptArg = args.find(arg => arg.startsWith('--prompt='));
    const outputArg = args.find(arg => arg.startsWith('--output-dir='));
    
    if (!promptArg) {
      console.log('❌ Please provide --prompt="your prompt here"');
      return;
    }
    
    const prompt = promptArg.split('=')[1].replace(/"/g, '');
    const outputDir = outputArg ? outputArg.split('=')[1].replace(/"/g, '') : 'generated-images/test';
    
    console.log('🎨 Prompt:', prompt);
    console.log('📁 Output directory:', outputDir);
    
    // Setup Vertex AI client
    console.log('🔧 Creating Vertex AI client...');
    console.log('📋 Project:', process.env.GOOGLE_CLOUD_PROJECT);
    console.log('🌍 Location:', process.env.GOOGLE_CLOUD_LOCATION);
    console.log('🔑 Credentials:', process.env.GOOGLE_APPLICATION_CREDENTIALS ? 'SET' : 'NOT SET');
    
    const vertexAI = new VertexAI({
      project: process.env.GOOGLE_CLOUD_PROJECT,
      location: process.env.GOOGLE_CLOUD_LOCATION,
    });
    
    console.log('✅ Vertex AI client created');
    
    // Get the generative model
    console.log('🤖 Getting Imagen model...');
    const model = vertexAI.getGenerativeModel({
      model: 'imagen-3.0-fast-generate',
    });
    
    console.log('✅ Model obtained');
    
    // Generate image
    console.log('🎨 Generating image...');
    console.log('⏳ This may take 10-30 seconds...');
    
    const request = {
      prompt: prompt,
      aspectRatio: '1:1',
      sampleCount: 1,
    };
    
    console.log('📤 Sending request:', request);
    
    const result = await model.generateContent(request);
    
    console.log('✅ Image generation API call completed');
    console.log('📊 Result type:', typeof result);
    console.log('📊 Result keys:', Object.keys(result || {}));
    
    if (result && result.response) {
      console.log('📸 Response received');
      console.log('📊 Response keys:', Object.keys(result.response || {}));
      
      // Create output directory
      await fs.mkdir(outputDir, { recursive: true });
      
      // The response structure might be different for Imagen
      // Let's log the full response to understand the structure
      console.log('📊 Full response:', JSON.stringify(result.response, null, 2));
      
    } else {
      console.log('⚠️ No response in result');
      console.log('📊 Full result:', JSON.stringify(result, null, 2));
    }
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (error.stack) {
      console.error('🔍 Stack trace:', error.stack);
    }
    if (error.response) {
      console.error('🌐 API Response:', error.response);
    }
    if (error.details) {
      console.error('📋 Error details:', error.details);
    }
  }
}

// Run the function
generateImage();
