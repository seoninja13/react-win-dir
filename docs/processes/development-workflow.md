# Development Workflow

This document outlines the development workflow for the Window World LA website project.

## Overview

The development workflow for this project follows a structured approach to ensure consistency, quality, and efficiency. This document provides guidelines for setting up the development environment, making changes, testing, and deploying.

## Development Environment Setup

### Prerequisites

Before starting development, ensure you have the following installed:

- Node.js 18.x or higher
- npm 9.x or higher
- Git
- Visual Studio Code (recommended)
- Netlify CLI (optional, for Netlify Dev)
- Google Cloud SDK (for AI integration)

### AI Integration Setup

1. Google Cloud Setup:
   - Create a Google Cloud project
   - Enable Vertex AI API
   - Create API key with Generative AI access
   - Store API key securely in environment variables

2. Environment Variables:
   ```
   GOOGLE_API_KEY=AIzaSyA8B_V05yct_YIo01B7HETGXtLAJg3o2_U
   GEMINI_MODEL_VERSION=gemini-2.0-flash
   ```

### Initial Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd window-world-la
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file with your API credentials:

```
# Google Generative AI
GOOGLE_API_KEY=AIzaSyA8B_V05yct_YIo01B7HETGXtLAJg3o2_U
GEMINI_MODEL_VERSION=gemini-2.0-flash

# Legacy Unsplash (for reference)
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=vGwz6K4oB14ArpL-1Bm3FjFX-Bp2rFM5GM6a_cvM8VQ
UNSPLASH_SECRET_KEY=n76HBdN-t-iG7t4BeGNjCIy-ynPCpUQ0VxfE82T9qCc
UNSPLASH_APPLICATION_ID=749207
NEXT_PUBLIC_SITE_URL=http://localhost:4000
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:4000](http://localhost:4000) in your browser to see the result.

### Using Netlify Dev

For a production-like environment, use Netlify Dev:

1. Install Netlify CLI globally (if not already installed):

```bash
npm install -g netlify-cli
```

2. Run Netlify Dev:

```bash
netlify dev
```

3. Open [http://localhost:8888](http://localhost:8888) in your browser to see the result.

## Development Process

### 1. Understanding the Project Structure

Before making changes, familiarize yourself with the project structure:

- `src/app/` - Next.js App Router pages
- `src/components/` - React components
- `src/hooks/` - Custom React hooks
- `src/utils/` - Utility functions
- `public/` - Static assets
- `docs/` - Project documentation

### 2. Making Changes

#### Creating a New Component

1. Check if a similar component already exists.
2. Create a new file in the appropriate directory under `src/components/`.
3. Follow the component structure guidelines in [Component Structure](../architecture/component-structure.md).
4. Import and use the component in the appropriate page.

#### Creating a New Page

1. Create a new directory under `src/app/` with the name of the page.
2. Create a `page.tsx` file in the new directory.
3. Follow the page structure guidelines in [Page Structure](../architecture/page-structure.md).
4. Import and use the necessary components.

#### Modifying an Existing Component or Page

1. Locate the component or page file.
2. Make the necessary changes.
3. Test the changes locally.

### 3. Testing

#### Local Testing

1. Run the development server:

```bash
npm run dev
```

2. Open [http://localhost:4000](http://localhost:4000) in your browser.
3. Test the changes on different devices and browsers.

#### Netlify Dev Testing

1. Run Netlify Dev:

```bash
netlify dev
```

2. Open [http://localhost:8888](http://localhost:8888) in your browser.
3. Test the changes in a production-like environment.

### 4. Documentation

#### Updating Documentation

1. Update the relevant documentation files in the `docs/` directory.
2. Follow the documentation guidelines in [Documentation Standards](../processes/documentation-standards.md).
3. Create a daily log entry in `docs/daily-logs/` with the date as the filename (e.g., `2025-05-09.md`).

### 5. Deployment

#### Deploying to Netlify

1. Commit and push your changes to the repository.
2. Netlify will automatically deploy the changes.
3. Verify the deployment on the Netlify dashboard.

## Troubleshooting

### Common Issues

#### Port Conflicts

If you encounter port conflicts:

1. Kill all Node.js processes:

```bash
# Windows
taskkill /F /IM node.exe

# Mac/Linux
pkill -f node
```

2. Restart the development server.

#### Next.js Cache Issues

If you encounter issues with the Next.js cache:

1. Clear the Next.js cache:

```bash
rm -rf .next
```

2. Restart the development server.

#### Netlify Dev Issues

If you encounter issues with Netlify Dev:

1. Ensure you have the latest version of Netlify CLI:

```bash
npm install -g netlify-cli@latest
```

2. Check the `netlify.toml` file for correct configuration.
3. Restart Netlify Dev.

## Best Practices

### Code Organization

- Follow the component structure.
- Keep related files together.
- Use consistent naming conventions.
- For AI code:
  - Separate model configuration
  - Keep error handling consistent
  - Document API interactions

### Testing

- Write unit tests for new components.
- Test in multiple browsers.
- Test on mobile devices.
- Check for accessibility issues.
- For AI features:
  - Test different model versions
  - Verify batch processing
  - Check error handling

### Documentation

- Keep documentation up-to-date.
- Document all changes in the daily logs.
- Follow the documentation guidelines.
- For AI features:
  - Document model versions
  - Include error patterns
  - Note performance considerations

## Related Documentation

- [Component Structure](../architecture/component-structure.md)
- [Page Structure](../architecture/page-structure.md)
- [Unsplash Integration](../integrations/unsplash.md)
- [Documentation Standards](../processes/documentation-standards.md)
