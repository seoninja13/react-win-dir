/**
 * Vertex AI Image Generation with Service Account Authentication
 * Using the exact approach from working test files
 */

console.log('🚀 Starting Vertex AI with Service Account Authentication...');

async function main() {
  try {
    // Dynamic imports to avoid hanging issues
    const { VertexAI } = await import('@google-cloud/vertexai');
    const fs = await import('fs/promises');
    const path = await import('path');
    const { fileURLToPath } = await import('url');
    const dotenv = await import('dotenv');
    
    console.log('✅ Modules loaded successfully');
    
    // Setup paths and load environment
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const envPath = path.join(__dirname, '..', '.env.local');
    
    console.log('🔧 Loading environment from:', envPath);
    dotenv.config({ path: envPath });
    
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
    console.log('🔑 Verifying service account file...');
    await fs.access(process.env.GOOGLE_APPLICATION_CREDENTIALS);
    console.log('✅ Service account file exists');
    
    // Parse command line arguments
    const args = process.argv.slice(2);
    const promptArg = args.find(arg => arg.startsWith('--prompt='));
    const outputArg = args.find(arg => arg.startsWith('--output-dir='));
    
    if (!promptArg) {
      console.log('❌ Usage: node script.mjs --prompt="your prompt" [--output-dir=path]');
      return;
    }
    
    const prompt = promptArg.split('=')[1].replace(/"/g, '');
    const outputDir = outputArg ? outputArg.split('=')[1].replace(/"/g, '') : 'generated-images/service-account-test';
    
    console.log('🎨 Prompt:', prompt);
    console.log('📁 Output directory:', outputDir);
    
    // Create output directory
    await fs.mkdir(outputDir, { recursive: true });
    console.log('📁 Output directory created');
    
    // Initialize Vertex AI client with service account authentication
    // This will automatically use GOOGLE_APPLICATION_CREDENTIALS
    console.log('🔧 Initializing Vertex AI client...');
    const vertexAI = new VertexAI({
      project: process.env.GOOGLE_CLOUD_PROJECT,
      location: process.env.GOOGLE_CLOUD_LOCATION,
      // Service account authentication is automatic via GOOGLE_APPLICATION_CREDENTIALS
    });
    console.log('✅ Vertex AI client initialized');
    
    // Try imagen-3.0-capability first (has 10 req/min quota)
    console.log('🤖 Getting imagen-3.0-capability model...');
    const model = vertexAI.preview.getGenerativeModel({
      model: 'imagen-3.0-capability',
    });
    console.log('✅ Model obtained');
    
    // Generate image
    console.log(`🎨 Generating image with prompt: "${prompt}"`);
    console.log('⏳ Please wait 10-30 seconds...');
    
    const result = await model.generateContent({
      contents: [{
        role: 'user',
        parts: [{
          text: prompt,
        }],
      }],
    });
    
    console.log('✅ API call completed');
    console.log('📊 Processing response...');
    
    // Process response
    if (result && result.response) {
      console.log('📸 Response received');
      
      if (result.response.candidates && result.response.candidates.length > 0) {
        console.log('📋 Found', result.response.candidates.length, 'candidate(s)');
        
        const candidate = result.response.candidates[0];
        
        if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
          const part = candidate.content.parts[0];
          
          if (part.inlineData && part.inlineData.data) {
            // Image data in inlineData format
            console.log('📸 Found image data in inlineData format');
            const imageBuffer = Buffer.from(part.inlineData.data, 'base64');
            const timestamp = Date.now();
            const filename = `service-account-image-${timestamp}.png`;
            const filepath = path.join(outputDir, filename);
            
            await fs.writeFile(filepath, imageBuffer);
            
            // Verify file was created
            const stats = await fs.stat(filepath);
            console.log('💾 Image saved successfully!');
            console.log('📂 File path:', filepath);
            console.log('📏 File size:', Math.round(stats.size / 1024), 'KB');
            
            console.log('\n🎉 SUCCESS! Image generated with service account authentication!');
            
          } else if (part.text) {
            // Text response - might be base64 encoded image
            console.log('📝 Found text response, checking if it\'s base64 image data...');
            try {
              const imageBuffer = Buffer.from(part.text, 'base64');
              const timestamp = Date.now();
              const filename = `service-account-image-${timestamp}.png`;
              const filepath = path.join(outputDir, filename);
              
              await fs.writeFile(filepath, imageBuffer);
              
              const stats = await fs.stat(filepath);
              console.log('💾 Image saved successfully!');
              console.log('📂 File path:', filepath);
              console.log('📏 File size:', Math.round(stats.size / 1024), 'KB');
              
              console.log('\n🎉 SUCCESS! Image generated with service account authentication!');
              
            } catch (error) {
              console.log('⚠️ Text response is not valid base64 image data');
              console.log('📝 Text content preview:', part.text.substring(0, 200));
            }
            
          } else {
            console.log('⚠️ No image data found in response part');
            console.log('📊 Part structure:', Object.keys(part));
          }
          
        } else {
          console.log('⚠️ No content parts found in candidate');
          console.log('📊 Candidate structure:', Object.keys(candidate));
        }
        
      } else {
        console.log('⚠️ No candidates found in response');
        console.log('📊 Response structure:', Object.keys(result.response));
      }
      
    } else {
      console.log('⚠️ No response received');
      console.log('📊 Result structure:', Object.keys(result || {}));
    }
    
  } catch (error) {
    console.error('\n❌ Error occurred:');
    console.error('Message:', error.message);
    
    if (error.code) {
      console.error('Error code:', error.code);
    }
    
    if (error.details) {
      console.error('Error details:', error.details);
    }
    
    if (error.stack) {
      console.error('Stack trace:', error.stack);
    }
    
    // Specific error handling for common issues
    if (error.message.includes('404') || error.message.includes('NOT_FOUND')) {
      console.error('\n💡 Suggestion: The model might not be available in this region or project.');
      console.error('   Try checking the Google Cloud Console for available models.');
    }
    
    if (error.message.includes('PERMISSION_DENIED')) {
      console.error('\n💡 Suggestion: Check service account permissions.');
      console.error('   Required roles: Vertex AI User, AI Platform Admin');
    }
    
    if (error.message.includes('UNAUTHENTICATED')) {
      console.error('\n💡 Suggestion: Check service account authentication.');
      console.error('   Verify GOOGLE_APPLICATION_CREDENTIALS path is correct.');
    }
  }
}

// Run the main function
main().catch(console.error);
