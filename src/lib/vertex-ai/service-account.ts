import { VertexAI } from '@google-cloud/vertexai';
import { GoogleAuth } from 'google-auth-library';
import { VertexAIConfig, VertexAIError } from '@/types/vertex-ai';

/**
 * Service class for authenticating with Vertex AI using a service account
 */
export class VertexAIServiceAccount {
  private vertexAI: VertexAI;
  private config: VertexAIConfig;
  private auth: GoogleAuth;

  constructor(config: VertexAIConfig) {
    if (!config.projectId) {
      throw new Error('GOOGLE_CLOUD_PROJECT environment variable is required');
    }

    if (!config.location) {
      throw new Error('GOOGLE_CLOUD_LOCATION environment variable is required');
    }

    if (!config.keyFilename && !process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      throw new Error('GOOGLE_APPLICATION_CREDENTIALS environment variable or keyFilename is required');
    }

    this.config = {
      ...config,
      apiEndpoint: config.apiEndpoint || `${config.location}-aiplatform.googleapis.com`,
      keyFilename: config.keyFilename || process.env.GOOGLE_APPLICATION_CREDENTIALS,
    };

    try {
      // Initialize Google Auth
      this.auth = new GoogleAuth({
        scopes: ['https://www.googleapis.com/auth/cloud-platform'],
        keyFilename: this.config.keyFilename,
      });

      // Initialize Vertex AI
      this.vertexAI = new VertexAI({
        project: this.config.projectId,
        location: this.config.location,
        apiEndpoint: this.config.apiEndpoint,
        keyFilename: this.config.keyFilename,
      });

      console.log(`✅ Vertex AI initialized for project ${this.config.projectId} in ${this.config.location}`);
    } catch (error) {
      console.error('❌ Failed to initialize Vertex AI:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Get the Vertex AI instance
   */
  public getClient(): VertexAI {
    return this.vertexAI;
  }

  /**
   * Get the authentication client
   */
  public async getAuthClient() {
    try {
      return await this.auth.getClient();
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get the access token
   */
  public async getAccessToken(): Promise<string> {
    try {
      const client = await this.getAuthClient();
      const { token } = await client.getAccessToken();
      
      if (!token) {
        throw new Error('Failed to get access token');
      }
      
      return token;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Standardize error handling
   */
  private handleError(error: any): VertexAIError {
    console.error('Vertex AI Error:', error);
    
    if (error instanceof Error) {
      return {
        ...error,
        code: (error as any).code,
        details: (error as any).details,
        status: (error as any).status,
      };
    }
    
    return new Error('An unknown error occurred with Vertex AI service');
  }
}

/**
 * Factory function to create a Vertex AI service account client
 */
export const createVertexAIService = (config: Omit<VertexAIConfig, 'apiEndpoint'>) => {
  return new VertexAIServiceAccount({
    ...config,
    apiEndpoint: `${config.location}-aiplatform.googleapis.com`,
  });
};

/**
 * Get default Vertex AI service instance using environment variables
 */
export const getDefaultVertexAIService = () => {
  const projectId = process.env.GOOGLE_CLOUD_PROJECT;
  const location = process.env.GOOGLE_CLOUD_LOCATION || 'us-west1';
  const keyFilename = process.env.GOOGLE_APPLICATION_CREDENTIALS;

  if (!projectId) {
    throw new Error('GOOGLE_CLOUD_PROJECT environment variable is not set');
  }

  if (!keyFilename) {
    throw new Error('GOOGLE_APPLICATION_CREDENTIALS environment variable is not set');
  }

  return createVertexAIService({
    projectId,
    location,
    keyFilename,
  });
};
