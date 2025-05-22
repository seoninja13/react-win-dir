# Development Workflow

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Processes](./index.md) > Development Workflow

**Version:** 2.0
**Created:** January 2, 2025
**Linear Task:** Related to Epic 1BU-10 (Project Structure Standardization)
**Last Updated:** January 2, 2025

## Overview

The development workflow for the Window World LA website project follows a structured, AI-augmented approach using dual MCP servers (Linear MCP + Sequential Thinking MCP) to ensure consistency, quality, and efficiency. This document provides comprehensive guidelines for the complete development lifecycle from task assignment to deployment.

### Key Workflow Components

1. **Dual MCP Strategy:** Linear MCP for task management + Sequential Thinking MCP for workflow orchestration
2. **AI-Augmented Development:** Integrated AI assistance throughout the development process
3. **Structured Testing:** Comprehensive testing at multiple levels
4. **Documentation-First Approach:** All changes documented and tracked
5. **Quality Gates:** Automated and manual quality checks at each stage

## Table of Contents

1. [Development Environment Setup](#development-environment-setup)
2. [Dual MCP Workflow](#dual-mcp-workflow)
3. [Development Process](#development-process)
4. [AI-Augmented Development](#ai-augmented-development)
5. [Testing Procedures](#testing-procedures)
6. [Documentation Requirements](#documentation-requirements)
7. [Quality Gates](#quality-gates)
8. [Deployment Process](#deployment-process)
9. [Troubleshooting](#troubleshooting)
10. [Best Practices](#best-practices)

## Development Environment Setup

### Prerequisites

Before starting development, ensure you have the following installed:

- **Node.js 18.x or higher**
- **npm 9.x or higher**
- **Git**
- **Augment Code IDE** (primary development environment with MCP integration)
- **Visual Studio Code** (alternative/secondary)
- **Netlify CLI** (for production-like testing)
- **Google Cloud SDK** (for AI integration)
- **Supabase CLI** (for database operations)

### MCP Server Access

Both MCP servers are built into Augment Code IDE:

- **Linear MCP Server:** Project management and task tracking
- **Sequential Thinking MCP Server:** Workflow orchestration and complex problem-solving

### Project Structure Requirements

**CRITICAL:** All development work must be done within the standardized directory structure:

```
react-win-dir/
├── Relume Work Dir/          # Main development directory
│   ├── src/app/             # Next.js App Router pages
│   ├── src/components/      # React components
│   └── src/                 # All source code
├── Docs/                    # Project documentation
├── Website Pages/           # Original Relume components (reference only)
└── Supabase/               # Database and API configurations
```

### Initial Setup

1. **Clone the repository:**

```bash
git clone <repository-url>
cd react-win-dir
```

2. **Navigate to the working directory:**

```bash
cd "Relume Work Dir"
```

3. **Install dependencies:**

```bash
npm install
```

4. **Environment Configuration:**

Create a `.env.local` file in the Relume Work Dir with:

```env
# Google Generative AI
GOOGLE_API_KEY=your_api_key_here
GEMINI_MODEL_VERSION=gemini-2.0-flash

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Development Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

5. **Start the development server:**

```bash
npm run dev
```

6. **Verify setup:** Open [http://localhost:3000](http://localhost:3000) in your browser.

## Dual MCP Workflow

### Overview

The dual MCP workflow integrates Linear MCP (task management) with Sequential Thinking MCP (workflow orchestration) to create an efficient, AI-augmented development process.

### Workflow Stages

#### Stage 1: Task Assignment and Planning

1. **Linear MCP:** Developer receives task assignment
   - Epic, Feature, or Task level assignment
   - Priority level and dependencies clearly defined
   - Acceptance criteria and requirements documented

2. **Sequential Thinking MCP:** Complex task analysis
   - Break down complex tasks into manageable steps
   - Identify dependencies and potential blockers
   - Generate implementation strategy

#### Stage 2: Development Execution

1. **Linear MCP:** Track progress and status updates
   - Move task through workflow states (Backlog → Todo → In Progress → In Review → Done)
   - Log time spent and progress notes
   - Link related tasks and dependencies

2. **Sequential Thinking MCP:** Implementation guidance
   - Step-by-step implementation workflows
   - Decision-making support for complex problems
   - Code review and optimization suggestions

#### Stage 3: Quality Assurance and Documentation

1. **Linear MCP:** Quality gate tracking
   - Test completion status
   - Code review requirements
   - Documentation updates

2. **Sequential Thinking MCP:** Comprehensive validation
   - Multi-step testing procedures
   - Documentation generation and updates
   - Integration testing workflows

### MCP Integration Points

#### Linear → Sequential Thinking Triggers

- **High-Priority Task Assignment:** Automatically triggers ST-MCP analysis
- **Complex Problem Identification:** Manual trigger for ST-MCP problem-solving workflow
- **Documentation Request:** Triggers ST-MCP documentation generation

#### Sequential Thinking → Linear Updates

- **Workflow Completion:** Updates Linear task status and adds completion notes
- **Decision Documentation:** Adds decision rationale to Linear task comments
- **Issue Identification:** Creates new Linear tasks for follow-up work

## Development Process

### Step-by-Step Development Workflow

#### 1. Task Preparation

**Linear MCP Actions:**
- Review assigned task details and acceptance criteria
- Check task dependencies and priority level
- Update task status to "In Progress"
- Estimate time required and log start time

**Sequential Thinking MCP Actions:**
- Analyze task complexity and requirements
- Break down into implementation steps
- Identify potential challenges and solutions
- Generate implementation strategy

#### 2. Code Implementation

**Before Starting:**
- Ensure working directory is `Relume Work Dir`
- Verify all dependencies are installed
- Check that development server is running
- Review related documentation and architecture

**Implementation Steps:**
1. **Understand Requirements:** Review task description and linked documentation
2. **Check Existing Code:** Search for similar components or implementations
3. **Plan Implementation:** Use ST-MCP for complex planning if needed
4. **Write Code:** Follow project coding standards and conventions
5. **Test Locally:** Verify functionality works as expected

#### 3. Component Development

**Creating New Components:**
1. Check if similar component exists in `src/components/` or `Website Pages/`
2. If using Relume components, copy from `Website Pages/` (never edit originals)
3. Place new components in appropriate `src/components/` subdirectory
4. Follow naming conventions and file structure
5. Import and integrate with existing pages

**Creating New Pages:**
1. Create directory under `src/app/` following App Router conventions
2. Create `page.tsx` file with proper exports
3. Import necessary components and utilities
4. Test routing and functionality
5. Update navigation if required

#### 4. Testing and Validation

**Local Testing Requirements:**
- Test on development server (localhost:3000)
- Verify responsive design on multiple screen sizes
- Test all interactive elements and forms
- Check console for errors or warnings
- Validate accessibility features

**Quality Checks:**
- Code follows project conventions
- All imports resolve correctly
- No TypeScript errors
- Performance is acceptable
- Matches design requirements

#### 5. Documentation and Completion

**Documentation Requirements:**
- Update relevant documentation files
- Add comments to Linear task with implementation details
- Document any decisions or trade-offs made
- Update architecture documentation if needed

**Task Completion:**
- Update Linear task status to "In Review" or "Done"
- Add completion notes and time spent
- Link to any related documentation updates
- Notify team members if required

## AI-Augmented Development

### Using AI Tools Effectively

#### Augment Code IDE Integration

**Built-in AI Features:**
- Code completion and suggestions
- Error detection and resolution
- Refactoring assistance
- Documentation generation

**Best Practices:**
- Use AI for code generation and optimization
- Validate AI suggestions against project standards
- Document AI-assisted decisions in Linear tasks
- Review AI-generated code for quality and security

#### Sequential Thinking MCP for Complex Problems

**When to Use ST-MCP:**
- Breaking down complex features into tasks
- Analyzing architectural decisions
- Troubleshooting difficult bugs
- Planning multi-step implementations

**Workflow Integration:**
- Trigger ST-MCP from Linear task comments
- Document ST-MCP analysis results in Linear
- Use ST-MCP recommendations for implementation planning

### AI-Assisted Code Review

**Pre-Commit Checks:**
- Run automated code quality checks
- Use AI for code review and optimization suggestions
- Validate against project coding standards
- Check for security vulnerabilities

**AI Review Process:**
1. Run local AI code analysis
2. Address identified issues
3. Document AI recommendations followed
4. Include AI review results in Linear task updates

## Testing Procedures

### Local Testing Requirements

#### Development Server Testing

**Standard Testing:**
```bash
# Start development server
npm run dev

# Test in browser
# - Open http://localhost:3000
# - Test all functionality
# - Check responsive design
# - Validate forms and interactions
```

#### Production-Like Testing

**Netlify Dev Testing:**
```bash
# Install Netlify CLI (if not installed)
npm install -g netlify-cli

# Run production-like environment
netlify dev

# Test in browser
# - Open http://localhost:8888
# - Test all functionality in production-like environment
```

### Testing Checklist

#### Functional Testing
- [ ] All features work as expected
- [ ] Forms submit correctly
- [ ] Navigation works properly
- [ ] Interactive elements respond correctly
- [ ] Error handling works appropriately

#### Visual Testing
- [ ] Design matches requirements
- [ ] Responsive design works on all screen sizes
- [ ] Images load correctly
- [ ] Typography and spacing are correct
- [ ] Colors and styling match design system

#### Technical Testing
- [ ] No console errors or warnings
- [ ] All imports resolve correctly
- [ ] TypeScript compilation succeeds
- [ ] Performance is acceptable
- [ ] Accessibility standards are met

## Documentation Requirements

### Documentation Standards

All development work must include proper documentation:

#### Linear Task Documentation
- **Task Updates:** Regular progress updates in Linear task comments
- **Decision Logging:** Document all significant decisions and rationale
- **Time Tracking:** Log time spent on tasks for project planning
- **Issue Reporting:** Document any blockers or issues encountered

#### Code Documentation
- **Component Documentation:** JSDoc comments for all components
- **Function Documentation:** Clear descriptions of function purpose and parameters
- **Complex Logic:** Inline comments explaining complex algorithms or business logic
- **API Documentation:** Document all API integrations and data flows

#### Architecture Documentation
- **Component Changes:** Update component documentation for new or modified components
- **Page Changes:** Update page documentation for new or modified pages
- **Integration Changes:** Document changes to external integrations
- **Database Changes:** Document any Supabase schema or query changes

### Daily Logs

**Required for all development work:**
- Create daily log entries in `Docs/daily-logs/YYYY-MM-DD.md`
- Include summary of work completed
- Document any issues encountered and solutions
- Note any decisions made or changes to approach
- Link to relevant Linear tasks

## Quality Gates

### Pre-Commit Quality Checks

**Automated Checks:**
- TypeScript compilation must succeed
- No ESLint errors or warnings
- All tests must pass
- Build process must complete successfully

**Manual Checks:**
- Code review by team member (if applicable)
- Functional testing completed
- Documentation updated
- Linear task updated with progress

### Code Review Requirements

**Self-Review Checklist:**
- [ ] Code follows project conventions
- [ ] All edge cases handled
- [ ] Error handling implemented
- [ ] Performance considerations addressed
- [ ] Security best practices followed
- [ ] Accessibility requirements met

**AI-Assisted Review:**
- Use Augment Code IDE AI features for code analysis
- Address all AI-identified issues
- Document AI recommendations followed or rejected
- Include AI review summary in Linear task

### Definition of Done

**Task Completion Criteria:**
- [ ] All acceptance criteria met
- [ ] Code implemented and tested locally
- [ ] Documentation updated
- [ ] Linear task updated with completion details
- [ ] No blocking issues remain
- [ ] Quality gates passed

## Deployment Process

### Development Deployment

**Automatic Deployment:**
- All commits to main branch trigger automatic deployment
- Netlify handles build and deployment process
- Monitor deployment status in Netlify dashboard

**Manual Deployment (if needed):**
```bash
# Build for production
npm run build

# Deploy to Netlify (if manual deployment needed)
netlify deploy --prod
```

### Deployment Verification

**Post-Deployment Checks:**
- [ ] Site loads correctly in production
- [ ] All functionality works as expected
- [ ] No console errors in production
- [ ] Performance is acceptable
- [ ] All forms and integrations work

**Rollback Procedure:**
- Use Netlify dashboard to rollback to previous deployment
- Identify and fix issues in development
- Redeploy with fixes

## Troubleshooting

### Common Issues

#### Port Conflicts

**Problem:** Development server won't start due to port conflicts

**Solution:**
```bash
# Windows - Kill all Node.js processes
taskkill /F /IM node.exe

# Mac/Linux - Kill all Node.js processes
pkill -f node

# Restart development server
npm run dev
```

#### Import Resolution Issues

**Problem:** TypeScript/Next.js can't resolve imports

**Solutions:**
1. **Check file paths:** Ensure all import paths are correct relative to current file
2. **Verify file extensions:** Use `.tsx` for React components, `.ts` for utilities
3. **Check tsconfig.json:** Ensure path mappings are correct
4. **Clear Next.js cache:**
   ```bash
   rm -rf .next
   npm run dev
   ```

#### Relume Component Issues

**Problem:** Relume components not working or styling issues

**Solutions:**
1. **Check Tailwind config:** Ensure Relume Tailwind plugin is properly configured
2. **Verify imports:** Make sure Relume UI components are imported correctly
3. **Copy from Website Pages:** Use original components from `Website Pages/` directory as reference
4. **Check dependencies:** Ensure `@relume_io/relume-ui` and `@relume_io/relume-tailwind` are installed

#### Linear MCP Connection Issues

**Problem:** Can't access Linear tasks or updates aren't syncing

**Solutions:**
1. **Check Augment Code IDE connection:** Restart IDE if needed
2. **Verify project access:** Ensure you have access to Window World LA Website project
3. **Refresh Linear workspace:** Use Linear MCP refresh command
4. **Check network connectivity:** Ensure stable internet connection

#### Sequential Thinking MCP Issues

**Problem:** ST-MCP workflows not executing or failing

**Solutions:**
1. **Check workflow parameters:** Ensure all required parameters are provided
2. **Review workflow logs:** Check for error details in ST-MCP logs
3. **Restart workflow:** Try executing the workflow again with corrected parameters
4. **Simplify workflow:** Break complex workflows into smaller steps

### Performance Issues

#### Slow Development Server

**Causes and Solutions:**
- **Large node_modules:** Run `npm ci` to clean install dependencies
- **Too many files:** Exclude unnecessary directories in `.gitignore`
- **Memory issues:** Restart development server periodically
- **Cache issues:** Clear Next.js cache with `rm -rf .next`

#### Build Failures

**Common Causes:**
- TypeScript compilation errors
- Missing dependencies
- Import path issues
- Environment variable issues

**Debugging Steps:**
1. Check build logs for specific error messages
2. Verify all dependencies are installed
3. Check TypeScript configuration
4. Ensure all environment variables are set

## Best Practices

### Code Organization

#### File Structure
- **Components:** Group related components in subdirectories
- **Pages:** Use App Router directory structure
- **Utilities:** Keep utility functions in `src/utils/`
- **Types:** Define TypeScript types in appropriate files
- **Constants:** Store constants in dedicated files

#### Naming Conventions
- **Files:** Use kebab-case for file names (`my-component.tsx`)
- **Components:** Use PascalCase for component names (`MyComponent`)
- **Functions:** Use camelCase for function names (`myFunction`)
- **Constants:** Use UPPER_SNAKE_CASE for constants (`MY_CONSTANT`)

#### Import Organization
```typescript
// 1. External libraries
import React from 'react'
import { NextPage } from 'next'

// 2. Internal utilities and types
import { MyUtility } from '@/utils/my-utility'
import { MyType } from '@/types/my-types'

// 3. Components
import { MyComponent } from '@/components/my-component'
```

### Development Workflow Best Practices

#### Task Management
- **Start with Linear:** Always begin work by reviewing Linear task details
- **Update regularly:** Keep Linear tasks updated with progress
- **Document decisions:** Record all significant decisions in Linear comments
- **Link related work:** Connect related tasks and documentation

#### Code Quality
- **Write clean code:** Follow established coding standards
- **Add comments:** Document complex logic and business rules
- **Handle errors:** Implement proper error handling and user feedback
- **Test thoroughly:** Test all functionality before marking tasks complete

#### AI Integration
- **Use AI effectively:** Leverage AI for code generation and optimization
- **Validate AI output:** Always review and test AI-generated code
- **Document AI usage:** Note when AI assistance was used in Linear tasks
- **Learn from AI:** Use AI suggestions to improve coding skills

### Testing Best Practices

#### Local Testing
- **Test early and often:** Test changes immediately after implementation
- **Test multiple scenarios:** Include edge cases and error conditions
- **Test responsive design:** Verify functionality on different screen sizes
- **Test accessibility:** Ensure keyboard navigation and screen reader compatibility

#### Production Testing
- **Use Netlify Dev:** Test in production-like environment before deployment
- **Monitor deployments:** Check deployment status and logs
- **Verify functionality:** Test all features after deployment
- **Performance monitoring:** Check Core Web Vitals and loading times

### Documentation Best Practices

#### Code Documentation
- **Document public APIs:** All exported functions and components
- **Explain complex logic:** Add comments for non-obvious code
- **Update documentation:** Keep documentation current with code changes
- **Include examples:** Provide usage examples for components and utilities

#### Project Documentation
- **Daily logs:** Create daily log entries for all development work
- **Architecture updates:** Update architecture documentation for significant changes
- **Process improvements:** Document workflow improvements and lessons learned
- **Knowledge sharing:** Share insights and solutions with the team

## Related Documentation

### Core Documentation
- [MCP Server Integration Guide](../guides/mcp-server-integration-guide.md) - Comprehensive guide for dual MCP usage
- [Project Hub Strategic Dashboard](../dashboards/project-hub-strategic-dashboard.md) - Project overview and status
- [Documentation Standards](./documentation-standards.md) - Standards for all project documentation

### Architecture Documentation
- [Architecture Documentation](../architecture/architecture-documentation.md) - Complete system architecture
- [Project Structure Current State](../architecture/project-structure-current-state.md) - Current project organization
- [Component Structure](../architecture/component-structure.md) - Component organization guidelines

### Process Documentation
- [Dual Operational Framework Implementation Guide](../dual-operational-framework-implementation-guide.md) - Framework overview
- [Implementation Plan: Dual Operational Framework](../implementation-plan-dual-operational-framework.md) - Detailed implementation plan

### Migration Documentation
- [App Router Migration Tracking](../migration/app-router-migration-tracking.md) - Migration progress tracking
- [Next Steps for App Router Migration](../migration/next-steps-for-app-router-migration.md) - Migration roadmap

---

**Last Updated:** January 2, 2025
**Version:** 2.0
**Next Review:** January 9, 2025
