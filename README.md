# Window World LA Website

> **PRIORITY 1**: Fix Non-Working Pages (Immediate Action - May 28, 2025)
> **PRIORITY 2**: Standardize Directory Structure (After Fixing Non-Working Pages)
> **PRIORITY 3**: Migrate High-Priority Pages (If Time Permits)
> [View Tomorrow Morning Tasks](./Docs/migration/tomorrow-morning-tasks.md)
> [View Full Project Priorities](./Docs/priority-list.md)

This repository contains the code for the Window World LA website, a modern website for a windows, doors, siding, and roofing company in Los Angeles. The website is built using Next.js, React, and Tailwind CSS, with Relume UI components and Unsplash for images.

## Project Status

**Current Status**: Development in progress
**Last Updated**: May 27, 2025
**Current Version**: 0.4.0
**Routing Strategy**: Next.js App Router (migration in progress)
**Project Structure**: Consolidation complete, App Router migration in progress
**Priority 1**: Fix Non-Working Pages (Immediate Action - May 28, 2025)
**Priority 2**: Standardize Directory Structure (After Fixing Non-Working Pages)
**Priority 3**: Migrate High-Priority Pages (If Time Permits)
**App Router Migration Status**: 32% complete (8/25 pages migrated)
**Non-Working Pages**: Bay-Bow Windows, Hinged Patio Doors, Vinyl Siding Series Pages, Garage Doors

## Documentation Structure

This project follows a pyramid documentation structure with this README as the single entry point. All documentation is organized hierarchically in the `Docs` directory.

### New Developers

If you're new to the project, start by reading the [Getting Started for New Developers](./Docs/onboarding/getting-started-for-new-developers.md) guide. This document provides a comprehensive overview of the project structure, priority system, and development workflow.

For a comprehensive map of all documentation, see the [Documentation Directory](./Docs/index.md) and the [Daily Logs](./Docs/daily-logs/). For the latest daily log, see the [May 27, 2025 Daily Log](./Docs/daily-logs/2025-05-27-app-router-migration-status-review.md).

## Documentation Directory

All detailed documentation is organized in the [Documentation Directory](./Docs/index.md), which serves as the central hub for all project documentation. The documentation is organized into the following categories:

### Documentation Categories

- [Architecture](./Docs/architecture/index.md) - System design and architecture documentation
- [Daily Logs](./Docs/daily-logs/index.md) - Daily development logs
- [Knowledge Base](./Docs/Knowledge%20Base/index.md) - Knowledge Base system documentation
- [Migration](./Docs/migration/index.md) - App Router migration documentation
- [Onboarding](./Docs/onboarding/index.md) - Documentation for new developers
- [Processes](./Docs/processes/index.md) - Process documentation and implementation guides
- [Tracking](./Docs/tracking/index.md) - Project tracking documentation

### Key Project Documents

- [Tomorrow Morning Tasks](./Docs/migration/tomorrow-morning-tasks.md) - **Current priority: Fix Non-Working Pages**
- [Project Priorities List](./Docs/priority-list.md) - Prioritized list of tasks for the project
- [Project Structure Current State](./Docs/architecture/project-structure-current-state.md) - Current state of the project structure
- [Knowledge Base Overview](./Docs/Knowledge%20Base/index.md) - Knowledge Base system documentation
- [App Router Migration Tracking](./Docs/migration/app-router-migration-tracking.md) - Comprehensive tracking of the App Router migration progress
- [Next Steps for App Router Migration](./Docs/migration/next-steps-for-app-router-migration.md) - Detailed steps for continuing the App Router migration
- [App Router Standardization Plan](./Docs/processes/app-router-standardization-plan.md) - Detailed plan for standardizing on the App Router approach
- [Architecture Documentation](./Docs/architecture/architecture-documentation.md) - Comprehensive analysis and implementation plan
- [Routing Strategy](./Docs/architecture/routing-strategy.md) - Documentation of the App Router routing strategy
- [Working Directory](./Docs/architecture/working-directory.md) - Documentation of the working directory structure
- [Daily Development Logs](./Docs/daily-logs/) - Daily development updates
- [Latest App Router Migration Status Review](./Docs/daily-logs/2025-05-27-app-router-migration-status-review.md) - Latest review of the App Router migration status
- [Webpage Progress Tracker](./Docs/tracking/webpage-progress-tracker.md) - Comprehensive tracker for all webpages in the project
- [Image Generation Progress](./Docs/tracking/image-generation-progress.md) - Tracking document for Google Generative AI integration

