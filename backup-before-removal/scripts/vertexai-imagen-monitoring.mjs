/**
 * Vertex AI Imagen Monitoring and Analytics
 * 
 * This script provides monitoring and analytics for Vertex AI Imagen usage,
 * helping to track quota usage, performance metrics, and costs.
 * 
 * Features:
 * - Tracks API call volume and success rates
 * - Monitors quota usage against the 50 RPM limit for us-west1
 * - Calculates cost estimates based on usage
 * - Provides performance metrics (response times, etc.)
 * - Implements alerting for quota issues
 * - Generates usage reports
 * 
 * Prerequisites:
 * - Node.js 18+
 * - Access to logs and metrics from Vertex AI Imagen calls
 * 
 * Usage:
 *   node scripts/vertexai-imagen-monitoring.mjs --days=7
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

// ======================
// Configuration
// ======================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEFAULTS = {
  LOG_DIR: path.join(__dirname, '..', 'logs'),
  REPORT_DIR: path.join(__dirname, '..', 'reports'),
  QUOTA_LIMIT_RPM: 50,
  COST_PER_IMAGE: 0.02, // Approximate cost per image in USD
  DAYS_TO_ANALYZE: 7,
};

// ======================
// Log Processing
// ======================

/**
 * Parse log files to extract API call metrics
 */
async function parseLogFiles(logDir, daysToAnalyze) {
  console.log(`Analyzing logs for the past ${daysToAnalyze} days...`);
  
  // Get list of log files
  const files = await fs.readdir(logDir);
  const now = new Date();
  const cutoffDate = new Date(now);
  cutoffDate.setDate(cutoffDate.getDate() - daysToAnalyze);
  
  // Filter log files by date
  const relevantFiles = files
    .filter(file => file.endsWith('.log'))
    .filter(file => {
      const fileDate = new Date(file.split('-').slice(0, 3).join('-'));
      return fileDate >= cutoffDate;
    })
    .sort();
  
  console.log(`Found ${relevantFiles.length} relevant log files`);
  
  // Process each log file
  const apiCalls = [];
  
  for (const file of relevantFiles) {
    const filePath = path.join(logDir, file);
    const content = await fs.readFile(filePath, 'utf8');
    const lines = content.split('\n');
    
    for (const line of lines) {
      if (!line.trim()) continue;
      
      try {
        // Parse log entry
        const entry = JSON.parse(line);
        
        // Filter for Vertex AI Imagen API calls
        if (entry.service === 'vertexai' && entry.model && entry.model.includes('imagen')) {
          apiCalls.push(entry);
        }
      } catch (error) {
        // Skip non-JSON lines
        continue;
      }
    }
  }
  
  console.log(`Extracted ${apiCalls.length} Vertex AI Imagen API calls`);
  return apiCalls;
}

// ======================
// Metrics Calculation
// ======================

/**
 * Calculate usage metrics from API calls
 */
