#!/usr/bin/env node

/**
 * Knowledge Base Ingestion Script
 * 
 * This script automates the process of retrieving content from Brave search or other sources,
 * chunking it using our semantic chunking process, generating embeddings using Gemini 2.0 Flash,
 * and storing the chunks and embeddings in the Supabase vector database.
 * 
 * Usage:
 *   node knowledge-base-ingestion.mjs --source brave --query "windows installation guide"
 *   node knowledge-base-ingestion.mjs --source url --url "https://example.com/documentation"
 *   node knowledge-base-ingestion.mjs --source file --path "./docs/guide.md"
 */

import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Command } from 'commander';
import fs from 'fs/promises';
import path from 'path';
import axios from 'axios';
import cheerio from 'cheerio';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { rateLimit } from './utils/rate-limiter.mjs';

// Load environment variables
dotenv.config();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Constants
const EMBEDDING_MODEL = 'embedding-001';
const CHUNK_SIZE = 1000;
const CHUNK_OVERLAP = 200;
const BATCH_SIZE = 10;
const TABLE_NAME = 'knowledge_base';
const RATE_LIMIT_REQUESTS = 10;
const RATE_LIMIT_PERIOD = 60 * 1000; // 60 seconds

// Rate limiter for API calls
const limiter = rateLimit({
  maxRequests: RATE_LIMIT_REQUESTS,
  periodMs: RATE_LIMIT_PERIOD,
});

// Command line interface setup
const program = new Command();

program
  .name('knowledge-base-ingestion')
  .description('Ingest content into the knowledge base from various sources')
  .version('1.0.0');

program
  .option('-s, --source <source>', 'Source type: brave, url, or file')
  .option('-q, --query <query>', 'Search query for Brave search')
  .option('-u, --url <url>', 'URL to fetch content from')
  .option('-p, --path <path>', 'File path to read content from')
  .option('-t, --tag <tag>', 'Tag to associate with the ingested content')
  .option('-c, --chunk-size <size>', 'Size of chunks in characters', parseInt)
  .option('-o, --chunk-overlap <overlap>', 'Overlap between chunks in characters', parseInt)
  .parse(process.argv);

const options = program.opts();

/**
 * Main function to orchestrate the ingestion process
 */
async function main() {
  try {
    // Validate options
    if (!options.source) {
      console.error('Error: Source type is required (--source brave|url|file)');
      process.exit(1);
    }

    // Set chunk size and overlap
    const chunkSize = options.chunkSize || CHUNK_SIZE;
    const chunkOverlap = options.chunkOverlap || CHUNK_OVERLAP;

    // Retrieve content based on source type
    let content = '';
    let metadata = {};
    
    console.log(`Retrieving content from ${options.source}...`);
    
    switch (options.source) {
      case 'brave':
        if (!options.query) {
          console.error('Error: Query is required for Brave search (--query)');
          process.exit(1);
        }
        const searchResults = await searchBrave(options.query);
        content = await processSearchResults(searchResults);
        metadata = { 
          source: 'brave_search', 
          query: options.query,
          retrievalDate: new Date().toISOString(),
          tag: options.tag || 'brave_search'
        };
        break;
        
      case 'url':
        if (!options.url) {
          console.error('Error: URL is required (--url)');
          process.exit(1);
        }
        content = await fetchUrlContent(options.url);
        metadata = { 
          source: 'url', 
          url: options.url,
          retrievalDate: new Date().toISOString(),
          tag: options.tag || 'web_content'
        };
        break;
        
      case 'file':
        if (!options.path) {
          console.error('Error: File path is required (--path)');
          process.exit(1);
        }
        content = await readFile(options.path);
        metadata = { 
          source: 'file', 
          filePath: options.path,
          fileName: path.basename(options.path),
          fileExt: path.extname(options.path),
          retrievalDate: new Date().toISOString(),
          tag: options.tag || 'local_file'
        };
        break;
        
      default:
        console.error(`Error: Unknown source type: ${options.source}`);
        process.exit(1);
    }

    if (!content) {
      console.error('Error: No content retrieved');
      process.exit(1);
    }

    console.log(`Content retrieved (${content.length} characters)`);
    
    // Chunk the content
    console.log('Chunking content...');
    const chunks = chunkText(content, chunkSize, chunkOverlap);
    console.log(`Created ${chunks.length} chunks`);
    
    // Process chunks in batches
    console.log('Processing chunks and generating embeddings...');
    for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
      const batchChunks = chunks.slice(i, i + BATCH_SIZE);
      
      // Generate embeddings for the batch
      const embeddings = await generateBatchEmbeddings(batchChunks);
      
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
      
      // Store documents in Supabase
      await storeDocuments(documents);
      
      console.log(`Processed batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(chunks.length / BATCH_SIZE)}`);
    }
    
    console.log('Content successfully ingested into the knowledge base');
    
  } catch (error) {
    console.error('Error in knowledge base ingestion:', error);
    process.exit(1);
  }
}

