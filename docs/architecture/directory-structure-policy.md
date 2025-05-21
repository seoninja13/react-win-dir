# Directory Structure Policy

**Priority Level: 1 (Critical)**

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Architecture](./index.md) > Directory Structure Policy

## Table of Contents

1. [Overview](#overview)
2. [Core Policy](#core-policy)
3. [Relume-root Directory](#relume-root-directory)
4. [Exceptions](#exceptions)
5. [Implementation](#implementation)
6. [Enforcement](#enforcement)
7. [Related Documentation](#related-documentation)

## Overview

This document establishes the official policy for directory structure in the Windows Doors CA website project. It provides clear guidelines on where files should be located and how the project structure should be maintained.

## Core Policy

**ALL files related to the website implementation MUST be located within the Relume-root directory.**

This is a strict requirement with no exceptions unless explicitly authorized by the project lead. No development files should exist outside the Relume-root directory.

## Relume-root Directory

The Relume-root directory is the primary working directory for the project. It contains all the code, assets, and configuration files needed for the website.

```
Relume-root/
├── src/                        # Next.js source code
│   └── app/                    # Next.js App Router
│       ├── [route directories] # Route-specific directories
│       ├── globals.css         # Global CSS
│       ├── styles.css          # Custom styles
│       ├── layout.tsx          # Root layout
│       └── page.tsx            # Root page
├── components/                 # Reusable components
├── public/                     # Static assets
├── [page-directories]/         # Page-specific components
├── next.config.js              # Next.js configuration
├── package.json                # Project dependencies
└── [other config files]        # Other configuration files
```

## Root Directory vs. Relume-root Directory

### Root Directory (`react-win-dir/`)

The root directory should contain **only** the following:

1. **Git-related files**: Files necessary for Git version control
   - `.gitignore`
   - `.git/` (directory)

2. **Project configuration files**: Essential configuration files that must be at the root level
   - `.windsurfrules`

3. **Primary documentation**: Main README file that provides an overview of the project
   - `README.md`

4. **Special directories**: Directories that must remain at the root level
   - `.netlify/` - Netlify configuration
   - `Relume-DO-NOT-EDIT/` - Original Relume files that should never be modified
   - `Relume-root/` - Main working directory containing all project code
   - `@wWeb development progress folder/` - Tracking progress for web development
   - `Content Engine/` - Content engine related files
   - `Docs/` - Project documentation
   - `Export Documentation/` - Export-related documentation
   - `generated-images/` - Generated image files
   - `IDE Instructions/` - IDE-specific instructions
   - `Sample-images/` - Sample images for the project

### Relume-root Directory (`react-win-dir/Relume-root/`)

The Relume-root directory is the **main working directory** and should contain:

1. **All source code**: All application code including components, pages, and utilities
   - `src/` - Source code directory
   - `app/` - Next.js App Router pages
   - `components/` - React components
   - `hooks/` - React hooks
   - `utils/` - Utility functions

2. **Configuration files**: Project configuration files specific to the application
   - `config/` - Configuration files (`.eslintrc.json`, `next.config.js`, etc.)
   - `env-files/` - Environment files (`.env`, `.env.local`, etc.)
   - `service-accounts/` - Service account key files

3. **Build and output files**: Files related to building and running the application
   - `Output/` - Output files
   - `.next/` - Next.js build directory

4. **Testing and scripts**: Files related to testing and automation
   - `tests/` - Test files
   - `scripts/` - Script files
   - `vertex-ai-tests/` - Vertex AI test files

5. **Documentation**: Documentation specific to the application code
   - `docs/` - Documentation files
   - `docs-assets/` - Documentation assets

6. **Miscellaneous**: Other files that don't fit into the above categories
   - `misc/` - Miscellaneous files

Any exceptions to this structure must be explicitly approved by the project lead and documented.

## Implementation

To implement this policy:

1. All new files must be created within the Relume-root directory in the appropriate subdirectory.
2. Any existing files outside the Relume-root directory should be moved into it or deleted, except for the authorized files and directories in the root.
3. Configuration files should be placed in the Relume-root/config directory.
4. Environment files should be placed in the Relume-root/env-files directory.
5. Service account files should be placed in the Relume-root/service-accounts directory.
6. If a file must exist outside the Relume-root directory for technical reasons, this exception must be documented.

### File Placement Rules

#### Files That Should Be in the Root Directory

- `.gitignore` - Git ignore file
- `.windsurfrules` - Windsurf rules
- `README.md` - Main README file

#### Files That Should Be in the Relume-root Directory

- **Configuration Files**:
  - `.eslintrc.json` - ESLint configuration
  - `eslint.config.mjs` - ESLint configuration
  - `netlify.toml` - Netlify configuration
  - `next.config.js` - Next.js configuration
  - `postcss.config.js` - PostCSS configuration
  - `postcss.config.mjs` - PostCSS configuration
  - `tailwind.config.ts` - Tailwind CSS configuration
  - `tsconfig.json` - TypeScript configuration
  - `jsconfig.json` - JavaScript configuration

- **Environment Files**:
  - `.env` - Environment variables
  - `.env.example` - Example environment variables
  - `.env.local` - Local environment variables
  - `.env.local.example` - Example local environment variables

- **Service Account Files**:
  - `service-account-key.json` - Service account key
  - `vertex-ai-imagen-service-account-key.json` - Vertex AI service account key

## Enforcement

This policy is enforced through:

1. **Code Reviews**: All pull requests will be checked for compliance with this policy.
2. **Documentation**: All documentation must reflect this policy.
3. **Onboarding**: All new developers must be made aware of this policy.
4. **Regular Audits**: The project structure will be audited regularly to ensure compliance.

## Related Documentation

- [Working Directory Structure](./working-directory.md)
- [Project Structure Current State](./project-structure-current-state.md)
- [Project Structure Consolidation Plan](../processes/project-structure-consolidation-plan.md)
- [Getting Started for New Developers](../onboarding/getting-started-for-new-developers.md)

Last Updated: May 21, 2025 (Updated with detailed file placement rules)
