/**
 * Types for Vertex AI service integration
 */

export interface VertexAIConfig {
  projectId: string;
  location: string;
  apiEndpoint?: string;
  keyFilename?: string;
}

export interface ImageGenerationOptions {
  prompt: string;
  model?: string;
  width?: number;
  height?: number;
  samples?: number;
  safetySettings?: {
    blocked: boolean;
    category: 'HARM_CATEGORY_HATE_SPEECH' | 'HARM_CATEGORY_DANGEROUS_CONTENT' | 'HARM_CATEGORY_SEXUALLY_EXPLICIT' | 'HARM_CATEGORY_HARASSMENT';
  }[];
}

export interface GeneratedImage {
  id: string;
  uri: string;
  prompt: string;
  model: string;
  timestamp: string;
  size: {
    width: number;
    height: number;
  };
  safetyRatings?: {
    category: string;
    probability: 'NEGLIGIBLE' | 'LOW' | 'MEDIUM' | 'HIGH';
  }[];
}

export interface VertexAIError extends Error {
  code?: number;
  details?: any;
  status?: string;
}
