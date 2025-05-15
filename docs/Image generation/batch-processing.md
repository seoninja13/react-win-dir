# Batch Processing Utilities

This document provides detailed information about the batch processing utilities implemented for the Windows Doors CA website project.

## Overview

The batch processing utilities provide a set of functions for processing CSV data in batches, generating images using Vertex AI, and saving them to Supabase Storage. These utilities are designed to handle large datasets efficiently, with proper error handling and logging.

## File Structure

The batch processing utilities are located in the following files:

- `Supabase/utils/batch-image-generation.ts`: Main batch processing functions
- `Supabase/scripts/run-test-batch.ts`: Script for running a test batch
- `Supabase/scripts/imagen-test-batch.js`: JavaScript version of the test batch script

## Key Functions

### batch-image-generation.ts

#### `processCsvFile`

Processes a CSV file and generates images.

```typescript
export async function processCsvFile(csvFilePath: string): Promise<GenerationResult[]>
```

**Parameters:**
- `csvFilePath`: Path to the CSV file

**Returns:**
- `GenerationResult[]`: Array of generation results

#### `processTestBatch`

Processes a test batch of images.

```typescript
export async function processTestBatch(
  csvFilePath: string = path.join(process.cwd(), 'Supabase', 'test-data', 'test-images.csv')
): Promise<GenerationResult[]>
```

**Parameters:**
- `csvFilePath`: Path to the CSV file (default: test-images.csv)

**Returns:**
- `GenerationResult[]`: Array of generation results

#### `saveResultsToJson`

Saves generation results to a JSON file.

```typescript
export async function saveResultsToJson(
  results: GenerationResult[],
  outputPath: string = path.join(process.cwd(), 'Supabase', 'test-data', 'generation-results.json')
): void
```

**Parameters:**
- `results`: Array of generation results
- `outputPath`: Path to save the JSON file

## Data Structures

### ImageEntry

Represents an entry in the CSV file.

```typescript
interface ImageEntry {
  original_url: string;
  target_url: string;
  image_type: string;
  prompt: string;
}
```

### GenerationResult

Represents the result of generating an image.

```typescript
interface GenerationResult {
  entry: ImageEntry;
  imageUrl: string;
  supabaseUrl?: string;
  success: boolean;
  error?: any;
  timestamp: string;
  processingTimeMs?: number;
}
```

## CSV Format

The batch processing utilities expect CSV files in the following format:

```csv
original_url,target_url,image_type,prompt
https://www.example.com/,/,homepage,A photorealistic image of a modern house...
https://www.example.com/windows/,/windows,product_category,A visually appealing arrangement of various window styles...
```

## Test Data

A test CSV file with 5 entries is provided in `Supabase/test-data/test-images.csv`. This file contains representative entries from the Window World LA website, including:

1. Homepage image
2. Product category image (Windows)
3. Product detail image (Double-Hung Windows)
4. Informational page image (About Us)
5. Gallery image

## Usage Examples

### Processing a CSV File

```typescript
import { processCsvFile, saveResultsToJson } from '../utils/batch-image-generation';

async function example() {
  const csvFilePath = 'path/to/your/csv/file.csv';
  
  try {
    const results = await processCsvFile(csvFilePath);
    saveResultsToJson(results);
    
    console.log(`Processed ${results.length} entries`);
    console.log(`Success: ${results.filter(r => r.success).length}`);
    console.log(`Failed: ${results.filter(r => !r.success).length}`);
  } catch (error) {
    console.error('Error processing CSV file:', error);
  }
}
```

### Running a Test Batch

```typescript
import { processTestBatch, saveResultsToJson } from '../utils/batch-image-generation';

async function example() {
  try {
    const results = await processTestBatch();
    saveResultsToJson(results);
    
    console.log(`Processed ${results.length} test entries`);
    console.log(`Success: ${results.filter(r => r.success).length}`);
    console.log(`Failed: ${results.filter(r => !r.success).length}`);
  } catch (error) {
    console.error('Error processing test batch:', error);
  }
}
```

## Error Handling

The batch processing utilities include comprehensive error handling to ensure that failures in processing individual entries do not stop the entire batch. Each entry is processed independently, and errors are captured and included in the results.

## Performance Considerations

### Batch Size

Processing large CSV files can be resource-intensive. Consider breaking up large files into smaller batches to avoid memory issues and to stay within API quota limits.

### Rate Limiting

The Vertex AI API has quota limits that may restrict the number of images that can be generated in a given time period. The batch processing utilities do not currently implement rate limiting, so be mindful of these limits when processing large batches.

## Troubleshooting

### Common Issues

1. **CSV Parsing Errors**
   - Error: `CSV_RECORD_INCONSISTENT_COLUMNS`
   - Solution: Ensure that the CSV file has the correct format and all rows have the same number of columns

2. **Quota Exceeded Errors**
   - Error: `Quota exceeded for aiplatform.googleapis.com/generate`
   - Solution: Request a quota increase or implement rate limiting

3. **Image Generation Errors**
   - Error: `No image was generated`
   - Solution: Check the prompt and model configuration

## Future Improvements

- Add support for rate limiting to avoid quota issues
- Implement retry logic for failed image generations
- Add support for parallel processing to improve performance
- Implement progress tracking for long-running batches
