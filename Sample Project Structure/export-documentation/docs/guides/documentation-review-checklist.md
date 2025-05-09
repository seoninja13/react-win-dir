# Documentation Review Checklist

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Guides](./index.md) > Documentation Review Checklist

## Overview

This checklist provides a comprehensive guide for reviewing documentation in the Water Damage CA project. It ensures that all documentation meets our quality standards and follows our established conventions.

## Structure and Organization

### Document Structure

- [ ] **Breadcrumb Navigation**: Document includes breadcrumb navigation at the top
  ```markdown
  > **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Category](./index.md) > Current Document
  ```

- [ ] **Heading Hierarchy**: Document uses proper heading hierarchy (H1 for title, H2 for main sections, H3 for subsections)
  ```markdown
  # Document Title (H1)
  ## Main Section (H2)
  ### Subsection (H3)
  #### Sub-subsection (H4)
  ```

- [ ] **Table of Contents**: Document includes a table of contents for documents longer than 500 lines
  ```markdown
  ## Table of Contents
  - [Section 1](#section-1)
  - [Section 2](#section-2)
    - [Subsection 2.1](#subsection-21)
  ```

- [ ] **Related Documentation**: Document includes links to related documentation at the bottom
  ```markdown
  ## Related Documentation
  - [Document 1](./document-1.md)
  - [Document 2](../category/document-2.md)
  ```

- [ ] **Last Updated Date**: Document includes a "Last Updated" date at the bottom
  ```markdown
  Last Updated: April 22, 2025
  ```

### File Organization

- [ ] **Correct Directory**: Document is in the appropriate directory based on its category
  - Architecture documentation in `docs/architecture/`
  - Feature documentation in `docs/features/`
  - Guide documentation in `docs/guides/`
  - Integration documentation in `docs/integrations/`
  - Process documentation in `docs/processes/`
  - Testing documentation in `docs/testing/`
  - Planning documentation in `docs/planning/`

- [ ] **File Naming**: Document follows the file naming convention (lowercase, hyphens for spaces)
  - Example: `business-profile-implementation.md`

- [ ] **Index Files**: Category has an index file (`index.md`) that lists all documents in the category

## Content Quality

### Accuracy and Completeness

- [ ] **Technical Accuracy**: All technical information is accurate and up-to-date
- [ ] **Code Examples**: Code examples are correct, properly formatted, and include language specifiers
  ```markdown
  ```typescript
  const example = "This is a code example";
  ```
  ```
- [ ] **Comprehensive Coverage**: Document covers all aspects of the topic
- [ ] **No TODOs**: Document does not contain TODO comments or placeholders

### Clarity and Readability

- [ ] **Clear Overview**: Document begins with a clear overview of the topic
- [ ] **Consistent Terminology**: Document uses consistent terminology throughout
- [ ] **Defined Acronyms**: All acronyms are defined on first use
- [ ] **Appropriate Detail Level**: Document provides appropriate level of detail for its audience
- [ ] **Logical Flow**: Document has a logical flow from beginning to end

### Visual Elements

- [ ] **Diagrams**: Complex concepts are illustrated with diagrams where appropriate
  ```markdown
  ```mermaid
  graph TD
      A[Start] --> B[Process]
      B --> C[End]
  ```
  ```
- [ ] **Screenshots**: UI elements are illustrated with screenshots where appropriate
- [ ] **Tables**: Tabular data is presented in tables
  ```markdown
  | Column 1 | Column 2 |
  |----------|----------|
  | Value 1  | Value 2  |
  ```
- [ ] **Lists**: Lists are used for sequential steps or related items

## Formatting and Style

### Markdown Formatting

