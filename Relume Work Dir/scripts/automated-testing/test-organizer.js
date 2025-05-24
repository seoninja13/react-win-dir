#!/usr/bin/env node

/**
 * Test Organizer
 * 
 * Provides organized, on-demand test execution with smart selection,
 * parallel execution, and comprehensive reporting options.
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import chalk from 'chalk';

class TestOrganizer {
  constructor(options = {}) {
    this.options = {
      srcDir: options.srcDir || 'src',
      testDir: options.testDir || 'src/__tests__',
      parallel: options.parallel !== false,
      maxWorkers: options.maxWorkers || 4,
      ...options
    };
  }

  /**
   * Display available test commands and their descriptions
   */
  showHelp() {
    console.log(chalk.blue.bold('\n🧪 Test Organizer - Available Commands\n'));
    
    const commands = [
      {
        command: 'npm run test:components',
        description: 'Run all component tests',
        example: 'Tests for React components in src/components/'
      },
      {
        command: 'npm run test:utilities', 
        description: 'Run all utility function tests',
        example: 'Tests for functions in src/utils/, src/lib/, src/helpers/'
      },
      {
        command: 'npm run test:unit',
        description: 'Run all unit tests (components + utilities)',
        example: 'Combined component and utility tests'
      },
      {
        command: 'npm run test:integration',
        description: 'Run integration tests',
        example: 'Tests that verify multiple components working together'
      },
      {
        command: 'npm run test:quick',
        description: 'Fast test run with minimal output',
        example: 'Quick validation without detailed reporting'
      },
      {
        command: 'npm run test:detailed',
        description: 'Comprehensive test run with coverage',
        example: 'Full test suite with detailed reporting and coverage'
      },
      {
        command: 'npm run test:performance',
        description: 'Run only performance benchmark tests',
        example: 'Tests that validate execution speed and memory usage'
      },
      {
        command: 'npm run test:changed',
        description: 'Run tests for recently changed files',
        example: 'Only tests related to files modified since last commit'
      },
      {
        command: 'npm run test:coverage',
        description: 'Run all tests with coverage reporting',
        example: 'Complete test suite with line/branch coverage analysis'
      }
    ];

    commands.forEach(({ command, description, example }) => {
      console.log(chalk.green(`${command}`));
      console.log(chalk.gray(`  ${description}`));
      console.log(chalk.dim(`  Example: ${example}\n`));
    });

    console.log(chalk.yellow.bold('📊 Test Analysis Commands\n'));
    console.log(chalk.green('npm run test:analyze'));
    console.log(chalk.gray('  Analyze test coverage and quality'));
    console.log(chalk.dim('  Provides recommendations for improving tests\n'));

    console.log(chalk.green('npm run test:organize'));
    console.log(chalk.gray('  Show this help and test organization info'));
    console.log(chalk.dim('  Display available commands and test structure\n'));
  }

  /**
   * Analyze current test organization
   */
  analyzeTestOrganization() {
    console.log(chalk.blue.bold('\n📋 Test Organization Analysis\n'));

    const testFiles = this.getTestFiles();
    const sourceFiles = this.getSourceFiles();
    
    const organization = {
      components: {
        tests: testFiles.filter(f => f.includes('components') || f.includes('Component')),
        sources: sourceFiles.filter(f => f.includes('components'))
      },
      utilities: {
        tests: testFiles.filter(f => f.includes('utils') || f.includes('helpers') || f.includes('lib')),
        sources: sourceFiles.filter(f => f.includes('utils') || f.includes('helpers') || f.includes('lib'))
      },
      integration: {
        tests: testFiles.filter(f => f.includes('integration')),
        sources: []
      },
      other: {
        tests: testFiles.filter(f => 
          !f.includes('components') && 
          !f.includes('Component') && 
          !f.includes('utils') && 
          !f.includes('helpers') && 
          !f.includes('lib') && 
          !f.includes('integration')
        ),
        sources: sourceFiles.filter(f => 
          !f.includes('components') && 
          !f.includes('utils') && 
          !f.includes('helpers') && 
          !f.includes('lib')
        )
      }
    };

    // Display organization summary
    Object.entries(organization).forEach(([category, { tests, sources }]) => {
      const coverage = sources.length > 0 ? Math.round((tests.length / sources.length) * 100) : 0;
      const coverageColor = coverage >= 80 ? chalk.green : coverage >= 50 ? chalk.yellow : chalk.red;
      
      console.log(chalk.bold(`${category.toUpperCase()}:`));
      console.log(`  Source files: ${chalk.blue(sources.length)}`);
      console.log(`  Test files: ${chalk.blue(tests.length)}`);
      console.log(`  Coverage: ${coverageColor(`${coverage}%`)}`);
      
      if (tests.length > 0) {
        console.log(chalk.dim(`  Test files:`));
        tests.slice(0, 3).forEach(test => {
          console.log(chalk.dim(`    - ${path.relative(process.cwd(), test)}`));
        });
        if (tests.length > 3) {
          console.log(chalk.dim(`    ... and ${tests.length - 3} more`));
        }
      }
      console.log();
    });

    return organization;
  }

  /**
   * Run specific test category with options
   * @param {string} category - Test category to run
   * @param {Object} options - Execution options
   */
  async runTestCategory(category, options = {}) {
    const { verbose = false, coverage = false, performance = false } = options;
    
    console.log(chalk.blue(`\n🧪 Running ${category} tests...\n`));

    let command = 'jest';
    const args = [];

    // Add category-specific patterns
    switch (category) {
      case 'components':
        args.push('--testPathPattern=components');
        break;
      case 'utilities':
        args.push('--testPathPattern=utils');
        break;
      case 'unit':
        args.push('--testPathPattern="(components|utils)"');
        break;
      case 'integration':
        args.push('--testPathPattern=integration');
        break;
      case 'performance':
        args.push('--testNamePattern="Performance Tests"');
        break;
      case 'changed':
        args.push('--onlyChanged');
        break;
    }

    // Add execution options
    if (verbose) args.push('--verbose');
    if (coverage) args.push('--coverage');
    if (performance) args.push('--testNamePattern="Performance"');
    if (this.options.parallel) args.push(`--maxWorkers=${this.options.maxWorkers}`);

    // Execute tests
    try {
      const fullCommand = `${command} ${args.join(' ')}`;
      console.log(chalk.dim(`Executing: ${fullCommand}\n`));
      
      execSync(fullCommand, { 
        stdio: 'inherit',
        cwd: process.cwd()
      });
      
      console.log(chalk.green(`\n✅ ${category} tests completed successfully!`));
    } catch (error) {
      console.log(chalk.red(`\n❌ ${category} tests failed!`));
      console.log(chalk.dim(`Exit code: ${error.status}`));
    }
  }

  /**
   * Get all test files
   */
  getTestFiles() {
    const files = [];
    const scanDir = (dir) => {
      if (!fs.existsSync(dir)) return;
      
      const items = fs.readdirSync(dir);
      items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
          scanDir(fullPath);
        } else if (stat.isFile() && /\.(test|spec)\.(js|jsx|ts|tsx)$/.test(item)) {
          files.push(fullPath);
        }
      });
    };
    
    scanDir(this.options.srcDir);
    return files;
  }

  /**
   * Get all source files
   */
  getSourceFiles() {
    const files = [];
    const scanDir = (dir) => {
      if (!fs.existsSync(dir)) return;
      
      const items = fs.readdirSync(dir);
      items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && !item.startsWith('.') && item !== '__tests__' && item !== 'node_modules') {
          scanDir(fullPath);
        } else if (stat.isFile() && /\.(js|jsx|ts|tsx)$/.test(item) && !item.includes('.test.') && !item.includes('.spec.')) {
          files.push(fullPath);
        }
      });
    };
    
    scanDir(this.options.srcDir);
    return files;
  }

  /**
   * Generate test execution recommendations
   */
  generateRecommendations() {
    console.log(chalk.blue.bold('\n💡 Test Execution Recommendations\n'));

    const organization = this.analyzeTestOrganization();
    const recommendations = [];

    // Coverage recommendations
    Object.entries(organization).forEach(([category, { tests, sources }]) => {
      if (category === 'other' || category === 'integration') return;
      
      const coverage = sources.length > 0 ? (tests.length / sources.length) * 100 : 0;
      
      if (coverage < 50) {
        recommendations.push({
          type: 'coverage',
          priority: 'high',
          message: `${category} test coverage is low (${Math.round(coverage)}%)`,
          action: `Run: npm run test:generate for ${category} files`
        });
      }
    });

    // Execution recommendations
    const totalTests = this.getTestFiles().length;
    if (totalTests > 20) {
      recommendations.push({
        type: 'performance',
        priority: 'medium',
        message: 'Large test suite detected',
        action: 'Use npm run test:quick for fast feedback, npm run test:detailed for comprehensive analysis'
      });
    }

    if (totalTests > 0) {
      recommendations.push({
        type: 'workflow',
        priority: 'low',
        message: 'Optimize development workflow',
        action: 'Use npm run test:changed to test only modified files during development'
      });
    }

    // Display recommendations
    if (recommendations.length > 0) {
      recommendations.forEach((rec, index) => {
        const priorityColor = rec.priority === 'high' ? chalk.red : 
                             rec.priority === 'medium' ? chalk.yellow : chalk.blue;
        console.log(`${index + 1}. ${priorityColor(`[${rec.priority.toUpperCase()}]`)} ${rec.message}`);
        console.log(chalk.dim(`   Action: ${rec.action}\n`));
      });
    } else {
      console.log(chalk.green('🎉 Test organization looks good! No specific recommendations.'));
    }
  }
}

// CLI interface
const args = process.argv.slice(2);
const command = args[0];

const organizer = new TestOrganizer();

switch (command) {
  case 'help':
  case '--help':
  case '-h':
    organizer.showHelp();
    break;
    
  case 'analyze':
    organizer.analyzeTestOrganization();
    break;
    
  case 'recommend':
    organizer.generateRecommendations();
    break;
    
  case 'run':
    const category = args[1];
    const options = {
      verbose: args.includes('--verbose'),
      coverage: args.includes('--coverage'),
      performance: args.includes('--performance')
    };
    organizer.runTestCategory(category, options);
    break;
    
  default:
    organizer.showHelp();
    organizer.analyzeTestOrganization();
    organizer.generateRecommendations();
}

export default TestOrganizer;
