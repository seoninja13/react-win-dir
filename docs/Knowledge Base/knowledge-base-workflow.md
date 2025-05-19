# Knowledge Base Workflow

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Knowledge Base](./index.md) > Knowledge Base Workflow

## Table of Contents

1. [Overview](#overview)
2. [End-to-End Process](#end-to-end-process)
3. [Document Processing Workflow](#document-processing-workflow)
4. [Search and Retrieval Workflow](#search-and-retrieval-workflow)
5. [Component Interactions](#component-interactions)
6. [Configuration Management](#configuration-management)
7. [Workflow Optimization](#workflow-optimization)
8. [Best Practices](#best-practices)

## Overview

The knowledge base system follows a logical workflow that connects multiple components to create a seamless process from document ingestion to search and retrieval. This document explains the complete workflow and how each component interacts with others to create a cohesive system.

### Workflow Components

1. **Document Processing**: Ingestion and preparation of documents
2. **Semantic Chunking**: Breaking documents into semantically meaningful chunks
3. **Embedding Generation**: Converting chunks into vector embeddings
4. **Vector Storage**: Storing embeddings and metadata in the database
5. **Search and Retrieval**: Finding and retrieving relevant information

## End-to-End Process

The complete knowledge base workflow follows these sequential steps:

1. **Document Ingestion**
   - Raw documents are loaded from files or directories
   - Documents are validated and normalized

2. **Semantic Chunking**
   - Documents are split into semantically meaningful chunks
   - Chunks are processed in a hierarchical manner (paragraphs → sentences → words)
   - Overlaps are added between chunks to maintain context

3. **Embedding Generation**
   - Each chunk is converted to a vector embedding using Gemini 2.0 Flash
   - Embeddings capture the semantic meaning of the chunks

4. **Vector Storage**
   - Embeddings are stored in Supabase using pgvector
   - Metadata is attached to each embedding for filtering and context
   - Vector indexes are created for efficient similarity search

5. **Search and Retrieval**
   - User queries are converted to embeddings
   - Similar vectors are found using cosine similarity
   - Results are ranked by similarity score
   - Relevant chunks are returned to the user

## Document Processing Workflow

The document processing workflow is the first stage in the knowledge base pipeline:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Load Document  │────▶│  Validate &     │────▶│  Extract        │
│  from Source    │     │  Normalize      │     │  Metadata       │
│                 │     │                 │     │                 │
└────────┬────────┘     └────────┬────────┘     └────────┬────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Semantic       │◀────│  Pre-process    │◀────│  Determine      │
│  Chunking       │     │  Text           │     │  Chunk Strategy │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Key Interactions

1. **Document Loading**
   - Supports multiple file formats (Markdown, text, etc.)
   - Handles directories recursively
   - Extracts file metadata (name, path, extension)

2. **Text Pre-processing**
   - Normalizes whitespace and formatting
   - Removes irrelevant content
   - Prepares text for chunking

3. **Chunk Strategy Determination**
   - Analyzes document structure and content
   - Determines optimal chunk size and overlap
   - Selects appropriate chunking approach

## Semantic Chunking Workflow

The semantic chunking process is a critical part of the knowledge base workflow:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Split into     │────▶│  Process        │────▶│  Handle Large   │
│  Paragraphs     │     │  Paragraphs     │     │  Paragraphs     │
│                 │     │                 │     │                 │
└────────┬────────┘     └────────┬────────┘     └────────┬────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Split by       │◀────│  Add Chunk      │◀────│  Create Final   │
│  Sentences      │     │  Overlaps       │     │  Chunks         │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Key Interactions

1. **Paragraph Splitting**
   - Identifies paragraph boundaries
   - Preserves paragraph structure
   - Handles various paragraph formats

2. **Paragraph Processing**
   - Groups paragraphs into chunks
   - Ensures chunks stay within size limits
   - Maintains semantic coherence

3. **Large Paragraph Handling**
   - Identifies paragraphs that exceed size limits
   - Splits large paragraphs at sentence boundaries
   - Maintains sentence integrity

4. **Overlap Management**
   - Adds overlaps between chunks
   - Ensures overlaps start at word boundaries
   - Maintains context between chunks

## Embedding and Storage Workflow

After chunking, the workflow continues with embedding generation and storage:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Process Text   │────▶│  Generate       │────▶│  Apply Rate     │
│  Chunks         │     │  Embeddings     │     │  Limiting       │
│                 │     │                 │     │                 │
└────────┬────────┘     └────────┬────────┘     └────────┬────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Store in       │◀────│  Create Vector  │◀────│  Attach         │
│  Database       │     │  Indexes        │     │  Metadata       │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Key Interactions

1. **Chunk Processing**
   - Prepares chunks for embedding generation
   - Handles batch processing
   - Manages chunk metadata

2. **Embedding Generation**
   - Converts chunks to vector embeddings
   - Applies rate limiting to API calls
   - Handles retries and error cases

3. **Metadata Attachment**
   - Attaches source information
   - Adds chunk position and context
   - Includes file and directory information

4. **Database Storage**
   - Stores chunks, embeddings, and metadata
   - Creates deterministic IDs for deduplication
   - Handles upsert operations

## Search and Retrieval Workflow

The search and retrieval process completes the knowledge base workflow:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Process User   │────▶│  Generate Query │────▶│  Apply Metadata │
│  Query          │     │  Embedding      │     │  Filters        │
│                 │     │                 │     │                 │
└────────┬────────┘     └────────┬────────┘     └────────┬────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Format &       │◀────│  Filter by      │◀────│  Find Similar   │
│  Return Results │     │  Threshold      │     │  Vectors        │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Key Interactions

1. **Query Processing**
   - Normalizes user query
   - Extracts metadata filters
   - Prepares query for embedding

2. **Query Embedding**
   - Converts query to vector embedding
   - Uses same model as document embeddings
   - Ensures consistency with stored vectors

3. **Vector Similarity Search**
   - Finds vectors similar to query vector
   - Applies metadata filters
   - Ranks results by similarity

4. **Result Processing**
   - Filters by similarity threshold
   - Formats results for presentation
   - Includes relevant metadata

## Component Interactions

The knowledge base components interact in a logical sequence:

### 1. Knowledge Base Manager → Semantic Chunker

The `KnowledgeBaseManager` class calls the semantic chunking functions to break documents into chunks:

```javascript
// Process a document and add it to the knowledge base
async processDocument(content, metadata = {}, options = {}) {
  // ...
  
  // Chunk the document using semantic chunking
  const chunks = chunkText(content, chunkSize, chunkOverlap);
  
  // ...
}
```

### 2. Semantic Chunker → Embedding Generator

The chunked text is passed to the `EmbeddingGenerator` for vector conversion:

```javascript
// Generate embeddings for the batch
const embeddings = await this.embeddingGenerator.generateBatchEmbeddings(batchChunks);
```

### 3. Embedding Generator → Vector Store

The embeddings and chunks are passed to the `SupabaseVectorStore` for storage:

```javascript
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
```

### 4. Knowledge Base Search → Vector Store

The `KnowledgeBaseSearch` class interacts with both the `EmbeddingGenerator` and `SupabaseVectorStore`:

```javascript
// Search the knowledge base
async search(query, options = {}) {
  // Generate embedding for the query
  const queryEmbedding = await this.embeddingGenerator.generateEmbedding(query);
  
  // Search for similar documents
  return await this.vectorStore.searchSimilarDocuments(queryEmbedding, options);
}
```

## Configuration Management

The knowledge base workflow is configurable through various parameters:

### Chunking Configuration

```javascript
const DEFAULTS = {
  CHUNK_SIZE: 1000,
  CHUNK_OVERLAP: 200,
  // ...
};
```

### Embedding Configuration

```javascript
const DEFAULTS = {
  EMBEDDING_MODEL: 'embedding-001',
  EMBEDDING_DIMENSION: 768,
  // ...
};
```

### Storage Configuration

```javascript
const DEFAULTS = {
  TABLE_NAME: 'knowledge_base',
  // ...
};
```

### Search Configuration

```javascript
const DEFAULTS = {
  LIMIT: 5,
  SIMILARITY_THRESHOLD: 0.7,
  // ...
};
```

## Workflow Optimization

The knowledge base workflow can be optimized in several ways:

### Batch Processing

Process documents in batches to improve efficiency:

```javascript
// Process chunks in batches
for (let i = 0; i < chunks.length; i += batchSize) {
  const batchChunks = chunks.slice(i, i + batchSize);
  // Process batch...
}
```

### Parallel Processing

Process multiple documents in parallel (with rate limiting):

```javascript
// Process multiple documents in parallel
await Promise.all(
  documents.map(doc => processDocument(doc, options))
);
```

### Caching

Cache embeddings for frequently accessed content:

```javascript
// Check cache before generating embedding
const cacheKey = createHash('sha256').update(text).digest('hex');
if (embeddingCache.has(cacheKey)) {
  return embeddingCache.get(cacheKey);
}

// Generate and cache embedding
const embedding = await generateEmbedding(text);
embeddingCache.set(cacheKey, embedding);
return embedding;
```

## Best Practices

### Workflow Integration

1. **Document Preparation**
   - Normalize document formats before processing
   - Remove irrelevant content (headers, footers, etc.)
   - Organize documents logically by topic or domain

2. **Chunking Strategy**
   - Adjust chunk size based on content type
   - Use larger chunks for narrative content
   - Use smaller chunks for technical documentation

3. **Embedding Management**
   - Monitor API usage and costs
   - Implement caching for frequently accessed content
   - Batch process embeddings to optimize API calls

4. **Database Management**
   - Regularly reindex for optimal performance
   - Monitor database size and performance
   - Implement backup and recovery strategies

5. **Search Optimization**
   - Use metadata filters to narrow search scope
   - Adjust similarity threshold based on use case
   - Implement caching for frequent queries

## Last Updated

May 16, 2025
