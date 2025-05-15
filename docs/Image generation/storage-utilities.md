# Supabase Storage Utilities

This document provides detailed information about the Supabase Storage utilities implemented for the Windows Doors CA website project.

## Overview

The Supabase Storage utilities provide a set of functions for interacting with Supabase Storage. These utilities are designed to handle uploading, downloading, and managing files in Supabase Storage, with a focus on storing generated images from the Vertex AI Imagen service.

## File Structure

The Supabase Storage utilities are located in the following file:

- `Supabase/utils/storage.ts`: Provides functions for interacting with Supabase Storage

## Key Functions

### `uploadImage`

Uploads an image to Supabase Storage.

```typescript
export async function uploadImage(
  imageData: string,
  filePath: string,
  bucketName: string = GENERATED_IMAGES_BUCKET,
  metadata: Record<string, string> = {}
): Promise<string>
```

**Parameters:**
- `imageData`: The image data as a base64 string
- `filePath`: The file path within the bucket
- `bucketName`: The name of the bucket (default: 'generated-images')
- `metadata`: Optional metadata to store with the file

**Returns:**
- The URL of the uploaded image

### `uploadMultipleImages`

Uploads multiple images to Supabase Storage.

```typescript
export async function uploadMultipleImages(
  images: Array<{ imageData: string; filePath: string; metadata?: Record<string, string> }>,
  bucketName: string = GENERATED_IMAGES_BUCKET
): Promise<string[]>
```

**Parameters:**
- `images`: Array of image data and file paths
- `bucketName`: The name of the bucket (default: 'generated-images')

**Returns:**
- Array of public URLs for the uploaded images

### `createBucketIfNotExists`

Creates a Supabase Storage bucket if it doesn't exist.

```typescript
export async function createBucketIfNotExists(
  bucketName: string = GENERATED_IMAGES_BUCKET,
  isPublic: boolean = true
): Promise<boolean>
```

**Parameters:**
- `bucketName`: The name of the bucket to create (default: 'generated-images')
- `isPublic`: Whether the bucket should be public (default: true)

**Returns:**
- Success status

### `listFiles`

Gets a list of files in a Supabase Storage bucket.

```typescript
export async function listFiles(
  path: string = '',
  bucketName: string = GENERATED_IMAGES_BUCKET
)
```

**Parameters:**
- `path`: The path within the bucket (default: '')
- `bucketName`: The name of the bucket (default: 'generated-images')

**Returns:**
- Array of file objects

## Configuration

### Environment Variables

The following environment variables are required for the Supabase Storage utilities:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

### Supabase Clients

The Supabase Storage utilities use two Supabase clients:

1. **supabase**: Uses the anonymous key for public operations
2. **supabaseAdmin**: Uses the service role key for admin operations (bucket creation, file uploads, etc.)

This dual-client approach ensures that operations that require higher privileges (like bucket creation) can be performed while maintaining security.

## Usage Examples

### Uploading an Image

```typescript
import { uploadImage } from '../utils/storage';

async function example() {
  const imageData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
  const filePath = 'example/test-image.png';
  
  try {
    const imageUrl = await uploadImage(imageData, filePath);
    console.log('Uploaded image URL:', imageUrl);
  } catch (error) {
    console.error('Error uploading image:', error);
  }
}
```

### Creating a Bucket

```typescript
import { createBucketIfNotExists } from '../utils/storage';

async function example() {
  try {
    const success = await createBucketIfNotExists('custom-bucket', true);
    if (success) {
      console.log('Bucket created or already exists');
    }
  } catch (error) {
    console.error('Error creating bucket:', error);
  }
}
```

### Listing Files

```typescript
import { listFiles } from '../utils/storage';

async function example() {
  try {
    const files = await listFiles('images');
    console.log('Files in bucket:', files);
  } catch (error) {
    console.error('Error listing files:', error);
  }
}
```

## Error Handling

The Supabase Storage utilities include comprehensive error handling to ensure that any issues with Supabase Storage are properly caught and reported. Each function catches errors and logs them to the console, then rethrows the error to allow the calling code to handle it appropriately.

## Security Considerations

### Row-Level Security (RLS)

Supabase uses Row-Level Security (RLS) to control access to data. When using the anonymous key, operations may be restricted by RLS policies. The service role key bypasses RLS, allowing for administrative operations.

### Service Role Key

The service role key has full access to your Supabase project and should be kept secure. It should only be used for server-side operations and never exposed to the client.

## Troubleshooting

### Common Issues

1. **Permission Errors**
   - Error: `new row violates row-level security`
   - Solution: Use the service role key for admin operations

2. **Bucket Already Exists**
   - Error: `Bucket already exists`
   - Solution: This is not actually an error, the function handles this case

3. **File Upload Errors**
   - Error: `File upload failed`
   - Solution: Check the file size, format, and permissions

## Future Improvements

- Add support for file transformations (resizing, cropping, etc.)
- Implement caching to improve performance
- Add support for file versioning
- Implement more advanced security policies
