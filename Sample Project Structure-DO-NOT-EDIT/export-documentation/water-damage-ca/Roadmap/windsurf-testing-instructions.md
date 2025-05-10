# Windsurf Testing Instructions

## Automated Testing After Feature Implementation

This document provides instructions for configuring Windsurf to run tests automatically after each feature implementation in the Water Damage CA project.

### 1. Test Execution Configuration

Add the following configuration to your `.windsurfrules` file to ensure tests are run after each feature implementation:

```json
{
  "post_feature_implementation": {
    "run_tests": true,
    "test_command": "npm test",
    "coverage_command": "npm run test:coverage",
    "fail_on_test_failure": true,
    "update_documentation": true
  }
}
```

### 2. Test Documentation Configuration

Add this section to ensure proper documentation of test results:

```json
{
  "test_documentation": {
    "update_tracking_progress": true,
    "tracking_file": "Roadmap/tracking-progress.md",
    "test_results_format": "markdown",
    "include_coverage_metrics": true
  }
}
```

### 3. Automated Test Workflow

When implementing a new feature with Windsurf, the following workflow will be executed:

1. Feature implementation is completed
2. Tests are automatically run using `npm test`
3. If tests pass:
   - Coverage report is generated
   - Documentation is updated
   - Feature is marked as completed
4. If tests fail:
   - Error report is generated
   - Feature is marked as incomplete
   - Developer is notified of failing tests

### 4. Manual Test Execution

If you need to manually run tests during development:

```bash
# Run all tests
npm test

# Run tests for a specific file
npm test -- __tests__/path/to/test.test.ts

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### 5. Test Requirements

For each feature implementation, the following tests should be created:

1. **Unit Tests**: Test individual functions and components
2. **Integration Tests**: Test how components work together
3. **Edge Case Tests**: Test boundary conditions and error handling

### 6. Test Documentation Requirements

After tests are run, document the following in the tracking-progress.md file:

1. Test results (pass/fail)
2. Coverage metrics
3. Any known issues or limitations
4. Special testing considerations for the feature

### 7. Example Windsurf Test Configuration

Here's a complete example of a Windsurf configuration for testing:

```json
{
  "project": {
    "name": "Water Damage CA",
    "test_framework": "jest"
  },
  "testing": {
    "post_feature_implementation": {
      "run_tests": true,
      "test_command": "npm test",
      "coverage_command": "npm run test:coverage",
      "fail_on_test_failure": true,
      "update_documentation": true
    },
    "test_documentation": {
      "update_tracking_progress": true,
      "tracking_file": "Roadmap/tracking-progress.md",
      "test_results_format": "markdown",
      "include_coverage_metrics": true
    },
    "test_thresholds": {
      "overall_coverage": 85,
      "component_coverage": 90,
      "utility_coverage": 95,
      "api_coverage": 85
    }
  }
}
```

### 8. Troubleshooting Common Test Issues

If you encounter issues with tests in Windsurf:

1. **Tests not running automatically**:
   - Check the `.windsurfrules` configuration
   - Ensure test commands are correct
   - Verify test files are in the correct location

2. **Tests failing unexpectedly**:
   - Check for environment-specific issues
   - Verify mock data and dependencies
   - Look for timing issues in async tests

3. **Documentation not updating**:
   - Check file paths in the configuration
   - Ensure documentation format is correct
   - Verify permissions for file writing

By following these instructions, you'll ensure that all features are properly tested and documented as part of the Windsurf development workflow.
