# Water Damage CA Testing Guide

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Testing](./index.md) > Testing Guide

This guide provides comprehensive instructions for testing all aspects of the Water Damage CA application.

## Testing Philosophy

Our testing approach follows these principles:

1. **Test-Driven Development**: Write tests before implementing features when possible
2. **Comprehensive Coverage**: Aim for high test coverage across all components and functions
3. **Realistic Testing**: Test components with realistic props and user interactions
4. **Maintainable Tests**: Write clear, concise tests that are easy to understand and maintain

## Testing Levels

The project implements testing at multiple levels:

1. **Unit Tests**: Test individual components and functions in isolation
2. **Integration Tests**: Test interactions between components and services
3. **End-to-End Tests**: Test complete user flows and application behavior

> **IMPORTANT REQUIREMENT**: Integration tests and end-to-end tests must be implemented for all critical features and user flows. This is a mandatory requirement for the project and should be prioritized after unit tests are completed.

## Unit Testing

### Component Testing

For each React component, we create a test file with the following structure:

```typescript
/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ComponentName from '@/components/ComponentName';

// Mock dependencies as needed

describe('ComponentName', () => {
  // Test rendering
  it('renders correctly', () => {
    render(<ComponentName />);
    // Assertions
  });

  // Test props
  it('handles props correctly', () => {
    render(<ComponentName prop1="value1" prop2="value2" />);     
    // Assertions
  });

  // Test user interactions
  it('responds to user interactions', () => {
    render(<ComponentName />);
    fireEvent.click(screen.getByRole('button'));
    // Assertions
  });

  // Test error handling
  it('handles errors gracefully', () => {
    render(<ComponentName error={new Error('Test error')} />);   
    // Assertions
  });
});
```

### Utility Function Testing

For utility functions, we create a test file with the following structure:

```typescript
import { functionName } from '@/lib/module';

describe('functionName', () => {
  it('returns expected result for valid input', () => {
    const result = functionName(validInput);
    expect(result).toEqual(expectedOutput);
  });

  it('handles edge cases correctly', () => {
    const result = functionName(edgeCaseInput);
    expect(result).toEqual(expectedOutput);
  });

  it('throws error for invalid input', () => {
    expect(() => functionName(invalidInput)).toThrow();
  });
});
```

### Mocking Dependencies

When testing components that depend on external services or APIs, we use Jest's mocking capabilities:

```typescript
// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

// Mock fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ data: 'mocked data' }),        
  })
) as jest.Mock;

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });
```

## Running Tests

### Running All Tests

```bash
npm run test
```

### Running Tests with Coverage

```bash
npm run test:coverage
```

### Running a Specific Test File

```bash
npm run test -- -t "ComponentName"
```

### Running Tests in Watch Mode

```bash
npm run test:watch
```

### Testing in Production-like Environment

**IMPORTANT**: For manual testing, especially of admin routes and production-like behavior, always use Netlify Dev on port 8888 instead of the Next.js development server on port 3000.

```bash
netlify dev
```

This ensures that your testing environment closely matches the production environment. For detailed instructions, see the [Netlify Dev Testing](./netlify-dev-testing.md) guide.

## Integration Testing

Integration tests verify that different parts of the application work together correctly. We use Cypress for integration testing. 

### Setting Up Cypress

```bash
npm install --save-dev cypress
```

### Writing Integration Tests

Integration tests are located in the `cypress/integration` directory and follow this structure:

```typescript
describe('Feature Name', () => {
  beforeEach(() => {
    cy.visit('/path-to-feature');
  });

  it('performs expected action', () => {
    cy.get('[data-testid="element"]').click();
    cy.url().should('include', '/expected-path');
    cy.get('[data-testid="result"]').should('contain', 'Expected Result');
  });
});
```

## End-to-End Testing

End-to-end tests verify that the entire application works correctly from the user's perspective. We use Cypress for end-to-end testing as well.

### Writing End-to-End Tests

End-to-end tests are located in the `cypress/e2e` directory and follow this structure:

```typescript
describe('User Flow', () => {
  it('completes the expected flow', () => {
    cy.visit('/');
    cy.get('[data-testid="search-input"]').type('Los Angeles');  
    cy.get('[data-testid="search-button"]').click();
    cy.url().should('include', '/search-results');
    cy.get('[data-testid="result-item"]').first().click();       
    cy.url().should('include', '/business-details');
    cy.get('[data-testid="contact-button"]').click();
    cy.get('[data-testid="success-message"]').should('be.visible');
  });
});
```

## Testing Best Practices

1. **Test Behavior, Not Implementation**: Focus on what the component does, not how it does it
2. **Use Realistic Test Data**: Use realistic props and state that match what the component will encounter in production
3. **Test Edge Cases**: Test boundary conditions and error states
4. **Keep Tests Independent**: Each test should be able to run independently of others
5. **Use Descriptive Test Names**: Test names should clearly describe what is being tested
6. **Avoid Testing Implementation Details**: Test the public API of components, not internal implementation details
7. **Use Testing Library Queries Appropriately**: Prefer queries that reflect how users interact with the application

## Troubleshooting Common Issues

### Tests Failing Due to Async Operations

Use `waitFor` to wait for async operations to complete:

```typescript
await waitFor(() => {
  expect(screen.getByText('Loaded Data')).toBeInTheDocument();   
});
```

### Tests Failing Due to Missing DOM Elements

Check that you're using the correct query method:

```typescript
// If the element might not be present immediately
await screen.findByText('Text to find');

// If the element should be present immediately
screen.getByText('Text to find');

// If you're not sure if the element exists
screen.queryByText('Text to find');
```

### Tests Failing Due to Mocking Issues

Ensure mocks are properly set up and cleared between tests:      

```typescript
beforeEach(() => {
  jest.clearAllMocks();
});
```

## Continuous Integration

Tests are automatically run on pull requests and commits to the main branch using GitHub Actions. The workflow is defined in `.github/workflows/test.yml`.

## Test Coverage Goals

- **Unit Tests**: 80% coverage of all components and utility functions
- **Integration Tests**: Cover all major user flows and interactions
- **End-to-End Tests**: Cover critical user journeys and business processes

## Adding New Tests

When adding new features or components, follow these steps:

1. Create a new test file in the appropriate directory
2. Write tests for all component props and behaviors
3. Run the tests to ensure they pass
4. Check test coverage to ensure adequate coverage
5. Update documentation if necessary

## Related Documentation

- [Netlify Dev Testing](./netlify-dev-testing.md)
- [Admin Subroutes Testing](./admin-subroutes-testing.md)
- [Logging and Diagnostics](./logging-and-diagnostics.md)
- [Admin Dashboard](../features/admin-dashboard.md)
- [Admin Batch Process](../processes/admin-batch-process.md)

## Conclusion

Following these testing guidelines will help ensure that the Water Damage CA application remains stable, reliable, and maintainable as it evolves.

Last Updated: April 22, 2025
