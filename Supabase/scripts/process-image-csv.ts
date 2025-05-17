/**
 * CSV Processing Script for Image Generation
 * 
 * This script processes the CSV file containing Window World LA website URLs, images, and prompts,
 * and transforms this data into a structured format for generating images for the Windows Doors CA website.
 * 
 * Usage:
 * ts-node process-image-csv.ts
 */

import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import { createLogger, logErrorObject } from '../utils/logger';

// Types
interface ImageEntry {
  originalUrl: string;
  imageDescription: string;
  generatedPrompt: string;
  mappedUrl?: string;
  category?: string;
  subCategory?: string;
  pageType?: string;
  priority?: string;
  newImagePath?: string;
  imageType?: string;
  enhancedPrompt?: string;
  status?: string;
}

interface ProcessedData {
  pages: {
    originalUrl: string;
    mappedUrl: string;
    category: string;
    subCategory: string;
    pageType: string;
    priority: string;
    images: {
      originalDescription: string;
      imageType: string;
      newImagePath: string;
      originalPrompt: string;
      enhancedPrompt: string;
      status: string;
      priority: string;
    }[];
  }[];
  stats: {
    totalPages: number;
    totalImages: number;
    mappedPages: number;
    unmappedPages: number;
    enhancedPrompts: number;
  };
}

// Configuration
const CSV_FILE_PATH = path.resolve(__dirname, '../../Docs/Image generation/windowswordsl-GEM-urls-images.csv');
const OUTPUT_JSON_PATH = path.resolve(__dirname, '../../Docs/Image generation/processed-image-data.json');
const OUTPUT_CSV_PATH = path.resolve(__dirname, '../../Docs/Image generation/enhanced-image-prompts.csv');

// Create a logger for this script
const logger = createLogger('process-image-csv');

// URL Mapping Rules
const URL_MAPPING_RULES = [
  { pattern: 'windowworldla.com', replacement: 'windowsdoorsca.com' },
  { pattern: '/siding/', replacement: '/vinyl-siding/' },
  { pattern: '/contact', replacement: '/contact-us' },
  { pattern: '/faq', replacement: '/faqs' },
];

// Page Type Categorization
const PAGE_TYPE_PATTERNS = [
  { pattern: /\/$/, type: 'home', category: 'home', priority: 'P1' },
  { pattern: /\/windows\/$/, type: 'product-category', category: 'windows', priority: 'P1' },
  { pattern: /\/doors\/$/, type: 'product-category', category: 'doors', priority: 'P1' },
  { pattern: /\/siding\/$/, type: 'product-category', category: 'siding', priority: 'P1' },
  { pattern: /\/windows\/([^\/]+)\/$/, type: 'product-detail', category: 'windows', priority: 'P2' },
  { pattern: /\/doors\/([^\/]+)\/$/, type: 'product-detail', category: 'doors', priority: 'P2' },
  { pattern: /\/siding\/([^\/]+)\/$/, type: 'product-detail', category: 'siding', priority: 'P2' },
  { pattern: /\/about-us\/$/, type: 'informational', category: 'about', priority: 'P3' },
  { pattern: /\/contact-us\/$/, type: 'informational', category: 'contact', priority: 'P3' },
  { pattern: /\/financing\/$/, type: 'informational', category: 'financing', priority: 'P3' },
  { pattern: /\/warranty\/$/, type: 'informational', category: 'warranty', priority: 'P3' },
  { pattern: /\/gallery\/$/, type: 'gallery', category: 'gallery', priority: 'P4' },
  { pattern: /\/blog\/$/, type: 'blog-list', category: 'blog', priority: 'P4' },
  { pattern: /\/blog\/([^\/]+)\/$/, type: 'blog-post', category: 'blog', priority: 'P4' },
];

