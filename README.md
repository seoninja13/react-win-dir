# Window World LA Website

This repository contains the code for the Window World LA website, a modern website for a windows, doors, siding, and roofing company in Los Angeles. The website is built using Next.js, React, and Tailwind CSS, with Relume UI components and Unsplash for images.

## Project Status

**Current Status**: Development in progress
**Last Updated**: May 10, 2025
**Current Version**: 0.1.0

## Documentation Structure

This project follows a pyramid documentation structure with this README as the single entry point. All documentation is organized hierarchically in the `docs` directory.

For a comprehensive map of all documentation, see the [Documentation Directory](./docs/index.md) and the [Daily Logs](./docs/daily-logs/). For all project tasks and their priorities, see the [Priority Task List](./docs/priority-list.md). For the latest daily log, see the [May 10, 2025 Daily Log](./docs/daily-logs/2025-05-10.md).

## Documentation Directory

All detailed documentation is organized in the [Documentation Directory](./docs/index.md), which serves as the central hub for all project documentation. The documentation is organized into the following categories:

### Main Categories

- [Architecture](./docs/architecture/index.md) - System design and architecture documentation
- [Features](./docs/features/index.md) - Feature implementation documentation
- [Guides](./docs/guides/index.md) - Developer guides and tutorials
- [Integrations](./docs/integrations/index.md) - Integration documentation for external services
- [Planning](./docs/planning/index.md) - Planning documentation and implementation plans
- [Processes](./docs/processes/index.md) - Process documentation
- [Testing](./docs/testing/index.md) - Testing documentation and guidelines

### Key Documents

- [Unsplash Integration](./docs/integrations/unsplash.md) - Unsplash API integration documentation
- [Priority Task List](./docs/priority-list.md) - Prioritized list of tasks for the project
- [Daily Development Logs](./docs/daily-logs/) - Daily development updates
- [Latest Daily Log (May 10, 2025)](./docs/daily-logs/2025-05-10.md) - Latest development updates
- [Component Structure](./docs/architecture/component-structure.md) - Overview of the component structure
- [Page Structure](./docs/architecture/page-structure.md) - Overview of the page structure
- [Development Workflow](./docs/processes/development-workflow.md) - Development workflow documentation
- [Relume Wireframe Conversion](./docs/architecture/relume-wireframe-conversion.md) - Documentation of the Relume wireframe files conversion

## Implemented Features

- **Core Pages**:
  - Home page with hero section, product showcase, and call-to-action
  - Windows product page with detailed information and gallery
  - Doors product page with detailed information and gallery
  - Vinyl Siding product page with detailed information and gallery
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
  - Unsplash API for high-quality images
  - Netlify for deployment and hosting
  - Relume UI library for components

## Tech Stack

- **Frontend**:
  - Next.js 15.3.2 with App Router
  - React 18.2.0
  - TypeScript
  - Tailwind CSS
  - Relume UI components
  - Framer Motion for animations
  - React Icons for icons

- **API Integrations**:
  - Unsplash API for images

- **Deployment**:
  - Netlify for hosting and deployment
  - Netlify Dev for local development

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- Unsplash API credentials
- Netlify CLI (optional, for Netlify Dev)

### Installation

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

```
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

Open [http://localhost:4000](http://localhost:4000) with your browser to see the result.

#### Netlify Dev (Production-like Environment)

For a production-like environment, use Netlify Dev:

1. Install Netlify CLI globally (if not already installed):

```bash
npm install -g netlify-cli
```

2. Run Netlify Dev:

```bash
netlify dev
```

Open [http://localhost:8888](http://localhost:8888) with your browser to see the result.

**IMPORTANT**: Always use Netlify Dev (`netlify dev`) on port 8888 for testing, not just the Next.js development server (`npm run dev`) on port 4000. This ensures that your testing environment closely matches the production environment.

### Troubleshooting

If you encounter port conflicts or other issues:

1. Kill all Node.js processes:

```bash
# Windows
taskkill /F /IM node.exe

# Mac/Linux
pkill -f node
```

2. Clear Next.js cache:

```bash
rm -rf .next
```

3. Restart the development server.

## Project Structure

```
window-world-la/
├── docs/                  # Documentation
│   ├── architecture/      # Architecture documentation
│   ├── daily-logs/        # Daily development logs
│   ├── features/          # Feature documentation
│   ├── guides/            # Developer guides
│   ├── integrations/      # Integration documentation
│   ├── planning/          # Planning documentation
│   ├── processes/         # Process documentation
│   └── testing/           # Testing documentation
├── public/                # Static assets
│   └── images/            # Static images
├── Relume-root/           # Relume components
│   ├── components/        # Shared Relume components
│   │   ├── navigation/    # Navigation components
│   │   ├── footer/        # Footer components
│   │   └── ...            # Other components
│   └── pages/             # Relume page components
│       ├── home/          # Home page components
│       ├── about/         # About page components
│       └── ...            # Other page components
├── src/                   # Source code
│   ├── app/               # Next.js App Router
│   │   ├── api/           # API routes
│   │   ├── contact/       # Contact page
│   │   ├── doors/         # Doors page
│   │   ├── no-css/        # Page without CSS imports
│   │   ├── relume-home/   # Relume home page
│   │   ├── roofing/       # Roofing page
│   │   ├── simple-page/   # Simple page without Tailwind CSS
│   │   ├── vinyl-siding/  # Vinyl Siding page
│   │   ├── windows/       # Windows page
│   │   ├── globals.css    # Global CSS
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Home page
│   ├── components/        # React components
│   ├── hooks/             # Custom React hooks
│   └── utils/             # Utility functions
├── .env.local             # Environment variables
├── .gitignore             # Git ignore file
├── jsconfig.json          # JavaScript configuration
├── netlify.toml           # Netlify configuration
├── next.config.js         # Next.js configuration
├── package.json           # Package configuration
├── postcss.config.js      # PostCSS configuration
├── README.md              # Project documentation
└── tailwind.config.ts     # Tailwind CSS configuration
```

## License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.
