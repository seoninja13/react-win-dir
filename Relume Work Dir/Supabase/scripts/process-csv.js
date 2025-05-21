/**
 * Process Image CSV Script (JavaScript Version)
 * 
 * This script processes a CSV file containing URLs, images, and prompts from the Window World LA website,
 * maps them to the Windows Doors CA website, and prepares data for image generation.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Get current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

// Constants
const CSV_PATH = path.resolve(__dirname, '../../Docs/Image generation/window-world-la-images.csv');
const OUTPUT_PATH = path.resolve(__dirname, '../../Docs/Image generation/processed-image-data.json');
const URL_MAPPING_PATH = path.resolve(__dirname, '../../Docs/Image generation/url-mapping.json');

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
        source: 'process-csv.js',
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
 * Main function to process the CSV file
 */
async function processCSV() {
  log('Starting CSV processing...');
  
  try {
    // Check if CSV file exists
    if (!fs.existsSync(CSV_PATH)) {
      log(`CSV file not found at ${CSV_PATH}`, 'error');
      return;
    }
    
    // Read CSV file
    const fileContent = fs.readFileSync(CSV_PATH, 'utf8');
    log(`Read CSV file (${fileContent.length} bytes)`);
    
    // Parse CSV
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    });
    log(`Parsed ${records.length} records from CSV`);
    
    // Load URL mapping if exists
    let urlMapping = {};
    if (fs.existsSync(URL_MAPPING_PATH)) {
      urlMapping = JSON.parse(fs.readFileSync(URL_MAPPING_PATH, 'utf8'));
      log(`Loaded URL mapping with ${Object.keys(urlMapping).length} entries`);
    } else {
      log('URL mapping file not found, will create a new one', 'warning');
    }
    
    // Process records
    const processedData = {
      images: [],
      stats: {
        totalImages: 0,
        byCategory: {},
        byImageType: {},
      },
    };
    
    for (const record of records) {
      try {
        // Extract data from record
        const originalUrl = record.url?.trim() || '';
        const imageUrl = record.image_url?.trim() || '';
        const prompt = record.prompt?.trim() || '';
        
        if (!originalUrl || !imageUrl) {
          log(`Skipping record with missing URL or image URL: ${JSON.stringify(record)}`, 'warning');
          continue;
        }
        
        // Map URL
        const mappedUrl = mapUrl(originalUrl, urlMapping);
        
        // Determine image type and category
        const { imageType, category } = categorizeImage(imageUrl, originalUrl);
        
        // Enhance prompt
        const enhancedPrompt = enhancePrompt(prompt, imageType, category);
        
        // Generate new image path
        const newImagePath = generateImagePath(mappedUrl, imageType);
        
        // Add to processed data
        processedData.images.push({
          originalUrl,
          mappedUrl,
          imageUrl,
          imageType,
          category,
          prompt,
          enhancedPrompt,
          newImagePath,
        });
        
        // Update stats
        processedData.stats.totalImages++;
        processedData.stats.byCategory[category] = (processedData.stats.byCategory[category] || 0) + 1;
        processedData.stats.byImageType[imageType] = (processedData.stats.byImageType[imageType] || 0) + 1;
      } catch (error) {
        log(`Error processing record: ${error.message}`, 'error');
      }
    }
    
    // Sort images by priority (home page first, then product pages, then others)
    processedData.images.sort((a, b) => {
      // Home page has highest priority
      if (a.mappedUrl === '/' && b.mappedUrl !== '/') return -1;
      if (a.mappedUrl !== '/' && b.mappedUrl === '/') return 1;
      
      // Product pages have next highest priority
      const aIsProduct = isProductPage(a.mappedUrl);
      const bIsProduct = isProductPage(b.mappedUrl);
      if (aIsProduct && !bIsProduct) return -1;
      if (!aIsProduct && bIsProduct) return 1;
      
      // Sort by URL length (shorter URLs typically have higher priority)
      return a.mappedUrl.length - b.mappedUrl.length;
    });
    
    // Save processed data
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(processedData, null, 2), 'utf8');
    log(`Saved processed data to ${OUTPUT_PATH}`);
    
    // Save updated URL mapping
    fs.writeFileSync(URL_MAPPING_PATH, JSON.stringify(urlMapping, null, 2), 'utf8');
    log(`Saved URL mapping to ${URL_MAPPING_PATH}`);
    
    // Print summary
    log(`Processing completed. Total images: ${processedData.stats.totalImages}`);
    log(`Categories: ${JSON.stringify(processedData.stats.byCategory)}`);
    log(`Image types: ${JSON.stringify(processedData.stats.byImageType)}`);
    
    return processedData;
  } catch (error) {
    log(`Error processing CSV: ${error.message}`, 'error');
    throw error;
  }
}

/**
 * Map a URL from Window World LA to Windows Doors CA
 */
function mapUrl(originalUrl, urlMapping) {
  // If URL is already mapped, return the mapping
  if (urlMapping[originalUrl]) {
    return urlMapping[originalUrl];
  }
  
  // Basic URL mapping logic
  let mappedUrl = originalUrl;
  
  // Replace domain
  mappedUrl = mappedUrl.replace('windowworldla.com', 'windowsdoorsca.com');
  
  // Remove trailing slash if present
  if (mappedUrl.endsWith('/') && mappedUrl !== '/') {
    mappedUrl = mappedUrl.slice(0, -1);
  }
  
  // Store mapping for future use
  urlMapping[originalUrl] = mappedUrl;
  
  return mappedUrl;
}

