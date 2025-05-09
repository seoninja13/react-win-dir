# Admin Subroutes Testing Plan

## Overview

This document outlines a comprehensive testing strategy for all admin subroutes in the Water Damage CA project. The plan includes unit tests, integration tests, and manual testing procedures to ensure the reliability and functionality of the admin interface.

## Routes to Test

1. **Main Admin Dashboard** (`/admin`)
2. **Batch Process** (`/admin/batch-process`)
3. **Cities Management** (`/admin/cities`)
4. **Businesses Management** (`/admin/businesses`)
5. **Enrich Businesses** (`/admin/enrich-businesses`)

## Testing Approach

### Unit Testing

Unit tests focus on testing individual components and functions in isolation. For React components, we'll use React Testing Library to render components and test their behavior.

> **IMPORTANT:** All external services (Supabase, Google Places API, OpenRouter, Gemini, Perplexity, etc.) MUST be mocked in unit tests. No unit test should ever make real API calls or database connections.

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

#### Test Structure

```typescript
// Example integration test structure
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Component from '../path/to/component';

// Mock server setup
const server = setupServer(
  rest.get('/api/endpoint', (req, res, ctx) => {
    return res(ctx.json({ data: 'mock data' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Component Integration', () => {
  test('should fetch and display data', async () => {
    render(<Component />);
    await waitFor(() => {
      expect(screen.getByText('mock data')).toBeInTheDocument();
    });
  });
});
```

### Manual Testing

Manual testing involves human testers interacting with the application to verify functionality, usability, and visual appearance. We'll create detailed checklists for each route.

## Detailed Testing Plan by Route

### 1. Main Admin Dashboard (`/admin`)

#### Unit Tests

| Test Case | Description | Priority |
|-----------|-------------|----------|
| Render AdminLayout | Verify the AdminLayout component renders correctly | High |
| Sidebar Navigation | Test that sidebar links are rendered correctly | High |
| Active Route Highlighting | Verify the active route is highlighted in the sidebar | Medium |
| ConfigProvider | Test that the ConfigProvider is configured correctly | Medium |

#### Integration Tests

| Test Case | Description | Priority |
|-----------|-------------|----------|
| Navigation Flow | Test navigation between dashboard and subroutes | High |
| Layout with Children | Verify layout correctly renders child components | Medium |

#### Manual Testing Checklist

- [ ] Dashboard loads without errors
- [ ] All navigation links are visible
- [ ] Clicking each link navigates to the correct route
- [ ] Layout is responsive on different screen sizes
- [ ] Active route is highlighted in the sidebar
- [ ] Sidebar collapses correctly on mobile devices

### 2. Batch Process (`/admin/batch-process`)

#### Unit Tests

| Test Case | Description | Priority |
|-----------|-------------|----------|
| Render BatchProcessPage | Verify the BatchProcessPage component renders correctly | High |
| City Search Validation | Test validation of city search input | High |
| Status Display | Test the display of batch processing status | Medium |
| Form Submission | Test form submission handling | High |
| Utility Functions | Test individual utility functions in batchProcessor.ts | Medium |

#### Integration Tests

| Test Case | Description | Priority |
|-----------|-------------|----------|
| Google Places API | Test integration with Google Places API | High |
| Supabase Integration | Test saving data to Supabase | High |
| OpenRouter Integration | Test enrichment with OpenRouter | Medium |
| End-to-End Flow | Test the complete batch processing flow | High |

#### Manual Testing Checklist

- [ ] Batch process page loads without errors
- [ ] City search input accepts valid city names
- [ ] Validation errors are displayed for invalid inputs
- [ ] Batch processing starts when form is submitted
- [ ] Progress indicators show current status
- [ ] Results are displayed after processing completes
- [ ] Error messages are displayed when processing fails
- [ ] Data is correctly saved to the database

### 3. Cities Management (`/admin/cities`)

#### Unit Tests

| Test Case | Description | Priority |
|-----------|-------------|----------|
| Render CitiesPage | Verify the CitiesPage component renders correctly | High |
| City List Rendering | Test that the city list renders correctly | High |
| Add City Form | Test the Add City form validation | High |
| Edit City Form | Test the Edit City form validation | High |
| Delete Confirmation | Test the delete confirmation dialog | Medium |
| Search Functionality | Test the city search functionality | Medium |

#### Integration Tests

| Test Case | Description | Priority |
|-----------|-------------|----------|
| Fetch Cities | Test fetching cities from Supabase | High |
| Add City | Test adding a new city to the database | High |
| Edit City | Test editing an existing city | High |
| Delete City | Test deleting a city from the database | High |
| Search Integration | Test search functionality with database queries | Medium |

