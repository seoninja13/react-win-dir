// Test script for image generation
import { generateImages } from './generate-images.js';
import { getAllImages, deleteImage } from './image-utils.js';
import ora from 'ora';
import chalk from 'chalk';

// Test cases with different styles and subjects
const testPrompts = [
  {
    prompt: "A futuristic cityscape at sunset with flying cars and neon lights, cyberpunk style, 4k, highly detailed",
    description: "Cyberpunk cityscape"
  },
  {
    prompt: "A serene mountain lake with crystal clear water and autumn foliage, photorealistic, 8k, national geographic",
    description: "Mountain lake"
  },
  {
    prompt: "An astronaut floating in space with Earth in the background, ultra realistic, 8k, NASA photography",
    description: "Astronaut in space"
  },
  {
    prompt: "A cozy cabin in a snowy forest at night, warm light in the windows, northern lights in the sky, digital art",
    description: "Snowy cabin"
  },
  {
    prompt: "A futuristic underwater city with glass domes and marine life, concept art, highly detailed, 8k",
    description: "Underwater city"
  }
];

// Test configurations
const testConfigs = [
  {
    name: "Standard HD",
    options: { width: 1280, height: 720, numberOfImages: 2 },
    description: "Standard HD resolution"
  },
  {
    name: "Square",
    options: { width: 1024, height: 1024, numberOfImages: 1, seed: 42 },
    description: "Square aspect ratio with fixed seed"
  },
  {
    name: "Portrait",
    options: { 
      width: 768, 
      height: 1024, 
      numberOfImages: 2,
      safetyFilterLevel: 'block_some',
      personGeneration: 'allow_adult'
    },
    description: "Portrait orientation with relaxed safety filters"
  },
  {
    name: "Landscape",
    options: { 
      width: 1920, 
      height: 1080, 
      numberOfImages: 1,
      safetyFilterLevel: 'block_most'
    },
    description: "Wide landscape format with strict safety filters"
  }
];

// Statistics
const stats = {
  totalTests: 0,
  successful: 0,
  failed: 0,
  startTime: null,
  endTime: null
};

/**
 * Run a single test case
 */
async function runTest(prompt, options, testName = '') {
  const spinner = ora({
    text: `Generating ${testName ? testName + ' ' : ''}image: "${prompt.substring(0, 50)}${prompt.length > 50 ? '...' : ''}"`,
    color: 'cyan'
  }).start();

  try {
    const startTime = Date.now();
    const results = await generateImages(prompt, options);
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    spinner.succeed(`Generated ${chalk.green(results.length)} image(s) in ${duration}s`);
    
    results.forEach((result, index) => {
      console.log(`   ${chalk.dim('→')} ${chalk.blue(result.filename)} (${(result.metadata.fileSize / 1024).toFixed(2)} KB)`);
    });
    
    stats.successful++;
    return { success: true, results };
    
  } catch (error) {
    spinner.fail(`Failed to generate image: ${error.message}`);
    stats.failed++;
    return { success: false, error };
  } finally {
    stats.totalTests++;
  }
}

/**
 * Run all test cases
 */
async function runAllTests() {
  console.log(chalk.bold('\n🚀 Starting Image Generation Test Suite\n'));
  console.log(chalk.dim('Using Google Imagen 3.0 for image generation\n'));
  
  stats.startTime = Date.now();
  
  try {
    // Test 1: Basic prompt with default options
    console.log(chalk.underline('\n🔹 Test 1: Basic Prompt with Default Options'));
    await runTest(
      'A beautiful sunset over a mountain range, photorealistic, 8k',
      {},
      'Basic Prompt'
    );
    
    // Test 2: Test different prompts with default options
    console.log(chalk.underline('\n🔹 Test 2: Different Prompts with Default Options'));
    for (const { prompt, description } of testPrompts.slice(0, 3)) {
      await runTest(prompt, {}, description);
      // Add a small delay between tests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Test 3: Test different configurations with the same prompt
    console.log(chalk.underline('\n🔹 Test 3: Different Configurations'));
    const testPrompt = "A beautiful landscape with mountains and a lake, golden hour, 8k";
    for (const config of testConfigs) {
      await runTest(
        testPrompt,
        config.options,
        config.name
      );
      // Add a small delay between tests
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Test 4: Edge cases
    console.log(chalk.underline('\n🔹 Test 4: Edge Cases'));
    
    // Minimum size
    await runTest(
      'A small 256x256 icon of a rocket taking off, vector art',
      { width: 256, height: 256, numberOfImages: 1 },
      'Minimum Size (256x256)'
    );
    
    // Maximum size (within reasonable limits)
    await runTest(
      'A detailed landscape, 8k resolution, highly detailed',
      { width: 2048, height: 2048, numberOfImages: 1 },
      'Large Size (2048x2048)'
    );
    
    stats.endTime = Date.now();
    
    // Print summary
    printSummary();
    
  } catch (error) {
    console.error('\n❌ Test suite failed:', error);
    process.exit(1);
  }
}

/**
 * Print test summary
 */
function printSummary() {
  const duration = ((stats.endTime - stats.startTime) / 1000).toFixed(2);
  const successRate = (stats.successful / stats.totalTests * 100).toFixed(1);
  
  console.log('\n' + '='.repeat(60));
  console.log(chalk.bold('📊 Test Suite Summary'));
  console.log('='.repeat(60));
  console.log(`Total Tests:  ${chalk.bold(stats.totalTests)}`);
  console.log(`Successful:   ${chalk.green.bold(stats.successful)}`);
  console.log(`Failed:       ${stats.failed > 0 ? chalk.red.bold(stats.failed) : chalk.gray('0')}`);
  console.log(`Success Rate: ${successRate >= 90 ? chalk.green.bold(`${successRate}%`) : 
                                successRate >= 70 ? chalk.yellow.bold(`${successRate}%`) : 
                                chalk.red.bold(`${successRate}%`)}`);
  console.log(`Duration:     ${duration} seconds`);
  console.log('='.repeat(60) + '\n');
  
  if (stats.failed > 0) {
    console.log(chalk.yellow('⚠️  Some tests failed. Check the logs for details.'));
  } else {
    console.log(chalk.green('✨ All tests completed successfully!'));
  }
  
  console.log('\nGenerated images are saved in the "generated-images" directory.\n');
}

// Run the test suite
runAllTests().catch(console.error);