// Image Type Categorization
const IMAGE_TYPE_PATTERNS = [
  { pattern: /Hero Image/i, type: 'hero', priority: 'high' },
  { pattern: /Banner/i, type: 'banner', priority: 'high' },
  { pattern: /Logo/i, type: 'logo', priority: 'high' },
  { pattern: /Product Detail/i, type: 'product', priority: 'medium' },
  { pattern: /In-Situ Example/i, type: 'example', priority: 'medium' },
  { pattern: /Team Photo/i, type: 'team', priority: 'medium' },
  { pattern: /Conceptual/i, type: 'conceptual', priority: 'medium' },
  { pattern: /Map/i, type: 'map', priority: 'low' },
  { pattern: /Color Palette/i, type: 'palette', priority: 'low' },
  { pattern: /Blog Post Image/i, type: 'blog', priority: 'low' },
];

/**
 * Main function to process the CSV file
 */
async function processCSV() {
  await logger.info('Starting CSV processing...');
  
  // Read and parse CSV file
  try {
    const csvData = fs.readFileSync(CSV_FILE_PATH, 'utf8');
    await logger.debug('CSV file read successfully', { fileSize: csvData.length });
    
    const records = parse(csvData, {
      columns: true,
      skip_empty_lines: true,
    }) as { 'Page URL': string; 'Image Description': string; 'Generated Prompt': string }[];
    
    await logger.info('CSV parsing completed', { recordCount: records.length });
  
    // Transform data
    const entries: ImageEntry[] = records.map(record => ({
      originalUrl: record['Page URL'],
      imageDescription: record['Image Description'],
      generatedPrompt: record['Generated Prompt'],
    }));
    
    await logger.info('Data transformation completed', { entryCount: entries.length });
  
    // Apply URL mapping
    await applyUrlMapping(entries);
    
    // Categorize entries
    await categorizeEntries(entries);
    
    // Enhance prompts
    await enhancePrompts(entries);
    
    // Generate image paths
    await generateImagePaths(entries);
    
    // Group by pages
    const processedData = await groupByPages(entries);
    
    // Write output files
    await writeOutputFiles(processedData, entries);
    
    await logger.info('CSV processing completed successfully!', {
      totalPages: processedData.stats.totalPages,
      totalImages: processedData.stats.totalImages,
      mappedPages: processedData.stats.mappedPages,
      unmappedPages: processedData.stats.unmappedPages,
      enhancedPrompts: processedData.stats.enhancedPrompts
    });
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    await logErrorObject(err, 'process-image-csv', { stage: 'csv-processing' });
    throw err;
  }
}

/**
 * Apply URL mapping rules to entries
 */
async function applyUrlMapping(entries: ImageEntry[]) {
  await logger.info('Applying URL mapping rules...');
  try {
  
    entries.forEach(entry => {
      let mappedUrl = entry.originalUrl;
      
      // Apply all mapping rules
      URL_MAPPING_RULES.forEach(rule => {
        mappedUrl = mappedUrl.replace(rule.pattern, rule.replacement);
      });
      
      entry.mappedUrl = mappedUrl;
    });
    
    await logger.debug('URL mapping completed', { entryCount: entries.length });
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    await logErrorObject(err, 'process-image-csv', { stage: 'url-mapping' });
    throw err;
  }
}

/**
 * Categorize entries by page type and image type
 */
