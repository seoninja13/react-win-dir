/**
 * Vertex AI Cost Analysis Script
 * 
 * Linear Issue: 1BU-57 - Calculate Vertex AI Imagen Cost Per Image
 * 
 * This script analyzes the cost of our successful image generation
 * and provides pricing estimates for scaling up.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleAuth } from 'google-auth-library';

// Load environment variables
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  project: process.env.GOOGLE_CLOUD_PROJECT,
  location: process.env.GOOGLE_CLOUD_LOCATION || 'us-west1',
  
  // Vertex AI Imagen 3.0 Pricing (as of 2025)
  // Source: https://cloud.google.com/vertex-ai/generative-ai/pricing
  pricing: {
    'imagen-3.0-fast-generate-001': {
      costPerImage: 0.04, // $0.04 per image (1024x1024)
      model: 'Imagen 3.0 Fast Generate',
      resolution: '1024x1024',
      currency: 'USD'
    },
    'imagen-3.0-generate-001': {
      costPerImage: 0.08, // $0.08 per image (1024x1024)
      model: 'Imagen 3.0 Generate',
      resolution: '1024x1024', 
      currency: 'USD'
    }
  }
};

// Load our test results
const resultsFile = path.join(__dirname, '..', 'generated-images', 'test-batch', 'direct-http-test-results.json');

/**
 * Initialize Google Auth for billing API access
 */
async function initializeAuth() {
  console.log('🔧 Initializing Google Auth for billing access...');
  
  const auth = new GoogleAuth({
    scopes: [
      'https://www.googleapis.com/auth/cloud-platform',
      'https://www.googleapis.com/auth/cloud-billing'
    ],
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
  });
  
  const authClient = await auth.getClient();
  const accessToken = await authClient.getAccessToken();
  
  console.log('✅ Authentication successful');
  return accessToken.token;
}

/**
 * Calculate costs based on our test results
 */
function calculateTestCosts() {
  console.log('\n📊 COST ANALYSIS FOR TEST IMAGES');
  console.log('='.repeat(50));
  
  if (!fs.existsSync(resultsFile)) {
    console.log('❌ Test results file not found');
    return null;
  }
  
  const results = JSON.parse(fs.readFileSync(resultsFile, 'utf8'));
  const modelUsed = 'imagen-3.0-fast-generate-001';
  const pricing = CONFIG.pricing[modelUsed];
  
  console.log(`📋 Model Used: ${pricing.model}`);
  console.log(`📋 Resolution: ${pricing.resolution}`);
  console.log(`📋 Cost Per Image: $${pricing.costPerImage}`);
  console.log(`📋 Images Generated: ${results.successful.length}`);
  
  const totalCost = results.successful.length * pricing.costPerImage;
  const avgTimePerImage = results.totalTime / results.successful.length / 1000; // seconds
  
  console.log(`\n💰 COST BREAKDOWN:`);
  console.log(`  • Total Cost: $${totalCost.toFixed(4)}`);
  console.log(`  • Cost Per Image: $${pricing.costPerImage}`);
  console.log(`  • Average Time Per Image: ${avgTimePerImage.toFixed(1)} seconds`);
  
  return {
    modelUsed,
    imagesGenerated: results.successful.length,
    costPerImage: pricing.costPerImage,
    totalCost,
    avgTimePerImage,
    totalTimeMinutes: results.totalTime / 1000 / 60
  };
}

/**
 * Project scaling cost estimates
 */
