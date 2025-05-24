#!/usr/bin/env node

/**
 * Automated Test Generator
 *
 * This script automatically generates test files for React components and utility functions.
 * It analyzes the code structure and creates comprehensive test suites.
 */

import fs from 'fs';
import path from 'path';
import { parse } from '@babel/parser';
import _traverse from '@babel/traverse';
import chalk from 'chalk';

const traverse = _traverse.default || _traverse;

class TestGenerator {
  constructor(options = {}) {
    this.options = {
      outputDir: options.outputDir || 'src/__tests__',
      testSuffix: options.testSuffix || '.test.js',
      generateMocks: options.generateMocks !== false,
      includeSnapshots: options.includeSnapshots !== false,
      ...options
    };
  }

  /**
   * Generate tests for a specific file
   * @param {string} filePath - Path to the file to generate tests for
   */
  async generateTestsForFile(filePath) {
    try {
      console.log(chalk.blue(`🧪 Generating tests for: ${filePath}`));

      const fileContent = fs.readFileSync(filePath, 'utf8');
      const ast = this.parseFile(fileContent, filePath);
      const analysis = this.analyzeFile(ast, filePath);

      if (analysis && analysis.isReactComponent) {
        await this.generateComponentTest(analysis, filePath);
      } else if (analysis && analysis.hasExportedFunctions) {
        await this.generateUtilityTest(analysis, filePath);
      } else if (analysis && analysis.exports && analysis.exports.length > 0) {
        await this.generateUtilityTest(analysis, filePath);
      } else {
        console.log(chalk.yellow(`⚠️  No testable exports found in ${filePath}`));
        return false;
      }

      console.log(chalk.green(`✅ Tests generated successfully for ${filePath}`));
      return true;
    } catch (error) {
      console.error(chalk.red(`❌ Error generating tests for ${filePath}:`), error.message);
      return false;
    }
  }

  /**
   * Parse a JavaScript/TypeScript file into an AST
   * @param {string} content - File content
   * @param {string} filePath - File path for error reporting
   */
  parseFile(content, filePath) {
    const isTypeScript = filePath.endsWith('.ts') || filePath.endsWith('.tsx');
    const isJSX = filePath.endsWith('.jsx') || filePath.endsWith('.tsx');

    return parse(content, {
      sourceType: 'module',
      plugins: [
        'jsx',
        'typescript',
        'decorators-legacy',
        'classProperties',
        'objectRestSpread',
        'asyncGenerators',
        'functionBind',
        'exportDefaultFrom',
        'exportNamespaceFrom',
        'dynamicImport',
        'nullishCoalescingOperator',
        'optionalChaining',
      ],
    });
  }

  /**
   * Analyze the AST to extract testable components and functions
   * @param {Object} ast - Babel AST
   * @param {string} filePath - File path
   */
  analyzeFile(ast, filePath) {
    const analysis = {
      filePath,
      fileName: path.basename(filePath, path.extname(filePath)),
      isReactComponent: false,
      hasExportedFunctions: false,
      exports: [],
      imports: [],
      props: [],
      hooks: [],
      functions: [],
      interfaces: [],
      types: [],
      eventHandlers: [],
      stateVariables: [],
      effects: []
    };

    traverse(ast, {
      ImportDeclaration(path) {
        analysis.imports.push({
          source: path.node.source.value,
          specifiers: path.node.specifiers.map(spec => ({
            type: spec.type,
            local: spec.local.name,
            imported: spec.imported ? spec.imported.name : null
          }))
        });
      },

      ExportDefaultDeclaration(path) {
        if (path.node.declaration) {
          if (path.node.declaration.type === 'FunctionDeclaration' ||
              path.node.declaration.type === 'ArrowFunctionExpression') {
            analysis.isReactComponent = this.isReactComponent(path.node.declaration);
            analysis.exports.push({
              type: 'default',
              name: path.node.declaration.name || 'default',
              isComponent: analysis.isReactComponent
            });
          }
        }
      },

      ExportNamedDeclaration(path) {
        if (path.node.declaration) {
          if (path.node.declaration.type === 'FunctionDeclaration') {
            const isComponent = this.isReactComponent(path.node.declaration);
            analysis.exports.push({
              type: 'named',
              name: path.node.declaration.id.name,
              isComponent
            });
            if (isComponent) analysis.isReactComponent = true;
            else analysis.hasExportedFunctions = true;
          } else if (path.node.declaration.type === 'VariableDeclaration') {
            path.node.declaration.declarations.forEach(decl => {
              if (decl.id.name) {
                const isComponent = this.isReactComponent(decl.init);
                analysis.exports.push({
                  type: 'named',
                  name: decl.id.name,
                  isComponent
                });
                if (isComponent) analysis.isReactComponent = true;
                else analysis.hasExportedFunctions = true;
              }
            });
          }
        }
      },

      FunctionDeclaration(path) {
        analysis.functions.push({
          name: path.node.id.name,
          params: path.node.params.map(param => param.name || 'destructured'),
          isAsync: path.node.async
        });
      },

      // TypeScript interface detection
      TSInterfaceDeclaration(path) {
        analysis.interfaces.push({
          name: path.node.id.name,
          properties: path.node.body.body.map(prop => ({
            name: prop.key.name,
            type: this.getTypeAnnotation(prop.typeAnnotation),
            optional: prop.optional
          }))
        });
      },

      // Hook usage detection
      CallExpression(path) {
        if (path.node.callee.name && path.node.callee.name.startsWith('use')) {
          analysis.hooks.push({
            name: path.node.callee.name,
            arguments: path.node.arguments.length
          });
        }
      },

      // Event handler detection
      JSXAttribute(path) {
        if (path.node.name.name && path.node.name.name.startsWith('on')) {
          analysis.eventHandlers.push({
            event: path.node.name.name,
            handler: path.node.value ? path.node.value.expression?.name : null
          });
        }
      }
    });

    return analysis;
  }

