# Windows Doors Website React - IDE Instructions

## 🎯 MANDATORY TASK COMPLETION PROCESS

**CRITICAL: EVERY TASK COMPLETION MUST FOLLOW THIS 3-STEP PROCESS**

### Step 1: Update Project Documentation
- Update relevant documentation files in `Docs/` directory
- Update webpage progress tracker (`Docs/tracking/webpage-progress-tracker.md`)
- Create or update daily logs (`Docs/daily-logs/YYYY-MM-DD-*.md`)
- Follow pyramid hierarchical structure starting from README.md
- Update architecture documentation for significant changes
- Document component changes with JSDoc comments
- Update API documentation for integration changes
- Maintain cross-references and links between documents

### Step 2: Update Tracking Systems
- Update all relevant tracking documents
- Ensure progress metrics are current and accurate
- Document any issues resolved or created
- Maintain consistency across all tracking systems
- Update project priorities and task lists
- Record testing results and quality metrics
- Document performance improvements and optimizations
- Track code coverage and testing compliance

### Step 3: Use Linear + Sequential Thinking for Task Management
- **Linear**: Create or update issues for completed work, sync with documentation
- **Sequential Thinking MCP**: Use for complex problem analysis and planning
- **Complementary Usage**: Sequential Thinking for analysis, Linear for tracking
- Link related issues and dependencies in Linear
- Add detailed progress information and references
- Maintain epic and milestone tracking
- Document blockers and resolution strategies

**🔄 DUAL-SOURCE TRUTH REQUIREMENT (CRITICAL):**
- **Project Documentation** ↔ **Linear** must be **identical and synced**
- Information must never be out of sync
- Both systems must be updated simultaneously
- Any discrepancy must be resolved immediately
- Verify synchronization after each update cycle

## Tech Stack & Core Components

- **Framework**: Next.js 15.3.1 with App Router (ISR with 6-month cache)
- **Frontend**: React 18.2.0, TypeScript, Tailwind CSS
- **UI Library**: Relume UI (@relume_io/relume-ui and @relume_io/relume-tailwind)
- **Database**: Supabase with pgvector for vector storage and search
- **Testing**: Jest, React Testing Library, Playwright for E2E
- **AI Integration**: Google Cloud Vertex AI (Imagen API, Gemini 2.0 Flash)
- **Development Tools**: Netlify Dev, Supabase CLI, Linear MCP, Sequential Thinking MCP
- **Architecture**: Located at `docs/architecture/architecture-documentation.md`

## Development Guidelines

### General Rules
- **Component Reuse**: Check existing components before creating new ones
- **Documentation Structure**: Follow pyramid documentation structure in docs/ folder
- **File Protection**: **NEVER** edit files in "Relume-DO-NOT-EDIT" folder - copy and modify instead
- **Change Documentation**: Document code changes before committing (approval required)
- **Visual Parity**: Maintain exact visual/functional parity with original Window World LA site
- **Pattern Following**: Follow established patterns from working implementations
- **Context Management**: Stop and update documentation when context window reaches 800,000 tokens

### Best Practices
- **Architecture Reference**: Use architecture documentation as primary reference
- **Responsive Testing**: Test components at multiple screen sizes and breakpoints
- **Database Standards**: Follow Supabase best practices (typed queries, error handling, RLS)
- **Daily Documentation**: Create daily logs in docs/daily-logs/ (YYYY-MM-DD format)
- **Code Quality**: Write heavily commented code explaining component matching
- **Performance**: Clean Next.js cache when needed for optimal performance
- **Accessibility**: Add proper ARIA attributes while maintaining visual parity
- **SEO**: Preserve all meta tags and URL structure from original site

### Code Documentation Standards
- **JSDoc Comments**: Document all public APIs, exported functions, and components
- **Complex Logic**: Add inline comments for non-obvious code and business logic
- **API Documentation**: Document all external integrations and data flows
- **Usage Examples**: Provide usage examples for components and utilities
- **Architecture Updates**: Update architecture documentation for significant changes
- **Component Documentation**: Maintain component documentation for new or modified components

