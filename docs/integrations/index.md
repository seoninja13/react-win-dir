# Integrations Documentation

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > Integrations

## Table of Contents

1. [Overview](#overview)
2. [Integrations](#integrations)
3. [Related Documentation](#related-documentation)

## Overview

This section contains documentation for all external integrations used in the Windows Doors CA website. Each integration is documented with setup instructions, usage examples, and best practices.

## Integrations

The Windows Doors CA website uses the following integrations:

### Unsplash Integration

The [Unsplash Integration](./unsplash.md) provides high-quality images for the website. It includes:

- API credentials setup
- Utility functions for fetching images
- Components for displaying images with proper attribution

### Netlify Integration

The [Netlify Integration](./netlify.md) handles deployment and hosting for the website. It includes:

- Netlify configuration
- Deployment workflow
- Form handling
- Environment variables

### Supabase Integration

The [Supabase Integration](./supabase.md) provides database and backend services for the website. It includes:

- Database schema
- Client configuration
- Data access layer
- Form submission
- Logging and error tracking

### Google Generative AI Integration

The [Google Generative AI Integration](./google-generative-ai.md) provides image generation capabilities for the website. It includes:

- Google Cloud SDK setup
- Generative AI SDK configuration
- Image generation utilities
- React hooks for image generation
- Product image generation

### Vertex AI Integration

The [Vertex AI Integration](./vertex-ai.md) extends the Google Generative AI integration to use Google's advanced AI models through Vertex AI. It includes:

- Vertex AI client configuration
- Environment variable setup
- Advanced image generation capabilities
- Text generation and analysis
- Image analysis with Gemini Vision API
- Multimodal content processing (text + images)
- React hooks for Vertex AI integration

### Google Maps Integration

The Google Maps Integration (coming soon) will provide location services for the website. It will include:

- API credentials setup
- Map components
- Location services

## Related Documentation

- [Architecture Documentation](../architecture/architecture-documentation.md)
- [Database Schema Documentation](../architecture/database-schema.md)
- [API Routes Documentation](../architecture/api-routes.md)
- [Supabase Implementation Plan](../planning/supabase-implementation-plan.md)
- [Google Generative AI Guide](../guides/google-generative-ai-guide.md)
- [Vertex AI Image Analysis Guide](../guides/vertex-ai-image-analysis-guide.md)

Last Updated: May 14, 2025 (Updated Vertex AI Integration with image analysis functionality)