  /**
   * Get type annotation string from TypeScript AST node
   * @param {Object} typeAnnotation - TypeScript type annotation node
   */
  getTypeAnnotation(typeAnnotation) {
    if (!typeAnnotation) return 'any';

    const annotation = typeAnnotation.typeAnnotation;
    if (!annotation) return 'any';

    switch (annotation.type) {
      case 'TSStringKeyword': return 'string';
      case 'TSNumberKeyword': return 'number';
      case 'TSBooleanKeyword': return 'boolean';
      case 'TSArrayType': return 'array';
      case 'TSUnionType': return 'union';
      case 'TSTypeReference': return annotation.typeName?.name || 'object';
      default: return 'any';
    }
  }

  /**
   * Check if a function/component is a React component
   * @param {Object} node - AST node
   */
  isReactComponent(node) {
    if (!node) return false;

    // Check if it returns JSX
    let returnsJSX = false;

    if (node.type === 'ArrowFunctionExpression' || node.type === 'FunctionDeclaration') {
      traverse(node, {
        ReturnStatement(path) {
          if (path.node.argument && path.node.argument.type === 'JSXElement') {
            returnsJSX = true;
          }
        },
        JSXElement() {
          returnsJSX = true;
        }
      }, null, {});
    }

    return returnsJSX;
  }

  /**
   * Generate test file for a React component
   * @param {Object} analysis - File analysis results
   * @param {string} filePath - Original file path
   */
  async generateComponentTest(analysis, filePath) {
    const testContent = this.generateComponentTestContent(analysis);
    const testFilePath = this.getTestFilePath(filePath);

    this.ensureDirectoryExists(path.dirname(testFilePath));
    fs.writeFileSync(testFilePath, testContent);

    console.log(chalk.green(`📝 Component test created: ${testFilePath}`));
  }

  /**
   * Generate test file for utility functions
   * @param {Object} analysis - File analysis results
   * @param {string} filePath - Original file path
   */
  async generateUtilityTest(analysis, filePath) {
    const testContent = this.generateUtilityTestContent(analysis);
    const testFilePath = this.getTestFilePath(filePath);

    this.ensureDirectoryExists(path.dirname(testFilePath));
    fs.writeFileSync(testFilePath, testContent);

    console.log(chalk.green(`📝 Utility test created: ${testFilePath}`));
  }

