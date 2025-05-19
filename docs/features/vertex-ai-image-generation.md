# Vertex AI Image Generation

## Overview

This document outlines the integration of Google Cloud's Vertex AI for image generation capabilities within the project. The primary goal is to leverage Vertex AI's Imagen model to create or modify images based on textual prompts or existing images.

## Core Functionality

- Connects to Google Cloud Vertex AI.
- Authenticates using a service account.
- Sends requests to the image generation model (e.g., Imagen).
- Receives and processes the generated image data.

## Technical Implementation Details

### Source Code

- Test Script: `Relume-root/src/lib/vertex-ai/test-image-generation.ts`
- Compiled Output: `dist/test-image-generation.mjs`

### Dependencies

- `@google-cloud/vertexai`: Google Cloud Vertex AI Node.js client library.
- `google-auth-library`: For authenticating Google API requests.
- `dotenv`: For managing environment variables.

### Configuration & Setup

A detailed guide for configuring the environment, service accounts, and build process is available here:
- [Vertex AI Setup Guide](../processes/vertex-ai-setup-guide.md)

This setup ensures secure and correct communication with the Vertex AI services.

## Usage

1. Ensure all prerequisites from the [Vertex AI Setup Guide](../processes/vertex-ai-setup-guide.md) are met.
1. Build the script:

```bash
npx esbuild Relume-root/src/lib/vertex-ai/test-image-generation.ts --bundle --outfile=dist/test-image-generation.mjs --platform=node --format=esm --external:dotenv --external:google-auth-library --external:@google-cloud/vertexai --color=true
```

1. Run the compiled script from the project root (`c:\Users\IvoD\repos\react-win-dir`):

```bash
node --no-warnings dist/test-image-generation.mjs
```

## Troubleshooting

Refer to the setup guide for common issues and resolutions, particularly around authentication (`GoogleAuthError`) and permissions (`PERMISSION_DENIED`).
