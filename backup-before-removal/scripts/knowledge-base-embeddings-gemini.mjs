/**
 * Knowledge Base Embeddings Generator using Gemini 2.0 Flash
 * 
 * This script generates embeddings for documentation chunks using Gemini 2.0 Flash
 * and stores them in Supabase's vector database (pgvector) for efficient retrieval.
 * 
 * Features:
 * - Chunks documentation content into manageable pieces
 * - Generates embeddings using Gemini 2.0 Flash
 * - Stores content, embeddings, and metadata in Supabase
 * - Implements rate limiting to stay within API quotas
 * - Supports batch processing for large documentation sets
 * 
 * Prerequisites:
 * - Node.js 18+
 * - @google/generative-ai package
 * - @supabase/supabase-js package
 * - Google Cloud project with Gemini API enabled
 * - Supabase project with pgvector extension enabled
 * 
 * Environment Variables:
 * - GOOGLE_API_KEY: API key for Google Generative AI
 * - SUPABASE_URL: URL for your Supabase project
 * - SUPABASE_KEY: Service role key for your Supabase project
 * 
 * Usage:
 *   node scripts/knowledge-base-embeddings-gemini.mjs \
 *     --input=./docs/api-reference.md \
 *     --source=vertex-ai-docs \
 *     --chunk-size=1000 \
 *     --chunk-overlap=200
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

// ======================
// Configuration
// ======================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Default configuration
const DEFAULTS = {
  EMBEDDING_MODEL: 'embedding-001',
  EMBEDDING_DIMENSION: 768, // Gemini embedding dimension
  CHUNK_SIZE: 1000,
  CHUNK_OVERLAP: 200,
  BATCH_SIZE: 10,
  RATE_LIMIT_RPM: 100,
  RATE_WINDOW_MS: 60 * 1000, // 1 minute in milliseconds
  MAX_RETRIES: 3,
  RETRY_DELAY_MS: 1000,
  TABLE_NAME: 'knowledge_base',
};

// ======================
// Rate Limiter
// ======================
class RateLimiter {
  constructor(maxRequests, timeWindow) {
    this.queue = [];
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindow;
  }

  // Acquire a slot in the rate limit window
  // @returns {Promise<void>} Resolves when a slot is available
  async acquire() {
    const now = Date.now();
    
    // Remove expired timestamps
    while (this.queue.length > 0 && this.queue[0] < now - this.timeWindow) {
      this.queue.shift();
    }
    
    if (this.queue.length >= this.maxRequests) {
      // Wait until the oldest request expires
      const oldestTimestamp = this.queue[0];
      const waitTime = oldestTimestamp + this.timeWindow - now;
      await new Promise(resolve => setTimeout(resolve, waitTime));
      return this.acquire(); // Try again after waiting
    }
    
    // Add current timestamp to queue
    this.queue.push(now);
  }
}

// ======================
// Retry Helper
// ======================
async function withRetry(fn, options = {}) {
  const {
    maxRetries = DEFAULTS.MAX_RETRIES,
    retryDelay = DEFAULTS.RETRY_DELAY_MS,
    onRetry = null,
  } = options;
  
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      // Check if we should retry
      if (attempt <= maxRetries) {
        const delay = retryDelay * Math.pow(2, attempt - 1); // Exponential backoff
        
        if (onRetry) {
          onRetry(error, attempt, delay);
        }
        
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        break;
      }
    }
  }
  
  throw lastError;
}

// ======================
// Semantic Text Chunking
// ======================

/**
 * Chunks text in a semantically-aware manner, preserving paragraph and sentence boundaries
 * 
 * This function splits text into chunks while trying to maintain semantic coherence:
 * 1. First splits by paragraphs as the primary semantic unit
 * 2. Keeps paragraphs together unless they exceed the maximum chunk size
 * 3. Only splits large paragraphs at sentence boundaries
 * 4. Includes overlap between chunks to maintain context
 * 
 * @param {string} text - The text to chunk
 * @param {number} maxChunkSize - Maximum size of each chunk
 * @param {number} overlapSize - Size of overlap between chunks
 * @returns {Array<string>} Array of text chunks
 */
