const { VertexAI } = require('@google-cloud/vertexai');
const fs = require('fs');
const path = require('path');

/**
 * Test script for Vertex AI image generation
 * This script generates an image using the Gemini model and saves it locally
 */
async function generateAndSaveImage(
  projectId = 'mold-removal-lead-gen',
  location = 'us-central1',
  model = 'gemini-2.0-flash-preview-image-generation',
  prompt = 'A beautiful modern double-hung window with white frame against a blue sky background',
  outputDir = './generated-images'
) {
  console.log('Initializing Vertex AI...');
  // Initialize Vertex with your Cloud project and location
  const vertexAI = new VertexAI({project: projectId, location: location});

  // Instantiate the model
  const generativeModel = vertexAI.getGenerativeModel({
    model: model,
  });

  console.log(`Generating image with prompt: "${prompt}"...`);

  // Generate content with image
  const response = await generativeModel.generateContent({
    contents: [
      {
        role: 'user',
        parts: [{ text: prompt }]
      }
    ],
    config: {
      responseModalities: ['TEXT', 'IMAGE'],
    },
  });

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Process the response
  const result = response.response;

  // Extract image data if available
  let imageData = null;
  let enhancedPrompt = null;

  if (result && result.candidates && result.candidates.length > 0) {
    const parts = result.candidates[0].content.parts;

    for (const part of parts) {
      if (part.text) {
        enhancedPrompt = part.text;
      } else if (part.inlineData) {
        imageData = part.inlineData.data;
      }
    }
  }

  // Save the image if we found image data
  if (imageData) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `image-${timestamp}.png`;
    const outputPath = path.join(outputDir, filename);

    // Write the base64 image data to a file
    fs.writeFileSync(outputPath, imageData, 'base64');

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
    console.log('Response:', JSON.stringify(response, null, 2));
    return null;
  }
}

// Execute the function
generateAndSaveImage().catch(console.error);
