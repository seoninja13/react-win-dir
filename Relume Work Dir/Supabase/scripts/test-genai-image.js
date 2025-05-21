const genai = require('@google/genai');
const fs = require('fs');
const path = require('path');

/**
 * Test script for Google GenAI image generation
 * This script generates an image using the Gemini model and saves it locally
 */
async function generateAndSaveImage(
  projectId = 'mold-removal-lead-gen',
  location = 'us-central1',
  model = 'gemini-2.0-flash-preview-image-generation',
  prompt = 'A beautiful modern double-hung window with white frame against a blue sky background',
  outputDir = './generated-images'
) {
  console.log('Initializing Google GenAI...');

  // Initialize the Google GenAI client
  const genAI = new genai.GoogleGenAI({
    vertexai: true,
    project: projectId,
    location: location,
  });

  // Get the model
  const genModel = genAI.models;

  console.log(`Generating image with prompt: "${prompt}"...`);

  // Generate content with image
  const result = await genModel.generateContent({
    model,
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    config: {
      responseModalities: ['TEXT', 'IMAGE'],
    },
  });

  console.log('Response received!');
  console.log('Full response structure:', JSON.stringify(result, null, 2));

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Extract image data if available
  let imageUrl = '';
  let enhancedPrompt = '';

  // Check if we have candidates in the result
  if (result && result.candidates) {
    for (const candidate of result.candidates) {
      if (candidate.content && candidate.content.parts) {
        for (const part of candidate.content.parts) {
          if (part.text) {
            enhancedPrompt = part.text;
            console.log('Text response:', part.text);
          } else if (part.inlineData) {
            console.log('Found image data!');
            imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          }
        }
      }
    }
  } else if (result && result.text) {
    // Simple text response
    enhancedPrompt = result.text;
    console.log('Text response:', result.text);
  }

  // Save the image if we found image data
  if (imageUrl) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `image-${timestamp}.png`;
    const outputPath = path.join(outputDir, filename);

    // Extract base64 data from the data URL
    const base64Data = imageUrl.split(',')[1];

    // Write the base64 image data to a file
    fs.writeFileSync(outputPath, base64Data, 'base64');

    console.log(`Image generated successfully!`);
    console.log(`Saved to: ${outputPath}`);
    console.log(`To view the image, open the file in your image viewer or browser.`);

    // If there's enhanced prompt, display it
    if (enhancedPrompt) {
      console.log(`Enhanced prompt: ${enhancedPrompt}`);
    }

    return outputPath;
  } else {
    console.error('No image data was found in the response.');
    console.log('Response structure:', JSON.stringify(response, null, 2));
    return null;
  }
}

// Execute the function
generateAndSaveImage().catch(err => {
  console.error('Error generating image:', err);
});