  /**
   * Generate test content for React components
   * @param {Object} analysis - File analysis results
   */
  generateComponentTestContent(analysis) {
    const componentName = analysis.exports.find(exp => exp.isComponent)?.name || 'Component';
    const relativePath = this.getRelativeImportPath(analysis.filePath);
    const propsInterface = analysis.interfaces.find(iface =>
      iface.name.includes('Props') || iface.name === `${componentName}Props`
    );

    // Generate realistic test props based on TypeScript interface
    const testProps = this.generateTestProps(propsInterface);
    const mockImports = this.generateMockImports(analysis.imports);
    const eventTests = this.generateEventTests(analysis.eventHandlers);
    const hookTests = this.generateHookTests(analysis.hooks);

    return `import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ${componentName} from '${relativePath}';
${mockImports}

describe('${componentName}', () => {
  const defaultProps = ${testProps};

  // Basic rendering test
  it('renders without crashing', () => {
    render(<${componentName} {...defaultProps} />);
  });

  // Snapshot test
  it('matches snapshot', () => {
    const { container } = render(<${componentName} {...defaultProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  // Props rendering test
  it('renders with correct props', () => {
    render(<${componentName} {...defaultProps} />);

    // Add specific prop assertions based on interface
    ${this.generatePropAssertions(propsInterface)}
  });

  ${eventTests}

  ${hookTests}

  // Accessibility test
  it('is accessible', () => {
    render(<${componentName} {...defaultProps} />);

    // Check for proper semantic elements
    const component = screen.getByTestId('${componentName.toLowerCase()}') || document.querySelector('[role]');
    expect(component).toBeInTheDocument();
  });

  // Edge cases test
  it('handles edge cases', () => {
    // Test with minimal props
    render(<${componentName} />);
    expect(screen.getByTestId('${componentName.toLowerCase()}') || document.body).toBeInTheDocument();

    // Test with empty/null props
    const emptyProps = ${this.generateEmptyProps(propsInterface)};
    render(<${componentName} {...emptyProps} />);
  });

  // Error boundary test
  it('handles errors gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<${componentName} {...defaultProps} />);
    }).not.toThrow();

    consoleSpy.mockRestore();
  });
});`;
  }

  /**
   * Generate realistic test props based on TypeScript interface
   * @param {Object} propsInterface - Props interface analysis
   */
  generateTestProps(propsInterface) {
    if (!propsInterface) {
      return `{
      // Add test props here
    }`;
    }

    const props = propsInterface.properties.map(prop => {
      const value = this.generateMockValue(prop.type, prop.name);
      return `    ${prop.name}: ${value}`;
    }).join(',\n');

    return `{\n${props}\n  }`;
  }

  /**
   * Generate mock value based on type
   * @param {string} type - Property type
   * @param {string} name - Property name
   */
  generateMockValue(type, name) {
    switch (type) {
      case 'string':
        if (name.toLowerCase().includes('url') || name.toLowerCase().includes('href')) {
          return `'https://example.com/test'`;
        }
        if (name.toLowerCase().includes('id')) {
          return `'test-id-123'`;
        }
        if (name.toLowerCase().includes('class')) {
          return `'test-class'`;
        }
        return `'Test ${name}'`;

      case 'number':
        return Math.floor(Math.random() * 100);

      case 'boolean':
        return Math.random() > 0.5;

      case 'array':
        return `['item1', 'item2', 'item3']`;

      case 'object':
        return `{ test: 'value' }`;

      default:
        return `'test-${name}'`;
    }
  }

  /**
   * Generate mock imports for external dependencies
   * @param {Array} imports - Import analysis
   */
  generateMockImports(imports) {
    const mockableImports = imports.filter(imp =>
      imp.source.includes('next/') ||
      imp.source.includes('@/') ||
      imp.source.includes('react-')
    );

    if (mockableImports.length === 0) return '';

    return mockableImports.map(imp => {
      if (imp.source === 'next/link') {
        return `\n// Mock Next.js Link\njest.mock('next/link', () => {\n  return function MockLink({ children, href, ...props }) {\n    return <a href={href} {...props}>{children}</a>;\n  };\n});`;
      }
      if (imp.source === 'next/router') {
        return `\n// Mock Next.js router\njest.mock('next/router', () => ({\n  useRouter: () => ({\n    push: jest.fn(),\n    pathname: '/test'\n  })\n}));`;
      }
      return '';
    }).join('\n');
  }

  /**
   * Generate event handler tests
   * @param {Array} eventHandlers - Event handlers analysis
   */
  generateEventTests(eventHandlers) {
    if (eventHandlers.length === 0) return '';

    return eventHandlers.map(handler => `
  // ${handler.event} event test
  it('handles ${handler.event} events', async () => {
    const mock${handler.event} = jest.fn();
    render(<${componentName} {...defaultProps} ${handler.event}={mock${handler.event}} />);

    const element = screen.getByRole('button') || screen.getByTestId('clickable');
    fireEvent.${handler.event.replace('on', '').toLowerCase()}(element);

    expect(mock${handler.event}).toHaveBeenCalledTimes(1);
  });`).join('\n');
  }

