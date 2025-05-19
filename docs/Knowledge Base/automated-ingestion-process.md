# Automated Knowledge Base Ingestion Process

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Knowledge Base](./index.md) > Automated Ingestion Process

## Table of Contents

1. [Overview](#overview)
2. [Ingestion Workflow](#ingestion-workflow)
3. [Script Usage](#script-usage)
4. [Content Sources](#content-sources)
5. [Implementation Details](#implementation-details)
6. [Configuration Options](#configuration-options)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)

## Overview

The automated knowledge base ingestion process allows you to retrieve content from various sources (including Brave search, web URLs, and local files), process it through our semantic chunking system, generate embeddings using Gemini 2.0 Flash, and store everything in the Supabase vector database—all in a single automated workflow.

## Ingestion Workflow

The complete ingestion workflow follows these steps:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Retrieve       │────▶│  Process &      │────▶│  Semantic       │
│  Content        │     │  Clean Content  │     │  Chunking       │
│                 │     │                 │     │                 │
└────────┬────────┘     └────────┬────────┘     └────────┬────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Store in       │◀────│  Generate       │◀────│  Batch          │
│  Supabase       │     │  Embeddings     │     │  Processing     │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## Script Usage

The `knowledge-base-ingestion.mjs` script handles the entire process. Here's how to use it:

### Basic Usage

```bash
# Ingest content from a URL
node scripts/knowledge-base-ingestion.mjs --source url --url "https://example.com/documentation"

# Ingest content from a local file
node scripts/knowledge-base-ingestion.mjs --source file --path "./docs/guide.md"

# Ingest content from Brave search results (requires Brave Search API key)
node scripts/knowledge-base-ingestion.mjs --source brave --query "windows installation guide"
```

### Advanced Options

```bash
# Specify a custom tag for the content
node scripts/knowledge-base-ingestion.mjs --source url --url "https://example.com/api-docs" --tag "api-documentation"

# Customize chunk size and overlap
node scripts/knowledge-base-ingestion.mjs --source file --path "./docs/guide.md" --chunk-size 1500 --chunk-overlap 300
```

## Content Sources

The ingestion script supports multiple content sources:

### 1. Brave Search

Retrieves content from Brave search results based on a query. This requires a Brave Search API key configured in your environment variables.

```bash
node scripts/knowledge-base-ingestion.mjs --source brave --query "react hooks documentation"
```

### 2. Web URLs

Fetches content directly from a specified URL, extracts the text content, and processes it.

```bash
node scripts/knowledge-base-ingestion.mjs --source url --url "https://reactjs.org/docs/hooks-intro.html"
```

### 3. Local Files

Reads content from local files in various formats (markdown, text, etc.).

```bash
node scripts/knowledge-base-ingestion.mjs --source file --path "./docs/api-reference.md"
```

## Implementation Details

### 1. Content Retrieval

The script uses different methods to retrieve content based on the source:

- **Brave Search**: Uses the Brave Search API to get search results
- **Web URLs**: Uses axios and cheerio to fetch and parse HTML content
- **Local Files**: Uses the Node.js file system API to read file content

### 2. Content Processing

Before chunking, the content is processed to:

- Remove HTML tags and scripts
- Normalize whitespace
- Clean up formatting issues
- Extract meaningful text

### 3. Semantic Chunking

The content is chunked using our hierarchical semantic chunking process:

1. Split by paragraphs first
2. Handle large paragraphs by splitting into sentences
3. Handle large sentences by splitting into words
4. Add overlaps between chunks to maintain context

### 4. Batch Processing

To optimize API usage and performance:

- Chunks are processed in batches (default: 10 chunks per batch)
- Rate limiting is applied to API calls
- Progress is reported for each batch

### 5. Embedding Generation

For each chunk:

- An embedding is generated using Gemini 2.0 Flash
- The embedding model is configured to produce vectors of the correct dimension
- Error handling ensures the process continues even if some embeddings fail

### 6. Storage in Supabase

Each document is stored in Supabase with:

- The original content chunk
- The generated embedding vector
- Comprehensive metadata including:
  - Source information
  - Retrieval date
  - Chunk position
  - Custom tags

## Configuration Options

The script supports several configuration options:

| Option | Description | Default |
|--------|-------------|---------|
| `--source` | Content source (brave, url, file) | Required |
| `--query` | Search query for Brave search | Required for brave source |
| `--url` | URL to fetch content from | Required for url source |
| `--path` | File path to read content from | Required for file source |
| `--tag` | Tag to associate with the content | Source-specific default |
| `--chunk-size` | Size of chunks in characters | 1000 |
| `--chunk-overlap` | Overlap between chunks in characters | 200 |

## Best Practices

### 1. Content Selection

- Choose high-quality, authoritative sources
- Prioritize structured content when possible
- Avoid duplicative or redundant content

### 2. Chunking Configuration

- Use larger chunks (1500-2000 characters) for narrative content
- Use smaller chunks (500-1000 characters) for technical documentation
- Increase overlap (300-400 characters) for complex content

### 3. Metadata and Tagging

- Use consistent, descriptive tags
- Include source information for provenance
- Add domain-specific metadata when relevant

### 4. Batch Processing

- Process large documents in multiple runs
- Monitor API usage to stay within rate limits
- Schedule ingestion during off-peak hours for large datasets

## Troubleshooting

### Common Issues

1. **API Rate Limiting**
   - Error: "Too many requests"
   - Solution: Decrease batch size or increase rate limit period

2. **Content Extraction Issues**
   - Error: "No content retrieved" or very short content
   - Solution: Check URL validity or try a different content selector

3. **Embedding Generation Failures**
   - Error: "Error generating embedding"
   - Solution: Check API key and connectivity, retry with smaller chunks

4. **Database Storage Issues**
   - Error: "Error storing documents in Supabase"
   - Solution: Verify Supabase credentials and table structure

### Monitoring and Logging

The script provides detailed logging at each stage of the process. For persistent logs:

```bash
node scripts/knowledge-base-ingestion.mjs --source url --url "https://example.com" > ingestion-log.txt 2>&1
```

## Last Updated

May 16, 2025
