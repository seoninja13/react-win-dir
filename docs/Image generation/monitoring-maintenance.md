# Monitoring and Maintenance

This document outlines the monitoring and maintenance procedures for the Google Generative AI integration to ensure its continued operation and reliability.

## Overview

Maintaining the image generation system requires regular monitoring, troubleshooting, and updates. This document provides guidelines for monitoring the system's health, addressing common issues, and implementing updates.

## Monitoring

### 1. Quota Usage Monitoring

Monitor your Google Cloud quota usage to avoid hitting limits:

```typescript
// src/utils/quota-monitor.ts

import { VertexAI } from '@google-cloud/vertexai';

/**
 * Check the current quota usage for Vertex AI
 * 
 * @returns Object containing quota usage information
 */
export async function checkQuotaUsage() {
  try {
    const vertexAI = new VertexAI({
      project: process.env.GOOGLE_CLOUD_PROJECT || '',
      location: process.env.GOOGLE_CLOUD_LOCATION || '',
    });

    // This is a simplified example - actual implementation would use Google Cloud Monitoring API
    const usageData = await vertexAI.getUsageMetrics();
    
    return {
      success: true,
      data: usageData,
    };
  } catch (error) {
    console.error('Error checking quota usage:', error);
    return {
      success: false,
      error,
    };
  }
}

/**
 * Set up alerts for quota usage
 * 
 * @param thresholdPercentage - Percentage threshold for alerting (e.g., 80 for 80%)
 * @param notificationEmail - Email to send alerts to
 */
export async function setupQuotaAlerts(thresholdPercentage: number, notificationEmail: string) {
  // Implementation would use Google Cloud Monitoring API to set up alerts
  console.log(`Setting up quota alerts at ${thresholdPercentage}% threshold for ${notificationEmail}`);
}
```

### 2. Error Logging and Monitoring

Implement comprehensive error logging:

```typescript
// src/utils/error-logger.ts

/**
 * Log an error with the image generation process
 * 
 * @param error - The error object
 * @param context - Additional context about the error
 */
export function logImageGenerationError(error: any, context: any) {
  // Log to console
  console.error('Image Generation Error:', error, 'Context:', context);
  
  // Log to monitoring service (e.g., Sentry, LogRocket, etc.)
  if (process.env.SENTRY_DSN) {
    // Example with Sentry
    Sentry.captureException(error, {
      extra: context,
      tags: {
        service: 'image-generation',
      },
    });
  }
  
  // Log to database for analysis
  logErrorToDatabase(error, context);
}

/**
 * Log an error to the database for later analysis
 * 
 * @param error - The error object
 * @param context - Additional context about the error
 */
async function logErrorToDatabase(error: any, context: any) {
  try {
    const { supabaseAdmin } = require('./supabase-admin');
    
    await supabaseAdmin.from('error_logs').insert({
      service: 'image-generation',
      error_message: error.message,
      error_stack: error.stack,
      context: JSON.stringify(context),
      timestamp: new Date().toISOString(),
    });
  } catch (dbError) {
    console.error('Error logging to database:', dbError);
  }
}
```

### 3. Performance Monitoring

Track performance metrics for the image generation process:

