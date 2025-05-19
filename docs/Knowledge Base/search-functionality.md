# Search Functionality

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Knowledge Base](./index.md) > Search Functionality

## Table of Contents

1. [Overview](#overview)
2. [Semantic Search Process](#semantic-search-process)
3. [Implementation Details](#implementation-details)
4. [Query Processing](#query-processing)
5. [Result Ranking](#result-ranking)
6. [Filtering Options](#filtering-options)
7. [Performance Optimization](#performance-optimization)
8. [Usage Examples](#usage-examples)
9. [Best Practices](#best-practices)
10. [Troubleshooting](#troubleshooting)

## Overview

The search functionality is the primary interface for retrieving information from the knowledge base. It uses semantic search to find content based on meaning rather than keywords, providing more relevant and contextual results. This document explains how the search functionality works and how to use it effectively.

### What Is Semantic Search?

Semantic search goes beyond traditional keyword matching by understanding the meaning and intent behind a query. It uses vector embeddings to find content that is semantically similar to the query, even if it doesn't contain the exact same words.

### Key Features

- **Meaning-Based Search**: Finds content based on semantic similarity
- **Contextual Understanding**: Understands queries in context
- **Metadata Filtering**: Narrows results by source, category, etc.
- **Similarity Ranking**: Ranks results by relevance
- **Configurable Thresholds**: Adjustable precision vs. recall

## Semantic Search Process

The semantic search process involves several steps:

1. **Query Embedding**: Convert the search query into a vector embedding
2. **Vector Similarity**: Find vectors in the database that are similar to the query vector
3. **Metadata Filtering**: Apply any metadata filters to narrow results
4. **Similarity Ranking**: Rank results by similarity score
5. **Threshold Filtering**: Filter out results below a similarity threshold
6. **Result Formatting**: Format results for presentation

## Implementation Details

The search functionality is implemented in `scripts/knowledge-base-search.mjs` and consists of the `KnowledgeBaseSearch` class:

```javascript
class KnowledgeBaseSearch {
  constructor(googleApiKey, supabaseUrl, supabaseKey) {
    this.embeddingGenerator = new EmbeddingGenerator(googleApiKey);
    this.vectorStore = new SupabaseVectorStore(supabaseUrl, supabaseKey);
  }
  
  // Search the knowledge base
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
  formatResults(results) {
    // Implementation details...
  }
}
```

### Key Components

1. **Embedding Generation**: Converts the search query into a vector embedding
2. **Vector Store Search**: Searches the vector store for similar documents
3. **Result Formatting**: Formats the search results for display

## Query Processing

### Query Embedding

The search process begins by converting the query into a vector embedding:

```javascript
const queryEmbedding = await this.embeddingGenerator.generateEmbedding(query);
```

This uses the same Gemini 2.0 Flash model that was used to generate embeddings for the knowledge base content, ensuring consistency.

### Vector Similarity Search

The query embedding is then used to search the vector store:

```javascript
const results = await this.vectorStore.searchSimilarDocuments(queryEmbedding, options);
```

This search uses the `<=>` operator in PostgreSQL to find vectors that are similar to the query vector.

## Result Ranking

Results are ranked by similarity score, which is calculated using cosine similarity:

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

### Cosine Similarity

Cosine similarity measures the cosine of the angle between two vectors, providing a value between -1 and 1 (though with normalized embeddings, it's typically between 0 and 1):

- **1.0**: Identical meaning
- **0.8-0.99**: Very similar meaning
- **0.6-0.79**: Related meaning
- **0.4-0.59**: Somewhat related
- **< 0.4**: Likely unrelated

## Filtering Options

The search functionality supports several filtering options:

### Similarity Threshold

```javascript
const results = await knowledgeBaseSearch.search(query, {
  similarityThreshold: 0.7 // Only return results with similarity >= 0.7
});
```

### Result Limit

```javascript
const results = await knowledgeBaseSearch.search(query, {
  limit: 5 // Return at most 5 results
});
```

### Metadata Filtering

```javascript
const results = await knowledgeBaseSearch.search(query, {
  metadataFilter: {
    source: 'vertex-ai-docs', // Only return results from this source
    fileExt: '.md' // Only return markdown files
  }
});
```

## Performance Optimization

### Query Optimization

- **Be Specific**: More specific queries yield more relevant results
- **Use Natural Language**: Queries should be in natural language, not keywords
- **Optimal Length**: 5-15 words is ideal for most queries
- **Include Context**: Provide relevant context in the query

### Database Optimization

- **Proper Indexing**: Ensure vector indexes are properly configured
- **Metadata Indexing**: Index frequently filtered metadata fields
- **Result Limiting**: Always limit the number of results
- **Caching**: Consider caching frequent queries

## Usage Examples

### Basic Search

```javascript
// Search for information about Vertex AI
const results = await knowledgeBaseSearch.search(
  "How to generate images with Vertex AI?"
);
```

### Filtered Search

```javascript
// Search for information about Vertex AI in markdown files
const results = await knowledgeBaseSearch.search(
  "How to generate images with Vertex AI?",
  {
    limit: 3,
    similarityThreshold: 0.75,
    metadataFilter: {
      source: 'vertex-ai-docs',
      fileExt: '.md'
    }
  }
);
```

### Command-Line Usage

```bash
# Basic search
node scripts/knowledge-base-search.mjs --query="How to generate images with Vertex AI?"

# Filtered search
node scripts/knowledge-base-search.mjs \
  --query="How to generate images with Vertex AI?" \
  --limit=3 \
  --threshold=0.75 \
  --source=vertex-ai-docs
```

## Best Practices

### Query Formulation

- **Use Natural Questions**: "How do I implement rate limiting?" works better than "rate limiting implementation"
- **Be Specific**: "How to generate images with Vertex AI Imagen?" is better than "image generation"
- **Include Context**: "How to handle errors in Vertex AI Imagen API calls?" provides more context than "error handling"
- **Avoid Ambiguity**: Clarify ambiguous terms in your query

### Result Interpretation

- **Check Similarity Scores**: Higher scores indicate more relevant results
- **Look for Patterns**: Multiple similar results may indicate consensus
- **Consider Context**: Understand results in their original context
- **Verify Information**: Cross-check important information with multiple sources

### System Configuration

- **Adjust Thresholds**: Start with 0.7 and adjust based on results
- **Balance Precision vs. Recall**: Higher threshold = more precision, lower threshold = more recall
- **Optimize Metadata**: Use consistent metadata for better filtering
- **Regular Updates**: Keep the knowledge base updated with fresh content

## Troubleshooting

### Common Issues

#### No Results Returned

**Symptom**: Search returns no results

**Possible Causes**:
- Similarity threshold too high
- Query too specific or using terminology not in the knowledge base
- Metadata filters too restrictive

**Solutions**:
- Lower the similarity threshold
- Rephrase the query using more general terms
- Remove or relax metadata filters

#### Irrelevant Results

**Symptom**: Search returns results that aren't relevant to the query

**Possible Causes**:
- Similarity threshold too low
- Query too vague or ambiguous
- Embedding quality issues

**Solutions**:
- Increase the similarity threshold
- Make the query more specific
- Add relevant context to the query
- Add metadata filters to narrow results

#### Slow Search Performance

**Symptom**: Searches take several seconds to complete

**Possible Causes**:
- Inefficient vector indexing
- Large knowledge base without proper optimization
- Complex metadata filtering

**Solutions**:
- Verify vector indexes are properly configured
- Optimize database configuration
- Simplify metadata filters
- Consider caching frequent queries

## Last Updated

May 16, 2025
