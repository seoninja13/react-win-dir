# OpenRouter Web Search MCP Server Integration

This document outlines the integration of the OpenRouter Web Search MCP server into the Water Damage CA project. The OpenRouter MCP server provides powerful web search capabilities powered by AI models.

## Table of Contents

1. [Overview](#overview)
2. [Setup](#setup)
3. [Usage](#usage)
4. [Integration with Next.js](#integration-with-nextjs)
5. [Testing](#testing)
6. [Customization](#customization)
7. [Troubleshooting](#troubleshooting)
8. [References](#references)

## Overview

The OpenRouter Web Search MCP server provides web search capabilities using the OpenRouter API. It has the following features:

- **Primary model**: Optimus Alpha (openrouter/optimus-alpha)
- **Fallback model**: Google Gemini 2.0 Flash (google/gemini-2.0-flash-001)
- **Automatic fallback** if the primary model is unavailable
- **Web search capability** using the OpenRouter API
- **Rate limiting** to prevent API quota exhaustion

The server provides a single tool:

- **openrouter_web_search**: Performs web searches and returns relevant results

## Setup

### Prerequisites

- OpenRouter API key (obtained from [OpenRouter](https://openrouter.ai/))
- Node.js and NPM installed

### Installation

1. The OpenRouter MCP server is included in the project repository under `MCP Servers/openrouter-mcp-server`.

2. Install the dependencies:

```bash
cd MCP Servers/openrouter-mcp-server
npm install
```

3. Set your OpenRouter API key:

```bash
# Windows
set OPENROUTER_API_KEY=your_api_key_here

# Linux/Mac
export OPENROUTER_API_KEY=your_api_key_here
```

4. Start the server:

```bash
node server.js
```

### Configuration

The server is configured in the `.mcp.json` file:

```json
{
  "mcpServers": {
    "openrouter-search": {
      "command": "node",
      "args": [
        "MCP Servers/openrouter-mcp-server/server.js"
      ],
      "env": {
        "OPENROUTER_API_KEY": "your_openrouter_api_key_here"
      }
    }
  }
}
```

Replace `your_openrouter_api_key_here` with your actual OpenRouter API key.

## Usage

### Web Search Tool

The `openrouter_web_search` tool can be used to perform web searches:

```typescript
// Example usage in an MCP-enabled environment
const results = await openrouter_web_search({
  query: "water damage restoration techniques",
  count: 5
});
```

Parameters:
- `query`: The search query (required)
- `count`: Number of results to return (1-10, default: 5)

## Integration with Next.js

To use the OpenRouter MCP server in your Next.js application:

### 1. Make API calls from your components or API routes:

```typescript
// Example API route in Next.js
import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query, count = 5 } = req.body;
  
  try {
    const response = await fetch('http://localhost:8889/mcp5_openrouter_search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query, count })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

### 2. Create a React component to display search results:

```tsx
// Example React component
import { useState } from 'react';

export default function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSearch = async () => {
    if (!query) return;
    
    setLoading(true);
    
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query, count: 5 })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error('Error:', error);
      setResults(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <h2>Web Search</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter search query"
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>
      
      {results && (
        <div>
          <h3>Results:</h3>
          <pre>{results}</pre>
        </div>
      )}
    </div>
  );
}
```

## Testing

The OpenRouter MCP server can be tested using the provided test tools:

### Test Script

Run the included test script:

```bash
cd MCP Servers/openrouter-mcp-server
node test-openrouter-mcp.js
```

### HTML Test Page

Open the HTML test page in a browser:

```
MCP Servers/openrouter-mcp-server/openrouter-search-test.html
```

### Direct API Calls

You can also test the server using tools like Postman or curl:

```bash
curl -X POST http://localhost:8889/mcp5_openrouter_search \
  -H "Content-Type: application/json" \
  -d '{"query":"water damage restoration techniques","count":3}'
```

## Customization

The OpenRouter MCP server can be customized by modifying the following:

### Port Number

Change the `PORT` constant in `server.js`:

```javascript
const PORT = process.env.PORT || 8889;
```

### Models

Change the primary and fallback models:

```javascript
const PRIMARY_MODEL = 'openrouter/optimus-alpha';
const FALLBACK_MODEL = 'google/gemini-2.0-flash-001';
```

Available models can be found in the [OpenRouter documentation](https://openrouter.ai/docs).

### Rate Limiting

Adjust the rate limits:

```javascript
const RATE_LIMIT = {
  perMinute: 10,
  perHour: 100
};
```

### Model Parameters

Modify the temperature and other parameters:

```javascript
body: JSON.stringify({
  model: model,
  messages: [
    { role: 'system', content: '...' },
    { role: 'user', content: prompt }
  ],
  temperature: 0.2,
  max_tokens: 1024
})
```

## Troubleshooting

### Common Issues

1. **API Key Invalid**: Ensure your OpenRouter API key is correct and has not expired
2. **Rate Limit Exceeded**: Wait a moment before making another request
3. **Server Not Starting**: Check that the environment variable is properly set
4. **Model Unavailable**: The primary model might be unavailable, check if the fallback model is working

### Logs

The OpenRouter MCP server logs errors to the console. Check the logs for any error messages if you encounter issues.

## References

- [OpenRouter API Documentation](https://openrouter.ai/docs)
- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Optimus Alpha Model](https://openrouter.ai/models/openrouter/optimus-alpha)
- [Gemini 2.0 Flash Model](https://openrouter.ai/models/google/gemini-2.0-flash-001)
