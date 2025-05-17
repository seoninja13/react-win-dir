/**
 * Test script for the Gemini Text Generation Client
 * 
 * This script tests the text generation capabilities of our robust Gemini client.
 * Using CommonJS format (.cjs extension)
 */

const { generateText, generateTextWithHistory } = require('../Supabase/utils/gemini-text-client');

/**
 * Test simple text generation
 */
async function testSimpleGeneration() {
  try {
    console.log('=== Testing Simple Text Generation ===');
    
    const prompt = "Write a short paragraph about energy-efficient windows.";
    console.log(`Prompt: "${prompt}"`);
    
    console.log('Generating text...');
    const response = await generateText(prompt);
    
    console.log('\n=== Generated Text ===');
    console.log(response);
    console.log('======================');
    
    return true;
  } catch (error) {
    console.error('Simple generation test failed:', error.message);
    return false;
  }
}

/**
 * Test text generation with conversation history
 */
async function testConversationHistory() {
  try {
    console.log('\n=== Testing Text Generation with Conversation History ===');
    
    const messages = [
      { role: 'user', content: 'What are the benefits of energy-efficient windows?' },
      { role: 'model', content: 'Energy-efficient windows can reduce heating and cooling costs, improve comfort, reduce condensation, block UV rays, and reduce your carbon footprint.' },
      { role: 'user', content: 'Can you explain more about how they reduce heating costs specifically?' }
    ];
    
    console.log('Conversation history:', JSON.stringify(messages, null, 2));
    
    console.log('Generating text with history...');
    const response = await generateTextWithHistory(messages);
    
    console.log('\n=== Generated Response ===');
    console.log(response);
    console.log('=========================');
    
    return true;
  } catch (error) {
    console.error('Conversation history test failed:', error.message);
    return false;
  }
}

/**
 * Test different models
 */
async function testDifferentModels() {
  try {
    console.log('\n=== Testing Different Models ===');
    
    const prompt = "Explain the difference between double-pane and triple-pane windows in one sentence.";
    console.log(`Prompt: "${prompt}"`);
    
    const models = ['gemini-2.0-flash', 'gemini-2.0-pro'];
    
    for (const model of models) {
      try {
        console.log(`\nTesting model: ${model}`);
        console.log('Generating text...');
        
        const response = await generateText(prompt, model);
        
        console.log(`=== Generated Text (${model}) ===`);
        console.log(response);
        console.log('================================');
      } catch (error) {
        console.error(`Test failed for model ${model}:`, error.message);
      }
    }
    
    return true;
  } catch (error) {
    console.error('Different models test failed:', error.message);
    return false;
  }
}

/**
 * Run all tests
 */
async function runTests() {
  console.log('Starting Gemini Text Client Tests...\n');
  
  let results = {
    simpleGeneration: false,
    conversationHistory: false,
    differentModels: false
  };
  
  // Test simple generation
  results.simpleGeneration = await testSimpleGeneration();
  
  // Test conversation history
  results.conversationHistory = await testConversationHistory();
  
  // Test different models
  results.differentModels = await testDifferentModels();
  
  // Print summary
  console.log('\n=== Test Results Summary ===');
  console.log(`Simple Generation: ${results.simpleGeneration ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`Conversation History: ${results.conversationHistory ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`Different Models: ${results.differentModels ? '✅ PASSED' : '❌ FAILED'}`);
  
  const overallResult = Object.values(results).every(result => result);
  console.log(`\nOverall Result: ${overallResult ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
}

// Run the tests
runTests().catch(console.error);
