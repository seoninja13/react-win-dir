import { Part } from '@google-cloud/vertexai'; // VertexAI itself will be dynamically imported by service-account
import { v4 as uuidv4 } from 'uuid';
import { VertexAIServiceAccount, getDefaultVertexAIService as getVertexAccount, createVertexAIService as createVertexAccount } from './service-account';
import type { 
  ImageGenerationOptions, 
  GeneratedImage, 
  VertexAIError,
  VertexAIConfig
} from '../../types/vertex-ai';

/**
 * Service for generating images using Vertex AI with service account authentication
 */
export class VertexAIImageService {
  private vertexAI: any; // Store the VertexAI client instance from service account
  private serviceAccount: VertexAIServiceAccount;
  private config: VertexAIConfig;
  private storage: Map<string, GeneratedImage> = new Map();

  // Constructor is now private, initialization via static create method
  private constructor(serviceAccount: VertexAIServiceAccount, config: VertexAIConfig) {
    this.serviceAccount = serviceAccount;
    this.config = config; // Use the resolved config
    this.vertexAI = this.serviceAccount.getClient(); // Get client from the initialized service account
  }

  // Public static factory method for creating and initializing instances
  public static async create(
    // Allow either a full config to create a new service account, or an existing one
    configOrServiceAccount?: VertexAIConfig | VertexAIServiceAccount,
    optionalConfig?: VertexAIConfig
  ): Promise<VertexAIImageService> {
    let serviceAccount: VertexAIServiceAccount;
    let activeConfig: VertexAIConfig;

    if (configOrServiceAccount instanceof VertexAIServiceAccount) {
      serviceAccount = configOrServiceAccount;
      activeConfig = optionalConfig || { 
        projectId: process.env.GOOGLE_CLOUD_PROJECT!,
        location: process.env.GOOGLE_CLOUD_LOCATION!,
        keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
      }; 
    } else if (configOrServiceAccount) { // It's a VertexAIConfig
      serviceAccount = await createVertexAccount(configOrServiceAccount);
      activeConfig = configOrServiceAccount;
    } else { // No args, use default service account
      serviceAccount = await getVertexAccount();
      activeConfig = { 
        projectId: process.env.GOOGLE_CLOUD_PROJECT!,
        location: process.env.GOOGLE_CLOUD_LOCATION!,
        keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
      };
    }
    
    return new VertexAIImageService(serviceAccount, activeConfig);
  }

  /**
   * Generate an image using Vertex AI
   */
  public async generateImage(
    options: ImageGenerationOptions
  ): Promise<GeneratedImage> {
    const {
      prompt,
      model = 'imagegeneration@005', // Reverted model
      width = 1024,
      height = 1024,
      // samples = 1, // samples is not directly used in generation_config this way
    } = options;

    try {
      console.log(`🖼️  Generating image with prompt: "${prompt}" using model ${model}`);
      
      // VertexAI client is already initialized and available via this.vertexAI
      const generativeModel = this.vertexAI.getGenerativeModel({
        model: model,
      });

      const textPart: Part = { text: prompt };
      const request = {
        contents: [{ role: 'user', parts: [textPart] }],
        // generation_config: { // For Imagen on Vertex, specific params like sampleCount are often part of instance or direct method calls, not generic generation_config
        // },
        // safety_settings: options.safetySettings, // Not directly compatible here
      };

      // The actual API call to generate content (image)
      const streamingResp = await generativeModel.generateContentStream(request);
      
      let imageUri: string | undefined;

      // Process the streaming response to extract image URI or data
      for await (const item of streamingResp.stream) {
        if (item.candidates && item.candidates[0]?.content?.parts?.length > 0) {
          const part = item.candidates[0].content.parts[0];
          if (part.inlineData?.data && part.inlineData?.mimeType) {
            imageUri = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            console.log('🖼️  Received inline image data.');
            break; 
          } else if (part.fileData?.fileUri && part.fileData?.mimeType) {
            imageUri = part.fileData.fileUri;
            console.log(`🖼️  Received image URI: ${imageUri}`);
            break; 
          } else if (part.text) {
            console.warn(`🖼️  Received text part instead of image: ${part.text}`);
          }
        }
      }

      if (!imageUri) {
        // Check if the full response contains the image URI (non-streaming or aggregated)
        // This part might need adjustment based on exact API response structure for errors or non-streamed success
        const response = await streamingResp.response;
        if (response && response.candidates && response.candidates[0]?.content?.parts?.length > 0) {
            const part = response.candidates[0].content.parts[0];
            if (part.inlineData?.data && part.inlineData?.mimeType) {
                imageUri = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            } else if (part.fileData?.fileUri) {
                imageUri = part.fileData.fileUri;
            }
        }
        if (!imageUri) {
             throw new Error('Image generation did not return a valid URI or data from inlineData or fileData, even after full response.');
        }
      }

      const generatedImage: GeneratedImage = {
        id: uuidv4(),
        uri: imageUri,
        prompt,
        model,
        timestamp: new Date().toISOString(),
        size: { width, height },
        // safetyRatings: response.safetyRatings, // Adapt if available and needed
      };

      this.storage.set(generatedImage.id, generatedImage);
      console.log(`✅ Image generated successfully: ${generatedImage.id}`);
      return generatedImage;

    } catch (error: any) {
      console.error('❌ Failed to generate image:', error);
      const serviceError: VertexAIError = new Error(error.message || 'Image generation failed');
      serviceError.name = 'VertexAIImageServiceError';
      serviceError.code = error.code;
      serviceError.details = error.details || error.stack;
      throw serviceError;
    }
  }

  /**
   * Retrieve a generated image by ID (from in-memory storage)
   */
  public async getImageById(id: string): Promise<GeneratedImage | undefined> {
    return this.storage.get(id);
  }

  /**
   * List all generated images (from in-memory storage)
   */
  public async listImages(): Promise<GeneratedImage[]> {
    return Array.from(this.storage.values());
  }
}

// Factory function to create an image service instance - now async
export async function createImageService(config: VertexAIConfig): Promise<VertexAIImageService> {
  return VertexAIImageService.create(config);
}

// Get default image service instance using environment variables - now async
export async function getDefaultImageService(): Promise<VertexAIImageService> {
  // VertexAIImageService.create() will handle getting default service account if no args are passed
  return VertexAIImageService.create(); 
}
