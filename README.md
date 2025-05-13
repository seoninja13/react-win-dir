# Window World LA Website

This repository contains the code for the Window World LA website, a modern website for a windows, doors, siding, and roofing company in Los Angeles. The website is built using Next.js, React, and Tailwind CSS, with Relume UI components and Unsplash for images.

## Project Status

**Current Status**: Development in progress
**Last Updated**: May 13, 2025
**Current Version**: 0.1.1

## Documentation Structure

This project follows a pyramid documentation structure with this README as the single entry point. All documentation is organized hierarchically in the `docs` directory.

For a comprehensive map of all documentation, see the [Documentation Directory](./docs/README.md) and the [Daily Logs](./docs/daily-logs/). For the latest daily log, see the [November 16, 2023 Daily Log](./docs/daily-logs/2023-11-16.md).

## Documentation Directory

All detailed documentation is organized in the [Documentation Directory](./docs/README.md), which serves as the central hub for all project documentation. The documentation is organized into the following categories:

### Main Categories

- [Architecture](./docs/architecture/) - System design and architecture documentation
- [Components](./docs/components/) - Component documentation
- [Daily Logs](./docs/daily-logs/) - Daily development logs

### Key Documents

- [Working Directory](./docs/architecture/working-directory.md) - Documentation of the working directory structure
- [Header Components](./docs/components/header-components.md) - Documentation for Header47 and Header15 components
- [Daily Development Logs](./docs/daily-logs/) - Daily development updates
- [Latest Daily Log (November 16, 2023)](./docs/daily-logs/2023-11-16.md) - Latest development updates
- [Export Documentation](./Export%20Documentation/export-documentation.md) - Comprehensive list of documentation files for export
- [Sample Project Structure](./Sample%20Project%20Structure-DO-NOT-EDIT/) - Reference project structure from previous projects

## Implemented Features

- **Core Pages**:
  - Home page with hero section, product showcase, and call-to-action
  - Windows product page with detailed information and gallery
  - Doors product page with detailed information and gallery
  - Vinyl Siding product page with detailed information and gallery
  - 5000-Series Vinyl Siding product page with detailed information and gallery
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

This will run the development server from the Relume-root directory. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

#### Building the Project

To build the project for production:

```bash
npm run build
```

This will build the project from the Relume-root directory.

#### Starting the Production Server

To start the production server:

```bash
npm run start
```

This will start the production server from the Relume-root directory.

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
react-win-dir/                      # Project root (repository root)
├── docs/                           # Documentation
│   ├── architecture/               # Architecture documentation
│   │   └── working-directory.md    # Working directory documentation
│   ├── components/                 # Component documentation
│   │   └── header-components.md    # Header components documentation
│   ├── daily-logs/                 # Daily development logs
│   │   ├── 2023-11-15.md           # Daily log for November 15, 2023
│   │   └── 2023-11-16.md           # Daily log for November 16, 2023
│   └── README.md                   # Documentation index
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
