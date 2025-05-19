import { VertexAI } from '@google-cloud/vertexai';
import { v4 as uuidv4 } from 'uuid';
import { VertexAIServiceAccount } from './service-account';
import { 
  ImageGenerationOptions, 
  GeneratedImage, 
  VertexAIError,
  VertexAIConfig
} from '@/types/vertex-ai';

/**
 * Service for generating images using Vertex AI with service account authentication
 */
export class VertexAIImageService {
  private vertexAI: VertexAI;
  private serviceAccount: VertexAIServiceAccount;
  private config: VertexAIConfig;
  private storage: Map<string, GeneratedImage> = new Map();

  constructor(config: VertexAIConfig) {
    this.serviceAccount = new VertexAIServiceAccount(config);
    this.vertexAI = this.serviceAccount.getClient();
    this.config = config;
  }

  /**
   * Generate an image using Vertex AI
   */
  public async generateImage(
    options: ImageGenerationOptions
  ): Promise<GeneratedImage> {
    const {
      prompt,
      model = 'imagegeneration@002',
      width = 1024,
      height = 1024,
      samples = 1,
      safetySettings = []
    } = options;

    try {
      console.log(`🖼️  Generating image with prompt: "${prompt}"`);
      
      // Get the generative model
      const generativeModel = this.vertexAI.getGenerativeModel({
        model,
        generationConfig: {
          temperature: 0.4,
          topP: 0.95,
          topK: 40,
          candidateCount: samples,
        },
        safetySettings: safetySettings.length > 0 ? safetySettings : undefined,
      });

      // Generate the image
      const result = await generativeModel.generateContent({
        contents: [
          {
            role: 'user',
            parts: [
              {
                inlineData: {
                  mimeType: 'text/plain',
                  data: prompt,
                },
              },
            ],
          },
        ],
      });

      // Process the response
      const imageData = result.response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      
      if (!imageData) {
        throw new Error('No image data returned from Vertex AI');
      }

      // Create a data URL for the image
      const mimeType = 'image/png'; // Default to PNG
      const dataUrl = `data:${mimeType};base64,${imageData}`;

      // Create the image record
      const imageId = uuidv4();
      const imageRecord: GeneratedImage = {
        id: imageId,
        uri: dataUrl,
        prompt,
        model,
        timestamp: new Date().toISOString(),
        size: { width, height },
        safetyRatings: result.response.promptFeedback?.safetyRatings?.map(rating => ({
          category: rating.category,
          probability: rating.probability,
        })),
      };

      // Store the image
      this.storage.set(imageId, imageRecord);
      console.log(`✅ Generated image with ID: ${imageId}`);

      return imageRecord;
    } catch (error) {
      console.error('❌ Failed to generate image:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Get a previously generated image by ID
   */
  public getImage(id: string): GeneratedImage | undefined {
    return this.storage.get(id);
  }

  /**
   * List all generated images
   */
  public listImages(): GeneratedImage[] {
    return Array.from(this.storage.values());
  }

  /**
   * Standardize error handling
   */
  private handleError(error: any): VertexAIError {
    console.error('Image Generation Error:', error);
    
    if (error instanceof Error) {
      return {
        ...error,
        code: (error as any).code,
        details: (error as any).details,
        status: (error as any).status,
      };
    }
    
    return new Error('An unknown error occurred during image generation');
  }
}

/**
 * Factory function to create an image service instance
 */
export const createImageService = (config: VertexAIConfig) => {
  return new VertexAIImageService(config);
};

/**
 * Get default image service instance using environment variables
 */
export const getDefaultImageService = () => {
  const projectId = process.env.GOOGLE_CLOUD_PROJECT;
  const location = process.env.GOOGLE_CLOUD_LOCATION || 'us-west1';
  const keyFilename = process.env.GOOGLE_APPLICATION_CREDENTIALS;

  if (!projectId) {
    throw new Error('GOOGLE_CLOUD_PROJECT environment variable is not set');
  }

  if (!keyFilename) {
    throw new Error('GOOGLE_APPLICATION_CREDENTIALS environment variable is not set');
  }

  return createImageService({
    projectId,
    location,
    keyFilename,
  });
};