function chunkText(text, maxChunkSize = 1000, overlapSize = 200) {
  if (!text || text.length === 0) {
    return [];
  }
  
  // Split text into paragraphs first
  const paragraphs = text.split(/\n\s*\n/);
  const chunks = [];
  let currentChunk = '';
  
  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i].trim();
    if (!paragraph) continue;
    
    // If adding this paragraph would exceed the max size, finalize the current chunk
    if (currentChunk && (currentChunk.length + paragraph.length + 2) > maxChunkSize) {
      chunks.push(currentChunk);
      
      // Start new chunk with overlap from the previous chunk
      const overlapText = currentChunk.slice(-Math.min(overlapSize, currentChunk.length));
      currentChunk = overlapText + '\n\n' + paragraph;
    } else {
      // Add paragraph to current chunk
      currentChunk = currentChunk 
        ? currentChunk + '\n\n' + paragraph 
        : paragraph;
    }
  }
  
  // Add the final chunk if it's not empty
  if (currentChunk) {
    chunks.push(currentChunk);
  }
  
  // Handle very large paragraphs that exceed max chunk size
  return chunks.flatMap(chunk => {
    if (chunk.length <= maxChunkSize) {
      return [chunk];
    }
    
    // If a single paragraph is too large, split by sentences
    return splitLargeParagraphBySentences(chunk, maxChunkSize, overlapSize);
  });
}

/**
 * Splits a large paragraph into smaller chunks at sentence boundaries
 * 
 * @param {string} text - The text to split
 * @param {number} maxChunkSize - Maximum size of each chunk
 * @param {number} overlapSize - Size of overlap between chunks
 * @returns {Array<string>} Array of text chunks
 */
function splitLargeParagraphBySentences(text, maxChunkSize, overlapSize) {
  // Split by sentence endings (., !, ?) followed by a space or newline
  const sentenceRegex = /[^.!?]+[.!?](?:\s|$)/g;
  const sentences = text.match(sentenceRegex) || [text];
  
  const chunks = [];
  let currentChunk = '';
  
  for (let i = 0; i < sentences.length; i++) {
    const sentence = sentences[i];
    
    if (currentChunk && (currentChunk.length + sentence.length) > maxChunkSize) {
      chunks.push(currentChunk);
      
      // Start new chunk with overlap
      const overlapText = currentChunk.slice(-Math.min(overlapSize, currentChunk.length));
      currentChunk = overlapText + sentence;
    } else {
      currentChunk += sentence;
    }
  }
  
  if (currentChunk) {
    chunks.push(currentChunk);
  }
  
  // If we still have chunks that are too large (rare but possible with very long sentences)
  // split them at word boundaries as a last resort
  return chunks.flatMap(chunk => {
    if (chunk.length <= maxChunkSize) {
      return [chunk];
    }
    
    return splitAtWordBoundaries(chunk, maxChunkSize, overlapSize);
  });
}

/**
 * Splits text at word boundaries as a last resort for very long sentences
 * 
 * @param {string} text - The text to split
 * @param {number} maxChunkSize - Maximum size of each chunk
 * @param {number} overlapSize - Size of overlap between chunks
 * @returns {Array<string>} Array of text chunks
 */
function splitAtWordBoundaries(text, maxChunkSize, overlapSize) {
  const words = text.split(/\s+/);
  const chunks = [];
  let currentChunk = '';
  
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const separator = currentChunk ? ' ' : '';
    
    if (currentChunk && (currentChunk.length + separator.length + word.length) > maxChunkSize) {
      chunks.push(currentChunk);
      
      // Start new chunk with overlap
      const overlapText = getOverlapByWords(currentChunk, overlapSize);
      currentChunk = overlapText + ' ' + word;
    } else {
      currentChunk = currentChunk 
        ? currentChunk + separator + word 
        : word;
    }
  }
  
  if (currentChunk) {
    chunks.push(currentChunk);
  }
  
  return chunks;
}

