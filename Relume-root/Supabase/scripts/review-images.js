/**
 * Review Generated Images Utility (JavaScript Version)
 * 
 * This script creates a simple HTML page to review the generated images from the test batch.
 * It allows for visual inspection and quality assurance before integrating into the website.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Get current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

// Constants
const RESULTS_PATH = path.resolve(__dirname, '../../Docs/Image generation/test-batch-results.json');
const OUTPUT_HTML_PATH = path.resolve(__dirname, '../../Docs/Image generation/review-images.html');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Simple logging function
function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const prefix = type === 'error' ? '❌ ERROR:' : type === 'warning' ? '⚠️ WARNING:' : 'ℹ️ INFO:';
  console.log(`[${timestamp}] ${prefix} ${message}`);
  
  // Also log to Supabase if credentials are available
  if (supabaseUrl && supabaseAnonKey) {
    try {
      supabase.from('logs').insert({
        level: type.toUpperCase(),
        message,
        source: 'review-images.js',
        timestamp: new Date().toISOString()
      }).then(() => {}, (err) => {
        console.error(`Failed to log to Supabase: ${err.message}`);
      });
    } catch (error) {
      console.error(`Failed to log to Supabase: ${error.message}`);
    }
  }
}

/**
 * Main function to create the review HTML
 */
async function createReviewPage() {
  log('Creating image review page...');
  
  try {
    // Check if results file exists
    if (!fs.existsSync(RESULTS_PATH)) {
      log('Results file not found. Please run generate-test-batch.js first.', 'error');
      return;
    }
    
    // Read results data
    const results = JSON.parse(fs.readFileSync(RESULTS_PATH, 'utf8'));
    log(`Loaded ${results.length} image generation results`);
    
    // Generate HTML
    const html = generateHtml(results);
    
    // Write HTML file
    fs.writeFileSync(OUTPUT_HTML_PATH, html, 'utf8');
    log(`Review page created at: ${OUTPUT_HTML_PATH}`);
    
    return OUTPUT_HTML_PATH;
  } catch (error) {
    log(`Error creating review page: ${error.message}`, 'error');
    throw error;
  }
}

/**
 * Generate HTML for the review page
 */
