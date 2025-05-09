# Admin Subroutes Testing Plan

## Overview

This document outlines a comprehensive testing strategy for all admin subroutes in the Water Damage CA project. The plan includes unit tests, integration tests, and manual testing procedures to ensure the reliability and functionality of the admin interface.

## Routes to Test

1. **Main Admin Dashboard** (`/admin`)
2. **Batch Process** (`/admin/batch-process`)
3. **Cities Management** (`/admin/cities`)
4. **Businesses Management** (`/admin/businesses`)
5. **Enrich Businesses** (`/admin/enrich-businesses`)

## Testing Environment

**IMPORTANT**: All manual testing of admin routes must be performed using Netlify Dev on port 8888, not directly with Next.js on port 3000. This ensures that the testing environment closely matches the production environment.

To start the testing environment:

```bash
netlify dev
```

Then access the admin routes at:
```
http://localhost:8888/admin
http://localhost:8888/admin/batch-process
http://localhost:8888/admin/cities
http://localhost:8888/admin/businesses
http://localhost:8888/admin/enrich-businesses
```

For more details on using Netlify Dev for testing, see the [Netlify Dev Testing](./netlify-dev-testing.md) guide.

## Testing Approach

### Unit Testing

Unit tests focus on testing individual components and functions in isolation. For React components, we'll use React Testing Library to render components and test their behavior.

**IMPORTANT:** All external services (Supabase, Google Places API, OpenRouter, Gemini, Perplexity, etc.) MUST be mocked in unit tests. No unit test should ever make real API calls or database connections.

#### Mocking External Services

```typescript
// Example of mocking Supabase client
jest.mock('../lib/supabase', () => ({
  createClient: jest.fn().mockReturnValue({
    from: jest.fn().mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          data: [{ id: 1, name: 'Test City' }],
          error: null
        })
      })
    }),
    // Add other mocked methods as needed
  })
}));

// Example of mocking Google Places API
jest.mock('../lib/api/googlePlaces', () => ({
  searchGooglePlaces: jest.fn().mockResolvedValue([
    { name: 'Test Business', place_id: 'test123', /* other fields */ }
  ])
}));

// Example of mocking LLM services
jest.mock('../lib/api/openRouterSearch', () => ({
  enrichWithOpenRouter: jest.fn().mockResolvedValue({
    enriched_data: { /* mock enriched data */ },
    error: null
  })
}));
```

#### Test Structure

```typescript
// Example unit test structure
import { render, screen, fireEvent } from '@testing-library/react';
import Component from '../path/to/component';

describe('Component Name', () => {
  test('should render correctly', () => {
    render(<Component />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  test('should handle user interaction', () => {
    render(<Component />);
    fireEvent.click(screen.getByRole('button', { name: 'Button Text' }));
    expect(screen.getByText('Result Text')).toBeInTheDocument(); 
  });
});
```

### Integration Testing

Integration tests verify that different parts of the application work together correctly. These tests will focus on the interaction between components and external services like Supabase and API endpoints.

> **IMPORTANT:** Even in integration tests, external services should be mocked at the network boundary. Use tools like Mock Service Worker (MSW) to intercept network requests rather than making real API calls.

#### Mocking in Integration Tests vs. Unit Tests

The key difference in mocking between unit tests and integration tests:

- **Unit Tests**: Mock at the module level (using `jest.mock()`) to isolate the specific component or function being tested
- **Integration Tests**: Mock at the network boundary (using MSW or similar) to test how components interact with each other while still preventing real external API calls

```typescript
// Example of setting up MSW for integration tests
import { rest } from 'msw';
import { setupServer } from 'msw/node';

// Setup mock server
const server = setupServer(
  // Mock Supabase API responses
  rest.get('https://your-supabase-url.supabase.co/rest/v1/cities', (req, res, ctx) => {
    return res(ctx.json([
      { id: 1, name: 'San Francisco', name_new: 'san-francisco' },
      { id: 2, name: 'Los Angeles', name_new: 'los-angeles' }
    ]));
  }),

  // Mock Google Places API
  rest.get('https://maps.googleapis.com/maps/api/place/*', (req, res, ctx) => {
    return res(ctx.json({
      results: [
        { name: 'Test Business', place_id: 'test123', /* other fields */ }
      ]
    }));
  }),

  // Mock OpenRouter API
  rest.post('https://openrouter.ai/api/*', (req, res, ctx) => {
    return res(ctx.json({
      choices: [{
        message: {
          content: JSON.stringify({ /* mock enriched data */ })
        }
      }]
    }));
  })
);

// Start server before all tests
beforeAll(() => server.listen());
// Reset handlers after each test
afterEach(() => server.resetHandlers());
// Close server after all tests
afterAll(() => server.close());
```

### Manual Testing

Manual testing is essential for verifying the user experience and functionality of the admin interface. Follow these steps for each admin route:

#### Main Admin Dashboard (`/admin`)

1. Navigate to `http://localhost:8888/admin`
2. Verify that the dashboard loads correctly
3. Check that all navigation links work
4. Verify that the dashboard displays the correct statistics
5. Test responsive behavior on different screen sizes

#### Batch Process (`/admin/batch-process`)

1. Navigate to `http://localhost:8888/admin/batch-process`
2. Verify that the batch process form loads correctly
3. Test starting a batch process with valid inputs
4. Verify that the process status updates correctly
5. Test error handling with invalid inputs
6. Verify that the process can be cancelled
7. Check that the results are displayed correctly

#### Cities Management (`/admin/cities`)

1. Navigate to `http://localhost:8888/admin/cities`
2. Verify that the cities table loads correctly
3. Test adding a new city
4. Test editing an existing city
5. Test deleting a city
6. Test searching for cities
7. Test pagination
8. Verify that error messages are displayed correctly

#### Businesses Management (`/admin/businesses`)

1. Navigate to `http://localhost:8888/admin/businesses`
2. Verify that the businesses table loads correctly
3. Test adding a new business
4. Test editing an existing business
5. Test deleting a business
6. Test searching for businesses
7. Test filtering businesses by city
8. Test pagination
9. Verify that error messages are displayed correctly

#### Enrich Businesses (`/admin/enrich-businesses`)

1. Navigate to `http://localhost:8888/admin/enrich-businesses`
2. Verify that the enrichment form loads correctly
3. Test selecting a business to enrich
4. Test selecting an enrichment source (OpenRouter, Gemini, Perplexity)
5. Test generating enriched content
6. Test previewing enriched content
7. Test editing enriched content
8. Test saving enriched content
9. Verify that error messages are displayed correctly

## Test Reporting

For each test, document:

1. Test name and description
2. Steps to reproduce
3. Expected result
4. Actual result
5. Pass/Fail status
6. Any issues or bugs found
7. Screenshots (if applicable)

## Conclusion

Following this testing plan will ensure that all admin subroutes are thoroughly tested and function correctly. Regular testing should be performed after any changes to the admin interface to maintain reliability and functionality.