## Project Documentation

This project includes detailed documentation to assist with development, setup, and understanding of its features.

- **Architectural Overview**: See [Architecture Documentation](./Docs/architecture/architecture-documentation.md).
- **Project Structure**: See [Project Structure Current State](./Docs/architecture/project-structure-current-state.md).
- **Daily Development Logs**: Stored in [Daily Logs](./Docs/daily-logs/).
- **Knowledge Base System**: See [Knowledge Base Overview](./Docs/Knowledge%20Base/index.md).
- **Feature Specifics**: Maintained in [Features](./Docs/features/).
  - [Vertex AI Image Generation](./Docs/features/vertex-ai-image-generation.md)
- **Processes and Setup Guides**: Located in [Processes](./Docs/processes/).
  - [Vertex AI Setup Guide](./Docs/processes/vertex-ai-setup-guide.md)
- **Progress Tracking**: See [Webpage Progress Tracker](./Docs/tracking/webpage-progress-tracker.md).

## Knowledge Base System

We've implemented a comprehensive knowledge base system that uses Supabase's pgvector capabilities and Gemini 2.0 Flash embeddings to create a powerful, searchable repository for documentation, API references, code snippets, and other information.

### Knowledge Base Documentation

- [Knowledge Base Overview](./Docs/Knowledge%20Base/index.md) - Main entry point for knowledge base documentation
- [Knowledge Base Workflow](./Docs/Knowledge%20Base/knowledge-base-workflow.md) - Complete end-to-end workflow of the knowledge base system
- [Semantic Chunking Process](./Docs/Knowledge%20Base/semantic-chunking-process.md) - Detailed explanation of the semantic chunking process
- [Embedding Generation](./Docs/Knowledge%20Base/embedding-generation.md) - How embeddings are generated using Gemini 2.0 Flash
- [Vector Storage](./Docs/Knowledge%20Base/vector-storage.md) - How vectors are stored and retrieved from Supabase
- [Search Functionality](./Docs/Knowledge%20Base/search-functionality.md) - How the search functionality works
- [Automated Ingestion Process](./Docs/Knowledge%20Base/automated-ingestion-process.md) - How to automatically ingest content from various sources

## AI Image Generation Tools

We've implemented a comprehensive set of tools for generating high-quality images using Google's Imagen 3.0 model through Vertex AI. These tools allow you to generate, manage, and test AI-generated images for use throughout the application.

### Image Generation Documentation

- [Google Generative AI Comprehensive Guide](./docs/Image%20generation/google-generative-ai-comprehensive-guide.md) - Complete guide to all aspects of the Google Generative AI integration
- [Vertex AI Imagen Implementation Status](./docs/Image%20generation/vertex-ai-imagen-implementation-status.md) - Current status of the Vertex AI implementation
- [Image Generation Index](./docs/Image%20generation/index.md) - Complete index of all image generation documentation

### Vertex AI Service Test Scripts (`Relume-root/src/lib/vertex-ai/`)

Test scripts are available to validate the core Vertex AI services. These services use dynamic imports for Google Cloud SDKs and an asynchronous factory pattern. Due to complexities with `ts-node` and ESM module resolution, the test scripts must be bundled using `esbuild` before execution.

**Prerequisites for all Vertex AI test scripts:**

- Ensure `esbuild` is installed as a dev dependency (`npm install --save-dev esbuild`).
- Ensure `dotenv` is installed as a project dependency (`npm install dotenv`).
- A valid `.env.local` file in the project root with `GOOGLE_CLOUD_PROJECT`, `GOOGLE_CLOUD_LOCATION`, and `GOOGLE_APPLICATION_CREDENTIALS` configured.

#### 1. Vertex AI Image Generation (`VertexAIImageService`)

Validates the `VertexAIImageService` for generating images.

**A. Build the Image Generation Test Script:**

Run the following command from the project root to bundle the TypeScript test script into a JavaScript ESM module:

