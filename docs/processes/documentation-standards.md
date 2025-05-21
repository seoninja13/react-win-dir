# Documentation Standards

This document outlines the standards and guidelines for documentation in the Window World LA website project.

## Overview

Documentation is a critical part of the development process. It helps team members understand the project, its components, and how to work with them. This document provides guidelines for creating and maintaining documentation.

## Documentation Structure

The documentation follows a pyramid structure with the main README.md as the single entry point. All documentation is organized hierarchically in the `Docs/` directory.

```
Docs/
├── admin/              # Admin UI documentation and guides
├── architecture/       # System design and architecture documentation
│   ├── index.md                      # Architecture documentation index
│   ├── architecture-documentation.md # Comprehensive architecture documentation
│   ├── project-structure-current-state.md # Current state of the project structure
│   ├── routing-strategy.md           # App Router routing strategy
│   └── ...                           # Other architecture documentation
├── daily-logs/         # Daily development logs
├── features/           # Feature implementation documentation
├── guides/             # Developer guides and tutorials
├── Image generation/   # Documentation for image generation using Google Cloud's Generative AI
├── integrations/       # Integration documentation for external services
├── Knowledge Base/     # Knowledge Base system documentation
│   ├── index.md                      # Knowledge Base overview
│   ├── knowledge-base-workflow.md    # End-to-end workflow
│   ├── knowledge-base-implementation.md # Implementation overview
│   ├── semantic-chunking-process.md  # Semantic chunking process
│   ├── embedding-generation.md       # Embedding generation with Gemini
│   ├── vector-storage.md             # Vector storage in Supabase
│   ├── search-functionality.md       # Search functionality
│   ├── automated-ingestion-process.md # Automated content ingestion
│   ├── setup-guide.md                # Setup guide
│   ├── adding-content.md             # Adding content guide
│   ├── searching-content.md          # Searching content guide
│   ├── best-practices.md             # Best practices
│   ├── api-reference.md              # API reference
│   ├── database-schema.md            # Database schema
│   ├── performance-considerations.md # Performance considerations
│   └── troubleshooting.md            # Troubleshooting guide
├── migration/          # App Router migration documentation
├── onboarding/         # Documentation for new developers
├── pages/              # Documentation for implemented pages
├── planning/           # Planning documentation and implementation plans
├── processes/          # Process documentation
├── sample-images/      # Documentation for using sample images in components
├── testing/            # Testing documentation and guidelines
├── templates/          # Documentation templates
├── tracking/           # Progress tracking documentation
│   ├── project-priorities.md         # Project priorities tracker
│   ├── webpage-progress-tracker.md   # Webpage implementation progress
│   └── image-generation-progress.md  # Image generation progress
├── documentation-map.md # Map of all documentation
├── index.md            # Documentation index
└── priority-list.md    # Prioritized list of tasks
```

## Documentation Types

### README.md

The main README.md file is the single entry point for all documentation. It provides an overview of the project, its features, and how to get started.

### Documentation Index

The `docs/index.md` file provides an overview of the documentation structure and links to all documentation categories.

### Architecture Documentation

Architecture documentation provides detailed information about the system design, component interactions, and technical decisions.

### Feature Documentation

Feature documentation provides detailed information about specific features of the application.

### Guide Documentation

Guide documentation provides step-by-step instructions for developers working on the project.

### Knowledge Base Documentation

Knowledge Base documentation provides detailed information about the knowledge base system, including:

- **Knowledge Base Overview**: General overview of the knowledge base system
- **Knowledge Base Workflow**: End-to-end workflow of the knowledge base system
- **Semantic Chunking Process**: Detailed explanation of the semantic chunking process
- **Embedding Generation**: How embeddings are generated using Gemini 2.0 Flash
- **Vector Storage**: How vectors are stored and retrieved from Supabase
- **Search Functionality**: How the search functionality works
- **Automated Ingestion Process**: How to automatically ingest content from various sources

### Integration Documentation

Integration documentation provides information about integrating with external services.

### Process Documentation

Process documentation provides information about various processes used in the project.

### Testing Documentation

Testing documentation provides detailed instructions for testing the project.

### Daily Logs

Daily logs provide a record of development activities, decisions, and progress.

### Priority Task List

The priority task list provides a prioritized list of tasks for the project.

## Documentation Standards

### File Naming

- Use lowercase letters and hyphens for file names (e.g., `component-structure.md`).
- Use descriptive names that reflect the content of the file.
- Use the `.md` extension for Markdown files.

### File Structure

- Start each file with a level 1 heading (`#`) that matches the file name.
- Use level 2 headings (`##`) for main sections.
- Use level 3 headings (`###`) for subsections.
- Use level 4 headings (`####`) for sub-subsections.
- Include a table of contents for files longer than 500 lines.

### Content Guidelines

- Use clear and concise language.
- Use active voice and present tense.
- Use code blocks for code examples.
- Use lists for steps and items.
- Use tables for structured data.
- Use images and diagrams when appropriate.
- Include examples and use cases.
- Link to related documentation.

### Markdown Formatting

- Use Markdown formatting consistently.
- Use backticks (`` ` ``) for inline code.
- Use triple backticks (`` ``` ``) for code blocks.
- Specify the language for code blocks (e.g., `` ```jsx ``).
- Use asterisks (`*`) for unordered lists.
- Use numbers (`1.`) for ordered lists.
- Use greater than (`>`) for blockquotes.
- Use hyphens and pipes (`-|-`) for tables.

### Code Examples

- Include code examples for components, hooks, and utilities.
- Use TypeScript for code examples.
- Include comments to explain complex code.
- Show usage examples for components and hooks.

### Links

- Use relative links for internal documentation.
- Use absolute links for external resources.
- Use descriptive link text.
- Check links regularly to ensure they are not broken.

## Documentation Workflow

### Creating New Documentation

1. Identify the type of documentation needed.
2. Choose the appropriate directory based on the documentation type.
3. Create a new Markdown file with a descriptive name.
4. Follow the file structure and content guidelines.
5. Add links to related documentation.
6. Update the documentation map and index.

### Updating Existing Documentation

1. Locate the documentation file to update.
2. Make the necessary changes.
3. Follow the content guidelines.
4. Update links if necessary.
5. Update the documentation map and index if necessary.

### Creating Daily Logs

1. Create a new Markdown file in the `docs/daily-logs/` directory with the date as the filename (e.g., `2025-05-09.md`).
2. Include a summary of the day's activities.
3. List tasks completed.
4. Document issues encountered and how they were resolved.
5. List next steps.
6. Include any notes or observations.

### Updating the Priority Task List

1. Locate the `docs/priority-list.md` file.
2. Update the list of tasks.
3. Prioritize tasks based on importance and urgency.
4. Mark completed tasks.
5. Add new tasks as needed.

## Documentation Review

### Self-Review

Before submitting documentation, review it for:

- Accuracy and completeness
- Clarity and conciseness
- Consistency with documentation standards
- Proper formatting
- Correct links
- Code examples that work

### Peer Review

Documentation should be reviewed by at least one other team member for:

- Technical accuracy
- Clarity and understandability
- Consistency with documentation standards
- Completeness

## Documentation Maintenance

### Regular Updates

- Update documentation when code changes.
- Review documentation regularly for accuracy.
- Remove outdated documentation.
- Add new documentation as needed.

### Version Control

- Use Git for version control of documentation.
- Commit documentation changes with descriptive commit messages.
- Review documentation changes before committing.

## Related Documentation

- [Component Structure](../architecture/component-structure.md)
- [Page Structure](../architecture/page-structure.md)
- [Development Workflow](../processes/development-workflow.md)
