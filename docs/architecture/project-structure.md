# Project Structure Documentation

**Priority Level: 1 (Critical)**

## Overview

This document provides a comprehensive overview of the project structure after the consolidation of all content into the `Relume-root` directory. It serves as the single entry point for all project structure documentation.

## Table of Contents

1. [Current Structure](#current-structure)
2. [Directory Organization](#directory-organization)
3. [Key Directories](#key-directories)
4. [Configuration Files](#configuration-files)
5. [Implementation History](#implementation-history)
6. [Best Practices](#best-practices)
7. [Related Documentation](#related-documentation)

## Current Structure

After the Project Structure Consolidation implementation on May 15, 2025, the project has a cleaner, more maintainable structure with all content consolidated in the `Relume-root` directory. The top-level directories are:

```
.netlify                 # Netlify configuration
Docs                     # Project documentation
Export Documentation     # Export documentation
IDE Instructions         # IDE instructions
Relume-DO-NOT-EDIT      # Original Relume files (DO NOT EDIT)
Relume-root             # Main project directory
```

## Directory Organization

The project follows a clear directory organization pattern:

1. **Top-Level Directories**: Contain major sections of the project
2. **Component Directories**: Contain components for specific pages or features
3. **App Router Pages**: Located in `Relume-root/src/app`
4. **Documentation**: Located in the `Docs` directory with a pyramidal structure

## Key Directories

### Relume-root

The `Relume-root` directory contains all the code for the project. Here's an overview of its structure:

```
Relume-root/
├── 1000-series/         # 1000 series vinyl siding components
├── 1500-series/         # 1500 series vinyl siding components
├── 2000-series/         # 2000 series vinyl siding components
├── 4000-series/         # 4000 series vinyl siding components
├── 5000-series/         # 5000 series vinyl siding components
├── about/               # About page components
├── components/          # Shared components
├── contact/             # Contact page components
├── doors/               # Doors page components
├── faqs/                # FAQs page components
├── financing/           # Financing page components
├── gallery/             # Gallery page components
├── home/                # Home page components
├── pages/               # Pages Router pages (legacy)
├── public/              # Public assets
├── roofing/             # Roofing page components
├── scripts/             # Development and automation scripts
│   ├── code-modularity/ # Code analysis and modularity tools
│   ├── commit-assistant/# Intelligent commit assistance tools
│   ├── todo-list/       # AI-integrated todo list management
│   └── [other scripts]  # Various utility and automation scripts
├── src/                 # Source code
│   ├── app/             # App Router pages
│   └── components/      # Shared components
├── styles/              # Global styles
├── vinyl-siding/        # Vinyl siding page components
├── warranty/            # Warranty page components
├── website-pages/       # Page-specific component directories
├── window-style-finder/ # Window style finder components
└── windows/             # Windows page components
```

### src/app

The `src/app` directory contains all the App Router pages for the project. This is where you should add new pages. Here's an overview of its structure:

```
src/app/
├── about/               # About page
├── contact/             # Contact page
├── doors/               # Doors pages
│   ├── entry/           # Entry doors page
│   ├── garage/          # Garage doors page
│   └── patio/           # Patio doors page
├── faqs/                # FAQs page
├── financing/           # Financing page
├── gallery/             # Gallery page
├── garden/              # Garden page
├── hinged-patio-doors/  # Hinged patio doors page
├── roofing/             # Roofing page
├── service-areas/       # Service areas page
├── vinyl-siding/        # Vinyl siding pages
│   ├── 1000-series/     # 1000 series page
│   ├── 1500-series/     # 1500 series page
│   ├── 2000-series-new/ # 2000 series page
│   └── 5000-series/     # 5000 series page
├── warranty/            # Warranty page
├── window-style-finder/ # Window style finder page
├── windows/             # Windows pages
│   ├── awning/          # Awning windows page
│   ├── bay-bow/         # Bay/bow windows page
│   ├── casement/        # Casement windows page
│   ├── custom/          # Custom windows page
│   ├── double-hung/     # Double-hung windows page
│   ├── energy-efficient/# Energy-efficient windows page
│   ├── garden/          # Garden windows page
│   ├── picture-window/  # Picture windows page
│   ├── shutters/        # Shutters page
│   ├── sliding/         # Sliding windows page
│   └── wood-windows/    # Wood windows page
├── globals.css          # Global CSS
├── layout.tsx           # Root layout
├── page.tsx             # Home page
└── styles.css           # Additional styles
```

### scripts

The `scripts` directory contains development and automation tools that enhance the development workflow. Here's an overview of its structure:

```
scripts/
├── code-modularity/     # Code analysis and modularity tools
│   ├── code-analyzer.js # Enhanced static code analysis engine
│   ├── config.js        # Configuration for analysis tools
│   ├── index.js         # Main entry point for modularity tools
│   ├── notification.js  # Notification system for analysis results
│   └── refactoring-suggester.js # Automated refactoring suggestions
├── commit-assistant/    # Intelligent commit assistance tools
│   ├── ai-message-generator.js # AI-powered commit message generation
│   ├── commit-reminder.js # Automated commit reminders
│   ├── config.js        # Configuration for commit tools
│   ├── index.js         # Main entry point for commit assistance
│   └── notification.js  # Notification system for commit reminders
├── todo-list/           # AI-integrated todo list management
│   ├── ai-integration.js # AI integration for todo management
│   ├── config.js        # Configuration for todo tools
│   ├── index.js         # Main entry point for todo management
│   ├── notification.js  # Notification system for todo items
│   ├── storage-adapters/ # Storage adapters for different backends
│   └── todo-manager.js  # Core todo management functionality
└── [other scripts]      # Various utility and automation scripts
```

#### Code Modularity Tools

The code-modularity tools provide comprehensive static code analysis capabilities:

- **Enhanced Static Code Analysis**: Dead code detection, unused imports detection, code duplication detection
- **Configurable Thresholds**: Customizable analysis parameters and severity levels
- **Integration**: Seamless integration with existing development workflow
- **Notification System**: Real-time notifications for code quality issues

#### Commit Assistant Tools

The commit-assistant tools provide intelligent commit assistance:

- **AI-Powered Messages**: Automated generation of meaningful commit messages
- **Commit Reminders**: Intelligent reminders based on code changes
- **Integration**: Git hooks integration for automated assistance

#### Todo List Management

The todo-list tools provide AI-integrated task management:

- **AI Integration**: Smart task prioritization and suggestions
- **Multiple Storage**: Support for various storage backends
- **Notification System**: Automated reminders and progress tracking

### Docs

The `Docs` directory contains all the project documentation. Here's an overview of its structure:

```
Docs/
├── architecture/        # Architecture documentation
├── daily-logs/          # Daily development logs
├── features/            # Feature documentation
├── guides/              # Development guides
├── processes/           # Process documentation
├── tracking/            # Progress tracking documentation
└── documentation-map.md # Documentation map
```

## Configuration Files

The project uses the following configuration files:

### Root Configuration Files

- `package.json`: Contains scripts that point to the `Relume Work Dir` directory
- `.gitignore`: Specifies files to ignore in Git
- `netlify.toml`: Netlify configuration

### Relume Work Dir Configuration Files

- `next.config.js`: Next.js configuration
- `tailwind.config.ts`: Tailwind CSS configuration
- `tsconfig.json`: TypeScript configuration
- `package.json`: Project dependencies and scripts
- `postcss.config.js`: PostCSS configuration
- `.eslintrc.json`: ESLint configuration

## Implementation History

The project structure has evolved through several key implementations:

### 1. App Router Standardization (May 14, 2025)

The App Router Standardization implementation focused on resolving conflicts between Pages Router and App Router approaches. This included:

1. Updating configuration files to support the App Router approach
2. Removing conflicting Pages Router files
3. Fixing issues with specific pages (e.g., Window Style Finder)
4. Testing all pages in both development and production modes

Documentation: [App Router Standardization Plan](../processes/app-router-standardization-plan.md)

### 2. Project Structure Consolidation (May 15, 2025)

The Project Structure Consolidation implementation focused on removing duplicate directories and files outside the `Relume-root` directory. This included:

1. Identifying duplicate directories and files
2. Removing the duplicates
3. Verifying that the configuration files are correct
4. Testing the application in both development and production modes
5. Updating the documentation to reflect the new structure

Documentation: [Project Structure Consolidation Plan](../processes/project-structure-consolidation-plan.md)

## Best Practices

1. **Never edit files in the `Relume-DO-NOT-EDIT` directory**
2. **Always use the App Router for new pages**
3. **Follow the established directory structure**
4. **Document all changes in the daily logs**
5. **Update the documentation when making significant changes**
6. **Test all changes in both development and production modes**
7. **Follow the naming conventions used in the project**
8. **Use the Relume UI components for consistency**
9. **Keep the project structure clean and organized**
10. **Regularly update the documentation to reflect the current state of the project**

## Related Documentation

- [Project Structure Guide](../guides/project-structure-guide.md) - Detailed guide for the consolidated project structure
- [Project Structure Consolidation Plan](../processes/project-structure-consolidation-plan.md) - Plan for consolidating the project structure
- [App Router Standardization Plan](../processes/app-router-standardization-plan.md) - Plan for standardizing on the App Router approach
- [Daily Log: Project Structure Consolidation Implementation](../daily-logs/2025-05-15-project-structure-consolidation-implementation.md) - Daily log for the implementation
- [Daily Log: Project Structure Consolidation Plan](../daily-logs/2025-05-14-project-structure-consolidation-plan.md) - Daily log for the plan creation
- [Documentation Map](../documentation-map.md) - Map of all project documentation
- [Architecture Index](./index.md) - Index of all architecture documentation

Last Updated: January 27, 2025 (Added scripts directory structure for Phase 1 implementation)
