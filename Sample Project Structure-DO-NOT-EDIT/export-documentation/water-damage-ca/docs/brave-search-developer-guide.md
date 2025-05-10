# Brave Search MCP Server Developer Guide

This guide provides practical information for developers working with the Brave Search MCP server in the Water Damage CA project.

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Web Search Tool](#web-search-tool)
4. [Local Search Tool](#local-search-tool)
5. [Content Enrichment Workflow](#content-enrichment-workflow)
6. [Best Practices](#best-practices)
7. [Troubleshooting](#troubleshooting)
8. [Examples](#examples)

## Introduction

The Brave Search MCP server provides powerful search capabilities through the Model Context Protocol (MCP). It allows you to:

- Perform web searches for general information
- Find local businesses and services
- Enrich content with factual information
- Research topics related to water damage and mold removal

This guide will help you integrate the Brave Search MCP server into your development workflow.

## Getting Started

### Prerequisites

- Brave Search API key (configured in .mcp.json)
- Node.js and NPM installed
- Basic understanding of MCP

### Verifying Installation

To verify that the Brave Search MCP server is installed correctly:

```bash
# From the project root
.\verify-brave-search.bat
```

### Testing the Server

To test the server functionality:

```bash
# From the project root
.\run-brave-search-tests.bat
```

## Web Search Tool

The `brave_web_search` tool performs general web searches.

### Parameters

| Parameter | Type   | Description                           | Required | Default |
|-----------|--------|---------------------------------------|----------|---------|
| query     | string | Search query (max 400 chars, 50 words)| Yes      | -       |
| count     | number | Number of results (1-20)              | No       | 10      |
| offset    | number | Pagination offset (0-9)               | No       | 0       |

### Example Usage

```typescript
// In an MCP-enabled environment
const results = await brave_web_search({
  query: "water damage restoration techniques",
  count: 5
});

// Process the results
results.content.forEach(item => {
  if (item.type === 'text') {
    console.log(item.text);
  }
});
```

### Response Format

The response contains a `content` array with text items:

```json
{
  "content": [
    {
      "type": "text",
      "text": "Here are the search results for \"water damage restoration techniques\":\n\n1. Title of Result 1\nURL: https://example.com/1\nDescription: Description of result 1\n\n2. Title of Result 2\nURL: https://example.com/2\nDescription: Description of result 2\n\n..."
    }
  ]
}
```

## Local Search Tool

The `brave_local_search` tool searches for local businesses and services.

### Parameters

| Parameter | Type   | Description                           | Required | Default |
|-----------|--------|---------------------------------------|----------|---------|
| query     | string | Search query with location information| Yes      | -       |
| count     | number | Number of results (1-20)              | No       | 5       |

### Example Usage

```typescript
// In an MCP-enabled environment
const results = await brave_local_search({
  query: "water damage restoration Sacramento CA",
  count: 3
});

// Process the results
results.content.forEach(item => {
  if (item.type === 'text') {
    console.log(item.text);
  }
});
```

### Response Format

The response contains a `content` array with text items containing business information:

```json
{
  "content": [
    {
      "type": "text",
      "text": "Here are the local business results for \"water damage restoration Sacramento CA\":\n\n1. Business Name 1\nAddress: 123 Main St, Sacramento, CA\nPhone: (555) 123-4567\nRating: 4.5 (42 reviews)\nHours: Open 24/7\nWebsite: https://example.com/business1\n\n2. Business Name 2\n..."
    }
  ]
}
```

## Content Enrichment Workflow

The Brave Search MCP server can be used as part of a content enrichment workflow:

1. **Research Phase**: Use `brave_web_search` to gather factual information
2. **Local Business Phase**: Use `brave_local_search` to find relevant businesses
3. **Content Generation Phase**: Use search results with Gemini or Perplexity MCP
4. **Content Integration Phase**: Incorporate the enriched content into the website

### Example Workflow

```typescript
// 1. Research Phase
const searchResults = await brave_web_search({
  query: "water damage prevention tips",
  count: 5
});

// 2. Content Generation Phase (with Gemini)
const enrichedContent = await gemini_generate_content({
  prompt: `Create a comprehensive guide on water damage prevention based on these search results: ${JSON.stringify(searchResults)}`
});

// 3. Content Integration Phase
// Save the enriched content to the database or CMS
```

## Best Practices

### Query Optimization

- Be specific with search queries
- Include location information for local searches
- Use relevant keywords related to water damage and mold removal
- Keep queries under 400 characters and 50 words

### Rate Limit Management

- Cache search results when possible
- Implement exponential backoff for retries
- Schedule bulk searches during off-peak hours
- Monitor API usage to stay within limits

### Error Handling

- Handle API key errors gracefully
- Implement retry logic for rate limit errors
- Provide fallback content when searches fail
- Log errors for debugging

## Troubleshooting

### Common Issues

| Issue                   | Possible Cause                      | Solution                                |
|-------------------------|-------------------------------------|----------------------------------------|
| "Invalid API key" error | API key is incorrect or expired     | Verify the API key in .mcp.json        |
| "Rate limit exceeded"   | Too many requests in a short time   | Implement rate limiting and backoff    |
| Empty search results    | Query is too specific or has typos  | Broaden the search query               |
| Server not starting     | Environment variable not set        | Check BRAVE_API_KEY environment variable |

### Debugging

- Check the server logs for error messages
- Verify the API key is correctly configured
- Test with simple queries first
- Use the verification script to check installation

## Examples

### Basic Web Search

```typescript
const results = await brave_web_search({
  query: "water damage restoration techniques",
  count: 3
});
```

### Local Business Search

```typescript
const results = await brave_local_search({
  query: "water damage restoration Sacramento CA",
  count: 3
});
```

### Content Enrichment

```typescript
// Search for information
const searchResults = await brave_web_search({
  query: "water damage prevention tips",
  count: 5
});

// Use results with Gemini for content enrichment
const enrichedContent = await gemini_generate_content({
  prompt: `Create a comprehensive guide on water damage prevention based on these search results: ${JSON.stringify(searchResults)}`
});
```

### Error Handling

```typescript
try {
  const results = await brave_web_search({
    query: "water damage restoration techniques",
    count: 3
  });
  
  // Process results
} catch (error) {
  if (error.message.includes('rate limit')) {
    // Implement backoff and retry
    setTimeout(() => retrySearch(), 2000);
  } else if (error.message.includes('API key')) {
    // Log authentication error
    console.error('API key error:', error.message);
  } else {
    // Handle other errors
    console.error('Search error:', error.message);
  }
}
```

---

For more detailed information, see the [Brave Search Integration Documentation](./brave-search-integration.md) and [Brave Search Testing Documentation](./brave-search-testing.md).
