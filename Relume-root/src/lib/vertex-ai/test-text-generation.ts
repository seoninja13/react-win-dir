/**
 * Test script for Vertex AI text generation
 * 
 * This script tests text generation using the Vertex AI Gemini model.
 * It uses the same environment setup as the image generation test.
 * 
 * Run with: npx esbuild Relume-root/src/lib/vertex-ai/test-text-generation.ts --bundle --outfile=dist/test-text-generation.mjs --platform=node --format=esm --external:dotenv --external:@google-cloud/vertexai --color=true
 * Then: node --no-warnings dist/test-text-generation.mjs
 * (Note: Added @google-cloud/vertexai as external based on image generation setup in MEMORY[197c7a20-c69f-4f54-abc8-f6fa78bca48a])
 */

import dotenv from 'dotenv';
// import { generateContent } from '../../../../Supabase/utils/vertex-ai-client'; // Old import
import { VertexAITextService } from './text-service'; // New import
import fs from 'fs';
import path from 'path';

// Load environment variables from .env.local in the project root
// This assumes the script (after bundling) is run from the project root.
dotenv.config({ path: '.env.local', override: true });

// Test prompts
const TEST_PROMPTS = [
  "Write a brief description of a double-hung window's key features.",
  "List 3 benefits of installing energy-efficient windows.",
  "Explain what makes vinyl windows a popular choice for homeowners."
];

// Output directory for saving generated text (in project root/output)
const OUTPUT_DIR = path.join(process.cwd(), 'output');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'generated_text.json');

interface GenerationResult {
  prompt: string;
  text: string;
  timestamp: string;
  model: string;
}

async function testTextGeneration() {
  console.log('Starting text generation test with VertexAITextService...\n');
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  const results: GenerationResult[] = [];
  const modelForTest = 'gemini-2.0-flash'; // Updated model based on user provided model card

  let textService: VertexAITextService;
  try {
    // Instantiate the service with the desired model
    // VertexAITextService uses GOOGLE_APPLICATION_CREDENTIALS env var for auth.
    textService = new VertexAITextService(modelForTest);
    console.log(`VertexAITextService initialized for model: ${modelForTest}`);
  } catch (error) {
    console.error('Failed to initialize VertexAITextService:', error);
    // Record a general error if service initialization fails
    results.push({
      prompt: 'Service Initialization', 
      text: `ERROR: ${error instanceof Error ? error.message : String(error)}`,
      timestamp: new Date().toISOString(),
      model: modelForTest
    });
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2));
    console.log(`Results (with initialization error) saved to ${OUTPUT_FILE}`);
    return; // Exit if service cannot be initialized
  }
  
  for (const prompt of TEST_PROMPTS) {
    console.log(`Testing prompt: "${prompt}"`);
    
    try {
      // Use the new service to generate text
      // The VertexAITextService's generateText method handles its own logging for success/failure
      const text = await textService.generateText(prompt);
      
      const result: GenerationResult = {
        prompt,
        text,
        timestamp: new Date().toISOString(),
        model: modelForTest // Record the model used for this test
      };
      
      results.push(result);
      // console.log('Generated text:', text); // Service already logs this
      console.log('---\n');
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(`Error generating text for prompt "${prompt}":`, errorMessage);
      // Record the error for this specific prompt
      results.push({
        prompt,
        text: `ERROR: ${errorMessage}`,
        timestamp: new Date().toISOString(),
        model: modelForTest
      });
      console.log('---\n');
    }
  }
  
  // Save results to file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2));
  console.log(`All test results saved to ${OUTPUT_FILE}`);
}

// Run the test
testTextGeneration().catch(error => {
  // Catch any unhandled errors from testTextGeneration itself (e.g., fs errors outside the loop)
  console.error('Unhandled error in testTextGeneration:', error);
});
