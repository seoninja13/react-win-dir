# Semantic Chunking Process

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Knowledge Base](./index.md) > Semantic Chunking Process

## Table of Contents

1. [Overview](#overview)
2. [Chunking Hierarchy](#chunking-hierarchy)
3. [Implementation Details](#implementation-details)
4. [Algorithm Walkthrough](#algorithm-walkthrough)
5. [Configuration Options](#configuration-options)
6. [Best Practices](#best-practices)
7. [Examples](#examples)
8. [Performance Considerations](#performance-considerations)
9. [Troubleshooting](#troubleshooting)

## Overview

Semantic chunking is a critical process in the knowledge base implementation that divides documents into meaningful segments while preserving semantic coherence. Unlike simple character-based chunking, semantic chunking respects natural language boundaries such as paragraphs and sentences, ensuring that each chunk contains complete thoughts and related concepts.

### Why Semantic Chunking Matters

When building a knowledge base with vector embeddings, the quality of chunks directly impacts:

1. **Retrieval Accuracy**: Semantically coherent chunks lead to more relevant search results
2. **Context Preservation**: Maintaining the original meaning and context of the content
3. **Embedding Quality**: Better chunks produce more meaningful vector representations
4. **User Experience**: More coherent chunks provide better answers to user queries

## Chunking Hierarchy

The semantic chunking process follows a hierarchical approach, using increasingly granular boundaries only when necessary:

1. **Paragraph Level** (Primary)
   - Paragraphs are treated as the fundamental semantic units
   - Preserves the natural flow and structure of the document
   - Keeps related sentences together as a cohesive unit

2. **Sentence Level** (Secondary)
   - Used only when paragraphs exceed the maximum chunk size
   - Ensures that sentences remain intact
   - Preserves grammatical structure and meaning

3. **Word Level** (Tertiary/Fallback)
   - Used only as a last resort for extremely long sentences
   - Attempts to break at natural word boundaries
   - Maintains as much context as possible

## Implementation Details

The semantic chunking implementation is found in `scripts/knowledge-base-embeddings-gemini.mjs` and consists of four main functions:

### 1. `chunkText(text, maxChunkSize, overlapSize)`

The primary function that orchestrates the chunking process:

- Splits text into paragraphs
- Groups paragraphs into chunks within size limits
- Handles overlap between chunks
- Delegates to sentence-level chunking when necessary

### 2. `splitLargeParagraphBySentences(text, maxChunkSize, overlapSize)`

Handles paragraphs that exceed the maximum chunk size:

- Uses regex to identify sentence boundaries
- Keeps sentences together when possible
- Maintains overlap between chunks
- Delegates to word-level chunking if necessary

### 3. `splitAtWordBoundaries(text, maxChunkSize, overlapSize)`

Last-resort function for extremely long sentences:

- Splits text at word boundaries
- Ensures chunks stay within size limits
- Maintains overlap between chunks

### 4. `getOverlapByWords(text, overlapSize)`

Helper function for creating word-aware overlaps:

- Extracts overlap text from the end of a chunk
- Ensures overlap starts at word boundaries
- Prevents partial words in overlap

## Algorithm Walkthrough

Here's a step-by-step walkthrough of how the semantic chunking algorithm processes a document:

1. **Input Processing**
   - Document text is passed to the `chunkText` function
   - Configuration parameters (chunk size, overlap) are applied

2. **Paragraph Splitting**
   - Text is split into paragraphs using regex pattern `/\n\s*\n/`
   - Empty paragraphs are filtered out

3. **Chunk Formation**
   - Paragraphs are added to the current chunk until reaching max size
   - When max size is approached, the chunk is finalized
   - A new chunk begins with overlap from the previous chunk

4. **Large Paragraph Handling**
   - If a single paragraph exceeds max size, it's passed to `splitLargeParagraphBySentences`
   - Sentences are identified using regex pattern `/[^.!?]+[.!?](?:\s|$)/g`
   - Sentences are grouped while respecting size limits

5. **Extreme Case Handling**
   - If a single sentence exceeds max size, it's passed to `splitAtWordBoundaries`
   - Words are identified by splitting on whitespace
   - Words are grouped while respecting size limits

6. **Overlap Management**
   - Each chunk (except the first) begins with text from the end of the previous chunk
   - Overlap size is configurable (default: 200 characters)
   - Overlaps are adjusted to start at word boundaries

7. **Output Generation**
   - An array of semantically coherent text chunks is returned
   - Each chunk respects the maximum size limit
   - Chunks maintain context through strategic overlaps

## Configuration Options

The semantic chunking process can be configured with these parameters:

| Parameter | Default | Description |
|-----------|---------|-------------|
| `maxChunkSize` | 1000 | Maximum size of each chunk in characters |
| `overlapSize` | 200 | Size of overlap between chunks in characters |

These parameters can be adjusted based on your specific needs:

```javascript
// Example: Smaller chunks with more overlap
const chunks = chunkText(documentText, 800, 250);

// Example: Larger chunks with less overlap
const chunks = chunkText(documentText, 1500, 150);
```

## Best Practices

### Chunk Size Selection

- **500-800 characters**: Better for precise answers, but may lose context
- **1000 characters**: Good balance for most content types
- **1200-2000 characters**: Better for contextual understanding, but may be less precise

### Overlap Size Selection

- **150-200 characters**: Minimum recommended overlap
- **25-30% of chunk size**: Ideal for maintaining context
- **Larger overlaps**: Better for complex, interconnected content

### Content-Specific Adjustments

- **Technical documentation**: May benefit from smaller chunks (800 characters)
- **Narrative content**: May benefit from larger chunks (1200+ characters)
- **Code snippets**: Should be kept intact when possible

## Examples

### Example 1: Simple Paragraph Chunking

```javascript
const text = `
Paragraph 1 with some content.

Paragraph 2 with some more content.

Paragraph 3 with even more content.
`;

const chunks = chunkText(text, 1000, 200);
// Result: Each paragraph becomes its own chunk
// (unless they exceed the max size)
```

### Example 2: Handling Large Paragraphs

```javascript
const text = `
Short paragraph.

Very long paragraph that exceeds the maximum chunk size. This paragraph contains multiple sentences. Each sentence adds more content. The chunking algorithm will split this paragraph at sentence boundaries to maintain semantic coherence.

Another short paragraph.
`;

const chunks = chunkText(text, 100, 20);
// Result: The large paragraph is split at sentence boundaries
```

### Example 3: Extreme Case with Word-Level Splitting

```javascript
const text = `
Short paragraph.

This_is_an_extremely_long_sentence_without_any_punctuation_that_exceeds_the_maximum_chunk_size_and_cannot_be_split_at_sentence_boundaries_so_it_must_be_split_at_word_boundaries_as_a_last_resort.

Another short paragraph.
`;

const chunks = chunkText(text, 50, 10);
// Result: The long sentence is split at word boundaries
```

## Performance Considerations

### Time Complexity

- **Paragraph Splitting**: O(n) where n is the document length
- **Sentence Splitting**: O(m) where m is the paragraph length
- **Word Splitting**: O(k) where k is the sentence length
- **Overall**: O(n) for the entire document

### Memory Usage

- The chunking process creates multiple string copies
- For very large documents (10MB+), consider processing in batches
- Memory usage scales linearly with document size

### Optimization Tips

- Pre-process very large documents into smaller files
- Adjust chunk size based on available memory
- Consider parallel processing for large document collections

## Troubleshooting

### Common Issues

#### Chunks Are Too Large

**Symptom**: Some chunks exceed the specified maximum size.

**Possible Causes**:
- Very long sentences without punctuation
- Non-standard punctuation that isn't recognized by the regex patterns

**Solutions**:
- Decrease the maximum chunk size
- Pre-process text to normalize punctuation
- Add custom handling for specific content types

#### Chunks Break Mid-Sentence

**Symptom**: Some chunks end in the middle of sentences.

**Possible Causes**:
- Incorrect regex pattern for sentence detection
- Non-standard sentence structures

**Solutions**:
- Review and update the sentence detection regex
- Increase the chunk size
- Add custom handling for specific content types

#### Overlaps Are Inconsistent

**Symptom**: Some chunks have overlaps that are too small or too large.

**Possible Causes**:
- Edge cases in the overlap calculation
- Word boundary detection issues

**Solutions**:
- Increase the overlap size
- Review and update the overlap calculation logic
- Add logging to track overlap sizes

## Last Updated

May 16, 2025