## Development Environment

### Setup Instructions

#### Directory Requirements
- **Working Directory**: Always run development server from the project root directory
- **Path Resolution**: Ensure all paths are relative to the project root
- **Environment Files**: Ensure `.env.local` is in the root of "Relume Work Dir", not in subdirectories
- **Import Paths**: For pages using website-pages components, use path: `../../../website-pages/[page]/components/`
- **Route Structure**: Some pages are at root level (e.g., `/double-hung`, `/wood-windows`) not under `/windows/`

#### Command Syntax and Development Server
- **Command Chaining**: Use semicolons (;) instead of && for commands
- **Development Command**: `cd path/to/project; npm run dev`
- **Netlify Development**: `netlify dev` for local development with Netlify functions
- **Port Management**: Development server should run on port 3000, Next.js on port 8888
- **Port Conflicts**: Kill all ports first: `taskkill /F /FI "IMAGENAME eq node.exe"`

#### Supabase Setup and Configuration
- **CLI Installation**: `npm install -g supabase`
- **Local Development**: `supabase start` to start local Supabase instance
- **Type Generation**: `supabase gen types typescript --local > src/types/supabase.ts`
- **Studio Access**: Local Supabase Studio at <http://localhost:54323>
- **Database Operations**: Use typed queries with TypeScript for type safety
- **Error Handling**: Implement proper error handling for all database operations
- **Security**: Use RLS (Row Level Security) policies for data protection
- **Performance**: Create database indexes for frequently queried columns

#### Troubleshooting and Error Resolution
- **Build Errors**: Fix build errors before trying to run the development server
- **Working Directory**: Always verify current working directory before running development server
- **Relume UI**: Ensure Relume UI is properly configured in tailwind.config.ts
- **Supabase Issues**: Check environment variables and network connectivity
- **Repeated Errors**: Document troubleshooting steps when encountering repeated errors
- **Port Issues**: Kill ports and restart development server after 3 identical errors
- **SQL Errors**: Avoid SQL queries on non-existent table columns
- **Alternative Approaches**: Continue troubleshooting with alternative approaches when stuck

## Testing Methodology

### Comprehensive Testing Strategy

#### Unit Testing
- **Framework**: Jest with React Testing Library
- **Coverage Requirements**: 100% for utility functions, 80% for components, 70% for pages
- **Focus Areas**: Individual components and functions in isolation
- **Test Behavior**: Test what the code does, not how it does it
- **Realistic Data**: Use realistic data in tests to reflect real-world usage

#### Integration Testing
- **API Testing**: Test all Supabase integrations and external APIs
- **Component Integration**: Test component interactions and data flow
- **Error Handling**: 100% coverage for error scenarios
- **Performance Metrics**: Monitor response times and resource usage

#### End-to-End Testing
- **Framework**: Playwright for browser automation
- **User Journeys**: Test complete user workflows and interactions
- **Cross-Browser**: Test across different browsers and devices
- **Visual Regression**: AI-powered visual change detection

#### AI Integration Testing
- **Google Cloud APIs**: Test Imagen API and Gemini 2.0 Flash integrations
- **Error Scenarios**: Test API failures, rate limiting, and timeout handling
- **Performance**: Monitor API response times and resource usage
- **Usage Tracking**: Monitor API usage statistics and costs

### Page Testing Process
1. **Create Route**: Establish proper App Router structure following established patterns
2. **Verify Functionality**: Test in browser before proceeding with implementation
3. **Cross-Browser Testing**: Verify functionality across different browsers and devices
4. **Responsive Testing**: Test at multiple breakpoints and screen sizes
5. **Accessibility Testing**: Run automated accessibility tests (Lighthouse, axe)
6. **Performance Testing**: Compare load times with original site
7. **Document Results**: Update tracking systems immediately with test results
8. **Follow 3-Step Process**: Complete documentation and Linear sync

