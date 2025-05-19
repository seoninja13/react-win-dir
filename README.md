# Window World LA Website

> **PRIORITY 1**: Knowledge Base System Implementation (In Progress)  
> **PRIORITY 2**: Vertex AI Image Generation (In Progress)  
> **PRIORITY 5**: Website Performance Optimization (Planned for June 15, 2025)  
> [View Full Project Priorities](./docs/tracking/project-priorities.md)

This repository contains the code for the Window World LA website, a modern website for a windows, doors, siding, and roofing company in Los Angeles. The website is built using Next.js, React, and Tailwind CSS, with Relume UI components and Unsplash for images.

## Project Status

**Current Status**: Development in progress
**Last Updated**: May 16, 2025
**Current Version**: 0.3.2
**Routing Strategy**: Next.js App Router (exclusively)
**Project Structure**: Consolidation complete
**Priority 1**: Knowledge Base System Implementation (In Progress)
**Priority 2**: Vertex AI Image Generation (In Progress)
**Priority 5**: Website Performance Optimization (Planned for June 15, 2025)
**Knowledge Base Status**: Semantic chunking implemented, documentation complete
**Vertex AI Status**: Initial implementation complete, continuing with batch image generation

## Documentation Structure

This project follows a pyramid documentation structure with this README as the single entry point. All documentation is organized hierarchically in the `docs` directory.

For a comprehensive map of all documentation, see the [Documentation Directory](./docs/README.md) and the [Daily Logs](./docs/daily-logs/). For the latest daily log, see the [November 16, 2023 Daily Log](./docs/daily-logs/2023-11-16.md).

## Documentation Directory

All detailed documentation is organized in the [Documentation Directory](./docs/README.md), which serves as the central hub for all project documentation. The documentation is organized into the following categories:

### Documentation Categories

- [Architecture](./docs/architecture/) - System design and architecture documentation
- [Components](./docs/components/) - Component documentation
- [Daily Logs](./docs/daily-logs/) - Daily development logs
- [Processes](./docs/processes/) - Process documentation and implementation guides

### Key Project Documents

- [Project Priorities Tracker](./docs/tracking/project-priorities.md) - **Current priority: Knowledge Base System Implementation**
- [Architecture Documentation](./docs/architecture/architecture-documentation.md) - Comprehensive analysis and implementation plan
- [Routing Strategy](./docs/architecture/routing-strategy.md) - Documentation of the App Router routing strategy
- [Working Directory](./docs/architecture/working-directory.md) - Documentation of the working directory structure
- [Project Structure Consolidation Plan](./docs/processes/project-structure-consolidation-plan.md) - Plan for consolidating the project structure
- [Project Structure Consolidation Implementation](./docs/processes/project-structure-consolidation-implementation.md) - Detailed implementation guide for project structure consolidation
- [Header Components](./docs/components/header-components.md) - Documentation for Header47 and Header15 components
- [Daily Development Logs](./docs/daily-logs/) - Daily development updates
- [Latest Routing Strategy Decision](./docs/daily-logs/2025-05-13-routing-strategy-decision.md) - Documentation of the decision to standardize on App Router
- [Webpage Progress Tracker](./docs/tracking/webpage-progress-tracker.md) - Comprehensive tracker for all webpages in the project
- [Image Generation Progress](./docs/tracking/image-generation-progress.md) - Tracking document for Google Generative AI integration
- [Image Generation Implementation Plan](./docs/Image%20generation/image-generation-implementation-plan.md) - Detailed plan for implementing image generation
- [Export Documentation](./Export%20Documentation/export-documentation.md) - Comprehensive list of documentation files for export
- [Sample Project Structure](./Sample%20Project%20Structure-DO-NOT-EDIT/) - Reference project structure from previous projects

## Project Documentation

This project includes detailed documentation to assist with development, setup, and understanding of its features.

- **Architectural Overview**: See `docs/architecture/architecture-documentation.md`.
- **Daily Development Logs**: Stored in `docs/daily-logs/`.
- **Feature Specifics**: Maintained in `docs/features/`.
  - [Vertex AI Image Generation](./docs/features/vertex-ai-image-generation.md)
- **Processes and Setup Guides**: Located in `docs/processes/`.
  - [Vertex AI Setup Guide](./docs/processes/vertex-ai-setup-guide.md)
- **Progress Tracking**: See `@wWeb development progress folder @tracking-progress.md`.

## Knowledge Base System

We've implemented a comprehensive knowledge base system that uses Supabase's pgvector capabilities and Gemini 2.0 Flash embeddings to create a powerful, searchable repository for documentation, API references, code snippets, and other information.

### Knowledge Base Documentation

- [Knowledge Base Overview](./docs/Knowledge%20Base/index.md) - Main entry point for knowledge base documentation
- [Knowledge Base Workflow](./docs/Knowledge%20Base/knowledge-base-workflow.md) - Complete end-to-end workflow of the knowledge base system
- [Semantic Chunking Process](./docs/Knowledge%20Base/semantic-chunking-process.md) - Detailed explanation of the semantic chunking process
- [Embedding Generation](./docs/Knowledge%20Base/embedding-generation.md) - How embeddings are generated using Gemini 2.0 Flash
- [Vector Storage](./docs/Knowledge%20Base/vector-storage.md) - How vectors are stored and retrieved from Supabase
- [Search Functionality](./docs/Knowledge%20Base/search-functionality.md) - How the search functionality works

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