/**
 * Gets overlap text based on word boundaries
 * 
 * @param {string} text - The text to get overlap from
 * @param {number} overlapSize - Approximate size of overlap
 * @returns {string} Overlap text
 */
function getOverlapByWords(text, overlapSize) {
  if (text.length <= overlapSize) {
    return text;
  }
  
  const startIndex = Math.max(0, text.length - overlapSize);
  let overlapText = text.substring(startIndex);
  
  // Find the first word boundary
  const firstWordMatch = overlapText.match(/^\s*\S+/);
  if (firstWordMatch && firstWordMatch.index > 0) {
    overlapText = overlapText.substring(firstWordMatch.index);
  }
  
  return overlapText;
}

// ======================
// Embedding Generator
// ======================
class EmbeddingGenerator {
  constructor(apiKey) {
    this.validateApiKey(apiKey);
    this.rateLimiter = new RateLimiter(DEFAULTS.RATE_LIMIT_RPM, DEFAULTS.RATE_WINDOW_MS);
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
    await this.rateLimiter.acquire();
    
    try {
      return await withRetry(
        async () => {
          const result = await this.embeddingModel.embedContent(text);
          return result.embedding.values;
        },
        {
          onRetry: (error, attempt, delay) => {
            console.warn(`Embedding generation failed (attempt ${attempt}), retrying in ${delay}ms:`, error.message);
          },
        }
      );
    } catch (error) {
      console.error('Failed to generate embedding:', error.message);
      throw new Error(`Failed to generate embedding: ${error.message}`);
    }
  }
  