function generateHtml(results) {
  const successCount = results.filter(r => r.success).length;
  const failureCount = results.length - successCount;
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Image Generation Review</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    h1, h2, h3 {
      color: #2c3e50;
    }
    .summary {
      background-color: #f8f9fa;
      border-radius: 5px;
      padding: 15px;
      margin-bottom: 20px;
    }
    .success-rate {
      font-size: 24px;
      font-weight: bold;
      color: ${successCount === results.length ? '#28a745' : successCount === 0 ? '#dc3545' : '#fd7e14'};
    }
    .image-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
      gap: 20px;
    }
    .image-card {
      border: 1px solid #dee2e6;
      border-radius: 5px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .image-card.success {
      border-top: 5px solid #28a745;
    }
    .image-card.failure {
      border-top: 5px solid #dc3545;
    }
    .image-header {
      background-color: #f8f9fa;
      padding: 10px 15px;
      border-bottom: 1px solid #dee2e6;
    }
    .image-body {
      padding: 15px;
    }
    .image-container {
      width: 100%;
      height: 300px;
      overflow: hidden;
      position: relative;
      background-color: #f8f9fa;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .image-container img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
    .image-details {
      margin-top: 15px;
      font-size: 14px;
    }
    .image-details pre {
      background-color: #f8f9fa;
      padding: 10px;
      border-radius: 5px;
      overflow: auto;
      max-height: 200px;
    }
    .error-message {
      color: #dc3545;
      font-weight: bold;
    }
    .tabs {
      display: flex;
      margin-bottom: 20px;
    }
    .tab {
      padding: 10px 20px;
      background-color: #f8f9fa;
      border: 1px solid #dee2e6;
      border-bottom: none;
      border-radius: 5px 5px 0 0;
      margin-right: 5px;
      cursor: pointer;
    }
    .tab.active {
      background-color: #fff;
      border-bottom: 2px solid #fff;
      font-weight: bold;
    }
    .tab-content {
      display: none;
    }
    .tab-content.active {
      display: block;
    }
  </style>
</head>
<body>
  <h1>Image Generation Review</h1>
  
  <div class="summary">
    <h2>Summary</h2>
    <p>Total images: <strong>${results.length}</strong></p>
    <p>Successfully generated: <strong>${successCount}</strong></p>
    <p>Failed: <strong>${failureCount}</strong></p>
    <p>Success rate: <span class="success-rate">${Math.round((successCount / results.length) * 100)}%</span></p>
  </div>
  
  <div class="tabs">
    <div class="tab active" onclick="showTab('all')">All (${results.length})</div>
    <div class="tab" onclick="showTab('success')">Success (${successCount})</div>
    <div class="tab" onclick="showTab('failure')">Failure (${failureCount})</div>
  </div>
  
  <div id="all" class="tab-content active">
    <div class="image-grid">
      ${results.map(result => generateImageCard(result)).join('')}
    </div>
  </div>
  
  <div id="success" class="tab-content">
    <div class="image-grid">
      ${results.filter(r => r.success).map(result => generateImageCard(result)).join('')}
    </div>
  </div>
  
  <div id="failure" class="tab-content">
    <div class="image-grid">
      ${results.filter(r => !r.success).map(result => generateImageCard(result)).join('')}
    </div>
  </div>
  
  <script>
    function showTab(tabId) {
      // Hide all tab contents
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });
      
      // Show selected tab content
      document.getElementById(tabId).classList.add('active');
      
      // Update active tab
      document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
      });
      
      document.querySelector(`.tab[onclick="showTab('${tabId}')"]`).classList.add('active');
    }
    
    function toggleDetails(id) {
      const details = document.getElementById(id);
      if (details.style.display === 'none') {
        details.style.display = 'block';
      } else {
        details.style.display = 'none';
      }
    }
  </script>
</body>
</html>`;
}

/**
 * Generate HTML for an image card
 */
function generateImageCard(result) {
  const id = `details-${Math.random().toString(36).substring(2, 15)}`;
  
  if (result.success) {
    return `
    <div class="image-card success">
      <div class="image-header">
        <h3>${result.imageType} - ${result.mappedUrl}</h3>
      </div>
      <div class="image-body">
        <div class="image-container">
          <img src="${result.publicUrl || result.imageUrl}" alt="${result.imageType} for ${result.mappedUrl}">
        </div>
        <div class="image-details">
          <p><strong>Path:</strong> ${result.newImagePath}</p>
          <p><strong>Generated:</strong> ${new Date(result.timestamp).toLocaleString()}</p>
          <p><a href="#" onclick="toggleDetails('${id}'); return false;">Show/Hide Details</a></p>
          <div id="${id}" style="display: none;">
            <pre>${JSON.stringify(result, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>`;
  } else {
    return `
    <div class="image-card failure">
      <div class="image-header">
        <h3>${result.imageType} - ${result.mappedUrl}</h3>
      </div>
      <div class="image-body">
        <div class="image-container">
          <p class="error-message">Image generation failed</p>
        </div>
        <div class="image-details">
          <p><strong>Path:</strong> ${result.newImagePath}</p>
          <p><strong>Error:</strong> ${result.error}</p>
          <p><strong>Timestamp:</strong> ${new Date(result.timestamp).toLocaleString()}</p>
          <p><a href="#" onclick="toggleDetails('${id}'); return false;">Show/Hide Details</a></p>
          <div id="${id}" style="display: none;">
            <pre>${JSON.stringify(result, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>`;
  }
}

// Run the script
createReviewPage().catch(error => {
  log(`Unhandled error: ${error.message}`, 'error');
  process.exit(1);
});