/**
 * Search Brave for content
 * @param {string} query - Search query
 * @returns {Array} - Search results
 */
async function searchBrave(query) {
  try {
    // This is a placeholder. In a real implementation, you would use the Brave Search API
    // or another search API to get results.
    console.log(`Searching Brave for: ${query}`);
    
    // For now, we'll simulate by returning an empty array
    // In a real implementation, this would return search results from the Brave API
    return [];
    
  } catch (error) {
    console.error('Error searching Brave:', error);
    throw error;
  }
}

/**
 * Process search results to extract content
 * @param {Array} results - Search results
 * @returns {string} - Extracted content
 */
async function processSearchResults(results) {
  try {
    // This is a placeholder. In a real implementation, you would process the search results
    // to extract content from each result.
    console.log(`Processing ${results.length} search results`);
    
    // For now, we'll return a placeholder string
    // In a real implementation, this would extract and combine content from search results
    return "This is placeholder content from search results.";
    
  } catch (error) {
    console.error('Error processing search results:', error);
    throw error;
  }
}

/**
 * Fetch content from a URL
 * @param {string} url - URL to fetch content from
 * @returns {string} - Fetched content
 */
async function fetchUrlContent(url) {
  try {
    console.log(`Fetching content from URL: ${url}`);
    const response = await axios.get(url);
    const html = response.data;
    
    // Use cheerio to parse HTML and extract text content
    const $ = cheerio.load(html);
    
    // Remove script and style elements
    $('script, style').remove();
    
    // Get text content
    const text = $('body').text()
      .replace(/\s+/g, ' ')  // Replace multiple whitespace with single space
      .trim();
      
    return text;
    
  } catch (error) {
    console.error('Error fetching URL content:', error);
    throw error;
  }
}

/**
 * Read content from a file
 * @param {string} filePath - Path to the file
 * @returns {string} - File content
 */
async function readFile(filePath) {
  try {
    console.log(`Reading file: ${filePath}`);
    const content = await fs.readFile(filePath, 'utf8');
    return content;
    
  } catch (error) {
    console.error('Error reading file:', error);
    throw error;
  }
}

/**
 * Chunk text using semantic chunking
 * @param {string} text - Text to chunk
 * @param {number} maxChunkSize - Maximum chunk size
 * @param {number} overlapSize - Overlap size between chunks
 * @returns {Array} - Array of chunks
 */
function chunkText(text, maxChunkSize = 1000, overlapSize = 200) {
  // If text is shorter than max chunk size, return it as a single chunk
  if (text.length <= maxChunkSize) {
    return [text];
  }

  const chunks = [];
  
  // Split text into paragraphs (double newlines)
  const paragraphs = text.split(/\n\s*\n/);
  
  let currentChunk = '';
  
  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i].trim();
    
    // Skip empty paragraphs
    if (!paragraph) continue;
    
    // If adding this paragraph would exceed the max chunk size
    if (currentChunk.length + paragraph.length + 2 > maxChunkSize) {
      // If the current chunk is not empty, add it to chunks
      if (currentChunk.length > 0) {
        chunks.push(currentChunk);
      }
      
      // If the paragraph itself is longer than max chunk size, split it by sentences
      if (paragraph.length > maxChunkSize) {
        const sentenceChunks = chunkBySentences(paragraph, maxChunkSize, overlapSize);
        chunks.push(...sentenceChunks);
        currentChunk = '';
      } else {
        // Start a new chunk with this paragraph
        currentChunk = paragraph;
      }
    } else {
      // Add paragraph to current chunk
      if (currentChunk.length > 0) {
        currentChunk += '\n\n';
      }
      currentChunk += paragraph;
    }
  }
  
  // Add the last chunk if not empty
  if (currentChunk.length > 0) {
    chunks.push(currentChunk);
  }
  
  // Add overlaps between chunks
  return addChunkOverlaps(chunks, overlapSize);
}

/**
 * Chunk text by sentences
 * @param {string} text - Text to chunk
 * @param {number} maxChunkSize - Maximum chunk size
 * @param {number} overlapSize - Overlap size between chunks
 * @returns {Array} - Array of chunks
 */