```bash
npx esbuild Relume-root/src/lib/vertex-ai/test-image-generation.ts --bundle --outfile=dist/test-image-generation.mjs --platform=node --format=esm --external:dotenv --external:google-auth-library --external:@google-cloud/vertexai --color=true
```

**B. Run the Bundled Image Generation Test Script:**

Execute the bundled script from the project root:

```bash
node --no-warnings dist/test-image-generation.mjs
```

This will run the test, attempting to initialize the Vertex AI service and generate a sample image, logging the output to the console.

#### 2. Vertex AI Text Generation (`VertexAITextService`)

Validates the `VertexAITextService` for generating text using the `gemini-2.0-flash` model.

**A. Build the Text Generation Test Script:**

Run the following command from the project root:

```bash
npx esbuild Relume-root/src/lib/vertex-ai/test-text-generation.ts --bundle --outfile=dist/test-text-generation.mjs --platform=node --format=esm --external:dotenv --external:@google-cloud/vertexai --color=true
```

**B. Run the Bundled Text Generation Test Script:**

Execute the bundled script from the project root:

```bash
node --no-warnings dist/test-text-generation.mjs
```

This will run the test, attempting to initialize the `VertexAITextService` and generate sample text for predefined prompts, saving the output to `output/generated_text.json`.

Ensure the `dist/` and `output/` directories are in your `.gitignore` file.

### Image Generation Components

1. **Image Generation Script** (`scripts/generate-images.js`)
   - Generate images using natural language prompts
   - Supports various image sizes and configurations
   - Includes rate limiting and error handling
   - Saves images with metadata for tracking

2. **Image Management Utilities** (`scripts/image-utils.js`)
   - Track and manage generated images
   - Store metadata including prompts and generation parameters
   - Query and filter generated images

3. **Test Suite** (`scripts/test-image-generation.js`)
   - Comprehensive test cases for image generation
   - Multiple test categories and configurations
   - Detailed reporting and statistics

### Getting Started

1. **Prerequisites**
   - Node.js 16+
   - npm 9.x or higher
   - Google API key with access to the Gemini API
   - Required dependencies (install with `npm install`)

2. **Configuration**

   Create a `.env` file in the project root with your API key:

   ```env
   GOOGLE_API_KEY=your_api_key_here
   ```

3. **Usage**

   ```bash
   # Generate a single image
   npm run generate:image "A beautiful sunset over mountains"

   # Generate with custom options
   npm run generate:image "A futuristic city" -- --width 1280 --height 720 --numberOfImages 2

   # Run the test suite
   npm run test:image-gen
   ```

### Documentation

- [Image Generation Guide](./scripts/README-image-generation.md)
- [Test Suite Documentation](./scripts/README-test-image-generation.md)

## Implemented Features

- **Core Pages**:
  - Home page with hero section, product showcase, and call-to-action
  - Windows product page with detailed information and gallery
  - Doors product page with detailed information and gallery
  - Vinyl Siding product page with detailed information and gallery
  - 5000-Series Vinyl Siding product page with detailed information and gallery

- **Google Generative AI Integration** (In Progress):
  - Vertex AI client implementation for image generation
  - CSV data processing for Window World LA website content
  - Batch image generation with quality control
  - React components for displaying AI-generated images
  - Roofing product page with detailed information and gallery
  - Contact page with form and map
  - Simple page without Tailwind CSS
  - Relume home page with inline styles

- **Components**:
  - Header with navigation
  - Footer with contact information and social links
  - Gallery with Unsplash images
  - Call-to-action sections
  - Product showcases
  - Contact form
  - Relume components converted to Relume-root directory structure

- **Integrations**:
  - Google Generative AI (Vertex AI) for image generation
  - Supabase Storage for image storage and management
  - Unsplash API for high-quality images
  - Netlify for deployment and hosting
  - Relume UI library for components

## Tech Stack

- **Frontend**:
  - Next.js 15.3.2 with App Router (exclusively)
  - React 18.2.0
  - TypeScript
  - Tailwind CSS
  - Relume UI components (@relume_io/relume-ui and @relume_io/relume-tailwind)
  - Framer Motion for animations
  - React Icons for icons

- **API Integrations**:
  - Google Generative AI (Vertex AI) for image generation
  - Unsplash API for images
  - Google Maps API for location maps

