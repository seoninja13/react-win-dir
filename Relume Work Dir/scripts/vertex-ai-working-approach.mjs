/**
 * Vertex AI Image Generation - Working Approach
 * Based on successful test files using @google-cloud/vertexai
 */

console.log('🚀 Starting Vertex AI with working approach...');

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
    
    // Configuration (based on working test files)
    const CONFIG = {
      projectId: process.env.GOOGLE_CLOUD_PROJECT,
      location: process.env.GOOGLE_CLOUD_LOCATION,
      model: 'imagen-3.0-fast-generate',
    };
    
    console.log('🔍 Configuration:');
    console.log('📋 Project ID:', CONFIG.projectId);
    console.log('🌍 Location:', CONFIG.location);
    console.log('🤖 Model:', CONFIG.model);
    console.log('🔑 Credentials:', process.env.GOOGLE_APPLICATION_CREDENTIALS ? 'SET' : 'NOT SET');
    
    if (!CONFIG.projectId || !CONFIG.location) {
      throw new Error('GOOGLE_CLOUD_PROJECT and GOOGLE_CLOUD_LOCATION must be set');
    }
    
    // Create output directory
    await fs.mkdir(outputDir, { recursive: true });
    
    // Initialize Vertex AI client (exactly like working test files)
    console.log('🔧 Initializing Vertex AI...');
    const vertexAI = new VertexAI({
      project: CONFIG.projectId,
      location: CONFIG.location,
      apiEndpoint: `${CONFIG.location}-aiplatform.googleapis.com`
    });
    console.log('✅ Vertex AI client created');
    
    // Initialize the generative model (exactly like working test files)
    console.log('🤖 Initializing image generation model...');
    const generativeModel = vertexAI.preview.getGenerativeModel({
      model: CONFIG.model,
      generationConfig: {
        temperature: 0.4,
        topK: 32,
        topP: 1,
        maxOutputTokens: 2048,
      },
    });
    console.log('✅ Model initialized');
    
    // Generate image (exactly like working test files)
    console.log(`🎨 Generating image with prompt: "${prompt}"`);
    console.log('⏳ This may take 10-30 seconds...');
    
    const result = await generativeModel.generateContent({
      contents: [{
        role: 'user',
        parts: [{
          text: prompt,
        }],
      }],
    });
    
    console.log('✅ Image generation API call completed');
    console.log('📊 Result type:', typeof result);
    console.log('📊 Result keys:', Object.keys(result || {}));
    
    // Process the response (based on working test files)
    if (result.response && result.response.candidates && result.response.candidates[0]) {
      console.log('📸 Response received with candidates');
      
      const candidate = result.response.candidates[0];
      console.log('📊 Candidate keys:', Object.keys(candidate || {}));
      
      if (candidate.content && candidate.content.parts && candidate.content.parts[0]) {
        const part = candidate.content.parts[0];
        console.log('📊 Part keys:', Object.keys(part || {}));
        
        if (part.text) {
          // Text response - might contain base64 image data
          console.log('📝 Text response received');
          try {
            const imageBuffer = Buffer.from(part.text, 'base64');
            const timestamp = Date.now();
            const filename = `vertex-ai-image-${timestamp}.png`;
            const filepath = path.join(outputDir, filename);
            
            await fs.writeFile(filepath, imageBuffer);
            console.log('💾 Image saved to:', filepath);
            
            // Get file size for verification
            const stats = await fs.stat(filepath);
            console.log('📏 File size:', Math.round(stats.size / 1024), 'KB');
            
            console.log('\n🎉 SUCCESS! Image generated and saved successfully!');
            
          } catch (error) {
            console.log('⚠️ Text response is not valid base64 image data');
            console.log('📝 Text content (first 200 chars):', part.text.substring(0, 200));
          }
          
        } else if (part.inlineData) {
          // Inline data response
          console.log('📸 Inline data response received');
          const imageBuffer = Buffer.from(part.inlineData.data, 'base64');
          const timestamp = Date.now();
          const filename = `vertex-ai-image-${timestamp}.png`;
          const filepath = path.join(outputDir, filename);
          
          await fs.writeFile(filepath, imageBuffer);
          console.log('💾 Image saved to:', filepath);
          
          // Get file size for verification
          const stats = await fs.stat(filepath);
          console.log('📏 File size:', Math.round(stats.size / 1024), 'KB');
          
          console.log('\n🎉 SUCCESS! Image generated and saved successfully!');
          
        } else {
          console.log('⚠️ No text or inlineData in part');
          console.log('📊 Full part:', JSON.stringify(part, null, 2));
        }
        
      } else {
        console.log('⚠️ No content.parts in candidate');
        console.log('📊 Full candidate:', JSON.stringify(candidate, null, 2));
      }
      
    } else {
      console.log('⚠️ No candidates in response');
      console.log('📊 Full response:', JSON.stringify(result.response, null, 2));
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