- [ ] **Consistent Headings**: Headings use the same style throughout (# for H1, ## for H2, etc.)
- [ ] **Code Blocks**: Code blocks use language specifiers
- [ ] **Links**: Links use relative paths for internal links and full URLs for external links
- [ ] **Images**: Images include alt text and are properly sized
  ```markdown
  ![Alt text](./path/to/image.png)
  ```
- [ ] **Blockquotes**: Blockquotes are used for quotes or important notes
  ```markdown
  > This is an important note.
  ```

### Writing Style

- [ ] **Active Voice**: Document uses active voice rather than passive voice
- [ ] **Concise Language**: Document uses concise language without unnecessary words
- [ ] **Consistent Tense**: Document uses consistent tense (present tense preferred)
- [ ] **No Jargon**: Document avoids unnecessary jargon or explains technical terms
- [ ] **Proper Grammar**: Document uses proper grammar and spelling

## Technical Accuracy

### Code Examples

- [ ] **Syntax Highlighting**: Code examples use appropriate language specifiers
- [ ] **Correct Syntax**: Code examples use correct syntax
- [ ] **Consistent Style**: Code examples follow the project's coding style
- [ ] **Complete Examples**: Code examples are complete and can be copied and used
- [ ] **Context**: Code examples include comments or explanations

### API References

- [ ] **Accurate Parameters**: API references include accurate parameter descriptions
- [ ] **Return Values**: API references include return value descriptions
- [ ] **Error Handling**: API references include error handling information
- [ ] **Examples**: API references include usage examples
- [ ] **Versioning**: API references include version information if applicable

## Links and References

### Internal Links

- [ ] **Relative Paths**: Internal links use relative paths
  ```markdown
  [Document](../category/document.md)
  ```
- [ ] **Working Links**: All internal links work and point to the correct documents
- [ ] **Consistent Naming**: Link text matches the title of the linked document
- [ ] **No Broken Links**: No links point to non-existent documents

### External Links

- [ ] **Full URLs**: External links use full URLs
  ```markdown
  [External Site](https://example.com)
  ```
- [ ] **HTTPS**: External links use HTTPS where available
- [ ] **Descriptive Text**: Link text describes the linked content
- [ ] **Stability**: External links point to stable resources

## Accessibility

### Text Alternatives

- [ ] **Image Alt Text**: All images include alt text
- [ ] **Diagram Descriptions**: Complex diagrams include text descriptions
- [ ] **No Information in Color Only**: Information is not conveyed by color alone

### Structure

- [ ] **Proper Headings**: Document uses proper heading hierarchy
- [ ] **Lists for Lists**: Lists are used for list content
- [ ] **Tables for Tabular Data**: Tables are used for tabular data
- [ ] **No ASCII Art**: Document does not use ASCII art for diagrams

## SEO Optimization

### Keywords

- [ ] **Relevant Keywords**: Document includes relevant keywords in title and headings
- [ ] **Natural Usage**: Keywords are used naturally in the text
- [ ] **Metadata**: Document includes metadata for search index

### Search Index

- [ ] **Search Index Entry**: Document has an entry in the search index
  ```markdown
  ### Document Title
  - **Description**: Brief description of the document
  - **Keywords**: keyword1, keyword2, keyword3
  - **Link**: [Document Title](./path/to/document.md)
  ```
- [ ] **Accurate Description**: Search index entry has an accurate description
- [ ] **Relevant Keywords**: Search index entry includes relevant keywords

## Review Process

### Pre-Review

1. **Self-Review**: Perform a self-review using this checklist before submitting for review
2. **Automated Checks**: Run automated documentation checks if available
3. **Preview**: Preview the document to ensure proper rendering

### During Review

1. **Checklist**: Use this checklist to guide the review
2. **Comments**: Provide specific, actionable comments
3. **Suggestions**: Offer suggestions for improvement
4. **Praise**: Acknowledge good documentation practices

### Post-Review

1. **Address Comments**: Address all review comments
2. **Re-Review**: Submit for re-review if significant changes were made
3. **Update Search Index**: Update the search index if necessary
4. **Update Last Updated Date**: Update the "Last Updated" date

## Common Issues and Solutions

### Structure Issues

- **Missing Breadcrumb Navigation**: Add breadcrumb navigation at the top of the document
- **Incorrect Heading Hierarchy**: Ensure proper heading hierarchy (H1 for title, H2 for main sections)
- **Missing Related Documentation**: Add links to related documentation at the bottom
- **Missing Last Updated Date**: Add a "Last Updated" date at the bottom

### Content Issues

- **Incomplete Information**: Ensure document covers all aspects of the topic
- **Outdated Information**: Update document with current information
- **Unclear Explanations**: Clarify explanations with examples or diagrams
- **Missing Code Examples**: Add code examples to illustrate concepts

### Formatting Issues

- **Inconsistent Formatting**: Use consistent formatting throughout
- **Missing Language Specifiers**: Add language specifiers to code blocks
- **Broken Links**: Fix broken links
- **Missing Alt Text**: Add alt text to images

## Related Documentation

- [Documentation Standards](./documentation-standards.md)
- [Documentation Review Schedule](./documentation-review-schedule.md)
- [New Developer Guide](./new-developer-guide.md)
- [TypeScript Interface Guide](./typescript-interface-guide.md)

Last Updated: April 22, 2025