function chunkBySentences(text, maxChunkSize, overlapSize) {
  // Split text into sentences (period, question mark, or exclamation point followed by space)
  const sentences = text.match(/[^.!?]+[.!?]+\s*/g) || [text];
  
  const chunks = [];
  let currentChunk = '';
  
  for (let i = 0; i < sentences.length; i++) {
    const sentence = sentences[i].trim();
    
    // Skip empty sentences
    if (!sentence) continue;
    
    // If adding this sentence would exceed the max chunk size
    if (currentChunk.length + sentence.length + 1 > maxChunkSize) {
      // If the current chunk is not empty, add it to chunks
      if (currentChunk.length > 0) {
        chunks.push(currentChunk);
      }
      
      // If the sentence itself is longer than max chunk size, split it by words
      if (sentence.length > maxChunkSize) {
        const wordChunks = chunkByWords(sentence, maxChunkSize, overlapSize);
        chunks.push(...wordChunks);
        currentChunk = '';
      } else {
        // Start a new chunk with this sentence
        currentChunk = sentence;
      }
    } else {
      // Add sentence to current chunk
      if (currentChunk.length > 0) {
        currentChunk += ' ';
      }
      currentChunk += sentence;
    }
  }
  
  // Add the last chunk if not empty
  if (currentChunk.length > 0) {
    chunks.push(currentChunk);
  }
  
  return chunks;
}

/**
 * Chunk text by words
 * @param {string} text - Text to chunk
 * @param {number} maxChunkSize - Maximum chunk size
 * @param {number} overlapSize - Overlap size between chunks
 * @returns {Array} - Array of chunks
 */
function chunkByWords(text, maxChunkSize, overlapSize) {
  // Split text into words
  const words = text.split(/\s+/);
  
  const chunks = [];
  let currentChunk = '';
  
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    
    // If adding this word would exceed the max chunk size
    if (currentChunk.length + word.length + 1 > maxChunkSize) {
      // If the current chunk is not empty, add it to chunks
      if (currentChunk.length > 0) {
        chunks.push(currentChunk);
      }
      
      // Start a new chunk with this word
      currentChunk = word;
    } else {
      // Add word to current chunk
      if (currentChunk.length > 0) {
        currentChunk += ' ';
      }
      currentChunk += word;
    }
  }
  
  // Add the last chunk if not empty
  if (currentChunk.length > 0) {
    chunks.push(currentChunk);
  }
  
  return chunks;
}

/**
 * Add overlaps between chunks
 * @param {Array} chunks - Array of chunks
 * @param {number} overlapSize - Overlap size between chunks
 * @returns {Array} - Array of chunks with overlaps
 */
function addChunkOverlaps(chunks, overlapSize) {
  if (chunks.length <= 1) {
    return chunks;
  }
  
  const chunksWithOverlap = [chunks[0]];
  
  for (let i = 1; i < chunks.length; i++) {
    const previousChunk = chunks[i - 1];
    const currentChunk = chunks[i];
    
    // Get overlap from the end of the previous chunk
    let overlap = '';
    if (previousChunk.length > overlapSize) {
      overlap = previousChunk.substring(previousChunk.length - overlapSize);
      
      // Try to start the overlap at a word boundary
      const firstSpaceIndex = overlap.indexOf(' ');
      if (firstSpaceIndex !== -1) {
        overlap = overlap.substring(firstSpaceIndex + 1);
      }
    }
    
    // Add the overlap to the beginning of the current chunk
    const chunkWithOverlap = overlap ? `${overlap} ${currentChunk}` : currentChunk;
    chunksWithOverlap.push(chunkWithOverlap);
  }
  
  return chunksWithOverlap;
}

/**
 * Generate embeddings for a batch of chunks
 * @param {Array} chunks - Array of text chunks
 * @returns {Array} - Array of embeddings
 */
async function generateBatchEmbeddings(chunks) {
  const embeddings = [];
  
  for (const chunk of chunks) {
    try {
      // Apply rate limiting
      await limiter();
      
      // Generate embedding
      const embeddingModel = genAI.getGenerativeModel({ model: EMBEDDING_MODEL });
      const result = await embeddingModel.embedContent(chunk);
      const embedding = result.embedding.values;
      
      embeddings.push(embedding);
      
    } catch (error) {
      console.error('Error generating embedding:', error);
      // Push a placeholder embedding to maintain array indices
      embeddings.push([]);
    }
  }
  
  return embeddings;
}

/**
 * Store documents in Supabase
 * @param {Array} documents - Array of documents with content, embedding, and metadata
 */
async function storeDocuments(documents) {
  try {
    // Filter out documents with empty embeddings
    const validDocuments = documents.filter(doc => doc.embedding && doc.embedding.length > 0);
    
    if (validDocuments.length === 0) {
      console.warn('No valid documents to store');
      return;
    }
    
    // Prepare data for insertion
    const data = validDocuments.map(doc => ({
      content: doc.content,
      embedding: doc.embedding,
      metadata: doc.metadata,
    }));
    
    // Insert data into Supabase
    const { data: insertedData, error } = await supabase
      .from(TABLE_NAME)
      .insert(data);
    
    if (error) {
      throw error;
    }
    
    console.log(`Stored ${validDocuments.length} documents in Supabase`);
    
  } catch (error) {
    console.error('Error storing documents in Supabase:', error);
    throw error;
  }
}

// Run the main function
main();