```typescript
// src/utils/performance-monitor.ts

interface PerformanceMetrics {
  startTime: number;
  endTime?: number;
  duration?: number;
  success: boolean;
  imageType: string;
  promptLength: number;
  imageSize?: string;
}

const metrics: PerformanceMetrics[] = [];

/**
 * Start tracking performance for an image generation request
 * 
 * @param imageType - Type of image being generated
 * @param promptLength - Length of the prompt
 * @returns Tracking ID for the request
 */
export function startTracking(imageType: string, promptLength: number): number {
  const metric: PerformanceMetrics = {
    startTime: Date.now(),
    success: false,
    imageType,
    promptLength,
  };
  
  metrics.push(metric);
  return metrics.length - 1;
}

/**
 * End tracking for an image generation request
 * 
 * @param trackingId - Tracking ID returned by startTracking
 * @param success - Whether the request was successful
 * @param imageSize - Size of the generated image (if applicable)
 */
export function endTracking(trackingId: number, success: boolean, imageSize?: string) {
  if (trackingId >= 0 && trackingId < metrics.length) {
    const metric = metrics[trackingId];
    metric.endTime = Date.now();
    metric.duration = metric.endTime - metric.startTime;
    metric.success = success;
    metric.imageSize = imageSize;
    
    // Log the metric
    console.log('Image Generation Performance:', metric);
    
    // Save to database for analysis
    saveMetricToDatabase(metric);
  }
}

/**
 * Save a performance metric to the database
 * 
 * @param metric - Performance metric to save
 */
async function saveMetricToDatabase(metric: PerformanceMetrics) {
  try {
    const { supabaseAdmin } = require('./supabase-admin');
    
    await supabaseAdmin.from('performance_metrics').insert({
      service: 'image-generation',
      start_time: new Date(metric.startTime).toISOString(),
      end_time: metric.endTime ? new Date(metric.endTime).toISOString() : null,
      duration_ms: metric.duration,
      success: metric.success,
      image_type: metric.imageType,
      prompt_length: metric.promptLength,
      image_size: metric.imageSize,
    });
  } catch (dbError) {
    console.error('Error saving metric to database:', dbError);
  }
}

/**
 * Get performance statistics for the image generation process
 * 
 * @param timeframe - Timeframe to get statistics for (e.g., 'day', 'week', 'month')
 * @returns Performance statistics
 */
export async function getPerformanceStats(timeframe: 'day' | 'week' | 'month') {
  try {
    const { supabaseAdmin } = require('./supabase-admin');
    
    // Calculate the start date based on the timeframe
    const startDate = new Date();
    if (timeframe === 'day') {
      startDate.setDate(startDate.getDate() - 1);
    } else if (timeframe === 'week') {
      startDate.setDate(startDate.getDate() - 7);
    } else if (timeframe === 'month') {
      startDate.setMonth(startDate.getMonth() - 1);
    }
    
    // Query the database for performance metrics
    const { data, error } = await supabaseAdmin
      .from('performance_metrics')
      .select('*')
      .eq('service', 'image-generation')
      .gte('start_time', startDate.toISOString());
    
    if (error) {
      throw error;
    }
    
    // Calculate statistics
    const totalRequests = data.length;
    const successfulRequests = data.filter(metric => metric.success).length;
    const successRate = totalRequests > 0 ? (successfulRequests / totalRequests) * 100 : 0;
    
    const durations = data
      .filter(metric => metric.duration_ms)
      .map(metric => metric.duration_ms);
    
    const avgDuration = durations.length > 0
      ? durations.reduce((sum, duration) => sum + duration, 0) / durations.length
      : 0;
    
    return {
      totalRequests,
      successfulRequests,
      successRate,
      avgDuration,
      timeframe,
    };
  } catch (error) {
    console.error('Error getting performance stats:', error);
    return null;
  }
}
```

## Maintenance

### 1. Regular Health Checks

Implement a health check script to verify the system's functionality:

```typescript
// scripts/health-check.js

require('dotenv').config();
const { generateImage } = require('../utils/image-generation');
const { uploadImage } = require('../utils/storage');

async function performHealthCheck() {
  console.log('Starting health check...');
  
  try {
    // Test image generation
    console.log('Testing image generation...');
    const imageData = await generateImage('A simple test image for health check');
    
    if (!imageData) {
      throw new Error('Image generation failed');
    }
    
    console.log('Image generation successful');
    
    // Test image upload
    console.log('Testing image upload to Supabase...');
    const uploadResult = await uploadImage(
      'health-check.png',
      imageData,
      'health-checks'
    );
    
    if (!uploadResult.success) {
      throw new Error(`Image upload failed: ${uploadResult.error}`);
    }
    
    console.log('Image upload successful');
    
    // Overall health check result
    console.log('Health check completed successfully');
    return {
      success: true,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Health check failed:', error);
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    };
  }
}

// Run the health check
performHealthCheck()
  .then(result => {
    // Log the result to the database
    const { supabaseAdmin } = require('../utils/supabase-admin');
    return supabaseAdmin.from('health_checks').insert({
      service: 'image-generation',
      success: result.success,
      error: result.error || null,
      timestamp: result.timestamp,
    });
  })
  .then(() => {
    console.log('Health check result logged to database');
    process.exit(0);
  })
  .catch(error => {
    console.error('Error logging health check result:', error);
    process.exit(1);
  });
```

