# Brave Search Integration

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Integrations](./index.md) > Brave Search Integration

## Overview

The Brave Search integration provides powerful web search capabilities that can be used for content enrichment and research in the Water Damage CA project. The integration is implemented as an MCP server that provides two main tools:

1. **brave_web_search**: Performs general web searches with pagination and filtering options
2. **brave_local_search**: Searches for local businesses and services with location information

These tools can be used to enhance content generation, research topics related to water damage and mold removal, and find additional information about businesses and services.

## Setup

### Prerequisites

- Brave Search API key (obtained from [Brave Search API](https://brave.com/search/api/))
- Node.js and NPM installed

### Installation

The Brave Search MCP server is installed using NPX:

```bash
npx -y @modelcontextprotocol/server-brave-search
```

### Configuration

The server is configured in the `.mcp.json` file:

```json
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-brave-search"
      ],
      "env": {
        "BRAVE_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```

Replace `YOUR_API_KEY_HERE` with your actual Brave Search API key.

## Usage

### Web Search

The `brave_web_search` tool can be used to perform general web searches:

```typescript
// Example usage in an MCP-enabled environment
const results = await brave_web_search({
  query: "water damage restoration techniques",
  count: 10,
  offset: 0
});
```

Parameters:
- `query`: The search query (required)
- `count`: Number of results to return (1-20, default: 10)
- `offset`: Pagination offset (0-9, default: 0)

### Local Search

The `brave_local_search` tool can be used to search for local businesses and services:

```typescript
// Example usage in an MCP-enabled environment
const results = await brave_local_search({
  query: "water damage restoration Sacramento CA",
  count: 5
});
```

Parameters:
- `query`: The search query including location information (required)
- `count`: Number of results to return (1-20, default: 5)

## Integration with Content Enrichment

The Brave Search integration can be used alongside the Gemini and Perplexity integrations for content enrichment:

1. Use Brave Search to gather factual information about water damage topics
2. Use the search results as input for Gemini or Perplexity to generate enriched content
3. Incorporate the enriched content into business profiles or service pages

Example workflow:

```typescript
// 1. Search for information
const searchResults = await brave_web_search({
  query: "water damage prevention tips",
  count: 5
});

// 2. Use results with Gemini for content enrichment
const enrichedContent = await gemini_generate_content({
  prompt: `Create a comprehensive guide on water damage prevention based on these search results: ${JSON.stringify(searchResults)}`
});

// 3. Save the enriched content
// ...
```

## Testing

The Brave Search integration has comprehensive unit and integration tests to ensure it works correctly.

### Unit Tests

Unit tests verify the configuration, API key validation, and basic functionality of the server:

```bash
# Run the Brave Search MCP server tests
npx jest --testPathPattern=__tests__/mcp/brave-search
```

Or use the provided batch file:

```bash
# From the project root
.\run-brave-search-tests.bat
```

### Test Files

- `__tests__/mcp/brave-search.test.ts`: Basic unit tests for configuration and API functionality
- `__tests__/mcp/brave-search-integration.test.ts`: Integration tests for MCP protocol communication
- `__mocks__/node-fetch.ts`: Mock for the node-fetch module used in tests

### Verification

To verify that the Brave Search MCP server is installed correctly:

```bash
# From the project root
.\verify-brave-search.bat
```

## Rate Limits and Quotas

The Brave Search API has the following rate limits:

- 1 request per second
- 15,000 requests per month (free tier)

The MCP server implementation includes rate limiting to prevent exceeding these limits.

## Troubleshooting

### Common Issues

1. **API Key Invalid**: Ensure your Brave API key is correct and has not expired
2. **Rate Limit Exceeded**: Wait a moment before making another request
3. **Server Not Starting**: Check that the environment variable is properly set

### Logs

The Brave Search MCP server logs errors to the console. Check the logs for any error messages if you encounter issues.

## Related Documentation

- [OpenRouter Integration](./openrouter.md)
- [Perplexity Integration](./perplexity.md)
- [Supabase Integration](./supabase.md)
- [Data Enrichment](../features/data-enrichment.md)
- [Batch Processing](../processes/batch-processing.md)

## References

- [Brave Search API Documentation](https://brave.com/search/api/)
- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [Brave Search MCP Server Source Code](https://github.com/modelcontextprotocol/servers/tree/main/src/brave-search)

Last Updated: April 22, 2025