- **Database**:
  - Supabase for all data storage and management
  - Supabase Storage for image storage

- **Deployment**:
  - Netlify for hosting and deployment
  - Netlify Dev for local development

## Development Setup

### System Requirements

- Node.js 18.x or higher
- npm 9.x or higher
- Unsplash API credentials
- Netlify CLI (optional, for Netlify Dev)

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

3. Create a `.env.local` file with your Unsplash API credentials:

   ```env
   NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=vGwz6K4oB14ArpL-1Bm3FjFX-Bp2rFM5GM6a_cvM8VQ
   UNSPLASH_SECRET_KEY=n76HBdN-t-iG7t4BeGNjCIy-ynPCpUQ0VxfE82T9qCc
   UNSPLASH_APPLICATION_ID=749207
   NEXT_PUBLIC_SITE_URL=http://localhost:4000
   ```

### Development

#### Standard Development Server

Run the Next.js development server:

```bash
npm run dev
```

This will run the development server from the Relume-root directory. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

#### Building the Project

To build the project for production:

1. Build the project:

   ```bash
   npm run build
   ```

2. Start the production server:

   ```bash
   npm start
   ```

3. View the production build:

Open [http://localhost:3000](http://localhost:3000) in your browser.

#### Production Server

To start the production server:

```bash
npm start
```

This will start the production server from the Relume-root directory.

## Project Structure

### Project Layout

```tree
react-win-dir/                      # Project root (repository root)
├── docs/                           # Documentation
├── Relume-root/                    # Relume UI components and templates
├── pages-components/              # Page-specific components
├── src/                           # Next.js source code
```

### System Maintenance

If you encounter port conflicts or other issues:

1. Kill all Node.js processes:

   ```bash
   # Windows
   taskkill /F /IM node.exe

   # Mac/Linux
   pkill -f node
   ```

2. Clear the Next.js cache:

   ```bash
   rm -rf .next
   ```

### Project Files

```text
react-win-dir/
├── docs/
│   ├── architecture/             # Architecture documentation
│   ├── components/               # Component documentation
│   ├── daily-logs/              # Daily development logs
│   └── processes/               # Process documentation
├── Relume-root/                    # PRIMARY WORKING DIRECTORY
│   ├── components/                 # Reusable components
│   │   ├── navigation/             # Navigation components
│   │   ├── footer/                 # Footer components
│   │   ├── header/                 # Header components
│   │   ├── layout/                 # Layout components
│   │   ├── gallery/                # Gallery components
│   │   ├── testimonial/            # Testimonial components
│   │   └── cta/                    # Call-to-action components
│   ├── pages-components/           # Page-specific components
│   │   └── home/                   # Home page components
│   │       └── index.jsx           # Home page component
│   ├── src/                        # Next.js source code
│   │   └── app/                    # Next.js App Router
│   │       ├── home/               # Home page route
│   │       │   └── page.tsx
│   │       ├── windows/            # Windows page route
│   │       │   └── page.tsx
│   │       ├── doors/              # Doors page route
│   │       │   └── page.tsx
│   │       ├── globals.css         # Global CSS
│   │       ├── styles.css          # Custom styles
│   │       ├── layout.tsx          # Root layout
│   │       └── page.tsx            # Root page
│   ├── public/                     # Static assets
│   │   └── images/                 # Static images
│   ├── dist/                       # Build output directory
│   ├── node_modules/               # Node.js dependencies
│   ├── layouts/                    # Layout components (To be implemented)
│   ├── hooks/                      # Custom React hooks (To be implemented)
│   ├── utils/                      # Utility functions (To be implemented)
│   ├── package.json                # Package configuration
│   ├── next.config.js              # Next.js configuration
│   ├── tailwind.config.ts          # Tailwind CSS configuration
│   ├── postcss.config.js           # PostCSS configuration
│   ├── tsconfig.json               # TypeScript configuration
│   └── README.md                   # Main documentation
├── Relume-DO-NOT-EDIT/             # Original Relume components (DO NOT EDIT)
├── .env.local                      # Environment variables
├── .gitignore                      # Git ignore file
├── jsconfig.json                   # JavaScript configuration
├── netlify.toml                    # Netlify configuration
├── package.json                    # Package configuration
└── README.md                       # Project documentation
```

## License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.
