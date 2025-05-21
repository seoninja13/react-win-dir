# Image Generation with Google's Imagen 3.0

This script generates high-quality images using Google's Imagen 3.0 model through the Gemini API.

## Features

- Generate multiple images with a single prompt
- Customize image dimensions
- Control safety filters and person generation settings
- Save images with timestamps for easy organization
- Command-line interface for easy use

## Prerequisites

1. Node.js 16+ installed
2. Google API key with access to the Gemini API
3. `@google/genai` package installed

## Installation

1. Install the required dependencies:
   ```bash
   npm install @google/genai dotenv
   ```

2. Create a `.env` file in your project root with your API key:
   ```
   GOOGLE_API_KEY=your_api_key_here
   ```

## Usage

### Basic Usage

```bash
# Generate images with default settings
node scripts/generate-images.js "A futuristic cityscape at sunset"
```

### Advanced Usage

```javascript
// Example with custom options
const options = {
  numberOfImages: 4,      // Number of images to generate (1-4)
  width: 1024,          // Image width in pixels
  height: 1024,         // Image height in pixels
  seed: 42,             // Optional seed for reproducible results
  safetyFilterLevel: 'block_few',  // 'block_few' | 'block_some' | 'block_most' | 'block_none'
  personGeneration: 'dont_allow'  // 'dont_allow' | 'allow_adult' | 'allow_all'
};

// Generate images with custom options
generateImages("A beautiful landscape with mountains and a lake", options);
```

## Output

Generated images are saved to the `generated-images` directory in your project root with filenames in the format:
```
imagen-YYYY-MM-DDTHH-MM-SS-SSS-Z-1.png
imagen-YYYY-MM-DDTHH-MM-SS-SSS-Z-2.png
...
```

## Error Handling

The script includes comprehensive error handling for:
- Missing API key
- Invalid API responses
- File system errors
- API rate limits and quotas

## Best Practices

1. **Prompt Engineering**: Be specific and detailed in your prompts for best results.
2. **Rate Limiting**: Be mindful of API rate limits (50 requests per minute for Imagen 3.0).
3. **Safety Filters**: Adjust safety filters based on your use case.
4. **Output Directory**: The script creates a `generated-images` directory if it doesn't exist.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
