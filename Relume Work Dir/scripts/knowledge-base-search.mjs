/**
 * Knowledge Base Search using Gemini 2.0 Flash
 * 
 * This script searches the knowledge base using Gemini 2.0 Flash embeddings
 * to find relevant documentation chunks based on semantic similarity.
 * 
 * Features:
 * - Generates embeddings for search queries using Gemini 2.0 Flash
 * - Searches Supabase's vector database (pgvector) for similar content
 * - Supports filtering by metadata (source, category, etc.)
 * - Returns ranked results with similarity scores
 * 
 * Prerequisites:
 * - Node.js 18+
 * - @google/generative-ai package
 * - @supabase/supabase-js package
 * - Google Cloud project with Gemini API enabled
 * - Supabase project with pgvector extension enabled
 * - Knowledge base populated with embeddings
 * 
 * Environment Variables:
 * - GOOGLE_API_KEY: API key for Google Generative AI
 * - SUPABASE_URL: URL for your Supabase project
 * - SUPABASE_KEY: Service role key for your Supabase project
 * 
 * Usage:
 *   node scripts/knowledge-base-search.mjs \
 *     --query="How to generate images with Vertex AI?" \
 *     --limit=5 \
 *     --source=vertex-ai-docs
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@supabase/supabase-js';
import path from 'path';
import { fileURLToPath } from 'url';

// ======================
// Configuration
// ======================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Default configuration
const DEFAULTS = {
  EMBEDDING_MODEL: 'embedding-001',
  EMBEDDING_DIMENSION: 768, // Gemini embedding dimension
  TABLE_NAME: 'knowledge_base',
  LIMIT: 5,
  SIMILARITY_THRESHOLD: 0.7,
};

// ======================
// Embedding Generator
// ======================
class EmbeddingGenerator {
  constructor(apiKey) {
    this.validateApiKey(apiKey);
    this.initializeClient(apiKey);
  }
  
  validateApiKey(apiKey) {
    if (!apiKey) {
      throw new Error('Google API key is required for Gemini embedding generation');
    }
  }
  
  initializeClient(apiKey) {
    try {
      this.client = new GoogleGenerativeAI(apiKey);
      this.embeddingModel = this.client.getGenerativeModel({ model: DEFAULTS.EMBEDDING_MODEL });
      console.log(`Initialized Gemini embedding model: ${DEFAULTS.EMBEDDING_MODEL}`);
    } catch (error) {
      console.error('Failed to initialize Gemini client:', error.message);
      throw new Error(`Failed to initialize Gemini client: ${error.message}`);
    }
  }
  
  // Generate embeddings for a single text
  // @param {string} text - Text to generate embeddings for
  // @returns {Promise<number[]>} Embedding vector
  async generateEmbedding(text) {
    try {
      const result = await this.embeddingModel.embedContent(text);
      return result.embedding.values;
    } catch (error) {
      console.error('Failed to generate embedding:', error.message);
      throw new Error(`Failed to generate embedding: ${error.message}`);
    }
  }
}

// ======================
// Supabase Vector Store
// ======================
class SupabaseVectorStore {
  constructor(supabaseUrl, supabaseKey, tableName = DEFAULTS.TABLE_NAME) {
    this.validateCredentials(supabaseUrl, supabaseKey);
    this.tableName = tableName;
    this.initializeClient(supabaseUrl, supabaseKey);
  }
  
  validateCredentials(supabaseUrl, supabaseKey) {
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase URL and key are required for vector storage');
    }
  }
  
  initializeClient(supabaseUrl, supabaseKey) {
    try {
      this.client = createClient(supabaseUrl, supabaseKey);
      console.log(`Initialized Supabase client for table: ${this.tableName}`);
    } catch (error) {
      console.error('Failed to initialize Supabase client:', error.message);
      throw new Error(`Failed to initialize Supabase client: ${error.message}`);
    }
  }
  
  // Check if the knowledge base table exists
  // @returns {Promise<boolean>} Whether the table exists
  async checkTableExists() {
    try {
      const { data, error } = await this.client
        .from('pg_tables')
        .select('tablename')
        .eq('tablename', this.tableName)
        .single();
      
      if (error) {
        // Try a different approach if the previous one fails
        const { data: tables, error: tablesError } = await this.client
          .rpc('get_tables');
        
        if (tablesError) {
          throw new Error(`Failed to check if table exists: ${tablesError.message}`);
        }
        
        return tables.includes(this.tableName);
      }
      
      return !!data;
    } catch (error) {
      console.error('Failed to check if table exists:', error.message);
      
      // Try a simple query to check if the table exists
      try {
        const { data, error } = await this.client
          .from(this.tableName)
          .select('id')
          .limit(1);
        
        return !error;
      } catch (queryError) {
        return false;
      }
    }
  }
  
  // Search for similar documents
  // @param {number[]} queryEmbedding - Query embedding vector
  // @param {Object} options - Search options
  // @param {number} [options.limit=5] - Maximum number of results
  // @param {number} [options.similarityThreshold=0.7] - Minimum similarity score
  // @param {Object} [options.metadataFilter={}] - Filter by metadata
  // @returns {Promise<Array<{id: string, content: string, metadata: Object, similarity: number}>>}
  async searchSimilarDocuments(queryEmbedding, options = {}) {
    const {
      limit = DEFAULTS.LIMIT,
      similarityThreshold = DEFAULTS.SIMILARITY_THRESHOLD,
      metadataFilter = {},
    } = options;
    
    try {
      // Check if the table exists
      const tableExists = await this.checkTableExists();
      
      if (!tableExists) {
        throw new Error(`Knowledge base table '${this.tableName}' does not exist`);
      }
      
      // Build the query
      let query = this.client
        .from(this.tableName)
        .select('id, content, metadata, embedding')
        .order(`embedding <=> '[${queryEmbedding.join(',')}]'::vector`, { ascending: true })
        .limit(limit);
      
      // Apply metadata filters if provided
      if (Object.keys(metadataFilter).length > 0) {
        for (const [key, value] of Object.entries(metadataFilter)) {
          query = query.filter(`metadata->>'${key}'`, 'eq', value);
        }
      }
      
      const { data, error } = await query;
      
      if (error) {
        throw new Error(`Failed to search similar documents: ${error.message}`);
      }
      
      // Calculate similarity scores and filter by threshold
      return data
        .map(doc => {
          // Calculate cosine similarity
          const similarity = this.calculateCosineSimilarity(queryEmbedding, doc.embedding);
          return { ...doc, similarity };
        })
        .filter(doc => doc.similarity >= similarityThreshold);
    } catch (error) {
      console.error('Failed to search similar documents:', error.message);
      throw new Error(`Failed to search similar documents: ${error.message}`);
    }
  }
  
  // Calculate cosine similarity between two vectors
  // @param {number[]} vecA - First vector
  // @param {number[]} vecB - Second vector
  // @returns {number} Cosine similarity (0-1)
  calculateCosineSimilarity(vecA, vecB) {
    if (!vecA || !vecB || vecA.length !== vecB.length) {
      return 0;
    }
    
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    
    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }
    
    normA = Math.sqrt(normA);
    normB = Math.sqrt(normB);
    
    if (normA === 0 || normB === 0) {
      return 0;
    }
    
    return dotProduct / (normA * normB);
  }
}

// ======================
// Knowledge Base Search
// ======================
class KnowledgeBaseSearch {
  constructor(googleApiKey, supabaseUrl, supabaseKey) {
    this.embeddingGenerator = new EmbeddingGenerator(googleApiKey);
    this.vectorStore = new SupabaseVectorStore(supabaseUrl, supabaseKey);
  }
  
  // Search the knowledge base
  // @param {string} query - Search query
  // @param {Object} options - Search options
  // @returns {Promise<Array<{id: string, content: string, metadata: Object, similarity: number}>>}
  async search(query, options = {}) {
    try {
      // Generate embedding for the query
      const queryEmbedding = await this.embeddingGenerator.generateEmbedding(query);
      
      // Search for similar documents
      return await this.vectorStore.searchSimilarDocuments(queryEmbedding, options);
    } catch (error) {
      console.error('Failed to search knowledge base:', error.message);
      throw new Error(`Failed to search knowledge base: ${error.message}`);
    }
  }
  
  // Format search results for display
  // @param {Array<{id: string, content: string, metadata: Object, similarity: number}>} results
  // @returns {string} Formatted results
  formatResults(results) {
    if (!results || results.length === 0) {
      return 'No results found.';
    }
    
    let output = `Found ${results.length} results:\n\n`;
    
    results.forEach((result, index) => {
      output += `Result ${index + 1} (${(result.similarity * 100).toFixed(2)}% match):\n`;
      output += `${'-'.repeat(50)}\n`;
      
      // Add metadata if available
      if (result.metadata) {
        const { source, fileName, directory } = result.metadata;
        
        if (source) {
          output += `Source: ${source}\n`;
        }
        
        if (fileName) {
          output += `File: ${fileName}\n`;
        }
        
        if (directory) {
          output += `Directory: ${directory}\n`;
        }
        
        output += '\n';
      }
      
      // Add content
      output += `${result.content}\n\n`;
    });
    
    return output;
  }
}

// ======================
// Main Function
// ======================
async function main() {
  // Parse command line arguments
  const args = process.argv.slice(2).reduce((acc, arg) => {
    const [key, value] = arg.split('=');
    acc[key.replace(/^--/, '')] = value || true;
    return acc;
  }, {});
  
  // Show help if requested
  if (args.help) {
    console.log(`
Usage: node ${path.basename(__filename)} [options]

Options:
  --query=text          Search query
  --limit=number        Maximum number of results (default: ${DEFAULTS.LIMIT})
  --threshold=number    Minimum similarity threshold (default: ${DEFAULTS.SIMILARITY_THRESHOLD})
  --source=name         Filter by source
  --format=json|text    Output format (default: text)
  --help                Show this help message
`);
    process.exit(0);
  }
  
  try {
    // Get environment variables
    const googleApiKey = process.env.GOOGLE_API_KEY;
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;
    
    // Validate required parameters
    if (!googleApiKey) {
      throw new Error('GOOGLE_API_KEY environment variable is required');
    }
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('SUPABASE_URL and SUPABASE_KEY environment variables are required');
    }
    
    if (!args.query) {
      throw new Error('--query parameter is required');
    }
    
    // Initialize the knowledge base search
    const knowledgeBaseSearch = new KnowledgeBaseSearch(googleApiKey, supabaseUrl, supabaseKey);
    
    // Prepare search options
    const searchOptions = {
      limit: parseInt(args.limit || DEFAULTS.LIMIT, 10),
      similarityThreshold: parseFloat(args.threshold || DEFAULTS.SIMILARITY_THRESHOLD),
      metadataFilter: {},
    };
    
    // Add metadata filters if provided
    if (args.source) {
      searchOptions.metadataFilter.source = args.source;
    }
    
    // Search the knowledge base
    console.log(`Searching for: "${args.query}"`);
    const results = await knowledgeBaseSearch.search(args.query, searchOptions);
    
    // Output results
    if (args.format === 'json') {
      console.log(JSON.stringify(results, null, 2));
    } else {
      console.log(knowledgeBaseSearch.formatResults(results));
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run the script if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

// Export for testing and importing
export {
  EmbeddingGenerator,
  SupabaseVectorStore,
  KnowledgeBaseSearch,
};
