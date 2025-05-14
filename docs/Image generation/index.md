# Image Generation Documentation

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > Image Generation

## Table of Contents

1. [Overview](#overview)
2. [Documentation](#documentation)
3. [CSV Data](#csv-data)
4. [Implementation Process](#implementation-process)
5. [Related Documentation](#related-documentation)

## Overview

This directory contains documentation related to the image generation process for the Windows Doors CA website. We use Google Cloud's Generative AI through the Vertex AI SDK to generate high-quality images that match the style and branding of the original Window World LA website.

The image generation process leverages a CSV file containing Window World LA website URLs, images, and prompts, which we adapt for our website. This approach ensures visual consistency while allowing us to create unique, high-quality images for our content.

## Documentation

- [Image Generation Implementation Plan](./image-generation-implementation-plan.md) - Comprehensive plan for generating images using Google Cloud's Generative AI
- [CSV Processing Plan](./csv-processing-plan.md) - Detailed plan for processing the CSV file containing Window World LA data
- [URL Mapping Reference](./url-mapping-reference.md) - Detailed mapping between Window World LA URLs and Windows Doors CA URLs
- [Prompt Engineering Guide](./prompt-engineering-guide.md) - Guide for creating effective prompts for image generation
- [Image Generation Process Documentation](./image-generation-process.md) - Detailed documentation of the image generation process
- [Image Quality Standards](./image-quality-standards.md) - Standards for image quality and acceptance criteria

## CSV Data

The CSV data file contains the following information:
- Original Window World LA URLs
- Image paths/URLs from the original site
- Prompts used or to be used for generation
- Additional metadata for image generation

This data serves as the foundation for our image generation process, providing a structured approach to creating images for all pages of our website.

## Implementation Process

The image generation implementation follows these key phases:

1. **Data Preparation**
   - Process and analyze the CSV file
   - Create URL mapping between Window World LA and Windows Doors CA
   - Review and refine existing prompts
   - Categorize pages by image priority

2. **Prompt Engineering**
   - Optimize prompts for Vertex AI Gemini model
   - Create prompt templates for different page types
   - Develop prompt enhancement strategies
   - Test prompts with sample pages

3. **Batch Processing Setup**
   - Develop batch processing script
   - Implement logging and error handling
   - Set up Supabase storage integration
   - Create metadata tracking system

4. **Image Generation**
   - Generate images in batches by page category
   - Implement review process
   - Regenerate images as needed
   - Store final images in Supabase

5. **Website Integration**
   - Update website code to use generated images
   - Implement lazy loading and optimization
   - Test across different devices and browsers
   - Document image usage across the site

## Related Documentation

- [Vertex AI Integration](../integrations/vertex-ai.md) - Documentation for the Vertex AI integration
- [Google Generative AI Integration](../integrations/google-generative-ai.md) - Documentation for the Google Generative AI integration
- [Vertex AI Image Analysis Guide](../guides/vertex-ai-image-analysis-guide.md) - Guide for using Vertex AI to analyze images
- [Google Generative AI Guide](../guides/google-generative-ai-guide.md) - Guide for using Google Generative AI for image generation
- [Supabase Integration](../integrations/supabase.md) - Documentation for the Supabase integration used for image storage

Last Updated: May 14, 2025