function calculateScalingCosts(testCosts) {
  if (!testCosts) return;
  
  console.log(`\n📈 SCALING COST ESTIMATES`);
  console.log('='.repeat(50));
  
  const scenarios = [
    { name: 'Current Website (50 pages)', images: 50 },
    { name: 'Full Website (100 pages)', images: 100 },
    { name: 'Multiple Variants (200 images)', images: 200 },
    { name: 'Complete Library (500 images)', images: 500 }
  ];
  
  scenarios.forEach(scenario => {
    const cost = scenario.images * testCosts.costPerImage;
    const timeMinutes = scenario.images * testCosts.avgTimePerImage / 60;
    
    console.log(`\n🎯 ${scenario.name}:`);
    console.log(`  • Images: ${scenario.images}`);
    console.log(`  • Cost: $${cost.toFixed(2)}`);
    console.log(`  • Estimated Time: ${timeMinutes.toFixed(1)} minutes`);
  });
}

/**
 * Try to get actual billing data from Google Cloud
 */
async function getActualBillingData(accessToken) {
  console.log(`\n🔍 ATTEMPTING TO GET ACTUAL BILLING DATA`);
  console.log('='.repeat(50));
  
  try {
    // Get billing account
    const billingResponse = await fetch(
      `https://cloudbilling.googleapis.com/v1/projects/${CONFIG.project}/billingInfo`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    if (billingResponse.ok) {
      const billingData = await billingResponse.json();
      console.log('✅ Billing account found:', billingData.billingAccountName);
      
      // Try to get usage data (this might require additional permissions)
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      const usageResponse = await fetch(
        `https://cloudbilling.googleapis.com/v1/projects/${CONFIG.project}/billingInfo`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log('ℹ️  For detailed usage data, check Google Cloud Console > Billing');
      
    } else {
      console.log('⚠️  Could not access billing data (may require additional permissions)');
    }
    
  } catch (error) {
    console.log('⚠️  Billing API access limited:', error.message);
    console.log('💡 Check Google Cloud Console > Billing for actual costs');
  }
}

/**
 * Generate cost report
 */
function generateCostReport(testCosts) {
  if (!testCosts) return;
  
  const report = {
    timestamp: new Date().toISOString(),
    testResults: testCosts,
    recommendations: {
      costEffective: testCosts.totalCost < 1.00,
      scalingViable: testCosts.costPerImage < 0.10,
      timeEfficient: testCosts.avgTimePerImage < 30,
      overallRecommendation: testCosts.totalCost < 1.00 && testCosts.costPerImage < 0.10 
        ? 'PROCEED - Very cost effective for high-quality images'
        : 'EVALUATE - Consider cost vs quality trade-offs'
    },
    nextSteps: [
      'Monitor actual billing in Google Cloud Console',
      'Compare costs with alternative image sources',
      'Consider batch processing for efficiency',
      'Set up billing alerts for cost control'
    ]
  };
  
  const reportFile = path.join(__dirname, '..', 'generated-images', 'test-batch', 'cost-analysis-report.json');
  fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
  
  console.log(`\n💾 Cost report saved to: ${reportFile}`);
  return report;
}

/**
 * Main execution function
 */
async function main() {
  try {
    console.log('💰 VERTEX AI IMAGEN COST ANALYSIS');
    console.log('='.repeat(50));
    console.log(`📍 Project: ${CONFIG.project}`);
    console.log(`📍 Model: imagen-3.0-fast-generate-001`);
    
    // Calculate costs from test results
    const testCosts = calculateTestCosts();
    
    // Show scaling estimates
    calculateScalingCosts(testCosts);
    
    // Try to get actual billing data
    const accessToken = await initializeAuth();
    await getActualBillingData(accessToken);
    
    // Generate report
    const report = generateCostReport(testCosts);
    
    console.log(`\n🎯 FINAL RECOMMENDATION:`);
    console.log(report?.recommendations?.overallRecommendation || 'Analysis incomplete');
    
    console.log(`\n📋 Next Steps:`);
    console.log('1. Check Google Cloud Console > Billing for actual costs');
    console.log('2. Set up billing alerts if scaling up');
    console.log('3. Update Linear issue 1BU-57 with findings');
    console.log('4. Proceed with Supabase integration (1BU-58)');
    
  } catch (error) {
    console.error('💥 Cost analysis failed:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

// Run the analysis
main();
