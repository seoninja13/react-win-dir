# Image Generation Test Suite

This test suite verifies the functionality of the Google Imagen 3.0 image generation API by running various test cases with different prompts and configurations.

## Features

- Multiple test categories (basic, different prompts, configurations, edge cases)
- Detailed test reporting with statistics
- Colorized console output for better readability
- Progress indicators for long-running tests
- Automatic rate limiting to avoid API quota issues
- Comprehensive error handling and reporting

## Test Categories

### 1. Basic Prompt with Default Options

Tests the most basic usage with a simple prompt and default settings.

### 2. Different Prompts with Default Options

Tests various prompt styles and subjects to ensure the model handles different types of requests.

### 3. Different Configurations

Tests various image generation configurations including:

- Different aspect ratios (landscape, portrait, square)
- Various image sizes
- Different safety filter levels
- Person generation settings

### 4. Edge Cases

Tests edge cases such as:

- Minimum image size (256x256)
- Large image sizes (up to 2048x2048)
- Special characters in prompts
- Long prompts

## Usage

### Run All Tests

```bash
npm run test:image-gen
```

### Run Specific Test

To run a specific test, modify the `runAllTests` function in `test-image-generation.js` to only include the desired test case.

## Output

- Test results are displayed in the console with color-coded status
- Generated images are saved in the `generated-images` directory
- A summary report is displayed at the end of the test run

## Configuration

You can modify the following in the test script:

1. `testPrompts` - Add or modify test prompts
2. `testConfigs` - Adjust test configurations
3. `runAllTests` - Customize which tests to run

## Running the Tests

```bash
npm run test:image-gen
```

## Viewing Results

Generated images are saved in the `generated-images` directory with timestamps and metadata.

## Dependencies

- `ora` - For spinner animations
- `chalk` - For colored console output
- `@google/genai` - Google's GenAI SDK

## Best Practices

1. **Rate Limiting**: The script includes built-in rate limiting to stay within API quotas
2. **Error Handling**: Each test is isolated to prevent one failure from affecting others
3. **Progress Feedback**: Visual indicators show test progress
4. **Resource Management**: Proper cleanup of resources after tests complete

## Troubleshooting

If you encounter issues:

1. Check your API key in the `.env` file
2. Verify your internet connection
3. Check the Google Cloud Console for any quota issues
4. Review the error messages in the console output

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
