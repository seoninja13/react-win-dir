/**
 * Vertex AI Image Generation with Dynamic Imports
 * Testing version to isolate import issues
 */

console.log('🚀 Starting Vertex AI script with dynamic imports...');

async function main() {
  try {
    console.log('📦 Loading modules...');
    
    // Dynamic imports
    const { GoogleGenAI } = await import('@google/genai');
    const fs = await import('fs/promises');
    const path = await import('path');
    const { fileURLToPath } = await import('url');
    const { createHash } = await import('crypto');
    const dotenv = await import('dotenv');
    
    console.log('✅ All modules loaded');
    
    // Setup paths
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const envPath = path.join(__dirname, '..', '.env.local');
    
    console.log('🔧 Loading environment from:', envPath);
    dotenv.config({ path: envPath });
    
    console.log('✅ Environment loaded');
    console.log('GOOGLE_APPLICATION_CREDENTIALS:', process.env.GOOGLE_APPLICATION_CREDENTIALS ? 'SET' : 'NOT SET');
    
    // Parse command line arguments
    const args = process.argv.slice(2).reduce((acc, arg) => {
      const [key, value] = arg.split('=');
      acc[key.replace(/^--/, '')] = value || true;
      return acc;
    }, {});
    
    console.log('📝 Arguments:', args);
    
    if (!args.prompt) {
      console.log('❌ No prompt provided. Use --prompt="your prompt here"');
      return;
    }
    
    // Load service account
    console.log('🔑 Loading service account...');
    const credentials = JSON.parse(await fs.readFile(process.env.GOOGLE_APPLICATION_CREDENTIALS, 'utf8'));
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
    console.log('🎨 Generating image with prompt:', args.prompt);
    
    const result = await client.models.generateImages({
      model: 'imagen-3.0-fast-generate',
      prompt: args.prompt,
      aspectRatio: '1:1',
      sampleCount: 1,
      responseFormat: 'b64_json'
    });
    
    console.log('✅ Image generation completed');
    console.log('Result type:', typeof result);
    console.log('Result keys:', Object.keys(result || {}));
    
    if (result && result.images && result.images.length > 0) {
      console.log('📸 Generated', result.images.length, 'image(s)');
      
      // Save the first image
      const outputDir = args['output-dir'] || 'generated-images/test';
      await fs.mkdir(outputDir, { recursive: true });
      
      const imageData = Buffer.from(result.images[0].data, 'base64');
      const filename = `test-image-${Date.now()}.png`;
      const filepath = path.join(outputDir, filename);
      
      await fs.writeFile(filepath, imageData);
      console.log('💾 Image saved to:', filepath);
      
    } else {
      console.log('⚠️ No images in result');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
  }
}

// Run main function
main().catch(console.error);
