import { GoogleGenAI } from '@google/genai';

console.log('Script started');
console.log('Google GenAI SDK version:', process.env.npm_package_dependencies_google_genai || 'unknown');

try {
  console.log('Initializing GoogleGenAI...');
  // Initialize Vertex with your Cloud project and location
  const ai = new GoogleGenAI({
    vertexai: true,
    project: 'mold-removal-lead-gen',
    location: 'global'
  });
  console.log('GoogleGenAI initialized successfully');
  
  const model = 'gemini-2.5-pro-preview-05-06';
  console.log('Using model:', model);


  // Set up generation config
  const generationConfig = {
    maxOutputTokens: 65535,
    temperature: 1,
    topP: 1,
    seed: 0,
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'OFF',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'OFF',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'OFF',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'OFF',
      }
    ],
  };


  async function generateContent() {
    try {
      console.log('Starting content generation...');
      console.log(`Using model: ${model}`);
      console.log('Configuration:', JSON.stringify(generationConfig, null, 2));
      
      // Add a simple prompt to the contents
      const req = {
        model: model,
        contents: [
          {
            role: 'user',
            parts: [{ text: 'Write a short paragraph about energy-efficient windows.' }]
          }
        ],
        config: generationConfig,
      };

      console.log('Sending request to AI model...');
      const streamingResp = await ai.models.generateContentStream(req);

      console.log('Response received, processing chunks...');
      for await (const chunk of streamingResp) {
        if (chunk.text) {
          process.stdout.write(chunk.text);
        } else {
          process.stdout.write(JSON.stringify(chunk) + '\n');
        }
      }
      
      console.log('\nContent generation completed successfully!');
    } catch (error) {
      console.error('Error during content generation:');
      console.error(error.message);
      console.error('Stack trace:');
      console.error(error.stack);
      
      if (error.response) {
        console.error('API Response:', error.response);
      }
    }
  }

  // Execute the content generation function
  await generateContent();

} catch (error) {
  console.error('Error during initialization:');
  console.error(error.message);
  console.error('Stack trace:');
  console.error(error.stack);
}
