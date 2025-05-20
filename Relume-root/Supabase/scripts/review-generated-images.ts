/**
 * Review Generated Images Utility
 * 
 * This script creates a simple HTML page to review the generated images from the test batch.
 * It allows for visual inspection and quality assurance before integrating into the website.
 * 
 * Usage:
 * ts-node review-generated-images.ts
 */

import fs from 'fs';
import path from 'path';
import { createLogger, logErrorObject } from '../utils/logger';

// Types
interface GenerationResult {
  originalUrl: string;
  mappedUrl: string;
  imageType: string;
  newImagePath: string;
  prompt: string;
  imageUrl: string;
  success: boolean;
  error?: string;
  timestamp: string;
}

// Configuration
const RESULTS_PATH = path.resolve(__dirname, '../../Docs/Image generation/test-batch-results.json');
const OUTPUT_HTML_PATH = path.resolve(__dirname, '../../Docs/Image generation/review-images.html');

// Create a logger for this script
const logger = createLogger('review-generated-images');

/**
 * Main function to create the review HTML
 */
async function createReviewPage() {
  console.log('Creating image review page...');
  await logger.info('Creating image review page');
  
  try {
    // Check if results file exists
    if (!fs.existsSync(RESULTS_PATH)) {
      const error = new Error('Results file not found. Please run test-batch-generate-images.ts first.');
      console.error(`Error: ${error.message}`);
      await logger.error('Results file not found', { path: RESULTS_PATH });
      return;
    }
  
    // Read results data
    const results: GenerationResult[] = JSON.parse(fs.readFileSync(RESULTS_PATH, 'utf8'));
    console.log(`Loaded ${results.length} image generation results`);
    await logger.info('Loaded image generation results', { count: results.length });
  
    // Generate HTML
    const html = generateHtml(results);
    
    // Write HTML file
    fs.writeFileSync(OUTPUT_HTML_PATH, html, 'utf8');
    console.log(`Review page created at: ${OUTPUT_HTML_PATH}`);
    await logger.info('Review page created', { path: OUTPUT_HTML_PATH, fileSize: fs.statSync(OUTPUT_HTML_PATH).size });
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    console.error(`Error creating review page: ${err.message}`);
    await logErrorObject(err, 'review-generated-images', { stage: 'create-review-page' });
  }
}

/**
 * Generate HTML for the review page
 */
function generateHtml(results: GenerationResult[]): string {
  const successCount = results.filter(r => r.success).length;
  const failureCount = results.length - successCount;
  
  // Generate cards for each image
  const imageCards = results.map((result, index) => {
    if (result.success) {
      return `
        <div class="card ${result.success ? 'success' : 'failure'}">
          <h3>${result.imageType} (${index + 1}/${results.length})</h3>
          <div class="image-container">
            <img src="${result.imageUrl}" alt="${result.imageType}" />
          </div>
          <div class="details">
            <p><strong>Original URL:</strong> ${result.originalUrl}</p>
            <p><strong>Mapped URL:</strong> ${result.mappedUrl}</p>
            <p><strong>Image Path:</strong> ${result.newImagePath}</p>
            <p><strong>Generated:</strong> ${new Date(result.timestamp).toLocaleString()}</p>
            <details>
              <summary>Prompt</summary>
              <pre>${result.prompt}</pre>
            </details>
          </div>
        </div>
      `;
    } else {
      return `
        <div class="card failure">
          <h3>${result.imageType} (${index + 1}/${results.length})</h3>
          <div class="error-container">
            <p class="error-message">Error: ${result.error}</p>
          </div>
          <div class="details">
            <p><strong>Original URL:</strong> ${result.originalUrl}</p>
            <p><strong>Mapped URL:</strong> ${result.mappedUrl}</p>
            <p><strong>Image Path:</strong> ${result.newImagePath}</p>
            <p><strong>Generated:</strong> ${new Date(result.timestamp).toLocaleString()}</p>
            <details>
              <summary>Prompt</summary>
              <pre>${result.prompt}</pre>
            </details>
          </div>
        </div>
      `;
    }
  }).join('');
  
  // Full HTML template
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Generated Images Review</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        h1, h2 {
          color: #2c3e50;
        }
        .summary {
          background-color: #f8f9fa;
          padding: 15px;
          border-radius: 5px;
          margin-bottom: 20px;
        }
        .success-count {
          color: #28a745;
          font-weight: bold;
        }
        .failure-count {
          color: #dc3545;
          font-weight: bold;
        }
        .cards-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
          gap: 20px;
        }
        .card {
          border: 1px solid #ddd;
          border-radius: 5px;
          padding: 15px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .card.success {
          border-left: 5px solid #28a745;
        }
        .card.failure {
          border-left: 5px solid #dc3545;
        }
        .image-container {
          margin: 10px 0;
          text-align: center;
        }
        .image-container img {
          max-width: 100%;
          max-height: 300px;
          border: 1px solid #ddd;
        }
        .error-container {
          background-color: #f8d7da;
          color: #721c24;
          padding: 10px;
          border-radius: 5px;
          margin: 10px 0;
        }
        .details {
          margin-top: 15px;
          font-size: 14px;
        }
        details {
          margin-top: 10px;
        }
        summary {
          cursor: pointer;
          color: #007bff;
        }
        pre {
          background-color: #f8f9fa;
          padding: 10px;
          border-radius: 5px;
          white-space: pre-wrap;
          font-size: 12px;
          max-height: 200px;
          overflow-y: auto;
        }
      </style>
    </head>
    <body>
      <h1>Generated Images Review</h1>
      
      <div class="summary">
        <h2>Summary</h2>
        <p>Total Images: ${results.length}</p>
        <p>Success: <span class="success-count">${successCount}</span></p>
        <p>Failure: <span class="failure-count">${failureCount}</span></p>
        <p>Generated: ${new Date().toLocaleString()}</p>
      </div>
      
      <div class="cards-container">
        ${imageCards}
      </div>
    </body>
    </html>
  `;
}

// Run the script
createReviewPage().catch(async error => {
  const err = error instanceof Error ? error : new Error(String(error));
  console.error('Error creating review page:', err.message);
  await logErrorObject(err, 'review-generated-images', { stage: 'script-execution' });
  process.exit(1);
});
