/**
 * Vertex AI Image Generation with Correct Service Account Authentication
 * Using @google-cloud/vertexai (official Google Cloud SDK) instead of @google/genai
 */

console.log('🚀 Starting Vertex AI with correct service account authentication...');

async function generateImage() {
  try {
    console.log('📦 Loading modules...');
    
    // Use the official Google Cloud Vertex AI SDK
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
    
    // Verify environment variables
    console.log('🔍 Environment check:');
    console.log('📋 GOOGLE_CLOUD_PROJECT:', process.env.GOOGLE_CLOUD_PROJECT);
    console.log('🌍 GOOGLE_CLOUD_LOCATION:', process.env.GOOGLE_CLOUD_LOCATION);
    console.log('🔑 GOOGLE_APPLICATION_CREDENTIALS:', process.env.GOOGLE_APPLICATION_CREDENTIALS ? 'SET' : 'NOT SET');
    
    if (!process.env.GOOGLE_CLOUD_PROJECT) {
      throw new Error('GOOGLE_CLOUD_PROJECT environment variable is required');
    }
    if (!process.env.GOOGLE_CLOUD_LOCATION) {
      throw new Error('GOOGLE_CLOUD_LOCATION environment variable is required');
    }
    if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      throw new Error('GOOGLE_APPLICATION_CREDENTIALS environment variable is required');
    }
    
    // Verify service account file exists
    await fs.access(process.env.GOOGLE_APPLICATION_CREDENTIALS);
    console.log('✅ Service account file verified');
    
    // Initialize Vertex AI client (this will use service account automatically)
    console.log('🔧 Creating Vertex AI client...');
    const vertexAI = new VertexAI({
      project: process.env.GOOGLE_CLOUD_PROJECT,
      location: process.env.GOOGLE_CLOUD_LOCATION,
    });
    console.log('✅ Vertex AI client created');
    
    // Get the generative model for image generation
    console.log('🤖 Getting Imagen model...');
    const model = vertexAI.getGenerativeModel({
      model: 'imagen-3.0-fast-generate',
    });
    console.log('✅ Model obtained');
    
    // Generate image
    console.log('🎨 Generating image...');
    console.log('⏳ This may take 10-30 seconds...');
    
    // For Imagen models, we need to use a different approach
    // Let's try the prediction service directly
    const request = {
      instances: [{
        prompt: prompt,
      }],
      parameters: {
        sampleCount: 1,
        aspectRatio: '1:1',
        safetyFilterLevel: 'block_some',
        personGeneration: 'allow_adult',
      }
    };
    
    console.log('📤 Sending request to Imagen API...');
    
    // Use the prediction service for Imagen
    const [response] = await vertexAI.preview.predict({
      endpoint: `projects/${process.env.GOOGLE_CLOUD_PROJECT}/locations/${process.env.GOOGLE_CLOUD_LOCATION}/publishers/google/models/imagen-3.0-fast-generate`,
      instances: request.instances,
      parameters: request.parameters,
    });
    
    console.log('✅ Image generation API call completed');
    console.log('📊 Response type:', typeof response);
    console.log('📊 Response keys:', Object.keys(response || {}));
    
    if (response && response.predictions && response.predictions.length > 0) {
      console.log('📸 Generated', response.predictions.length, 'image(s)');
      
      // Create output directory
      await fs.mkdir(outputDir, { recursive: true });
      
      // Save image
      const prediction = response.predictions[0];
      console.log('📊 Prediction keys:', Object.keys(prediction || {}));
      
      if (prediction.bytesBase64Encoded) {
        const imageData = Buffer.from(prediction.bytesBase64Encoded, 'base64');
        const timestamp = Date.now();
        const filename = `vertex-ai-image-${timestamp}.png`;
        const filepath = path.join(outputDir, filename);
        
        await fs.writeFile(filepath, imageData);
        console.log('💾 Image saved to:', filepath);
        
        // Get file size for verification
        const stats = await fs.stat(filepath);
        console.log('📏 File size:', Math.round(stats.size / 1024), 'KB');
        
        console.log('\n🎉 SUCCESS! Image generated and saved successfully!');
      } else {
        console.log('⚠️ No bytesBase64Encoded in prediction');
        console.log('📊 Full prediction:', JSON.stringify(prediction, null, 2));
      }
      
    } else {
      console.log('⚠️ No predictions in response');
      console.log('📊 Full response:', JSON.stringify(response, null, 2));
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