#### Manual Testing Checklist

- [ ] Cities page loads without errors
- [ ] City list displays all cities from the database
- [ ] Add City button opens the form modal
- [ ] Form validation works for required fields
- [ ] New city is added to the database when form is submitted
- [ ] Edit button opens the form modal with city data
- [ ] City data is updated when edit form is submitted
- [ ] Delete button shows confirmation dialog
- [ ] City is removed from the database when delete is confirmed
- [ ] Search functionality filters the city list correctly

### 4. Businesses Management (`/admin/businesses`)

#### Unit Tests

| Test Case | Description | Priority |
|-----------|-------------|----------|
| Render BusinessesPage | Verify the BusinessesPage component renders correctly | High |
| Business List Rendering | Test that the business list renders correctly | High |
| Add Business Form | Test the Add Business form validation | High |
| Edit Business Form | Test the Edit Business form validation | High |
| Delete Confirmation | Test the delete confirmation dialog | Medium |
| Search Functionality | Test the business search functionality | Medium |
| Filter by City | Test filtering businesses by city | Medium |

#### Integration Tests

| Test Case | Description | Priority |
|-----------|-------------|----------|
| Fetch Businesses | Test fetching businesses from Supabase | High |
| Add Business | Test adding a new business to the database | High |
| Edit Business | Test editing an existing business | High |
| Delete Business | Test deleting a business from the database | High |
| Search Integration | Test search functionality with database queries | Medium |
| Place ID Handling | Test place_id handling with Google Places API | High |

#### Manual Testing Checklist

- [ ] Businesses page loads without errors
- [ ] Business list displays all businesses from the database
- [ ] Add Business button opens the form modal
- [ ] Form validation works for required fields
- [ ] New business is added to the database when form is submitted
- [ ] Edit button opens the form modal with business data
- [ ] Business data is updated when edit form is submitted
- [ ] Delete button shows confirmation dialog
- [ ] Business is removed from the database when delete is confirmed
- [ ] Search functionality filters the business list correctly
- [ ] Filtering by city shows only businesses in that city

### 5. Enrich Businesses (`/admin/enrich-businesses`)

#### Unit Tests

| Test Case | Description | Priority |
|-----------|-------------|----------|
| Render EnrichBusinessesPage | Verify the EnrichBusinessesPage component renders correctly | High |
| Business Selection | Test the business selection functionality | High |
| Enrichment Source Selection | Test selecting different enrichment sources | High |
| Content Preview | Test the content preview functionality | Medium |
| Form Validation | Test form validation for required fields | High |

#### Integration Tests

| Test Case | Description | Priority |
|-----------|-------------|----------|
| Fetch Businesses | Test fetching businesses for enrichment | High |
| OpenRouter Integration | Test content generation with OpenRouter | High |
| Gemini Integration | Test content generation with Gemini | Medium |
| Perplexity Integration | Test content generation with Perplexity | Medium |
| Save Enriched Content | Test saving enriched content to the database | High |

#### Manual Testing Checklist

- [ ] Enrich Businesses page loads without errors
- [ ] Business selection dropdown shows all businesses
- [ ] Enrichment source selection works correctly
- [ ] Generate Content button triggers content generation
- [ ] Loading indicator is shown during content generation
- [ ] Generated content is displayed in the preview area
- [ ] Edit functionality allows modifying the generated content
- [ ] Save button stores the enriched content in the database
- [ ] Error messages are displayed when content generation fails
- [ ] Success message is shown when content is saved

## Test File Organization

We've set up the following test directory structure in the project:

```
water-damage-ca/
├── __tests__/
│   ├── unit/
│   │   ├── admin/
│   │   │   ├── AdminLayout.test.tsx
│   │   │   ├── batch-process/
│   │   │   │   ├── BatchProcessPage.test.tsx
│   │   │   │   └── components/
│   │   │   ├── cities/
│   │   │   │   ├── CitiesPage.test.tsx
│   │   │   │   └── components/
│   │   │   ├── businesses/
│   │   │   │   ├── BusinessesPage.test.tsx
│   │   │   │   └── components/
│   │   │   └── enrich-businesses/
│   │   │       ├── EnrichBusinessesPage.test.tsx
│   │   │       └── components/
│   │   └── lib/
│   │       ├── batchProcessor.test.ts
│   │       ├── supabase.test.ts
│   │       └── api/
│   └── integration/
│       ├── admin/
│       │   ├── batch-process.test.ts
│       │   ├── cities.test.ts
│       │   ├── businesses.test.ts
│       │   └── enrich-businesses.test.ts
│       └── api/
└── ...
```

