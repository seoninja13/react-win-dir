#!/usr/bin/env node

/**
 * Test Analyzer
 * 
 * This script analyzes test coverage, identifies gaps, and provides recommendations
 * for improving test quality and coverage.
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { execSync } = require('child_process');

class TestAnalyzer {
  constructor(options = {}) {
    this.options = {
      srcDir: options.srcDir || 'src',
      testDir: options.testDir || 'src/__tests__',
      coverageThreshold: options.coverageThreshold || 80,
      ...options
    };
  }

  /**
   * Run comprehensive test analysis
   */
  async analyze() {
    console.log(chalk.blue('🔍 Starting test analysis...\n'));

    const results = {
      coverage: await this.analyzeCoverage(),
      gaps: await this.identifyTestGaps(),
      quality: await this.analyzeTestQuality(),
      recommendations: []
    };

    results.recommendations = this.generateRecommendations(results);
    
    this.displayResults(results);
    return results;
  }

  /**
   * Analyze test coverage
   */
  async analyzeCoverage() {
    console.log(chalk.blue('📊 Analyzing test coverage...'));
    
    try {
      // Run Jest with coverage
      const coverageOutput = execSync('npm run test:coverage -- --silent', { 
        encoding: 'utf8',
        stdio: 'pipe'
      });

      // Parse coverage results (simplified - in real implementation, parse JSON output)
      const coverage = {
        lines: this.extractCoverageMetric(coverageOutput, 'Lines'),
        functions: this.extractCoverageMetric(coverageOutput, 'Functions'),
        branches: this.extractCoverageMetric(coverageOutput, 'Branches'),
        statements: this.extractCoverageMetric(coverageOutput, 'Statements')
      };

      console.log(chalk.green('✅ Coverage analysis complete'));
      return coverage;
    } catch (error) {
      console.log(chalk.yellow('⚠️  Could not run coverage analysis (tests may not be set up yet)'));
      return {
        lines: 0,
        functions: 0,
        branches: 0,
        statements: 0
      };
    }
  }

  /**
   * Extract coverage metric from Jest output
   * @param {string} output - Jest coverage output
   * @param {string} metric - Metric name (Lines, Functions, etc.)
   */
  extractCoverageMetric(output, metric) {
    const regex = new RegExp(`${metric}\\s*:\\s*(\\d+(?:\\.\\d+)?)%`);
    const match = output.match(regex);
    return match ? parseFloat(match[1]) : 0;
  }

  /**
   * Identify files without tests
   */
  async identifyTestGaps() {
    console.log(chalk.blue('🔍 Identifying test gaps...'));
    
    const sourceFiles = this.getSourceFiles();
    const testFiles = this.getTestFiles();
    
    const gaps = {
      missingTests: [],
      outdatedTests: [],
      lowCoverage: []
    };

    sourceFiles.forEach(sourceFile => {
      const expectedTestFile = this.getExpectedTestFile(sourceFile);
      
      if (!testFiles.includes(expectedTestFile)) {
        gaps.missingTests.push(sourceFile);
      } else {
        // Check if test is outdated
        const sourceStats = fs.statSync(sourceFile);
        const testStats = fs.statSync(expectedTestFile);
        
        if (sourceStats.mtime > testStats.mtime) {
          gaps.outdatedTests.push({
            source: sourceFile,
            test: expectedTestFile,
            daysBehind: Math.ceil((sourceStats.mtime - testStats.mtime) / (1000 * 60 * 60 * 24))
          });
        }
      }
    });

    console.log(chalk.green('✅ Test gap analysis complete'));
    return gaps;
  }

  /**
   * Analyze test quality
   */
  async analyzeTestQuality() {
    console.log(chalk.blue('🎯 Analyzing test quality...'));
    
    const testFiles = this.getTestFiles();
    const quality = {
      totalTests: 0,
      testTypes: {
        unit: 0,
        integration: 0,
        e2e: 0
      },
      patterns: {
        hasSnapshots: 0,
        hasAccessibilityTests: 0,
        hasErrorHandling: 0,
        hasAsyncTests: 0
      },
      issues: []
    };

    testFiles.forEach(testFile => {
      try {
        const content = fs.readFileSync(testFile, 'utf8');
        const analysis = this.analyzeTestFile(content, testFile);
        
        quality.totalTests += analysis.testCount;
        
        // Categorize test types
        if (testFile.includes('unit') || testFile.includes('__tests__')) {
          quality.testTypes.unit += analysis.testCount;
        } else if (testFile.includes('integration')) {
          quality.testTypes.integration += analysis.testCount;
        } else if (testFile.includes('e2e')) {
          quality.testTypes.e2e += analysis.testCount;
        }

        // Check for patterns
        if (analysis.hasSnapshots) quality.patterns.hasSnapshots++;
        if (analysis.hasAccessibilityTests) quality.patterns.hasAccessibilityTests++;
        if (analysis.hasErrorHandling) quality.patterns.hasErrorHandling++;
        if (analysis.hasAsyncTests) quality.patterns.hasAsyncTests++;

        // Collect issues
        quality.issues.push(...analysis.issues);
      } catch (error) {
        quality.issues.push({
          file: testFile,
          type: 'parse_error',
          message: `Could not parse test file: ${error.message}`
        });
      }
    });

    console.log(chalk.green('✅ Test quality analysis complete'));
    return quality;
  }

  /**
   * Analyze individual test file
   * @param {string} content - Test file content
   * @param {string} filePath - Test file path
   */
  analyzeTestFile(content, filePath) {
    const analysis = {
      testCount: 0,
      hasSnapshots: false,
      hasAccessibilityTests: false,
      hasErrorHandling: false,
      hasAsyncTests: false,
      issues: []
    };

    // Count tests
    const testMatches = content.match(/\b(it|test)\s*\(/g);
    analysis.testCount = testMatches ? testMatches.length : 0;

    // Check for patterns
    analysis.hasSnapshots = /toMatchSnapshot|toMatchInlineSnapshot/.test(content);
    analysis.hasAccessibilityTests = /toBeAccessible|getByRole|getByLabelText/.test(content);
    analysis.hasErrorHandling = /toThrow|try\s*{|catch\s*\(/.test(content);
    analysis.hasAsyncTests = /async\s+\(|await\s+/.test(content);

    // Identify issues
    if (analysis.testCount === 0) {
      analysis.issues.push({
        file: filePath,
        type: 'no_tests',
        message: 'Test file contains no tests'
      });
    }

    if (analysis.testCount > 0 && !analysis.hasSnapshots && content.includes('render(')) {
      analysis.issues.push({
        file: filePath,
        type: 'missing_snapshots',
        message: 'Component test missing snapshot tests'
      });
    }

    if (content.includes('render(') && !analysis.hasAccessibilityTests) {
      analysis.issues.push({
        file: filePath,
        type: 'missing_accessibility',
        message: 'Component test missing accessibility tests'
      });
    }

    return analysis;
  }

  /**
   * Generate recommendations based on analysis
   * @param {Object} results - Analysis results
   */
  generateRecommendations(results) {
    const recommendations = [];

    // Coverage recommendations
    Object.entries(results.coverage).forEach(([metric, value]) => {
      if (value < this.options.coverageThreshold) {
        recommendations.push({
          type: 'coverage',
          priority: 'high',
          message: `${metric} coverage (${value}%) is below threshold (${this.options.coverageThreshold}%)`
        });
      }
    });

    // Missing tests recommendations
    if (results.gaps.missingTests.length > 0) {
      recommendations.push({
        type: 'missing_tests',
        priority: 'high',
        message: `${results.gaps.missingTests.length} files are missing tests`,
        files: results.gaps.missingTests.slice(0, 5) // Show first 5
      });
    }

    // Outdated tests recommendations
    if (results.gaps.outdatedTests.length > 0) {
      recommendations.push({
        type: 'outdated_tests',
        priority: 'medium',
        message: `${results.gaps.outdatedTests.length} test files are outdated`,
        files: results.gaps.outdatedTests.slice(0, 5)
      });
    }

    // Test quality recommendations
    const totalTestFiles = this.getTestFiles().length;
    if (totalTestFiles > 0) {
      const snapshotCoverage = (results.quality.patterns.hasSnapshots / totalTestFiles) * 100;
      if (snapshotCoverage < 50) {
        recommendations.push({
          type: 'test_quality',
          priority: 'medium',
          message: `Only ${Math.round(snapshotCoverage)}% of component tests include snapshots`
        });
      }

      const accessibilityCoverage = (results.quality.patterns.hasAccessibilityTests / totalTestFiles) * 100;
      if (accessibilityCoverage < 30) {
        recommendations.push({
          type: 'test_quality',
          priority: 'medium',
          message: `Only ${Math.round(accessibilityCoverage)}% of component tests include accessibility checks`
        });
      }
    }

    return recommendations;
  }

  /**
   * Display analysis results
   * @param {Object} results - Analysis results
   */
  displayResults(results) {
    console.log(chalk.blue('\n📋 Test Analysis Results\n'));

    // Coverage results
    console.log(chalk.bold('Coverage:'));
    Object.entries(results.coverage).forEach(([metric, value]) => {
      const color = value >= this.options.coverageThreshold ? chalk.green : chalk.red;
      console.log(`  ${metric}: ${color(`${value}%`)}`);
    });

    // Test gaps
    console.log(chalk.bold('\nTest Gaps:'));
    console.log(`  Missing tests: ${chalk.red(results.gaps.missingTests.length)} files`);
    console.log(`  Outdated tests: ${chalk.yellow(results.gaps.outdatedTests.length)} files`);

    // Test quality
    console.log(chalk.bold('\nTest Quality:'));
    console.log(`  Total tests: ${chalk.blue(results.quality.totalTests)}`);
    console.log(`  Unit tests: ${chalk.blue(results.quality.testTypes.unit)}`);
    console.log(`  Integration tests: ${chalk.blue(results.quality.testTypes.integration)}`);
    console.log(`  E2E tests: ${chalk.blue(results.quality.testTypes.e2e)}`);

    // Recommendations
    if (results.recommendations.length > 0) {
      console.log(chalk.bold('\n💡 Recommendations:'));
      results.recommendations.forEach((rec, index) => {
        const priorityColor = rec.priority === 'high' ? chalk.red : 
                             rec.priority === 'medium' ? chalk.yellow : chalk.blue;
        console.log(`  ${index + 1}. ${priorityColor(`[${rec.priority.toUpperCase()}]`)} ${rec.message}`);
        
        if (rec.files && rec.files.length > 0) {
          rec.files.forEach(file => {
            console.log(`     - ${file}`);
          });
          if (rec.files.length < results.gaps.missingTests.length) {
            console.log(`     ... and ${results.gaps.missingTests.length - rec.files.length} more`);
          }
        }
      });
    } else {
      console.log(chalk.green('\n🎉 No recommendations - test suite looks good!'));
    }
  }

  /**
   * Get all source files
   */
  getSourceFiles() {
    const files = [];
    const scanDir = (dir) => {
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
    
    if (fs.existsSync(this.options.srcDir)) {
      scanDir(this.options.srcDir);
    }
    
    return files;
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
        
        if (stat.isDirectory()) {
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
   * Get expected test file path for a source file
   * @param {string} sourceFile - Source file path
   */
  getExpectedTestFile(sourceFile) {
    const ext = path.extname(sourceFile);
    const baseName = path.basename(sourceFile, ext);
    const dir = path.dirname(sourceFile);
    return path.join(dir, '__tests__', `${baseName}.test${ext}`);
  }
}

// CLI interface
if (require.main === module) {
  const analyzer = new TestAnalyzer();
  analyzer.analyze()
    .then(() => {
      console.log(chalk.green('\n🎉 Test analysis completed!'));
    })
    .catch(error => {
      console.error(chalk.red('❌ Test analysis failed:'), error);
      process.exit(1);
    });
}

module.exports = TestAnalyzer;
