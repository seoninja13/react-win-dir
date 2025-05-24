/**
 * Minimal test without @google/genai to isolate the issue
 */

console.log('🚀 Starting minimal test...');

async function main() {
  try {
    console.log('📦 Loading basic modules...');
    
    const fs = await import('fs/promises');
    const path = await import('path');
    const { fileURLToPath } = await import('url');
    const dotenv = await import('dotenv');
    
    console.log('✅ Basic modules loaded');
    
    // Setup paths
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const envPath = path.join(__dirname, '..', '.env.local');
    
    console.log('🔧 Loading environment from:', envPath);
    dotenv.config({ path: envPath });
    
    console.log('✅ Environment loaded');
    console.log('GOOGLE_APPLICATION_CREDENTIALS:', process.env.GOOGLE_APPLICATION_CREDENTIALS ? 'SET' : 'NOT SET');
    
    // Test service account loading
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      console.log('🔑 Testing service account file...');
      const credentials = JSON.parse(await fs.readFile(process.env.GOOGLE_APPLICATION_CREDENTIALS, 'utf8'));
      console.log('✅ Service account loaded for project:', credentials.project_id);
    }
    
    console.log('🎯 Now testing @google/genai import...');
    
    // This is where it might hang
    const { GoogleGenAI } = await import('@google/genai');
    console.log('✅ @google/genai imported successfully');
    
    console.log('🏁 All tests passed!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
  }
}

main().catch(console.error);
