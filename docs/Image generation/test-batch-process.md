# Test Batch Image Generation Process

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Image Generation](./index.md) > Test Batch Process

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Test CSV Structure](#test-csv-structure)
4. [Implementation Details](#implementation-details)
5. [Running the Test Batch](#running-the-test-batch)
6. [Reviewing Results](#reviewing-results)
7. [Troubleshooting](#troubleshooting)
8. [Next Steps](#next-steps)
9. [Related Documentation](#related-documentation)

## Overview

The Test Batch Image Generation Process is a small-scale test of the Google Generative AI integration for generating images using Vertex AI. This process uses a test CSV file with 5 representative entries from the Window World LA website to generate images and save them to Supabase Storage.

This test batch approach allows us to:

- Verify the Vertex AI integration works correctly
- Test the image generation quality with real prompts
- Ensure the Supabase storage integration functions properly
- Identify any issues or bottlenecks before scaling up

## Prerequisites

Before running the test batch process, ensure you have:

1. Google Cloud account with Vertex AI API enabled
2. Google Cloud project with billing enabled
3. Google Cloud API key with access to Generative AI APIs
4. Supabase project with Storage enabled
5. Environment variables properly configured in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
GEMINI_API_KEY=your-gemini-api-key-here
GOOGLE_CLOUD_PROJECT=your-google-cloud-project-id
GOOGLE_CLOUD_LOCATION=your-google-cloud-location
GOOGLE_GENAI_USE_VERTEXAI=true
```

## Test CSV Structure

The test CSV file contains 5 representative entries from different page types on the Window World LA website:

1. **Homepage**: Main landing page
2. **Product Category**: Windows category page
3. **Product Detail**: Double-hung windows product page
4. **Informational**: About Us page
5. **Gallery**: Gallery page

Each entry includes:

- Original URL from Window World LA
- Target URL for Windows Doors CA
- Image type (homepage, product_category, product_detail, etc.)
- Prompt for image generation

The test CSV is located at: `Supabase/test-data/test-images.csv`

## Implementation Details

The test batch process is implemented using the following components:

1. **CSV Parser**: Reads and processes the test CSV file
2. **Image Generation Utilities**: Uses Vertex AI to generate images from prompts
3. **Supabase Storage Integration**: Saves generated images to Supabase
4. **Batch Processing Script**: Orchestrates the entire process

### Key Files

- `Supabase/utils/batch-image-generation.ts`: Main batch processing utility
- `Supabase/utils/image-generation.ts`: Image generation utilities
- `Supabase/utils/storage.ts`: Supabase storage utilities
- `Supabase/scripts/run-test-batch.ts`: Script to run the test batch
- `Supabase/scripts/check-bucket.ts`: Script to check/create Supabase bucket

## Running the Test Batch

To run the test batch process:

1. Ensure all prerequisites are met
2. Check if the Supabase bucket exists:

   ```bash
   npm run check-bucket
   ```

3. Run the test batch:

   ```bash
   npm run generate-test-images
   ```

The process will:

1. Read the test CSV file
2. Generate images using Vertex AI for each entry
3. Save the generated images to Supabase Storage
4. Create a JSON file with the results at `Supabase/test-data/generation-results.json`

## Reviewing Results

After running the test batch, review the results:

1. Check the console output for any errors or warnings
2. Review the generated images in Supabase Storage
3. Analyze the `generation-results.json` file for details on each generation
4. Evaluate the quality of the generated images
5. Note any issues or areas for improvement

## Troubleshooting

### Common Issues

1. **Authentication Errors**:
   - Verify Google Cloud credentials are correctly configured
   - Check Supabase credentials in `.env.local`

2. **Image Generation Failures**:
   - Check if prompts are too complex or contain prohibited content
   - Verify Vertex AI API is enabled and accessible

3. **Supabase Storage Issues**:
   - Ensure the bucket exists and is accessible
   - Check if storage permissions are correctly configured

## Next Steps

After successfully running the test batch and reviewing the results:

1. Make any necessary adjustments to the process
2. Refine prompts if needed for better image quality
3. Scale up to a larger batch of images
4. Implement any additional features or improvements
5. Document findings and recommendations

## Related Documentation

- [Image Generation Implementation Plan](./image-generation-implementation-plan.md)
- [CSV Processing Plan](./csv-processing-plan.md)
- [Image Generation Process](./image-generation-process.md)
- [Prompt Engineering Guide](./prompt-engineering-guide.md)
- [Google Generative AI Integration](../integrations/google-generative-ai.md)
- [Google Generative AI Guide](../guides/google-generative-ai-guide.md)

## Last Updated

May 14, 2025