function calculateMetrics(apiCalls) {
  // Initialize metrics
  const metrics = {
    totalCalls: apiCalls.length,
    successfulCalls: 0,
    failedCalls: 0,
    averageResponseTime: 0,
    callsByHour: Array(24).fill(0),
    callsByDay: {},
    errorTypes: {},
    quotaUtilization: {},
    estimatedCost: 0,
    imagesGenerated: 0,
  };
  
  // Calculate metrics
  let totalResponseTime = 0;
  
  for (const call of apiCalls) {
    // Count successful and failed calls
    if (call.success) {
      metrics.successfulCalls++;
      metrics.imagesGenerated += call.imagesGenerated || 1;
    } else {
      metrics.failedCalls++;
      
      // Count error types
      const errorType = call.errorType || 'unknown';
      metrics.errorTypes[errorType] = (metrics.errorTypes[errorType] || 0) + 1;
    }
    
    // Calculate response time
    if (call.responseTime) {
      totalResponseTime += call.responseTime;
    }
    
    // Count calls by hour
    const timestamp = new Date(call.timestamp);
    metrics.callsByHour[timestamp.getHours()]++;
    
    // Count calls by day
    const dateKey = timestamp.toISOString().split('T')[0];
    metrics.callsByDay[dateKey] = (metrics.callsByDay[dateKey] || 0) + 1;
    
    // Track quota utilization by minute
    const timeKey = timestamp.toISOString().slice(0, 16); // YYYY-MM-DDTHH:MM
    metrics.quotaUtilization[timeKey] = (metrics.quotaUtilization[timeKey] || 0) + 1;
  }
  
  // Calculate average response time
  metrics.averageResponseTime = totalResponseTime / metrics.totalCalls || 0;
  
  // Calculate quota utilization percentage
  const maxUtilizationPercentage = Math.max(
    ...Object.values(metrics.quotaUtilization).map(count => (count / DEFAULTS.QUOTA_LIMIT_RPM) * 100)
  );
  metrics.maxQuotaUtilizationPercentage = maxUtilizationPercentage;
  
  // Calculate estimated cost
  metrics.estimatedCost = metrics.imagesGenerated * DEFAULTS.COST_PER_IMAGE;
  
  return metrics;
}

/**
 * Generate alerts based on metrics
 */
function generateAlerts(metrics) {
  const alerts = [];
  
  // Check for high quota utilization
  if (metrics.maxQuotaUtilizationPercentage > 80) {
    alerts.push({
      level: 'warning',
      message: `High quota utilization detected (${metrics.maxQuotaUtilizationPercentage.toFixed(1)}% of 50 RPM limit)`,
      recommendation: 'Consider implementing more aggressive rate limiting or requesting a quota increase',
    });
  }
  
  // Check for high error rate
  const errorRate = (metrics.failedCalls / metrics.totalCalls) * 100;
  if (errorRate > 10) {
    alerts.push({
      level: 'error',
      message: `High error rate detected (${errorRate.toFixed(1)}%)`,
      recommendation: 'Investigate common error types and implement better error handling',
    });
  }
  
  // Check for specific error types
  const quotaErrors = metrics.errorTypes['quotaExceeded'] || 0;
  if (quotaErrors > 0) {
    alerts.push({
      level: 'error',
      message: `Quota exceeded errors detected (${quotaErrors} occurrences)`,
      recommendation: 'Implement more conservative rate limiting or request a quota increase',
    });
  }
  
  return alerts;
}

// ======================
// Report Generation
// ======================

/**
 * Generate a usage report
 */
async function generateReport(metrics, alerts, options = {}) {
  const {
    reportDir = DEFAULTS.REPORT_DIR,
    daysToAnalyze = DEFAULTS.DAYS_TO_ANALYZE,
  } = options;
  
  // Create report directory if it doesn't exist
  await fs.mkdir(reportDir, { recursive: true });
  
  // Generate report filename
  const now = new Date();
  const reportFilename = `vertexai-imagen-report-${now.toISOString().split('T')[0]}.json`;
  const reportPath = path.join(reportDir, reportFilename);
  
  // Create report object
  const report = {
    generatedAt: now.toISOString(),
    period: {
      days: daysToAnalyze,
      from: new Date(now.getTime() - (daysToAnalyze * 24 * 60 * 60 * 1000)).toISOString(),
      to: now.toISOString(),
    },
    metrics,
    alerts,
    recommendations: generateRecommendations(metrics, alerts),
  };
  
  // Write report to file
  await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
  console.log(`Report generated: ${reportPath}`);
  
  return reportPath;
}

/**
 * Generate recommendations based on metrics and alerts
 */
