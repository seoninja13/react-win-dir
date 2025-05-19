# Vector Storage with Supabase pgvector

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Knowledge Base](./index.md) > Vector Storage

## Table of Contents

1. [Overview](#overview)
2. [Supabase pgvector](#supabase-pgvector)
3. [Database Schema](#database-schema)
4. [Implementation Details](#implementation-details)
5. [Vector Indexing](#vector-indexing)
6. [Query Optimization](#query-optimization)
7. [Performance Considerations](#performance-considerations)
8. [Scaling Strategies](#scaling-strategies)
9. [Best Practices](#best-practices)
10. [Troubleshooting](#troubleshooting)

## Overview

Vector storage is a critical component of the knowledge base system, providing efficient storage and retrieval of vector embeddings. This document explains how the system uses Supabase's pgvector extension to store and query vector embeddings for semantic search.

### What Is Vector Storage?

Vector storage is a specialized database capability that allows for efficient storage and similarity search of high-dimensional vectors. In our knowledge base system, these vectors represent the semantic meaning of text chunks, enabling semantic search based on meaning rather than keywords.

### Why Supabase pgvector?

Supabase pgvector offers several advantages for vector storage:

- **PostgreSQL Integration**: Built on PostgreSQL, a robust and mature database
- **Vector Indexing**: Efficient indexing for similarity search
- **Scalability**: Handles millions of vectors efficiently
- **Familiar SQL Interface**: Uses standard SQL with vector extensions
- **Managed Service**: Available as a fully managed service

## Supabase pgvector

### Technical Specifications

- **Vector Extension**: pgvector
- **Vector Dimensions**: Supports up to 2000 dimensions (we use 768 for Gemini embeddings)
- **Distance Metrics**: Supports Euclidean, Cosine, and Inner Product
- **Indexing Methods**: IVFFlat and HNSW

### Key Features

- **Vector Operations**: Native support for vector operations
- **Similarity Search**: Efficient nearest-neighbor search
- **Filtering**: Combine vector search with metadata filtering
- **Indexing**: Multiple indexing strategies for different use cases

## Database Schema

The knowledge base uses the following database schema:

```sql
CREATE TABLE knowledge_base (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content TEXT NOT NULL,
  metadata JSONB,
  embedding VECTOR(768),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a vector index
CREATE INDEX knowledge_base_embedding_idx
  ON knowledge_base USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);
```

### Schema Explanation

- **id**: Unique identifier for each chunk
- **content**: The text content of the chunk
- **metadata**: Additional information about the chunk (source, file name, etc.)
- **embedding**: The vector representation of the content (768 dimensions)
- **created_at**: Timestamp when the chunk was added

### Metadata Structure

The metadata JSONB field typically contains:

```json
{
  "source": "vertex-ai-docs",
  "fileName": "vertex-ai-imagen-implementation-status.md",
  "fileExt": ".md",
  "directory": "Image generation",
  "chunkIndex": 3,
  "totalChunks": 15
}
```

## Implementation Details

The vector storage implementation is found in `scripts/knowledge-base-embeddings-gemini.mjs` and consists of the `SupabaseVectorStore` class:

```javascript
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
  async ensureTableExists() {
    // Implementation details...
  }
  
  // Store a document with its embedding in the vector store
  async storeDocument(content, embedding, metadata = {}) {
    // Implementation details...
  }
  
  // Store a batch of documents with their embeddings
  async storeBatchDocuments(documents) {
    // Implementation details...
  }
  
  // Search for similar documents
  async searchSimilarDocuments(queryEmbedding, options = {}) {
    // Implementation details...
  }
  
  // Calculate cosine similarity between two vectors
  calculateCosineSimilarity(vecA, vecB) {
    // Implementation details...
  }
}
```

### Key Components

1. **Client Initialization**: Sets up the Supabase client with URL and key
2. **Table Management**: Ensures the knowledge base table exists with pgvector support
3. **Document Storage**: Stores documents with embeddings and metadata
4. **Similarity Search**: Searches for similar documents based on vector similarity
5. **Similarity Calculation**: Calculates cosine similarity between vectors

## Vector Indexing

The implementation uses IVFFlat indexing for efficient similarity search:

```sql
CREATE INDEX knowledge_base_embedding_idx
  ON knowledge_base USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);
```

### IVFFlat Index

IVFFlat (Inverted File with Flat Compression) is an indexing method that:

- Divides the vector space into clusters
- Searches only the most relevant clusters
- Provides a good balance of search speed and accuracy

### Index Parameters

- **lists**: Number of clusters (100 is a good starting point)
- **vector_cosine_ops**: Uses cosine similarity for distance calculation

### Alternative: HNSW Index

For larger datasets, HNSW (Hierarchical Navigable Small World) indexing may be more efficient:

```sql
CREATE INDEX ON knowledge_base USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);
```

HNSW parameters:
- **m**: Maximum number of connections per layer (higher = more accurate but slower)
- **ef_construction**: Size of the dynamic candidate list (higher = more accurate but slower)

## Query Optimization

The implementation includes several optimizations for efficient querying:

### Vector Similarity Search

```sql
SELECT id, content, metadata
FROM knowledge_base
ORDER BY embedding <=> '[vector values]'::vector
LIMIT 5;
```

The `<=>` operator calculates cosine distance between vectors.

### Metadata Filtering

```sql
SELECT id, content, metadata
FROM knowledge_base
WHERE metadata->>'source' = 'vertex-ai-docs'
ORDER BY embedding <=> '[vector values]'::vector
LIMIT 5;
```

Combining vector search with metadata filtering allows for more targeted results.

### Similarity Threshold

The implementation filters results by similarity threshold:

```javascript
// Calculate similarity scores and filter by threshold
return data
  .map(doc => {
    // Calculate cosine similarity
    const similarity = this.calculateCosineSimilarity(queryEmbedding, doc.embedding);
    return { ...doc, similarity };
  })
  .filter(doc => doc.similarity >= similarityThreshold);
```

## Performance Considerations

### Query Performance

- **Index Choice**: IVFFlat is faster for smaller datasets, HNSW for larger ones
- **Lists Parameter**: More lists = faster search but less accurate
- **Limit Clause**: Always use LIMIT to restrict result count
- **Metadata Indexing**: Consider indexing frequently queried metadata fields

### Storage Requirements

- **Vector Size**: 768 dimensions × 4 bytes = ~3KB per vector
- **Text Content**: Varies, but typically 1-5KB per chunk
- **Metadata**: Typically <1KB per chunk
- **Total**: ~5-10KB per chunk

### Scaling Considerations

- **Up to 100K chunks**: Standard Supabase plan with IVFFlat indexing
- **100K-1M chunks**: Consider HNSW indexing
- **1M+ chunks**: Consider sharding or dedicated vector database

## Scaling Strategies

### Horizontal Scaling

For very large knowledge bases, consider these horizontal scaling strategies:

1. **Sharding by Source**: Split data across multiple tables based on source
2. **Sharding by Topic**: Use embedding clustering to group related content
3. **Federation**: Use multiple Supabase projects for different content domains

### Vertical Scaling

Optimize performance with these vertical scaling strategies:

1. **Index Tuning**: Adjust index parameters for your specific dataset
2. **Query Optimization**: Use more specific metadata filters
3. **Resource Allocation**: Upgrade to higher-tier Supabase plans

## Best Practices

### Data Management

- **Deterministic IDs**: Use content hashes for deterministic document IDs
- **Upsert Operations**: Use upsert to avoid duplicates
- **Batch Processing**: Process documents in batches for efficiency
- **Regular Maintenance**: Reindex periodically for optimal performance

### Query Optimization

- **Metadata Filtering**: Use metadata to narrow search scope
- **Similarity Threshold**: Adjust based on use case (0.7-0.8 is a good starting point)
- **Result Limit**: Keep result sets small (5-10 items)
- **Pagination**: Implement pagination for large result sets

### Error Handling

- **Table Existence**: Check if table exists before querying
- **Index Verification**: Verify index exists and is usable
- **Transaction Management**: Use transactions for batch operations
- **Error Logging**: Log detailed error information for debugging

## Troubleshooting

### Common Issues

#### pgvector Extension Not Available

**Symptom**: `ERROR: extension "vector" does not exist`

**Solutions**:
- Enable the pgvector extension in your Supabase project:
  ```sql
  CREATE EXTENSION IF NOT EXISTS vector;
  ```
- Contact Supabase support if the extension cannot be enabled

#### Slow Query Performance

**Symptom**: Vector similarity searches take several seconds

**Solutions**:
- Verify index exists and is being used
- Adjust index parameters
- Add metadata filters to narrow search scope
- Upgrade to a higher-tier Supabase plan

#### Out of Memory Errors

**Symptom**: `ERROR: out of memory`

**Solutions**:
- Reduce batch sizes
- Process data in smaller chunks
- Upgrade to a higher-tier Supabase plan
- Consider horizontal scaling strategies

#### Invalid Vector Dimension

**Symptom**: `ERROR: vector dimensions do not match`

**Solutions**:
- Ensure all vectors have the same dimension (768)
- Verify embedding generation is working correctly
- Check for truncated or corrupted vectors

## Last Updated

May 16, 2025
