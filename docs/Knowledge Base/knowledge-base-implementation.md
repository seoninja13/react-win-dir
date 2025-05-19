# Knowledge Base Implementation

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > Knowledge Base

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Setup Instructions](#setup-instructions)
4. [Usage Guide](#usage-guide)
5. [Script Documentation](#script-documentation)
6. [Database Schema](#database-schema)
7. [Performance Considerations](#performance-considerations)
8. [Troubleshooting](#troubleshooting)

## Overview

The Knowledge Base system provides a centralized repository for storing and retrieving documentation, API references, code snippets, and other information using vector embeddings and semantic search. This implementation leverages Supabase's pgvector capabilities and Gemini 2.0 Flash embeddings to create a powerful, searchable knowledge repository.

### Key Features

- **Vector-based semantic search** for finding relevant information
- **Automatic chunking** of documentation for optimal storage
- **Metadata tagging** for categorization and filtering
- **Efficient storage** using Supabase's pgvector extension
- **High-quality embeddings** using Gemini 2.0 Flash

## Architecture

The Knowledge Base implementation consists of three main components:

1. **Embedding Generation**: Uses Gemini 2.0 Flash to convert text into vector embeddings
2. **Vector Storage**: Uses Supabase's pgvector extension to store and query embeddings
3. **Search Interface**: Provides a simple interface for searching the knowledge base

### System Diagram

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Documentation  │────▶│  Gemini 2.0     │────▶│  Supabase       │
│  Files          │     │  Embeddings     │     │  Vector Store   │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └────────┬────────┘
                                                         │
                                                         ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Search         │────▶│  Query          │────▶│  Semantic       │
│  Query          │     │  Embedding      │     │  Similarity     │
│                 │     │                 │     │  Search         │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## Setup Instructions

### Prerequisites

- Supabase project with pgvector extension enabled
- Google Cloud project with Gemini API access
- Node.js 18+

### Environment Variables

Create a `.env.local` file with the following variables:

```
# Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_KEY=your-supabase-service-role-key

# Google AI Configuration
GOOGLE_API_KEY=your-google-api-key
```

### Installation

1. Ensure the pgvector extension is enabled in your Supabase project:

```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

2. Create the knowledge base table:

```sql
CREATE TABLE IF NOT EXISTS knowledge_base (
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

3. Install dependencies:

```bash
npm install @google/generative-ai @supabase/supabase-js
```

## Usage Guide

### Adding Content to the Knowledge Base

Use the `knowledge-base-embeddings-gemini.mjs` script to add content to the knowledge base:

```bash
# Process a single file
node scripts/knowledge-base-embeddings-gemini.mjs --input=./docs/api-reference.md --source=vertex-ai-docs

# Process a directory
node scripts/knowledge-base-embeddings-gemini.mjs --input=./docs/Image\ generation/ --source=vertex-ai-docs
```

#### Options

- `--input`: Path to the file or directory to process (required)
- `--source`: Source name for metadata (default: file name)
- `--chunk-size`: Size of text chunks (default: 1000)
- `--chunk-overlap`: Overlap between chunks (default: 200)
- `--batch-size`: Batch size for processing (default: 10)

### Searching the Knowledge Base

Use the `knowledge-base-search.mjs` script to search the knowledge base:

```bash
# Basic search
node scripts/knowledge-base-search.mjs --query="How to generate images with Vertex AI?"

# Filtered search
node scripts/knowledge-base-search.mjs --query="Image generation" --source=vertex-ai-docs --limit=3
```

#### Options

- `--query`: Search query (required)
- `--limit`: Maximum number of results (default: 5)
- `--threshold`: Minimum similarity threshold (default: 0.7)
- `--source`: Filter by source
- `--format`: Output format (json or text, default: text)

## Script Documentation

### knowledge-base-embeddings-gemini.mjs

This script processes documentation files, chunks them into manageable pieces, generates embeddings using Gemini 2.0 Flash, and stores them in Supabase's vector database.

#### Key Components

- `EmbeddingGenerator`: Generates embeddings using Gemini 2.0 Flash
- `SupabaseVectorStore`: Stores and retrieves vectors from Supabase
- `KnowledgeBaseManager`: Manages the knowledge base operations
- `chunkText`: Splits text into chunks with overlap

### knowledge-base-search.mjs

This script searches the knowledge base using semantic similarity to find relevant documentation chunks.

#### Key Components

- `EmbeddingGenerator`: Generates embeddings for search queries
- `SupabaseVectorStore`: Retrieves vectors from Supabase
- `KnowledgeBaseSearch`: Manages the search operations

## Database Schema

### knowledge_base Table

| Column      | Type                  | Description                           |
|-------------|------------------------|---------------------------------------|
| id          | UUID                   | Primary key                           |
| content     | TEXT                   | The text content of the chunk         |
| metadata    | JSONB                  | Additional metadata (source, etc.)    |
| embedding   | VECTOR(768)            | The vector embedding                  |
| created_at  | TIMESTAMP WITH TIME ZONE | Creation timestamp                  |

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

## Performance Considerations

### Indexing Strategy

The implementation uses an IVFFlat index for a good balance of search speed and accuracy. For larger knowledge bases, consider using an HNSW index:

```sql
CREATE INDEX ON knowledge_base USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);
```

### Semantic Chunking Strategy

The implementation uses a semantically-aware chunking approach that preserves the meaning and context of the content:

1. **Paragraph-First Approach**: Treats paragraphs as the primary semantic unit
2. **Preserves Paragraph Boundaries**: Never breaks in the middle of a paragraph unless it exceeds the maximum size
3. **Sentence-Level Splitting**: Only splits large paragraphs at sentence boundaries
4. **Word-Level Fallback**: As a last resort for very long sentences, splits at word boundaries
5. **Contextual Overlap**: Includes overlap between chunks to preserve context

The default chunk size (1000 characters) and overlap (200 characters) work well for most documentation. Adjust these values based on your content:

- **Shorter chunks** (500-800 characters): Better for precise answers, but may lose context
- **Longer chunks** (1200-2000 characters): Better for contextual understanding, but may be less precise
- **More overlap** (25-30% of chunk size): Better for maintaining context between chunks

## Troubleshooting

### Common Issues

#### pgvector Extension Not Available

Error: `ERROR: extension "vector" does not exist`

Solution: Enable the pgvector extension in your Supabase project:

```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

#### Rate Limiting Issues

Error: `Failed to generate embedding: Rate limit exceeded`

Solution: Reduce the batch size or implement exponential backoff:

```bash
node scripts/knowledge-base-embeddings-gemini.mjs --input=./docs --batch-size=5
```

#### Memory Issues with Large Files

Error: `JavaScript heap out of memory`

Solution: Increase Node.js memory limit:

```bash
NODE_OPTIONS=--max-old-space-size=8192 node scripts/knowledge-base-embeddings-gemini.mjs --input=./docs
```

## Last Updated

May 16, 2025
