# Getting Started for New Developers

**Priority Level: 1 (Critical)**

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Onboarding](./index.md) > Getting Started for New Developers

## Table of Contents

1. [Welcome](#welcome)
2. [Project Overview](#project-overview)
3. [Development Environment Setup](#development-environment-setup)
4. [Project Structure](#project-structure)
5. [Priority System](#priority-system)
6. [Documentation Structure](#documentation-structure)
7. [Development Workflow](#development-workflow)
8. [Common Tasks](#common-tasks)
9. [Troubleshooting](#troubleshooting)
10. [Related Documentation](#related-documentation)

## Welcome

Welcome to the Windows Doors CA website project! This document is designed to help you get started quickly and understand how to navigate the project, find priority tasks, and contribute effectively.

## Project Overview

The Windows Doors CA website is a modern website for a windows, doors, siding, and roofing company. The website is built using Next.js, React, and Tailwind CSS, with Relume UI components.

**Current Project Status**: Development in progress
**Current Version**: 0.4.0
**Routing Strategy**: Next.js App Router (migration in progress)
**Project Structure**: Consolidation complete, App Router migration in progress

## Development Environment Setup

### System Requirements

- Node.js 18.x or higher
- npm 9.x or higher
- Git

### Initial Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd react-win-dir
   ```

2. Install dependencies:
   ```bash
   cd Relume-root
   npm install
   ```

3. Start the development server:
   ```bash
   # First, kill any existing Node.js processes to avoid port conflicts
   taskkill /F /IM node.exe

   # Then start the development server
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

## Project Structure

The project has the following high-level directory structure:

```
react-win-dir/                      # Project root (repository root)
├── Docs/                           # Project documentation
│   ├── architecture/               # Architecture documentation
│   ├── daily-logs/                 # Daily development logs
│   ├── migration/                  # Migration documentation
│   ├── onboarding/                 # Onboarding documentation
│   ├── pages/                      # Page-specific documentation
│   ├── processes/                  # Process documentation
│   └── tracking/                   # Progress tracking documentation
├── Relume-DO-NOT-EDIT/             # Original Relume components (DO NOT EDIT)
├── Relume-root/                    # Main project directory (PRIMARY WORKING DIRECTORY)
│   ├── components/                 # Shared components
│   ├── pages/                      # Pages Router pages (being phased out)
│   ├── public/                     # Static assets
│   ├── src/                        # Source code
│   │   ├── app/                    # App Router pages (target architecture)
│   │   ├── components/             # React components
│   │   └── utils/                  # Utility functions
│   ├── styles/                     # Global styles
│   ├── [page-directories]/         # Page-specific components (e.g., home/, windows/, doors/)
│   ├── next.config.js              # Next.js configuration
│   ├── package.json                # Project dependencies
│   └── tailwind.config.js          # Tailwind CSS configuration
├── Sample Project Structure Do Not Delete/ # Reference materials
├── sample-images/                  # Sample images for development
└── Supabase/                       # Supabase-related files
```

### Key Directories

- **Relume-root/**: This is the primary working directory where ALL development work MUST be done. No files related to the website implementation should exist outside this directory.
- **Relume-root/src/app/**: This is where all App Router pages should be created.
- **Relume-DO-NOT-EDIT/**: This directory contains the original Relume components and should never be edited.
- **Docs/**: This directory contains all project documentation.

> **CRITICAL DIRECTORY STRUCTURE POLICY**: ALL files related to the website implementation MUST be located within the Relume-root directory. See the [Directory Structure Policy](../architecture/directory-structure-policy.md) for details.

## Priority System

The project uses a clear priority system to help you understand what tasks should be worked on first. The priority levels are:

- **Priority 1 (Critical)**: These tasks are the most important and should be tackled first. They are typically blocking issues or critical features.
- **Priority 2 (High)**: These tasks are important but not as critical as Priority 1 tasks. They should be worked on after Priority 1 tasks are completed.
- **Priority 3 (Medium)**: These tasks are important but can wait until Priority 1 and 2 tasks are completed.
- **Priority 4 (Low)**: These tasks are nice-to-have features or improvements that can be worked on when time permits.
- **Priority 5 (Backlog)**: These tasks are in the backlog and will be prioritized later.

### Finding Priority Tasks

1. **Check the README.md**: The main README.md file at the root of the project always lists the current top priorities.

2. **Check the Priority List**: The `Docs/priority-list.md` file contains a comprehensive list of all tasks with their priority levels.

3. **Check the Migration Documentation**: If you're working on the App Router migration, check the `Docs/migration/` directory for specific tasks.

4. **Check the Daily Logs**: The `Docs/daily-logs/` directory contains daily logs of development activities, which often include priority tasks for the next day.

### Current Top Priorities

As of May 27, 2025, the top priorities are:

1. **Fix Non-Working Pages (Immediate Action - May 28, 2025)**
   - Resolve routing conflicts for Bay-Bow Windows Page
   - Resolve routing conflicts for Hinged Patio Doors Page
   - Resolve routing conflicts for Vinyl Siding Series Pages
   - Remove simplified debug version of Garage Doors Page

2. **Standardize Directory Structure (After Fixing Non-Working Pages)**
   - Identify App Router pages outside Relume-root
   - Move App Router pages to Relume-root/src/app/
   - Update import paths to reflect the correct directory structure

3. **Migrate High-Priority Pages (If Time Permits)**
   - Create App Router implementation for Entry Doors Page
   - Create App Router implementation for Patio Doors Page
   - Create App Router implementation for Awning Windows Page
   - Create App Router implementation for Picture Windows Page

For detailed instructions on these tasks, see the [Tomorrow Morning Tasks](../migration/tomorrow-morning-tasks.md) document.

## Documentation Structure

The project follows a pyramidal documentation structure with the README.md as the single entry point. All documentation is organized hierarchically in the `Docs` directory.

### Key Documentation

- [Project Structure Current State](../architecture/project-structure-current-state.md): Provides a comprehensive overview of the current project structure.
- [App Router Migration Tracking](../migration/app-router-migration-tracking.md): Tracks the progress of the App Router migration.
- [Next Steps for App Router Migration](../migration/next-steps-for-app-router-migration.md): Outlines the next steps for the App Router migration.
- [Tomorrow Morning Tasks](../migration/tomorrow-morning-tasks.md): Specific tasks to be completed tomorrow morning.
- [Priority List](../priority-list.md): Comprehensive list of all tasks with their priority levels.
- [Daily Logs](../daily-logs/): Daily development logs.

## Development Workflow

### General Workflow

1. **Check Priority Tasks**: Always start by checking the current priority tasks in the README.md and priority-list.md.
2. **Create a Plan**: Before making any changes, create a detailed plan for what you want to accomplish.
3. **Implement Changes**: Make the necessary changes to the codebase.
4. **Test Changes**: Test your changes to ensure they work as expected.
5. **Document Changes**: Document your changes in the daily logs and update any relevant documentation.
6. **Commit Changes**: Commit your changes with a clear and descriptive commit message.

### App Router Migration Workflow

If you're working on the App Router migration, follow this workflow:

1. **Check the Migration Status**: Check the current status of the migration in the App Router Migration Tracking document.
2. **Identify the Next Page to Migrate**: Identify the next page that needs to be migrated based on the priority list.
3. **Create the App Router Implementation**: Create the App Router implementation for the page.
4. **Test the Implementation**: Test the implementation to ensure it works correctly.
5. **Document the Migration**: Document the migration in the daily logs and update the migration tracking document.

## Common Tasks

### Starting the Development Server

```bash
# First, kill any existing Node.js processes to avoid port conflicts
taskkill /F /IM node.exe

# Then start the development server
cd Relume-root
npm run dev
```

### Creating a New Page

1. Create a new directory in `Relume-root/src/app/` for the page.
2. Create a `page.tsx` file in the directory.
3. Import the necessary components and implement the page.
4. Add logging functionality to track page rendering.
5. Test the page to ensure it works correctly.

### Fixing a Non-Working Page

1. Check if the page has both Pages Router and App Router implementations.
2. If it does, temporarily rename the Pages Router implementation to allow the App Router implementation to take precedence.
3. Test the page to ensure it works correctly.
4. Document the fix in the daily logs and update the migration tracking document.

## Troubleshooting

### Common Issues

- **Port Conflicts**: If you encounter port conflicts, kill all Node.js processes and restart the development server.
- **Import Path Errors**: If you encounter import path errors, check the import paths and update them to reflect the correct directory structure.
- **Routing Conflicts**: If you encounter routing conflicts, check if the page has both Pages Router and App Router implementations and resolve the conflict.

### Getting Help

If you encounter any issues that you can't resolve, check the documentation first. If you still can't resolve the issue, ask for help from the team.

## Related Documentation

- [Project Structure Current State](../architecture/project-structure-current-state.md)
- [App Router Migration Tracking](../migration/app-router-migration-tracking.md)
- [Next Steps for App Router Migration](../migration/next-steps-for-app-router-migration.md)
- [Tomorrow Morning Tasks](../migration/tomorrow-morning-tasks.md)
- [Priority List](../priority-list.md)
- [Daily Logs](../daily-logs/)

Last Updated: May 27, 2025