async function categorizeEntries(entries: ImageEntry[]) {
  await logger.info('Categorizing entries...');
  try {
  
    let pageTypeMatches = 0;
    let imageTypeMatches = 0;
    
    entries.forEach(entry => {
      // Categorize by page type
      for (const pattern of PAGE_TYPE_PATTERNS) {
        const regex = new RegExp(pattern.pattern);
        if (regex.test(entry.originalUrl)) {
          entry.pageType = pattern.type;
          entry.category = pattern.category;
          entry.priority = pattern.priority;
          pageTypeMatches++;
          
          // Extract subcategory from URL if applicable
          if (pattern.type === 'product-detail') {
            const match = regex.exec(entry.originalUrl);
            if (match && match[1]) {
              entry.subCategory = match[1];
            }
          }
          
          break;
        }
      }
      
      // Default values if no match
      if (!entry.pageType) {
        entry.pageType = 'other';
        entry.category = 'other';
        entry.priority = 'P5';
      }
      
      // Categorize by image type
      for (const pattern of IMAGE_TYPE_PATTERNS) {
        if (pattern.pattern.test(entry.imageDescription)) {
          entry.imageType = pattern.type;
          entry.status = 'pending';
          imageTypeMatches++;
          break;
        }
      }
      
      // Default image type if no match
      if (!entry.imageType) {
        entry.imageType = 'other';
        entry.status = 'pending';
      }
    });
    
    await logger.info('Entry categorization completed', { 
      totalEntries: entries.length,
      pageTypeMatches,
      imageTypeMatches,
      defaultPageTypes: entries.length - pageTypeMatches,
      defaultImageTypes: entries.length - imageTypeMatches
    });
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    await logErrorObject(err, 'process-image-csv', { stage: 'categorize-entries' });
    throw err;
  }
}

/**
 * Enhance prompts with additional details
 */
async function enhancePrompts(entries: ImageEntry[]) {
  await logger.info('Enhancing prompts...');
  try {
  
    entries.forEach(entry => {
      // Base prompt from the CSV
      let enhancedPrompt = entry.generatedPrompt;
      
      // Add style consistency elements
      enhancedPrompt += '\n\nStyle: Clean, professional, high-quality';
      
      // Add mood based on page type
      if (entry.pageType === 'home') {
        enhancedPrompt += '\nMood: Welcoming, aspirational, bright';
      } else if (entry.pageType?.includes('product')) {
        enhancedPrompt += '\nMood: Informative, detailed, premium';
      } else if (entry.pageType === 'informational') {
        enhancedPrompt += '\nMood: Trustworthy, helpful, approachable';
      } else {
        enhancedPrompt += '\nMood: Professional, engaging';
      }
      
      // Add lighting
      enhancedPrompt += '\nLighting: Natural, bright, even';
      
      // Add perspective based on image type
      if (entry.imageType === 'hero' || entry.imageType === 'banner') {
        enhancedPrompt += '\nPerspective: Wide angle, showcasing the full subject';
      } else if (entry.imageType === 'product') {
        enhancedPrompt += '\nPerspective: Clear view of product details';
      } else if (entry.imageType === 'example') {
        enhancedPrompt += '\nPerspective: Realistic view as installed';
      }
      
      // Add brand reference
      enhancedPrompt += '\n\nThis is for Windows Doors CA website, ensure professional quality suitable for a home improvement company.';
      
      entry.enhancedPrompt = enhancedPrompt;
    });
    
    await logger.info('Prompt enhancement completed', { entryCount: entries.length });
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    await logErrorObject(err, 'process-image-csv', { stage: 'enhance-prompts' });
    throw err;
  }
}

/**
 * Generate image paths for storage
 */
async function generateImagePaths(entries: ImageEntry[]) {
  await logger.info('Generating image paths...');
  try {
  
    const pathsGenerated: string[] = [];
    const pathsSkipped: string[] = [];
    
    entries.forEach(entry => {
      if (!entry.category || !entry.imageType) {
        pathsSkipped.push(entry.originalUrl);
        return;
      }
      
      // Create a sanitized filename base
      const urlParts = entry.originalUrl.split('/').filter(Boolean);
      const lastPart = urlParts[urlParts.length - 1] || 'home';
      const sanitizedName = lastPart.replace(/[^a-z0-9]/gi, '-').toLowerCase();
      
      // Create image path
      entry.newImagePath = `/images/${entry.category}/${entry.subCategory || sanitizedName}/${entry.imageType}-${Date.now()}.jpg`;
      pathsGenerated.push(entry.newImagePath);
    });
    
    await logger.info('Image path generation completed', { 
      pathsGenerated: pathsGenerated.length,
      pathsSkipped: pathsSkipped.length
    });
    
    if (pathsSkipped.length > 0) {
      await logger.warning('Some entries skipped during path generation', { 
        count: pathsSkipped.length,
        examples: pathsSkipped.slice(0, 5)
      });
    }
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    await logErrorObject(err, 'process-image-csv', { stage: 'generate-image-paths' });
    throw err;
  }
}

