// Relume-root/src/lib/vertex-ai/text-service.ts

import { VertexAI, GenerativeModel } from '@google-cloud/vertexai';

/**
 * @class VertexAITextService
 * 
 * @description
 * This service provides methods to interact with Google Cloud's Vertex AI 
 * for text generation tasks using generative models like Gemini.
 * 
 * It handles the initialization of the Vertex AI client, authentication (implicitly via 
 * environment variables), and provides a simplified interface for generating text.
 *
 * @requires @google-cloud/vertexai SDK
 * @requires Environment variables for GCP configuration:
 *           - GOOGLE_CLOUD_PROJECT: Your Google Cloud Project ID.
 *           - GOOGLE_CLOUD_LOCATION: The GCP region for Vertex AI services (e.g., 'us-west1').
 *           - GOOGLE_APPLICATION_CREDENTIALS: Path to your service account key JSON file.
 */
export class VertexAITextService {
  private vertexAI: VertexAI;
  private generativeModel: GenerativeModel;
  private project: string;
  private location: string;

  /**
   * @constructor
   * 
   * @param {string} [modelName='gemini-1.5-flash-latest'] - The name of the generative model to use.
   *                                                         Defaults to 'gemini-1.5-flash-latest'.
   * 
   * @throws {Error} If required environment variables (GOOGLE_CLOUD_PROJECT, GOOGLE_CLOUD_LOCATION)
   *                 are not set. The GOOGLE_APPLICATION_CREDENTIALS environment variable is implicitly
   *                 used by the Google Cloud SDK for authentication and is also required.
   */
  constructor(modelName: string = 'gemini-1.5-flash-latest') {
    // Retrieve Google Cloud project ID and location from environment variables.
    // These are essential for initializing the VertexAI client.
    this.project = process.env.GOOGLE_CLOUD_PROJECT || '';
    this.location = process.env.GOOGLE_CLOUD_LOCATION || '';

    // Validate that the required environment variables are set.
    // The Google Cloud SDK will automatically use GOOGLE_APPLICATION_CREDENTIALS for auth.
    if (!this.project) {
      throw new Error('GOOGLE_CLOUD_PROJECT environment variable is not set.');
    }
    if (!this.location) {
      throw new Error('GOOGLE_CLOUD_LOCATION environment variable is not set.');
    }
    // Note: GOOGLE_APPLICATION_CREDENTIALS is checked implicitly by the SDK during client instantiation.

    // Initialize the VertexAI client with the project and location.
    try {
      this.vertexAI = new VertexAI({ project: this.project, location: this.location });
    } catch (error) {
      console.error('Failed to initialize VertexAI client:', error);
      throw new Error(`Failed to initialize VertexAI client: ${error instanceof Error ? error.message : String(error)}`);
    }

    // Get the generative model (e.g., Gemini) for text generation.
    // The modelName parameter allows flexibility in choosing different models.
    try {
      this.generativeModel = this.vertexAI.getGenerativeModel({
        model: modelName,
        // Generation Conifg can be added here if needed
        // generationConfig: {
        //   maxOutputTokens: 2048,
        //   temperature: 0.9,
        //   topP: 1,
        // },
        // Safety settings can be added here if needed
        // safetySettings: [
        //   { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        // ],
      });
    } catch (error) {
      console.error(`Failed to get generative model '${modelName}':`, error);
      throw new Error(`Failed to get generative model '${modelName}': ${error instanceof Error ? error.message : String(error)}`);
    }

    console.log(`VertexAITextService initialized with project '${this.project}', location '${this.location}', and model '${modelName}'.`);
  }

  /**
   * @async
   * @method generateText
   * 
   * @description
   * Generates text based on a given prompt using the configured generative model.
   * 
   * @param {string} prompt - The text prompt to send to the model.
   * 
   * @returns {Promise<string>} A promise that resolves to the generated text as a string.
   * 
   * @throws {Error} If the text generation fails or the model returns no text.
   */
  async generateText(prompt: string): Promise<string> {
    if (!prompt || prompt.trim() === '') {
      console.error('Prompt cannot be empty.');
      throw new Error('Prompt cannot be empty.');
    }

    console.log(`Sending prompt to Vertex AI: "${prompt.substring(0, 100)}${prompt.length > 100 ? '...' : ''}"`);

    try {
      // Send the prompt to the model and await the response.
      const result = await this.generativeModel.generateContent(prompt);
      const response = result.response;

      // Check if the response and candidate parts are valid.
      if (!response || !response.candidates || response.candidates.length === 0) {
        console.error('Invalid response structure from Vertex AI:', response);
        throw new Error('Invalid response structure from Vertex AI: No candidates found.');
      }

      // Extract the text from the first candidate.
      // A response can have multiple candidates if `candidate_count` is set in `generationConfig`.
      const candidate = response.candidates[0];
      if (!candidate.content || !candidate.content.parts || candidate.content.parts.length === 0 || !candidate.content.parts[0].text) {
        console.error('No text found in the first candidate response part:', candidate);
        throw new Error('No text content found in the model response.');
      }

      const generatedText = candidate.content.parts[0].text;
      console.log(`Received response from Vertex AI: "${generatedText.substring(0, 100)}${generatedText.length > 100 ? '...' : ''}"`);
      return generatedText;

    } catch (error) {
      console.error('Error during text generation with Vertex AI:', error);
      // Check for specific quota errors based on memory fe4dd224-f9bc-41f3-aca9-8043b7829249
      if (error instanceof Error && error.message.includes('Quota exceeded')) {
        throw new Error(`Vertex AI text generation quota exceeded. Please check your quotas. Original error: ${error.message}`);
      }
      throw new Error(`Failed to generate text: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

// Example Usage (for testing purposes, can be removed or commented out):
/*
async function main() {
  // This requires .env.local to be set up with GOOGLE_CLOUD_PROJECT, etc.
  // You might need to run this with a preloader for dotenv if not bundled, e.g.:
  // node -r dotenv/config your-script.js
  // For ESM and ts-node, refer to MEMORY[df803935-dfab-446b-8293-3e2dd6ef1155]
  // For bundling with esbuild, refer to MEMORY[197c7a20-c69f-4f54-abc8-f6fa78bca48a]
  try {
    // Ensure dotenv is configured if running this directly and .env.local is used
    // import dotenv from 'dotenv';
    // dotenv.config({ path: '../../../../.env.local', override: true }); // Adjust path as needed

    const textService = new VertexAITextService();
    const prompt = 'Write a short paragraph about the benefits of using solar panels.';
    const generatedContent = await textService.generateText(prompt);
    console.log('\n--- Generated Text ---');
    console.log(generatedContent);
    console.log('--- End of Generated Text ---\n');
  } catch (error) {
    console.error('\nError in example usage:', error);
  }
}

// main(); // Uncomment to run the example when this file is executed directly.
*/