### Error Resolution Workflow
1. **Identify Root Cause**: Analyze error patterns, logs, and stack traces systematically
2. **Check Existing Solutions**: Reference previous implementations and documented fixes
3. **Implement Fix**: Apply solution following established patterns and best practices
4. **Test Fix**: Verify fix resolves issue without introducing new problems
5. **Document Fix**: Record solution in appropriate documentation with context
6. **Update Tracking**: Ensure all systems reflect current status and resolution
7. **Share Knowledge**: Document insights and solutions for team knowledge sharing

### Quality Assurance Standards
- **Functional Testing**: Test all interactive elements for proper functionality
- **Responsive Design**: Verify responsive design across all breakpoints
- **Accessibility Compliance**: Ensure WCAG 2.1 AA standards compliance
- **Performance Standards**: Optimize Core Web Vitals while maintaining visual parity
- **Visual Parity**: Validate exact matching against original Window World LA site
- **SEO Compliance**: Preserve all meta tags and URL structure from original
- **Database Integrity**: Test all Supabase queries for correctness and performance

## Page Implementation Workflow

### Sequential Implementation Process
1. **Pre-Implementation Analysis**
   - Review architecture documentation for component requirements
   - Analyze original site structure and functionality
   - Check for existing similar implementations
   - Plan component structure and data requirements

2. **Route Creation**
   - Establish proper App Router structure following Next.js 15.3.1 patterns
   - Implement dynamic routing with ISR where appropriate
   - Configure proper metadata and SEO elements
   - Set up proper error boundaries and loading states

3. **Component Development**
   - Copy relevant components from "Relume-DO-NOT-EDIT" folder
   - Modify components to match original site exactly
   - Implement proper TypeScript types and interfaces
   - Add comprehensive JSDoc documentation

4. **Functionality Verification**
   - Test in browser before proceeding with additional features
   - Verify all interactive elements work correctly
   - Test responsive design at multiple breakpoints
   - Validate accessibility compliance

5. **Integration Testing**
   - Test Supabase integrations and data flow
   - Verify external API integrations work correctly
   - Test error handling and edge cases
   - Validate performance meets requirements

6. **Documentation and Confirmation**
   - Wait for confirmation that page matches expected design
   - Document implementation details, errors encountered, and solutions
   - Update webpage progress tracker with current status
   - Record any deviations or workarounds required

7. **Completion and Handoff**
   - Complete 3-step task completion process
   - Update all tracking systems with final status
   - Wait for command before proceeding to next page
   - Ensure no parallel page development occurs

## Advanced Development Tools

### MCP Server Configuration and Usage
**Available MCP Servers:**
- **brave-search**: Web search capabilities for research and documentation
- **context7**: Library documentation retrieval (start with 5000 tokens, increase to 20000 if needed)
- **google-maps**: Geographic and location-based functionality
- **mcp-openai**: AI-powered development assistance
- **server-sequential-thinking**: Complex problem analysis and multi-step planning

### MCP Server Usage Guidelines
- **Context7 Usage**: Limit searches to 3 attempts max per topic
- **Fallback Strategy**: Use Brave MCP server for wider searches if Context7 fails
- **Token Management**: Start with conservative token limits, increase as needed
- **Documentation**: Document MCP server usage patterns and successful queries

### Sequential Thinking + Linear Integration Workflow
- **Sequential Thinking MCP**: Use for complex problem analysis, multi-step planning, and decision trees
- **Linear MCP**: Use for issue tracking, project management, and status updates
- **Complementary Workflow**: Sequential Thinking for analysis → Document results in Linear
- **Integration Points**: Link Sequential Thinking insights to Linear issues and epics
- **Documentation Sync**: Ensure insights from Sequential Thinking are captured in project documentation

### Knowledge Base System Integration
- **Supabase pgvector**: Vector storage for searchable documentation repository
- **Gemini 2.0 Flash**: Embedding generation for semantic search
- **Automated Ingestion**: Content ingestion from files, URLs, and Brave search results
- **Search Functionality**: Semantic search across project documentation and external sources

#### Knowledge Base Usage Commands
```bash
# Ingest from Brave search
node scripts/knowledge-base-ingestion.mjs --source brave --query "guide"

# Ingest from URL
node scripts/knowledge-base-ingestion.mjs --source url --url "https://example.com"

# Ingest from file
node scripts/knowledge-base-ingestion.mjs --source file --path "./docs/guide.md"
```