function generateRecommendations(metrics, alerts) {
  const recommendations = [];
  
  // Quota utilization recommendations
  if (metrics.maxQuotaUtilizationPercentage > 80) {
    recommendations.push({
      category: 'quota',
      priority: 'high',
      message: 'Implement more conservative rate limiting to avoid quota issues',
    });
    
    recommendations.push({
      category: 'quota',
      priority: 'medium',
      message: 'Consider requesting a quota increase from Google Cloud',
    });
  }
  
  // Error handling recommendations
  if (metrics.failedCalls > 0) {
    recommendations.push({
      category: 'errors',
      priority: 'medium',
      message: 'Improve error handling and retry logic for failed API calls',
    });
  }
  
  // Cost optimization recommendations
  if (metrics.estimatedCost > 100) {
    recommendations.push({
      category: 'cost',
      priority: 'high',
      message: 'Implement image caching to reduce duplicate generations',
    });
    
    recommendations.push({
      category: 'cost',
      priority: 'medium',
      message: 'Consider batching similar image requests to reduce overall cost',
    });
  }
  
  // Performance recommendations
  if (metrics.averageResponseTime > 5000) {
    recommendations.push({
      category: 'performance',
      priority: 'medium',
      message: 'Optimize prompt engineering to reduce generation time',
    });
  }
  
  return recommendations;
}

// ======================
// Main Function
// ======================
async function main() {
  // Parse command line arguments
  const args = process.argv.slice(2).reduce((acc, arg) => {
    const [key, value] = arg.split('=');
    acc[key.replace(/^--/, '')] = value || true;
    return acc;
  }, {});

  // Show help if needed
  if (args.help) {
    console.log(`
Usage: node ${path.basename(__filename)} [options]

Options:
  --log-dir=path      Directory containing log files (default: ${DEFAULTS.LOG_DIR})
  --report-dir=path   Directory to save reports (default: ${DEFAULTS.REPORT_DIR})
  --days=number       Number of days to analyze (default: ${DEFAULTS.DAYS_TO_ANALYZE})
  --help              Show this help message
`);
    process.exit(0);
  }

  try {
    const logDir = args['log-dir'] || DEFAULTS.LOG_DIR;
    const reportDir = args['report-dir'] || DEFAULTS.REPORT_DIR;
    const daysToAnalyze = parseInt(args.days, 10) || DEFAULTS.DAYS_TO_ANALYZE;
    
    // Create log directory if it doesn't exist
    await fs.mkdir(logDir, { recursive: true });
    
    // Parse log files
    const apiCalls = await parseLogFiles(logDir, daysToAnalyze);
    
    // Calculate metrics
    const metrics = calculateMetrics(apiCalls);
    
    // Generate alerts
    const alerts = generateAlerts(metrics);
    
    // Generate report
    const reportPath = await generateReport(metrics, alerts, {
      reportDir,
      daysToAnalyze,
    });
    
    // Display summary
    console.log('\n=== Vertex AI Imagen Usage Summary ===');
    console.log(`Total API calls: ${metrics.totalCalls}`);
    console.log(`Success rate: ${((metrics.successfulCalls / metrics.totalCalls) * 100).toFixed(1)}%`);
    console.log(`Images generated: ${metrics.imagesGenerated}`);
    console.log(`Estimated cost: $${metrics.estimatedCost.toFixed(2)}`);
    console.log(`Max quota utilization: ${metrics.maxQuotaUtilizationPercentage.toFixed(1)}% of 50 RPM`);
    console.log(`Average response time: ${(metrics.averageResponseTime / 1000).toFixed(2)} seconds`);
    
    if (alerts.length > 0) {
      console.log('\n=== Alerts ===');
      for (const alert of alerts) {
        console.log(`[${alert.level.toUpperCase()}] ${alert.message}`);
        console.log(`Recommendation: ${alert.recommendation}`);
      }
    }
    
    console.log(`\nDetailed report saved to: ${reportPath}`);
  } catch (error) {
    console.error('\nError:', error.message);
    process.exit(1);
  }
}

// Run the script if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

// Export for testing and importing
export {
  parseLogFiles,
  calculateMetrics,
  generateAlerts,
  generateReport,
  generateRecommendations,
};