### 2. Scheduled Maintenance

Set up scheduled maintenance tasks:

```javascript
// scripts/scheduled-maintenance.js

require('dotenv').config();
const { checkQuotaUsage } = require('../utils/quota-monitor');
const { getPerformanceStats } = require('../utils/performance-monitor');
const { cleanupOldImages } = require('../utils/storage');

async function performScheduledMaintenance() {
  console.log('Starting scheduled maintenance...');
  
  try {
    // Check quota usage
    console.log('Checking quota usage...');
    const quotaUsage = await checkQuotaUsage();
    console.log('Quota usage:', quotaUsage);
    
    // Get performance stats
    console.log('Getting performance stats...');
    const performanceStats = await getPerformanceStats('week');
    console.log('Performance stats:', performanceStats);
    
    // Clean up old test images
    console.log('Cleaning up old test images...');
    const cleanupResult = await cleanupOldImages('health-checks', 7); // Keep last 7 days
    console.log('Cleanup result:', cleanupResult);
    
    // Overall maintenance result
    console.log('Scheduled maintenance completed successfully');
    return {
      success: true,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Scheduled maintenance failed:', error);
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    };
  }
}

// Run the scheduled maintenance
performScheduledMaintenance()
  .then(result => {
    // Log the result to the database
    const { supabaseAdmin } = require('../utils/supabase-admin');
    return supabaseAdmin.from('maintenance_logs').insert({
      service: 'image-generation',
      success: result.success,
      error: result.error || null,
      timestamp: result.timestamp,
    });
  })
  .then(() => {
    console.log('Maintenance result logged to database');
    process.exit(0);
  })
  .catch(error => {
    console.error('Error logging maintenance result:', error);
    process.exit(1);
  });
```

### 3. Dependency Updates

Regularly check for and apply updates to dependencies:

```javascript
// scripts/check-dependencies.js

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function checkDependencies() {
  console.log('Checking for dependency updates...');
  
  try {
    // Run npm outdated to check for updates
    const outdatedOutput = execSync('npm outdated --json', { encoding: 'utf8' });
    const outdatedDeps = JSON.parse(outdatedOutput);
    
    // Log the outdated dependencies
    console.log('Outdated dependencies:', Object.keys(outdatedDeps));
    
    // Check for security vulnerabilities
    console.log('Checking for security vulnerabilities...');
    const auditOutput = execSync('npm audit --json', { encoding: 'utf8' });
    const auditResult = JSON.parse(auditOutput);
    
    // Log the security vulnerabilities
    console.log('Security vulnerabilities:', auditResult.metadata.vulnerabilities);
    
    // Save the results to a report file
    const reportPath = path.join(__dirname, '../reports/dependency-check.json');
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    
    fs.writeFileSync(reportPath, JSON.stringify({
      outdatedDependencies: outdatedDeps,
      securityVulnerabilities: auditResult.metadata.vulnerabilities,
      timestamp: new Date().toISOString(),
    }, null, 2));
    
    console.log(`Dependency check report saved to ${reportPath}`);
    
    return {
      success: true,
      outdatedDependencies: Object.keys(outdatedDeps),
      securityVulnerabilities: auditResult.metadata.vulnerabilities,
    };
  } catch (error) {
    console.error('Error checking dependencies:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// Run the dependency check
checkDependencies();
```