/**
 * Group entries by pages
 */
async function groupByPages(entries: ImageEntry[]): Promise<ProcessedData> {
  await logger.info('Grouping entries by pages...');
  try {
  
    const pageMap = new Map<string, any>();
    
    // Group by original URL
    entries.forEach(entry => {
      if (!pageMap.has(entry.originalUrl)) {
        pageMap.set(entry.originalUrl, {
          originalUrl: entry.originalUrl,
          mappedUrl: entry.mappedUrl,
          category: entry.category,
          subCategory: entry.subCategory,
          pageType: entry.pageType,
          priority: entry.priority,
          images: [],
        });
      }
      
      const page = pageMap.get(entry.originalUrl);
      
      page.images.push({
        originalDescription: entry.imageDescription,
        imageType: entry.imageType,
        newImagePath: entry.newImagePath,
        originalPrompt: entry.generatedPrompt,
        enhancedPrompt: entry.enhancedPrompt,
        status: entry.status,
        priority: entry.imageType === 'hero' || entry.imageType === 'banner' ? 'high' : 'medium',
      });
    });
    
    // Convert map to array
    const pages = Array.from(pageMap.values());
    
    // Calculate stats
    const totalPages = pages.length;
    const totalImages = entries.length;
    const mappedPages = pages.filter(page => page.mappedUrl !== page.originalUrl).length;
    const unmappedPages = totalPages - mappedPages;
    const enhancedPrompts = entries.filter(entry => entry.enhancedPrompt).length;
    
    const stats = {
      totalPages,
      totalImages,
      mappedPages,
      unmappedPages,
      enhancedPrompts,
    };
    
    await logger.info('Page grouping completed', stats);
    
    return {
      pages,
      stats,
    };
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    await logErrorObject(err, 'process-image-csv', { stage: 'group-by-pages' });
    throw err;
  }
}

/**
 * Write output files (JSON and CSV)
 */
async function writeOutputFiles(processedData: ProcessedData, entries: ImageEntry[]) {
  await logger.info('Writing output files...');
  try {
  
    // Write JSON file
    fs.writeFileSync(
      OUTPUT_JSON_PATH,
      JSON.stringify(processedData, null, 2),
      'utf8'
    );
    
    // Write CSV file
    const csvOutput = stringify([
      [
        'Original URL',
        'Mapped URL',
        'Category',
        'Sub-Category',
        'Page Type',
        'Priority',
        'Image Description',
        'Image Type',
        'New Image Path',
        'Original Prompt',
        'Enhanced Prompt',
        'Status',
      ],
      ...entries.map(entry => [
        entry.originalUrl,
        entry.mappedUrl,
        entry.category,
        entry.subCategory,
        entry.pageType,
        entry.priority,
        entry.imageDescription,
        entry.imageType,
        entry.newImagePath,
        entry.generatedPrompt,
        entry.enhancedPrompt,
        entry.status,
      ]),
    ]);
    
    fs.writeFileSync(OUTPUT_CSV_PATH, csvOutput, 'utf8');
    
    await logger.info('Output files written successfully', {
      jsonPath: OUTPUT_JSON_PATH,
      csvPath: OUTPUT_CSV_PATH,
      jsonSize: fs.statSync(OUTPUT_JSON_PATH).size,
      csvSize: fs.statSync(OUTPUT_CSV_PATH).size
    });
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    await logErrorObject(err, 'process-image-csv', { stage: 'write-output-files' });
    throw err;
  }
}

// Run the script
processCSV().catch(async error => {
  const err = error instanceof Error ? error : new Error(String(error));
  await logErrorObject(err, 'process-image-csv', { stage: 'main' });
  console.error('Error processing CSV:', error);
  process.exit(1);
});