### AI-Enhanced Development Features
- **Automated Test Generation**: AI creates test cases from requirements
- **Visual Regression Testing**: AI detects visual changes and regressions
- **Performance Monitoring**: AI analyzes performance trends and identifies issues
- **Bug Prediction**: AI identifies potential bug-prone areas in code
- **Code Review**: AI-powered code review and suggestion system

## Documentation Standards and Workflow

### Documentation Hierarchy (Pyramid Structure)
- **Entry Point**: All documentation starts from single entry point: `README.md`
- **Hierarchical Structure**: Follow pyramid structure with clear navigation paths
- **Cross-References**: Maintain comprehensive cross-references and links between documents
- **Breadcrumb Navigation**: Include breadcrumb navigation in all documentation files
- **Table of Contents**: Add table of contents for documentation over 400 lines

### Documentation Types and Requirements
- **README.md**: Project overview, quick start, and navigation to detailed documentation
- **Architecture Documentation**: Detailed technical specifications and design decisions
- **Daily Logs**: YYYY-MM-DD format, comprehensive record of daily development work
- **Process Documentation**: Methodical workflows and standard operating procedures
- **Testing Documentation**: Testing strategies, guidelines, and results
- **Integration Documentation**: External service integrations and API documentation

### Documentation Maintenance Workflow
1. **Before Changes**: Review documentation standards guide before making any changes
2. **During Development**: Update relevant documentation files as changes are made
3. **Cross-Reference Updates**: Search for all references to modified terms across codebase
4. **Verification**: Verify documentation pyramid structure before making edits
5. **Quality Check**: Ensure all required elements are present and properly formatted
6. **Link Validation**: Verify all links use correct relative paths and are functional

### Documentation Quality Standards
- **Formatting**: Follow specific formatting requirements consistently
- **Date Format**: Use YYYY-MM-DD format for all dates
- **File Naming**: Use hyphenated filenames with 5-7 word descriptions
- **Version Control**: Never delete documentation files, only create new ones
- **Completeness**: Ensure all documentation includes required elements from standards
- **Accuracy**: Verify all technical information is current and correct

## Process Quick Reference

### Task Completion Checklist
- [ ] **Step 1**: Update project documentation (files, trackers, daily logs, architecture)
- [ ] **Step 2**: Update tracking systems (progress metrics, issues, priorities, testing results)
- [ ] **Step 3**: Use Sequential Thinking (analysis) + Linear (tracking) with proper linking
- [ ] **Verify**: Dual-source truth maintained between documentation and Linear
- [ ] **Cross-Reference**: Update all related documents and maintain links
- [ ] **Quality Check**: Ensure documentation standards compliance

### Error Resolution Process
- **Identify**: Analyze root cause systematically using logs and error patterns
- **Reference**: Check existing solutions first in documentation and previous implementations
- **Research**: Use MCP servers for additional research if needed (Context7, Brave)
- **Implement**: Apply solution following established patterns and best practices
- **Test**: Verify fix resolves issue without introducing new problems
- **Document**: Record fix in appropriate location with full context and reasoning
- **Update**: Ensure all tracking systems reflect resolution and lessons learned
- **Share**: Document insights for team knowledge sharing and future reference

### Development Process Optimization
- **Pattern Recognition**: Identify and document successful development patterns
- **Workflow Improvement**: Continuously refine processes based on experience
- **Tool Integration**: Leverage MCP servers and AI tools for enhanced productivity
- **Knowledge Sharing**: Maintain comprehensive documentation for team learning
- **Quality Assurance**: Implement systematic testing and review processes
- **Performance Monitoring**: Track and optimize development velocity and quality metrics

---

**Note**: This document contains methodical processes and workflows designed to improve development efficiency and quality. For current project status, implementation details, and time-sensitive information, refer to the project documentation in the `Docs/` directory and Linear tracking system. All processes should be followed consistently to maintain project quality and team coordination.
