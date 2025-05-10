# Water Damage CA - Testing Workflow

This document outlines the testing workflow for the Water Damage CA project, including best practices, tools, and processes for ensuring code quality.

## Testing Philosophy

Our testing approach follows these key principles:

1. **Test-Driven Development (TDD)** - Write tests before implementing features when possible
2. **Component Testing** - Test individual components in isolation
3. **Integration Testing** - Test how components work together
4. **Automated Testing** - Automate tests to run on every code change
5. **Continuous Testing** - Run tests after each feature implementation
6. **Coverage Goals** - Aim for at least 80% code coverage for critical components

## Testing Tools

The project uses the following testing tools:

- **Jest** - JavaScript testing framework for unit and integration tests
- **React Testing Library** - For testing React components
- **Jest DOM** - Custom matchers for DOM testing
- **Jest Mock** - For mocking external dependencies and services
- **Cypress** (planned) - For end-to-end testing

## Testing Workflow

### 1. Component Development Workflow

For each new component, follow this workflow:

1. **Define Requirements**: Clearly define what the component should do
2. **Create Test File**: Create a test file in the `__tests__/components` directory
3. **Write Tests**: Write tests for the component's functionality
4. **Implement Component**: Implement the component to pass the tests
5. **Refactor**: Refactor the component and tests as needed
6. **Document**: Document the component's functionality and testing approach

### 2. Utility Function Testing Workflow

For utility functions, follow this workflow:

1. **Define Function Signature**: Define the function's input and output
2. **Create Test File**: Create a test file in the `__tests__/lib` directory
3. **Write Tests**: Write tests for the function's behavior
4. **Implement Function**: Implement the function to pass the tests
5. **Edge Cases**: Add tests for edge cases and error handling
6. **Document**: Document the function's purpose and usage

### 3. MCP Server Testing Workflow

For MCP servers, follow this workflow:

1. **Define Server Capabilities**: Define what tools the server should provide
2. **Create Test Files**: Create test files in the `__tests__/mcp` directory
3. **Write Configuration Tests**: Test the server configuration in .mcp.json
4. **Write API Tests**: Test the server's API functionality with mocks
5. **Write Integration Tests**: Test the MCP protocol communication
6. **Create Test Runners**: Create batch files for easy test execution
7. **Document**: Document the server's functionality and testing approach

### 4. Running Tests

Tests can be run using the following npm scripts:

- `npm test`: Run all tests
- `npm run test:watch`: Run tests in watch mode
- `npm run test:coverage`: Run tests with coverage report

For specific test suites, use patterns:

- `npm test -- --testPathPattern=__tests__/components`: Run component tests
- `npm test -- --testPathPattern=__tests__/lib`: Run utility function tests
- `npm test -- --testPathPattern=__tests__/mcp`: Run MCP server tests

### 5. Running Tests After Each Feature Implementation

After implementing each feature, follow these steps:

1. **Run Unit Tests**:
   ```bash
   npm test
   ```
   or for a specific test file:
   ```bash
   npm test -- __tests__/path/to/test.test.ts
   ```

2. **Verify Test Coverage**:
   ```bash
   npm run test:coverage
   ```

3. **Fix Any Failing Tests**:
   - Address test failures immediately
   - Do not proceed to the next feature until all tests pass
   - Document any known issues that cannot be immediately resolved

4. **Update Documentation**:
   - Mark the feature as tested in the tracking-progress.md file
   - Document any special testing considerations for the feature

5. **Commit Code with Test Results**:
   ```bash
   git commit -m "Implemented [Feature Name] with passing tests"
   ```

## Test Structure

### Component Tests

Component tests should verify:

1. **Rendering**: The component renders correctly
2. **Props**: The component handles props correctly
3. **User Interaction**: The component responds to user interactions
4. **State Changes**: The component updates state correctly
5. **Error Handling**: The component handles errors gracefully

Example component test structure:

```javascript
describe('ComponentName', () => {
  it('renders correctly', () => {
    // Test rendering
  });

  it('handles props correctly', () => {
    // Test props
  });

  it('responds to user interactions', () => {
    // Test user interactions
  });

  it('handles errors gracefully', () => {
    // Test error handling
  });
});
```

### Utility Function Tests

Utility function tests should verify:

1. **Correct Output**: The function returns the expected output for valid input
2. **Error Handling**: The function handles invalid input gracefully
3. **Edge Cases**: The function handles edge cases correctly

Example utility function test structure:

```javascript
describe('functionName', () => {
  it('returns expected output for valid input', () => {
    // Test valid input
  });

  it('handles invalid input gracefully', () => {
    // Test invalid input
  });

  it('handles edge cases correctly', () => {
    // Test edge cases
  });
});
```

## Mocking External Dependencies

When testing components or functions that depend on external services (like Supabase), use Jest's mocking capabilities:

```javascript
// Mock Supabase client
jest.mock('@/lib/supabase-client', () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    insert: jest.fn().mockResolvedValue({ data: {}, error: null }),
  },
}));
```

## Test Coverage

We aim for the following test coverage goals:

- **Critical Components**: 80%+ coverage
- **Utility Functions**: 90%+ coverage
- **UI Components**: 70%+ coverage

Run `npm run test:coverage` to generate a coverage report.

## Continuous Integration

In the future, we plan to implement continuous integration to automatically run tests on every pull request and push to the main branch.

## Testing Roadmap

### Phase 1: Unit Testing (Current)

- Implement tests for all core UI components
- Achieve 70%+ coverage for critical components
- Document testing best practices
- **COMPLETED**: SEO unit tests for metadata, schema markup, and URL structure
- **COMPLETED**: Brave Search MCP server unit and integration tests

### Phase 2: Integration Testing (REQUIRED - Priority 4)

- Set up Cypress for integration testing
- Implement tests for key user flows
- Test API integrations with Supabase
- **MANDATORY REQUIREMENT**: Integration tests must be implemented for all critical features
- Integration tests for SEO elements (verifying proper rendering in HTML)

### Phase 3: End-to-End Testing (REQUIRED - Priority 5)

- Implement end-to-end tests for complete user journeys
- Test all critical business processes
- Verify application behavior in realistic scenarios
- **MANDATORY REQUIREMENT**: End-to-end tests must be implemented for all critical user flows
- End-to-end tests for SEO verification (using headless browser)
- Performance tests for SEO impact on page load
- Set up automated testing in CI/CD pipeline
- Implement visual regression testing

## Example Tests

### Component Test Example

See the following examples of component tests:

- `__tests__/components/GoogleBusinessProfile.test.tsx` - Testing a complex business profile component
- `__tests__/components/HomeImage.test.tsx` - Testing an image component with API integration
- `__tests__/components/ServiceImage.test.tsx` - Testing a service-specific image component

### Utility Function Test Example

See `__tests__/lib/service-city.test.ts` and `__tests__/lib/business.test.ts` for examples of utility function tests.

## Best Practices

1. **Keep Tests Fast**: Tests should run quickly to encourage frequent testing
2. **Independent Tests**: Tests should not depend on each other
3. **Readable Tests**: Tests should be easy to read and understand
4. **Test Behavior, Not Implementation**: Test what the code does, not how it does it
5. **Don't Test Third-Party Code**: Focus on testing your own code
6. **Use Descriptive Test Names**: Test names should describe what is being tested
7. **Mock External Dependencies**: Use mocks for external services
8. **Test Edge Cases**: Test boundary conditions and error cases