  // Generate embeddings for a batch of texts
  // @param {Array<string>} texts - Array of texts to generate embeddings for
  // @returns {Promise<Array<number[]>>} Array of embedding vectors
  async generateBatchEmbeddings(texts) {
    const embeddings = [];
    
    for (const text of texts) {
      const embedding = await this.generateEmbedding(text);
      embeddings.push(embedding);
    }
    
    return embeddings;
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
  
  // Ensure the knowledge base table exists with pgvector support
  // @returns {Promise<void>}
  async ensureTableExists() {
    try {
      // Check if pgvector extension is enabled
      const { data: extensions, error: extensionError } = await this.client.rpc('pg_extension_exists', { extension_name: 'vector' });
      
      if (extensionError) {
        throw new Error(`Failed to check pgvector extension: ${extensionError.message}`);
      }
      
      if (!extensions) {
        console.warn('pgvector extension is not enabled. Attempting to enable it...');
        
        // Try to enable pgvector extension
        const { error: enableError } = await this.client.rpc('create_pg_extension', { extension_name: 'vector' });
        
        if (enableError) {
          throw new Error(`Failed to enable pgvector extension: ${enableError.message}`);
        }
        
        console.log('Successfully enabled pgvector extension');
      }
      
      // Create the knowledge base table if it doesn't exist
      const { error: tableError } = await this.client.rpc('create_knowledge_base_table', {
        table_name: this.tableName,
        embedding_dimension: DEFAULTS.EMBEDDING_DIMENSION,
      });
      
      if (tableError) {
        // If the RPC doesn't exist, create the table directly
        const { error: createError } = await this.client.query(`
          CREATE TABLE IF NOT EXISTS ${this.tableName} (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            content TEXT NOT NULL,
            metadata JSONB,
            embedding VECTOR(${DEFAULTS.EMBEDDING_DIMENSION}),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
          
          -- Create a vector index if it doesn't exist
          DO $$
          BEGIN
            IF NOT EXISTS (
              SELECT 1
              FROM pg_indexes
              WHERE tablename = '${this.tableName}'
                AND indexname = '${this.tableName}_embedding_idx'
            ) THEN
              CREATE INDEX ${this.tableName}_embedding_idx
                ON ${this.tableName} USING ivfflat (embedding vector_cosine_ops)
                WITH (lists = 100);
            END IF;
          END
          $$;
        `);
        
        if (createError) {
          throw new Error(`Failed to create knowledge base table: ${createError.message}`);
        }
      }
      
      console.log(`Ensured knowledge base table exists: ${this.tableName}`);
    } catch (error) {
      console.error('Failed to ensure table exists:', error.message);
      throw new Error(`Failed to ensure table exists: ${error.message}`);
    }
  }
  
  // Store a document with its embedding in the vector store
  // @param {string} content - Document content
  // @param {number[]} embedding - Vector embedding
  // @param {Object} metadata - Additional metadata
  // @returns {Promise<string>} Document ID
  async storeDocument(content, embedding, metadata = {}) {
    try {
      // Generate a deterministic ID based on content hash
      const contentHash = createHash('sha256').update(content).digest('hex');
      const id = metadata.id || contentHash;
      
      // Insert or update the document
      const { data, error } = await this.client
        .from(this.tableName)
        .upsert({
          id,
          content,
          metadata,
          embedding,
        }, {
          onConflict: 'id',
          returning: 'id',
        });
      
      if (error) {
        throw new Error(`Failed to store document: ${error.message}`);
      }
      
      return data[0].id;
    } catch (error) {
      console.error('Failed to store document:', error.message);
      throw new Error(`Failed to store document: ${error.message}`);
    }
  }
  
  // Store a batch of documents with their embeddings
  // @param {Array<{content: string, embedding: number[], metadata: Object}>} documents
  // @returns {Promise<Array<string>>} Document IDs
  async storeBatchDocuments(documents) {
    const ids = [];
    
    for (const doc of documents) {
      const id = await this.storeDocument(doc.content, doc.embedding, doc.metadata);
      ids.push(id);
    }
    
    return ids;
  }
  
  // Search for similar documents
  // @param {number[]} queryEmbedding - Query embedding vector
  // @param {Object} options - Search options
  // @param {number} [options.limit=5] - Maximum number of results
  // @param {number} [options.similarityThreshold=0.7] - Minimum similarity score
  // @returns {Promise<Array<{id: string, content: string, metadata: Object, similarity: number}>>}
  async searchSimilarDocuments(queryEmbedding, options = {}) {
    const {
      limit = 5,
      similarityThreshold = 0.7,
      metadataFilter = {},
    } = options;
    
    try {
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
// Knowledge Base Manager
// ======================
class KnowledgeBaseManager {
  constructor(googleApiKey, supabaseUrl, supabaseKey) {
    this.embeddingGenerator = new EmbeddingGenerator(googleApiKey);
    this.vectorStore = new SupabaseVectorStore(supabaseUrl, supabaseKey);
  }
  
  // Process a document and add it to the knowledge base
  // @param {string} content - Document content
  // @param {Object} metadata - Document metadata
  // @param {Object} options - Processing options
  // @returns {Promise<Array<string>>} Document IDs
  async processDocument(content, metadata = {}, options = {}) {
    const {
      chunkSize = DEFAULTS.CHUNK_SIZE,
      chunkOverlap = DEFAULTS.CHUNK_OVERLAP,
      batchSize = DEFAULTS.BATCH_SIZE,
    } = options;
    
    try {
      // Ensure the knowledge base table exists
      await this.vectorStore.ensureTableExists();
      
      // Chunk the document
      const chunks = chunkText(content, chunkSize, chunkOverlap);
      console.log(`Split document into ${chunks.length} chunks`);
      
      // Process chunks in batches
      const documentIds = [];
      
      for (let i = 0; i < chunks.length; i += batchSize) {
        const batchChunks = chunks.slice(i, i + batchSize);
        console.log(`Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(chunks.length / batchSize)}`);
        
        // Generate embeddings for the batch
        const embeddings = await this.embeddingGenerator.generateBatchEmbeddings(batchChunks);
        
        // Prepare documents with embeddings
        const documents = batchChunks.map((chunk, index) => ({
          content: chunk,
          embedding: embeddings[index],
          metadata: {
            ...metadata,
            chunkIndex: i + index,
            totalChunks: chunks.length,
          },
        }));
        
        // Store documents in the vector store
        const batchIds = await this.vectorStore.storeBatchDocuments(documents);
        documentIds.push(...batchIds);
      }
      
      console.log(`Successfully processed document with ${chunks.length} chunks`);
      return documentIds;
    } catch (error) {
      console.error('Failed to process document:', error.message);
      throw new Error(`Failed to process document: ${error.message}`);
    }
  }
  
  // Process a file and add it to the knowledge base
  // @param {string} filePath - Path to the file
  // @param {Object} metadata - Additional metadata
  // @param {Object} options - Processing options
  // @returns {Promise<Array<string>>} Document IDs
  async processFile(filePath, metadata = {}, options = {}) {
    try {
      // Read the file
      const content = await fs.readFile(filePath, 'utf8');
      
      // Add file metadata
      const fileMetadata = {
        source: 'file',
        filePath,
        fileName: path.basename(filePath),
        fileExt: path.extname(filePath),
        ...metadata,
      };
      
      // Process the document
      return await this.processDocument(content, fileMetadata, options);
    } catch (error) {
      console.error(`Failed to process file ${filePath}:`, error.message);
      throw new Error(`Failed to process file ${filePath}: ${error.message}`);
    }
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
  --input=path          Path to the input file or directory
  --source=name         Source name for metadata (default: file name)
  --chunk-size=number   Size of text chunks (default: ${DEFAULTS.CHUNK_SIZE})
  --chunk-overlap=number Overlap between chunks (default: ${DEFAULTS.CHUNK_OVERLAP})
  --batch-size=number   Batch size for processing (default: ${DEFAULTS.BATCH_SIZE})
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
    
    if (!args.input) {
      throw new Error('--input parameter is required');
    }
    
    // Initialize the knowledge base manager
    const knowledgeBaseManager = new KnowledgeBaseManager(googleApiKey, supabaseUrl, supabaseKey);
    
    // Process the input
    const inputPath = args.input;
    const source = args.source || path.basename(inputPath, path.extname(inputPath));
    
    // Check if the input is a file or directory
    const stats = await fs.stat(inputPath);
    
    if (stats.isFile()) {
      // Process a single file
      console.log(`Processing file: ${inputPath}`);
      
      const documentIds = await knowledgeBaseManager.processFile(inputPath, {
        source,
      }, {
        chunkSize: parseInt(args['chunk-size'] || DEFAULTS.CHUNK_SIZE, 10),
        chunkOverlap: parseInt(args['chunk-overlap'] || DEFAULTS.CHUNK_OVERLAP, 10),
        batchSize: parseInt(args['batch-size'] || DEFAULTS.BATCH_SIZE, 10),
      });
      
      console.log(`Successfully processed file with ${documentIds.length} chunks`);
    } else if (stats.isDirectory()) {
      // Process all files in the directory
      console.log(`Processing directory: ${inputPath}`);
      
      const files = await fs.readdir(inputPath);
      let processedFiles = 0;
      
      for (const file of files) {
        const filePath = path.join(inputPath, file);
        const fileStats = await fs.stat(filePath);
        
        if (fileStats.isFile()) {
          console.log(`Processing file ${processedFiles + 1}/${files.length}: ${file}`);
          
          try {
            await knowledgeBaseManager.processFile(filePath, {
              source,
              directory: path.basename(inputPath),
            }, {
              chunkSize: parseInt(args['chunk-size'] || DEFAULTS.CHUNK_SIZE, 10),
              chunkOverlap: parseInt(args['chunk-overlap'] || DEFAULTS.CHUNK_OVERLAP, 10),
              batchSize: parseInt(args['batch-size'] || DEFAULTS.BATCH_SIZE, 10),
            });
            
            processedFiles++;
          } catch (error) {
            console.error(`Failed to process file ${file}:`, error.message);
          }
        }
      }
      
      console.log(`Successfully processed ${processedFiles}/${files.length} files`);
    } else {
      throw new Error(`Invalid input path: ${inputPath}`);
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
  KnowledgeBaseManager,
  chunkText,
  RateLimiter,
  withRetry,
};