/**
 * Categorize an image based on its URL and image URL
 */
function categorizeImage(imageUrl, originalUrl) {
  let imageType = 'unknown';
  let category = 'other';
  
  // Determine image type based on image URL and page URL
  if (imageUrl.includes('hero') || imageUrl.includes('banner')) {
    imageType = 'hero';
  } else if (imageUrl.includes('product') || imageUrl.includes('thumbnail')) {
    imageType = 'product';
  } else if (imageUrl.includes('gallery') || imageUrl.includes('portfolio')) {
    imageType = 'gallery';
  } else if (imageUrl.includes('icon') || imageUrl.includes('logo')) {
    imageType = 'icon';
  } else if (imageUrl.includes('background') || imageUrl.includes('bg')) {
    imageType = 'background';
  } else {
    // Fallback to determining by position in URL
    const parts = imageUrl.split('/');
    const filename = parts[parts.length - 1];
    
    if (filename.startsWith('hero') || filename.startsWith('banner')) {
      imageType = 'hero';
    } else if (filename.startsWith('product') || filename.startsWith('thumb')) {
      imageType = 'product';
    }
  }
  
  // Determine category based on original URL
  if (originalUrl.includes('/windows/')) {
    category = 'windows';
  } else if (originalUrl.includes('/doors/')) {
    category = 'doors';
  } else if (originalUrl.includes('/siding/')) {
    category = 'siding';
  } else if (originalUrl.includes('/roofing/')) {
    category = 'roofing';
  } else if (originalUrl === '/' || originalUrl.endsWith('/home')) {
    category = 'home';
  } else if (originalUrl.includes('/about')) {
    category = 'about';
  } else if (originalUrl.includes('/contact')) {
    category = 'contact';
  } else if (originalUrl.includes('/gallery')) {
    category = 'gallery';
  } else if (originalUrl.includes('/blog')) {
    category = 'blog';
  }
  
  return { imageType, category };
}

/**
 * Enhance a prompt with additional details
 */
function enhancePrompt(prompt, imageType, category) {
  if (!prompt) {
    // Generate a basic prompt if none exists
    prompt = `A high-quality image of ${category} for a windows and doors company website`;
  }
  
  // Add style consistency
  const styleAddition = "Professional photography style, clear lighting, high resolution, photo-realistic, architectural photography";
  
  // Add specific enhancements based on image type
  let typeSpecificAddition = "";
  
  switch (imageType) {
    case 'hero':
      typeSpecificAddition = "Wide angle view, showcasing the full exterior, dramatic lighting, inviting atmosphere";
      break;
    case 'product':
      typeSpecificAddition = "Detailed close-up, showing quality materials, clean lines, professional installation";
      break;
    case 'gallery':
      typeSpecificAddition = "Beautiful real-world example, professionally installed, elegant design";
      break;
    case 'background':
      typeSpecificAddition = "Subtle texture, neutral colors, non-distracting pattern";
      break;
    case 'icon':
      typeSpecificAddition = "Simple, clean lines, minimalist design, recognizable silhouette";
      break;
  }
  
  // Add category-specific details
  let categoryAddition = "";
  
  switch (category) {
    case 'windows':
      categoryAddition = "Modern window design, energy efficient, clear glass, quality frame materials";
      break;
    case 'doors':
      categoryAddition = "Elegant door design, secure entry, quality materials, beautiful finish";
      break;
    case 'siding':
      categoryAddition = "Durable siding material, clean installation, weather resistant, attractive finish";
      break;
    case 'roofing':
      categoryAddition = "Quality roofing materials, professional installation, weather protection, architectural style";
      break;
    case 'home':
      categoryAddition = "Beautiful home exterior, curb appeal, well-maintained property";
      break;
  }
  
  // Add negative prompting to avoid common issues
  const negativePrompt = "No text, no watermarks, no people, no logos, no brand names, no distortion";
  
  // Combine all elements
  return `${prompt}. ${styleAddition}. ${typeSpecificAddition}. ${categoryAddition}. Negative: ${negativePrompt}`.trim();
}

/**
 * Generate a new image path for the processed image
 */
function generateImagePath(mappedUrl, imageType) {
  // Remove leading slash and replace remaining slashes with hyphens
  const urlPath = mappedUrl === '/' ? 'home' : mappedUrl.replace(/^\//, '').replace(/\//g, '-');
  
  // Generate filename
  const filename = `${urlPath}-${imageType}.jpg`;
  
  // Generate path based on category
  let category = 'other';
  if (mappedUrl.includes('/windows')) {
    category = 'windows';
  } else if (mappedUrl.includes('/doors')) {
    category = 'doors';
  } else if (mappedUrl.includes('/siding')) {
    category = 'siding';
  } else if (mappedUrl.includes('/roofing')) {
    category = 'roofing';
  } else if (mappedUrl === '/' || mappedUrl.includes('/home')) {
    category = 'home';
  }
  
  return `${category}/${filename}`;
}

/**
 * Check if a URL is a product page
 */
function isProductPage(url) {
  return (
    url.includes('/windows/') ||
    url.includes('/doors/') ||
    url.includes('/siding/') ||
    url.includes('/roofing/')
  );
}

// Run the script
processCSV().catch(error => {
  log(`Fatal error: ${error.message}`, 'error');
  process.exit(1);
});
