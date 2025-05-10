# Brave Search MCP Server Testing Documentation

This document provides detailed information about the testing infrastructure for the Brave Search MCP server in the Water Damage CA project.

## Table of Contents

1. [Overview](#overview)
2. [Test Structure](#test-structure)
3. [Unit Tests](#unit-tests)
4. [Integration Tests](#integration-tests)
5. [Running Tests](#running-tests)
6. [Mocking Strategy](#mocking-strategy)
7. [Example Usage](#example-usage)
8. [Continuous Integration](#continuous-integration)

## Overview

The Brave Search MCP server testing suite consists of comprehensive unit and integration tests to ensure the server functions correctly. The tests verify:

- Configuration in the .mcp.json file
- API key validation
- Web search functionality
- Local search functionality
- MCP protocol communication
- Error handling

## Test Structure

The test files are organized as follows:

```
water-damage-ca/
├── __tests__/
│   └── mcp/
│       ├── brave-search.test.ts           # Basic unit tests
│       └── brave-search-integration.test.ts  # Integration tests
├── __mocks__/
│   └── node-fetch.ts                      # Mock for fetch API
├── tests/
│   ├── run-brave-search-tests.bat         # Test runner (Windows)
│   ├── test-brave-search.js               # Simple test script
│   └── verify-brave-search.js             # Verification script
├── examples/
│   └── brave-search-example.js            # Example usage
└── run-brave-search-tests.bat             # Root-level test runner
```

## Unit Tests

The unit tests (`brave-search.test.ts`) verify the basic functionality of the Brave Search MCP server:

### Configuration Tests

- Verify the server is configured in .mcp.json
- Check that it uses npx to run the server
- Validate the API key is present and properly formatted

### API Tests

- Test web search functionality with mocked responses
- Test local search functionality with mocked responses
- Verify correct URL parameters and headers are sent
- Check that responses are properly parsed

## Integration Tests

The integration tests (`brave-search-integration.test.ts`) simulate the MCP protocol communication:

### Server Communication Tests

- Test server startup with correct command and arguments
- Verify handling of listTools requests
- Test callTool requests for brave_web_search
- Test callTool requests for brave_local_search

### Error Handling Tests

- Test handling of invalid API key errors
- Verify rate limit error handling

## Running Tests

To run the tests, use one of the following methods:

### Using Jest Directly

```bash
# Run all Brave Search MCP server tests
npx jest --testPathPattern=__tests__/mcp/brave-search

# Run only unit tests
npx jest --testPathPattern=__tests__/mcp/brave-search.test.ts

# Run only integration tests
npx jest --testPathPattern=__tests__/mcp/brave-search-integration.test.ts
```

### Using Batch Files

```bash
# From the project root
.\run-brave-search-tests.bat

# From the water-damage-ca directory
.\tests\run-brave-search-tests.bat
```

## Mocking Strategy

The tests use Jest's mocking capabilities to isolate the code being tested:

### node-fetch Mock

The `node-fetch` module is mocked to simulate API responses without making actual network requests:

```typescript
// __mocks__/node-fetch.ts
const nodeFetch = jest.fn();
export default nodeFetch;
```

### child_process.spawn Mock

The `child_process.spawn` function is mocked in integration tests to simulate the MCP server process:

```typescript
jest.mock('child_process', () => ({
  spawn: jest.fn()
}));

// Mock process implementation
class MockProcess extends EventEmitter {
  stdin = {
    write: jest.fn(),
    end: jest.fn()
  };
  stdout = new EventEmitter();
  stderr = new EventEmitter();
  kill = jest.fn();
}
```

## Example Usage

An example script demonstrating how to use the Brave Search MCP server is available at `water-damage-ca/examples/brave-search-example.js`. This example shows:

1. How to search for water damage restoration services
2. How to process the search results
3. How to use the results with Gemini for content enrichment

To run the example:

```bash
node water-damage-ca/examples/brave-search-example.js
```

## Continuous Integration

The Brave Search MCP server tests are part of the project's test suite and should be run:

1. After any changes to the MCP server configuration
2. When updating the Brave API key
3. Before deploying to production
4. As part of the CI/CD pipeline

The tests are designed to be fast and reliable, with minimal dependencies on external services.

---

For more information about the Brave Search MCP server, see the [Brave Search Integration Documentation](./brave-search-integration.md).
