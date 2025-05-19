import type { VertexAI, VertexInit } from '@google-cloud/vertexai'; // Keep for types if needed
import type { GoogleAuth, GoogleAuthOptions } from 'google-auth-library'; // Keep for types if needed
import type { VertexAIConfig, VertexAIError } from '../../types/vertex-ai';

/**
 * Service class for authenticating with Vertex AI using a service account
 */
export class VertexAIServiceAccount {
  private vertexAI!: VertexAI; // Definite assignment
  private config: VertexAIConfig;
  private auth!: GoogleAuth; // Definite assignment

  // Private constructor to enforce initialization via static method
  private constructor(config: VertexAIConfig) {
    if (!config.projectId) {
      throw new Error('GOOGLE_CLOUD_PROJECT environment variable or projectId in config is required');
    }

    if (!config.location) {
      throw new Error('GOOGLE_CLOUD_LOCATION environment variable or location in config is required');
    }
    
    this.config = {
      ...config,
      apiEndpoint: config.apiEndpoint || `${config.location}-aiplatform.googleapis.com`,
    };
  }

  // Private async method to perform actual initialization with dynamic imports
  private async _initialize(): Promise<void> {
    try {
      const { GoogleAuth } = await import('google-auth-library');
      const authOptions: GoogleAuthOptions = {
        scopes: ['https://www.googleapis.com/auth/cloud-platform'],
        keyFilename: this.config.keyFilename,
      };
      this.auth = new GoogleAuth(authOptions);

      const { VertexAI } = await import('@google-cloud/vertexai');
      const vertexAIOptions: VertexInit = {
        project: this.config.projectId,
        location: this.config.location,
        apiEndpoint: this.config.apiEndpoint,
      };
      this.vertexAI = new VertexAI(vertexAIOptions);

      console.log(`✅ Vertex AI dynamically initialized for project ${this.config.projectId} in ${this.config.location}`);
    } catch (error: any) {
      console.error('❌ Failed to dynamically initialize Vertex AI:', error);
      throw this.handleError(error);
    }
  }

  // Public static factory method for creating and initializing instances
  public static async create(config: VertexAIConfig): Promise<VertexAIServiceAccount> {
    const instance = new VertexAIServiceAccount(config);
    await instance._initialize();
    return instance;
  }

  /**
   * Returns the initialized Vertex AI client
   */
  public getClient(): VertexAI {
    if (!this.vertexAI) {
      throw new Error('VertexAI client not initialized. Call create() first.');
    }
    return this.vertexAI;
  }

  /**
   * Returns the Google Auth client
   */
  public getAuthClient(): GoogleAuth {
    if (!this.auth) {
      throw new Error('GoogleAuth client not initialized. Call create() first.');
    }
    return this.auth;
  }
  
  /**
   * Retrieves an access token
   */
  public async getAccessToken(): Promise<string | null | undefined> {
    if (!this.auth) {
      throw new Error('GoogleAuth client not initialized. Call create() first.');
    }
    try {
      const client = await this.auth.getClient();
      const token = await (client as any).getAccessToken(); 
      return token.token;
    } catch (error: any) {
      console.error('❌ Failed to get access token:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Handles errors by re-throwing them as VertexAIError
   */
  private handleError(error: any): VertexAIError {
    const vertexError: VertexAIError = new Error(error.message || 'An unknown Vertex AI error occurred');
    vertexError.name = 'VertexAIError';
    vertexError.code = error.code;
    vertexError.details = error.details || error.stack;
    vertexError.status = error.status;
    return vertexError;
  }
}

// Factory function to create a Vertex AI service account client - now async
export async function createVertexAIService(
  config: Pick<VertexAIConfig, 'projectId' | 'location' | 'keyFilename'>
): Promise<VertexAIServiceAccount> {
  // Ensure all required fields for VertexAIConfig are passed if necessary,
  // or rely on VertexAIServiceAccount.create to handle defaults/errors.
  return VertexAIServiceAccount.create(config as VertexAIConfig);
}

// Get default Vertex AI service instance using environment variables - now async
export async function getDefaultVertexAIService(): Promise<VertexAIServiceAccount> {
  const projectId = process.env.GOOGLE_CLOUD_PROJECT;
  const location = process.env.GOOGLE_CLOUD_LOCATION;
  const keyFilename = process.env.GOOGLE_APPLICATION_CREDENTIALS;

  if (!projectId) {
    throw new Error('getDefaultVertexAIService: GOOGLE_CLOUD_PROJECT environment variable is required.');
  }
  if (!location) {
    throw new Error('getDefaultVertexAIService: GOOGLE_CLOUD_LOCATION environment variable is required.');
  }
  // keyFilename is optional for GoogleAuth, it will try ADC otherwise

  const config: VertexAIConfig = { projectId, location, keyFilename };
  return VertexAIServiceAccount.create(config);
}
