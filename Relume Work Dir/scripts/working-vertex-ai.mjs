/**
 * Working Vertex AI Image Generation Script
 * Simplified version that actually works
 */

console.log('🚀 Starting working Vertex AI script...');

async function generateImage() {
  try {
    console.log('📦 Loading modules...');
    
    // Load modules dynamically
    const { GoogleGenAI } = await import('@google/genai');
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
    
    // Load service account
    console.log('🔑 Loading service account...');
    const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    if (!credentialsPath) {
      throw new Error('GOOGLE_APPLICATION_CREDENTIALS not set');
    }
    
    const credentials = JSON.parse(await fs.readFile(credentialsPath, 'utf8'));
    console.log('✅ Service account loaded for project:', credentials.project_id);
    
    // Create client
    console.log('🔧 Creating GoogleGenAI client...');
    const client = new GoogleGenAI({
      projectId: credentials.project_id,
      location: 'us-west1',
      serviceAccountKey: credentials,
      apiVersion: 'v1'
    });
    console.log('✅ Client created');
    
    // Generate image
    console.log('🎨 Generating image...');
    console.log('⏳ This may take 10-30 seconds...');
    
    const result = await client.models.generateImages({
      model: 'imagen-3.0-fast-generate',
      prompt: prompt,
      aspectRatio: '1:1',
      sampleCount: 1,
      responseFormat: 'b64_json'
    });
    
    console.log('✅ Image generation API call completed');
    console.log('📊 Result type:', typeof result);
    console.log('📊 Result keys:', Object.keys(result || {}));
    
    if (result && result.images && result.images.length > 0) {
      console.log('📸 Generated', result.images.length, 'image(s)');
      
      // Create output directory
      await fs.mkdir(outputDir, { recursive: true });
      
      // Save image
      const imageData = Buffer.from(result.images[0].data, 'base64');
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
      console.log('⚠️ No images in result');
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
  }
}

// Run the function
generateImage();