## Troubleshooting

### 1. Common Issues and Solutions

#### Quota Exceeded Errors

```plaintext
Error: Quota exceeded for quota metric 'Imagen API requests' and limit 'Imagen API requests per minute per project' of service 'aiplatform.googleapis.com'
```

**Solution:**

- Implement rate limiting as described in the rate-limiting.md document
- Request a quota increase from Google Cloud
- Spread batch processing over a longer period

#### Image Generation Failures

```plaintext
Error: Failed to generate image: Internal error occurred
```

**Solution:**

- Check the prompt for prohibited content
- Verify that the model is available in your region
- Try a different model or parameter settings

#### Supabase Storage Issues

```plaintext
Error: Failed to upload image to Supabase: The resource already exists
```

**Solution:**

- Use the `upsert: true` option when uploading
- Implement proper error handling for duplicate files
- Check bucket permissions

### 2. Troubleshooting Script

Create a troubleshooting script to diagnose common issues:

```javascript
// scripts/troubleshoot.js

require('dotenv').config();
const { VertexAI } = require('@google-cloud/vertexai');
const { createClient } = require('@supabase/supabase-js');

async function troubleshoot() {
  console.log('Starting troubleshooting...');
  
  // Check environment variables
  console.log('Checking environment variables...');
  const requiredEnvVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
    'GOOGLE_CLOUD_PROJECT',
    'GOOGLE_CLOUD_LOCATION',
    'GOOGLE_GENAI_USE_VERTEXAI',
  ];
  
  const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
  
  if (missingEnvVars.length > 0) {
    console.error('Missing environment variables:', missingEnvVars);
  } else {
    console.log('All required environment variables are set');
  }
  
  // Check Google Cloud authentication
  console.log('Checking Google Cloud authentication...');
  try {
    const vertexAI = new VertexAI({
      project: process.env.GOOGLE_CLOUD_PROJECT || '',
      location: process.env.GOOGLE_CLOUD_LOCATION || '',
    });
    
    // Try to list models
    const generativeModel = vertexAI.preview.getGenerativeModel({
      model: 'imagen-3.0-fast-generate-001',
    });
    
    console.log('Google Cloud authentication successful');
  } catch (error) {
    console.error('Google Cloud authentication failed:', error);
  }
  
  // Check Supabase connection
  console.log('Checking Supabase connection...');
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      throw error;
    }
    
    console.log('Supabase connection successful');
  } catch (error) {
    console.error('Supabase connection failed:', error);
  }
  
  // Check Supabase admin connection
  console.log('Checking Supabase admin connection...');
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);
    
    // Try to list buckets
    const { data, error } = await supabaseAdmin.storage.listBuckets();
    
    if (error) {
      throw error;
    }
    
    console.log('Supabase admin connection successful');
    console.log('Available buckets:', data.map(bucket => bucket.name));
  } catch (error) {
    console.error('Supabase admin connection failed:', error);
  }
  
  console.log('Troubleshooting completed');
}

// Run the troubleshooting script
troubleshoot().catch(console.error);
```

## Maintenance Schedule

Implement the following maintenance schedule:

| Task | Frequency | Script |
|------|-----------|--------|
| Health Check | Daily | `scripts/health-check.js` |
| Quota Monitoring | Daily | `utils/quota-monitor.ts` |
| Performance Analysis | Weekly | `utils/performance-monitor.ts` |
| Dependency Updates | Monthly | `scripts/check-dependencies.js` |
| Full System Test | Monthly | `scripts/full-system-test.js` |
| Database Cleanup | Monthly | `scripts/cleanup-database.js` |

## Conclusion

Regular monitoring and maintenance are essential for ensuring the reliability and performance of the Google Generative AI integration. By following the procedures outlined in this document, you can identify and address issues before they impact the system's functionality and ensure that the integration continues to operate smoothly.
