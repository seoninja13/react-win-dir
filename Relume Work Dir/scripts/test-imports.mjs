console.log('Testing imports one by one...');

console.log('1. Testing fs/promises...');
try {
  const fs = await import('fs/promises');
  console.log('✅ fs/promises imported');
} catch (error) {
  console.error('❌ fs/promises failed:', error.message);
}

console.log('2. Testing path...');
try {
  const path = await import('path');
  console.log('✅ path imported');
} catch (error) {
  console.error('❌ path failed:', error.message);
}

console.log('3. Testing url...');
try {
  const { fileURLToPath } = await import('url');
  console.log('✅ url imported');
} catch (error) {
  console.error('❌ url failed:', error.message);
}

console.log('4. Testing crypto...');
try {
  const { createHash } = await import('crypto');
  console.log('✅ crypto imported');
} catch (error) {
  console.error('❌ crypto failed:', error.message);
}

console.log('5. Testing dotenv...');
try {
  const dotenv = await import('dotenv');
  console.log('✅ dotenv imported');
} catch (error) {
  console.error('❌ dotenv failed:', error.message);
}

console.log('6. Testing @google/genai...');
try {
  const { GoogleGenAI } = await import('@google/genai');
  console.log('✅ @google/genai imported');
} catch (error) {
  console.error('❌ @google/genai failed:', error.message);
}

console.log('All import tests completed');