  /**
   * Generate hook-related tests
   * @param {Array} hooks - Hooks analysis
   */
  generateHookTests(hooks) {
    if (hooks.length === 0) return '';

    const stateHooks = hooks.filter(hook => hook.name === 'useState');
    const effectHooks = hooks.filter(hook => hook.name === 'useEffect');

    let tests = '';

    if (stateHooks.length > 0) {
      tests += `
  // State management test
  it('manages state correctly', () => {
    render(<${componentName} {...defaultProps} />);

    // Add state-specific tests here
    // Example: fireEvent.click to trigger state changes
  });`;
    }

    if (effectHooks.length > 0) {
      tests += `
  // Effect hook test
  it('handles side effects correctly', async () => {
    render(<${componentName} {...defaultProps} />);

    // Wait for effects to complete
    await waitFor(() => {
      // Add effect-specific assertions here
    });
  });`;
    }

    return tests;
  }

  /**
   * Generate prop assertions based on interface
   * @param {Object} propsInterface - Props interface
   */
  generatePropAssertions(propsInterface) {
    if (!propsInterface) {
      return '// Add prop-specific assertions here';
    }

    return propsInterface.properties.map(prop => {
      if (prop.type === 'string') {
        return `expect(screen.getByText(defaultProps.${prop.name})).toBeInTheDocument();`;
      }
      return `// Assert ${prop.name} prop is used correctly`;
    }).join('\n    ');
  }

  /**
   * Generate empty props for edge case testing
   * @param {Object} propsInterface - Props interface
   */
  generateEmptyProps(propsInterface) {
    if (!propsInterface) return '{}';

    const props = propsInterface.properties
      .filter(prop => !prop.optional)
      .map(prop => {
        const value = prop.type === 'string' ? "''" :
                     prop.type === 'number' ? '0' :
                     prop.type === 'boolean' ? 'false' :
                     prop.type === 'array' ? '[]' : 'null';
        return `    ${prop.name}: ${value}`;
      }).join(',\n');

    return `{\n${props}\n  }`;
  }

  /**
   * Generate test content for utility functions
   * @param {Object} analysis - File analysis results
   */
  generateUtilityTestContent(analysis) {
    const relativePath = this.getRelativeImportPath(analysis.filePath);
    const exportedFunctions = analysis.exports.filter(exp => !exp.isComponent);

    const imports = exportedFunctions.length === 1 && exportedFunctions[0].type === 'default'
      ? `import ${exportedFunctions[0].name} from '${relativePath}';`
      : `import { ${exportedFunctions.map(exp => exp.name).join(', ')} } from '${relativePath}';`;

    const testSuites = exportedFunctions.map(func => `
describe('${func.name}', () => {
  // Basic functionality test
  it('works with valid input', () => {
    // Add test implementation here
    expect(${func.name}).toBeDefined();
  });

  // Edge cases test
  it('handles edge cases', () => {
    // Add edge case tests here
    // Example: expect(() => ${func.name}(null)).toThrow();
  });

  // Type validation test
  it('validates input types', () => {
    // Add type validation tests here
  });

  // Performance test (if applicable)
  it('performs within acceptable limits', () => {
    // Add performance tests for critical functions
  });
});`).join('\n');

    return `${imports}

describe('${analysis.fileName}', () => {${testSuites}
});`;
  }

  /**
   * Get the test file path for a given source file
   * @param {string} filePath - Source file path
   */
  getTestFilePath(filePath) {
    const relativePath = path.relative('src', filePath);
    const testFileName = path.basename(filePath, path.extname(filePath)) + this.options.testSuffix;
    return path.join(this.options.outputDir, path.dirname(relativePath), testFileName);
  }

  /**
   * Get relative import path for test files
   * @param {string} filePath - Source file path
   */
  getRelativeImportPath(filePath) {
    const testFilePath = this.getTestFilePath(filePath);
    const relativePath = path.relative(path.dirname(testFilePath), filePath);
    return relativePath.startsWith('.') ? relativePath : `./${relativePath}`;
  }

  /**
   * Ensure directory exists
   * @param {string} dirPath - Directory path
   */
  ensureDirectoryExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }
}

// CLI interface
const args = process.argv.slice(2);
const filePath = args[0];

if (!filePath) {
  console.log(chalk.red('❌ Please provide a file path'));
  console.log(chalk.blue('Usage: npm run test:generate <file-path>'));
  process.exit(1);
}

if (!fs.existsSync(filePath)) {
  console.log(chalk.red(`❌ File not found: ${filePath}`));
  process.exit(1);
}

const generator = new TestGenerator();
generator.generateTestsForFile(filePath)
  .then(success => {
    if (success) {
      console.log(chalk.green('🎉 Test generation completed successfully!'));
    } else {
      console.log(chalk.yellow('⚠️  Test generation completed with warnings'));
    }
  })
  .catch(error => {
    console.error(chalk.red('❌ Test generation failed:'), error);
    process.exit(1);
  });

export default TestGenerator;
