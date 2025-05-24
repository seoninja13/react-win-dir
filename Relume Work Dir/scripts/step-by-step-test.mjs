console.log('Step 1: Basic script execution');

console.log('Step 2: Testing dotenv import');
try {
  const dotenv = await import('dotenv');
  console.log('✅ dotenv imported successfully');
} catch (error) {
  console.error('❌ dotenv import failed:', error.message);
  process.exit(1);
}

console.log('Step 3: Testing path and fileURLToPath');
try {
  const { fileURLToPath } = await import('url');
  const path = await import('path');
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  console.log('✅ path utilities working');
  console.log('Current directory:', __dirname);
} catch (error) {
  console.error('❌ path utilities failed:', error.message);
  process.exit(1);
}

console.log('Step 4: Testing environment loading');
try {
  const dotenv = await import('dotenv');
  const { fileURLToPath } = await import('url');
  const path = await import('path');
  
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const envPath = path.join(__dirname, '..', '.env.local');
  
  console.log('Environment file path:', envPath);
  
  // Check if .env.local exists
  const fs = await import('fs/promises');
  await fs.access(envPath);
  console.log('✅ .env.local file exists');
  
  // Load environment
  dotenv.config({ path: envPath });
  console.log('✅ Environment loaded');
  
  console.log('GOOGLE_APPLICATION_CREDENTIALS:', process.env.GOOGLE_APPLICATION_CREDENTIALS ? 'SET' : 'NOT SET');
  
} catch (error) {
  console.error('❌ Environment loading failed:', error.message);
  process.exit(1);
}

console.log('Step 5: All basic tests passed!');