This structure follows Jest's recommended pattern with a `__tests__` directory at the root of the project. The directory structure mirrors the application structure, making it easy to find tests for specific components.

> **IMPORTANT:** All tests are centralized in the `__tests__` directory at the root of the project. This is a deliberate design decision to keep all tests in a single location rather than spreading them across different feature directories. This approach makes it easier to find, manage, and run tests, and ensures consistent testing patterns across the project.

## Special Considerations for Testing LLM Services

Testing components that interact with LLM services (OpenRouter, Gemini, Perplexity) requires special attention:

### Mocking LLM Responses

```typescript
// Example of mocking OpenRouter response for enrichment
const mockEnrichedData = {
  business_description: "A professional water damage restoration company serving San Francisco.",
  services_offered: ["Water extraction", "Flood cleanup", "Mold remediation"],
  emergency_response: "24/7 emergency service available",
  service_areas: ["San Francisco", "Oakland", "Daly City"],
  // Add other fields as needed
};

// For unit tests
jest.mock('../lib/api/openRouterSearch', () => ({
  enrichWithOpenRouter: jest.fn().mockResolvedValue({
    enriched_data: mockEnrichedData,
    error: null
  })
}));

// For integration tests with MSW
rest.post('https://openrouter.ai/api/*', (req, res, ctx) => {
  return res(ctx.json({
    choices: [{
      message: {
        content: JSON.stringify(mockEnrichedData)
      }
    }]
  }));
});
```

### Testing Error Handling

It's important to test how components handle LLM service errors:

```typescript
// Test error handling in unit tests
jest.mock('../lib/api/openRouterSearch', () => ({
  enrichWithOpenRouter: jest.fn().mockRejectedValue(new Error('API rate limit exceeded'))
}));

// Test error handling in integration tests
server.use(
  rest.post('https://openrouter.ai/api/*', (req, res, ctx) => {
    return res(ctx.status(429), ctx.json({ error: 'API rate limit exceeded' }));
  })
);
```

### Testing Loading States

Test that components correctly show loading states while waiting for LLM responses:

```typescript
// Create a delayed mock response to test loading states
let resolveEnrichment;
const enrichmentPromise = new Promise(resolve => {
  resolveEnrichment = resolve;
});

jest.mock('../lib/api/openRouterSearch', () => ({
  enrichWithOpenRouter: jest.fn().mockReturnValue(enrichmentPromise)
}));

test('shows loading state while generating content', async () => {
  render(<EnrichBusinessComponent />);

  // Trigger content generation
  fireEvent.click(screen.getByRole('button', { name: 'Generate Content' }));

  // Check that loading indicator is shown
  expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

  // Resolve the promise to complete the test
  resolveEnrichment({ enriched_data: mockEnrichedData, error: null });

  // Wait for loading to complete
  await waitFor(() => {
    expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
  });
});
```

## Implementation Strategy

### Phase 1: Setup Testing Infrastructure

1. Configure Jest and React Testing Library
2. Set up mock services for Supabase and API endpoints
3. Create test utilities and helpers
4. Configure MSW for mocking network requests

### Phase 2: Unit Tests Implementation

1. Start with critical components (forms, lists)
2. Implement tests for utility functions
3. Focus on form validation and state management

### Phase 3: Integration Tests Implementation

1. Implement tests for database operations
2. Test API integrations
3. Verify end-to-end flows

### Phase 4: Manual Testing

1. Create detailed checklists for each route
2. Perform manual testing following the checklists
3. Document any issues found

### Phase 5: Bug Fixes and Improvements

1. Fix issues identified during testing
2. Implement improvements based on testing feedback
3. Run regression tests to verify fixes

## Test Coverage Goals

- Unit Tests: 80%+ coverage for component logic
- Integration Tests: 70%+ coverage for critical paths
- All error handling and edge cases covered

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Mock Service Worker](https://mswjs.io/docs/)
- [Testing Next.js Applications](https://nextjs.org/docs/testing)

## Conclusion

This testing plan provides a comprehensive approach to ensuring the quality and reliability of the admin subroutes in the Water Damage CA project. By implementing unit tests, integration tests, and following manual testing checklists, we can identify and fix issues early in the development process.

The centralized testing approach with all tests in the `__tests__` directory ensures consistency and maintainability. This organization makes it easier to run tests, track coverage, and onboard new developers to the testing process.

The plan is designed to be flexible and can be adjusted as needed based on project priorities and timelines. Regular updates to the testing documentation will help track progress and ensure all critical functionality is thoroughly tested.
