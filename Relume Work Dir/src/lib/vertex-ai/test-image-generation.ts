import * as dotenv from 'dotenv'; // Added for explicit loading
import { getDefaultImageService } from './image-service'; 
import type { ImageGenerationOptions, GeneratedImage } from '../../types/vertex-ai'; 
import * as fs from 'fs'; // Added for file system operations
import * as path from 'path'; // Added for path operations

async function runVertexImageTest() { 
  dotenv.config({ path: '.env.local', override: true }); // Added explicit config call, override to ensure it takes precedence
  console.log('🧪 Starting Vertex AI Image Generation Test Script...');

  // Create output directory if it doesn't exist
  const outputDir = path.join(process.cwd(), 'output');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`📂 Created output directory at: ${outputDir}`);
  }

  // --- Environment Variable Verification ---
  const requiredEnvVars = [
    'GOOGLE_CLOUD_PROJECT',
    'GOOGLE_CLOUD_LOCATION',
    'GOOGLE_APPLICATION_CREDENTIALS',
  ];
  let allVarsSet = true;
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      console.error(`❌ Critical Error: Environment variable ${envVar} is not set.`);
      allVarsSet = false;
    }
  }

  if (!allVarsSet) {
    console.error("   Ensure '.env.local' is in the project root (c:\\Users\\IvoD\\repos\\react-win-dir) and you are running with 'node -r dotenv/config ...'");
    process.exit(1); 
  }

  console.log('✅ Necessary environment variables appear to be loaded (explicitly by script):');
  console.log(`   GOOGLE_CLOUD_PROJECT: ${process.env.GOOGLE_CLOUD_PROJECT}`);
  console.log(`   GOOGLE_CLOUD_LOCATION: ${process.env.GOOGLE_CLOUD_LOCATION}`);
  console.log(`   GOOGLE_APPLICATION_CREDENTIALS: ${process.env.GOOGLE_APPLICATION_CREDENTIALS}`);
  // console.log(`   (Note: Path for GOOGLE_APPLICATION_CREDENTIALS should be resolvable from project root)`); 
  
  try { 
    console.log('\n▶️  Initializing VertexAIImageService (now async)...');
    const imageService = await getDefaultImageService(); 
    console.log('✅ VertexAIImageService initialized successfully.');

    // --- Define Image Generation Options ---
    const options: ImageGenerationOptions = {
      prompt: 'A small, cute, energy-efficient window on a modern home, sunny day.', // Slightly modified prompt for variety
      model: 'imagegeneration@006', // Try a different model family
      width: 256, // Smaller width
      height: 256, // Smaller height
      // samples: 1, // samples is often implicit or handled by specific model parameters not in generic options
    };

    console.log(`\n🖼️  Attempting to generate image with the following options:`);
    console.log(`   Prompt: "${options.prompt}"`);
    console.log(`   Model: ${options.model}`);
    console.log(`   Dimensions: ${options.width}x${options.height}`);

    // --- Generate Image ---
    const generatedImage: GeneratedImage = await imageService.generateImage(options); // Ensure type annotation for clarity

    // --- Log Success Response ---
    console.log('\n🎉 Image generation successful!');
    console.log('🖼️  Generated Image Details:');
    console.log(`   ID: ${generatedImage.id}`);
    console.log(`   URI: ${generatedImage.uri}`);
    console.log(`   Prompt: "${generatedImage.prompt}"`);
    console.log(`   Model Used: ${generatedImage.model}`);
    console.log(`   Timestamp: ${generatedImage.timestamp}`);
    console.log(`   Size: ${generatedImage.size.width}x${generatedImage.size.height}`);
    
    // Save URI to file
    const uriFilePath = path.join(outputDir, 'image_uri.txt');
    fs.writeFileSync(uriFilePath, generatedImage.uri);
    console.log(`📜 Image URI saved to: ${uriFilePath}`);

    if (generatedImage.uri.startsWith('gs://')) {
        console.warn(`\n⚠️  The image URI is a GCS URI: ${generatedImage.uri}`);
        console.warn(`   To view this image, you might need to make it publicly accessible or download it.`);
    } else if (generatedImage.uri.startsWith('data:image')) {
        console.log(`\n💡 Image is base64 encoded. You can typically copy the full URI into a web browser to view it.`);
        // Extract and save base64 data
        const base64Data = generatedImage.uri.split(',')[1];
        if (base64Data) {
            const base64FilePath = path.join(outputDir, 'image_base64.txt');
            fs.writeFileSync(base64FilePath, base64Data);
            console.log(`📄 Base64 image data saved to: ${base64FilePath}`);
        } else {
            console.warn('❓ Could not extract base64 data from URI.');
        }
    } else {
        console.log(`\n💡 Image URI is: ${generatedImage.uri}. Access method depends on its format.`);
    }

  } catch (error: any) {
    console.error('\n❌ Vertex AI Image Generation Test Script Failed:');
    console.error(`   Error Name: ${error.name}`);
    console.error(`   Error Message: ${error.message}`);
    if (error.code) {
      console.error(`   Error Code: ${error.code}`);
    }
    if (error.status) {
      console.error(`   Error Status: ${error.status}`);
    }
    if (error.details) {
      console.error('   Error Details:', JSON.stringify(error.details, null, 2));
      // Log full error to a file
      const errorLogPath = path.join(outputDir, 'error_log.json');
      fs.writeFileSync(errorLogPath, JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
      console.log(`📜 Full error details saved to: ${errorLogPath}`);
    }
    console.error('\n   Stack Trace:', error.stack);
    // Also log stack trace to a file
    const stackTracePath = path.join(outputDir, 'error_stack_trace.txt');
    fs.writeFileSync(stackTracePath, error.stack || 'No stack trace available');
    console.log(`📜 Stack trace saved to: ${stackTracePath}`);
  }
  console.log('✅ Vertex AI Image Generation Test Script finished.');
}

runVertexImageTest();
