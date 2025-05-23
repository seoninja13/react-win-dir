# Global IDE Rules - Windows Doors CA Website Project

## 🎯 MANDATORY TASK COMPLETION PROCESS

**EVERY TASK COMPLETION MUST FOLLOW THIS 3-STEP PROCESS:**

1. **Update project documentation**
   - Update relevant documentation files in `Docs/` directory
   - Update webpage progress tracker (`Docs/tracking/webpage-progress-tracker.md`)
   - Create or update daily logs (`Docs/daily-logs/YYYY-MM-DD-*.md`)

2. **Update tracking systems**
   - Update all relevant tracking documents
   - Ensure all progress is documented
   - Maintain accurate status information

3. **Use Linear for task management**
   - Create or update Linear issues
   - Sync Linear with project documentation
   - Maintain identical information in both systems

**🔄 DUAL-SOURCE TRUTH REQUIREMENT:**
- **Project Documentation** ↔ **Linear** must be **identical and synced**
- Two ways to measure project status at all times
- Information must never be out of sync

## Core Development Rules

### File Management
- **DO NOT** delete files unrelated to the current task
- **ALWAYS** check for existing files/folders before creating new ones
- **NEVER** edit files in the "Relume-DO-NOT-EDIT" folder
- **PRESERVE** existing layouts when replacing images (maintain CSS properties, dimensions, etc.)

### Dependency Management
- **AUTO-INSTALL** dependencies and packages without asking
- If prompted "Need to install the following packages", proceed automatically
- Use appropriate package managers (yarn, npm, etc.)

### Command Execution
- **USE** semicolons (;) instead of && for command chaining
- **CORRECT**: `rm -rf .next; yarn dev`
- **INCORRECT**: `rm -rf .next && yarn dev`
- **AUTONOMOUS EXECUTION**: Execute all necessary commands automatically

### Senior Engineer Autonomy
- **IMPLEMENT** approved plans without constant confirmation requests
- **EXECUTE** all commands and be self-reliant
- **ASK** only when 100% unsure about scope or approach
- **AVOID** giving user commands to run - execute them directly

### Code Quality
- **USE** heavily commented code for all implementations
- **DOCUMENT** all code, features, and flows before committing
- **REFERENCE** existing implementations before creating new ones

### Documentation Standards
- **START** all documentation from single entry point: `README.md`
- **FOLLOW** pyramid hierarchical structure
- **UPDATE** `Docs/tracking/webpage-progress-tracker.md` for all feature implementations
- **CREATE** daily logs for significant work

### MCP Server Usage
- **USE** Context7 MCP server for library documentation (start with 5000 tokens, increase to 20000 if needed)
- **LIMIT** searches to 3 attempts max per topic
- **FALLBACK** to Brave MCP server for wider searches if Context7 fails

### Error Handling
- **DOCUMENT** troubleshooting steps when encountering repeated errors
- **KILL PORTS** and restart development server after 3 identical errors
- **CONTINUE** troubleshooting with alternative approaches
- **AVOID** SQL queries on non-existent table columns

### Context Management
- **STOP** and update documentation when context window reaches 800,000 tokens
- **TAKE NOTES** of current progress before context reset

### Project Structure Awareness
- **READ** project documentation starting with `README.md` before making changes
- **FOLLOW** established patterns from working implementations
- **RESPECT** the exact cloning requirements for Window World LA website replication

## Current Project Status
- **Total Pages Tested**: 53 pages
- **Success Rate**: 100% (all tested pages working)
- **Latest Session**: January 27, 2025 - 18 additional pages confirmed
- **Linear Issues**: Active tracking in Linear workspace

