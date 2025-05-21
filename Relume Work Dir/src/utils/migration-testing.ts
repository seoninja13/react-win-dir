/**
 * Migration Testing Utility
 * 
 * This utility provides functions for testing pages during the App Router migration.
 * It includes functions for testing routing, functionality, and performance.
 */

import { logger } from './logger';

interface RouteTestResult {
  route: string;
  status: 'success' | 'failure';
  statusCode?: number;
  error?: string;
}

interface FunctionalityTestResult {
  test: string;
  status: 'success' | 'failure';
  error?: string;
}

interface PerformanceTestResult {
  metric: string;
  value: number;
  unit: string;
  threshold?: number;
  status: 'success' | 'failure';
}

/**
 * Tests a route by making a fetch request to it
 * @param route The route to test
 * @returns A promise that resolves to a RouteTestResult
 */
export async function testRoute(route: string): Promise<RouteTestResult> {
  try {
    const response = await fetch(route);
    const status = response.ok ? 'success' : 'failure';
    
    logger.logMigrationTest(`Route test: ${route}`, status === 'success' ? 'passed' : 'failed', {
      statusCode: response.status,
      route,
    });
    
    return {
      route,
      status,
      statusCode: response.status,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    logger.logMigrationTest(`Route test: ${route}`, 'failed', {
      error: errorMessage,
      route,
    });
    
    return {
      route,
      status: 'failure',
      error: errorMessage,
    };
  }
}

/**
 * Tests multiple routes
 * @param routes An array of routes to test
 * @returns A promise that resolves to an array of RouteTestResult
 */
export async function testRoutes(routes: string[]): Promise<RouteTestResult[]> {
  const results: RouteTestResult[] = [];
  
  for (const route of routes) {
    const result = await testRoute(route);
    results.push(result);
  }
  
  return results;
}

/**
 * Tests a specific functionality
 * @param testName The name of the test
 * @param testFn The test function that returns a boolean or throws an error
 * @returns A promise that resolves to a FunctionalityTestResult
 */
export async function testFunctionality(
  testName: string,
  testFn: () => boolean | Promise<boolean>
): Promise<FunctionalityTestResult> {
  try {
    const result = await testFn();
    const status = result ? 'success' : 'failure';
    
    logger.logMigrationTest(`Functionality test: ${testName}`, status === 'success' ? 'passed' : 'failed');
    
    return {
      test: testName,
      status,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    logger.logMigrationTest(`Functionality test: ${testName}`, 'failed', {
      error: errorMessage,
    });
    
    return {
      test: testName,
      status: 'failure',
      error: errorMessage,
    };
  }
}

/**
 * Measures the performance of a function
 * @param metricName The name of the metric
 * @param fn The function to measure
 * @param unit The unit of measurement
 * @param threshold Optional threshold for success/failure
 * @returns A promise that resolves to a PerformanceTestResult
 */
export async function measurePerformance(
  metricName: string,
  fn: () => any | Promise<any>,
  unit: string,
  threshold?: number
): Promise<PerformanceTestResult> {
  try {
    const start = performance.now();
    await fn();
    const end = performance.now();
    const value = end - start;
    
    const status = threshold ? (value <= threshold ? 'success' : 'failure') : 'success';
    
    logger.logMigrationTest(`Performance test: ${metricName}`, status === 'success' ? 'passed' : 'failed', {
      value,
      unit,
      threshold,
    });
    
    return {
      metric: metricName,
      value,
      unit,
      threshold,
      status,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    logger.logMigrationTest(`Performance test: ${metricName}`, 'failed', {
      error: errorMessage,
    });
    
    return {
      metric: metricName,
      value: 0,
      unit,
      threshold,
      status: 'failure',
    };
  }
}

/**
 * Runs a complete test suite for a page
 * @param pageName The name of the page
 * @param route The route to the page
 * @param functionalityTests An array of functionality tests
 * @returns A promise that resolves to an object with test results
 */
export async function testPage(
  pageName: string,
  route: string,
  functionalityTests: Array<{
    name: string;
    test: () => boolean | Promise<boolean>;
  }> = []
) {
  logger.migration(`Starting tests for page: ${pageName}`, {
    pageName,
    route,
    timestamp: new Date().toISOString(),
  });
  
  // Test route
  const routeResult = await testRoute(route);
  
  // Test functionality
  const functionalityResults: FunctionalityTestResult[] = [];
  for (const test of functionalityTests) {
    const result = await testFunctionality(test.name, test.test);
    functionalityResults.push(result);
  }
  
  // Measure performance
  const performanceResult = await measurePerformance(
    'Page Load Time',
    async () => {
      await fetch(route);
    },
    'ms',
    1000 // 1 second threshold
  );
  
  // Log summary
  const routeSuccess = routeResult.status === 'success';
  const functionalitySuccess = functionalityResults.every(result => result.status === 'success');
  const performanceSuccess = performanceResult.status === 'success';
  const overallSuccess = routeSuccess && functionalitySuccess && performanceSuccess;
  
  logger.migration(`Test summary for page: ${pageName}`, {
    pageName,
    route,
    overallStatus: overallSuccess ? 'passed' : 'failed',
    routeStatus: routeSuccess ? 'passed' : 'failed',
    functionalityStatus: functionalitySuccess ? 'passed' : 'failed',
    performanceStatus: performanceSuccess ? 'passed' : 'failed',
    timestamp: new Date().toISOString(),
  });
  
  return {
    pageName,
    route,
    overallSuccess,
    routeResult,
    functionalityResults,
    performanceResult,
  };
}

/**
 * Creates a test page that can be used to test the migration
 * @param pageName The name of the page
 * @param tests An object with test functions
 * @returns A React component that can be used to test the migration
 */
export function createTestPage(pageName: string, tests: Record<string, () => boolean | Promise<boolean>>) {
  return function TestPage() {
    const runTests = async () => {
      const results: Record<string, boolean> = {};
      
      for (const [testName, testFn] of Object.entries(tests)) {
        try {
          const result = await testFn();
          results[testName] = result;
          logger.logMigrationTest(`${testName}`, result ? 'passed' : 'failed', {
            pageName,
          });
        } catch (error) {
          results[testName] = false;
          logger.logMigrationTest(`${testName}`, 'failed', {
            pageName,
            error: error instanceof Error ? error.message : String(error),
          });
        }
      }
      
      return results;
    };
    
    return {
      pageName,
      runTests,
    };
  };
}
