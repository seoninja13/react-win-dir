// Supabase/utils/test-read-storage.ts
import 'dotenv/config'; // Explicitly load .env files

// --- START DIAGNOSTIC LOGGING ---
console.log('--- Environment Variable Check (after explicit dotenv load) ---');
console.log(`Direct check for NEXT_PUBLIC_SUPABASE_URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL}`);
console.log(`Direct check for SUPABASE_SERVICE_ROLE_KEY: ${process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Exists (length): ' + process.env.SUPABASE_SERVICE_ROLE_KEY.length : 'Does not exist'}`);
console.log(`Direct check for dotenv load (NODE_ENV): ${process.env.NODE_ENV}`); // NODE_ENV is often set by dotenv
console.log(`Current working directory (for context): ${process.cwd()}`);
console.log('--------------------------------');
// --- END DIAGNOSTIC LOGGING ---

import { 
  initializeSupabaseAdmin, 
  getStorageBuckets, 
  getBucketObjects 
} from './storage.js'; // Assuming .js after build

async function listAllBucketsAndContents(): Promise<boolean> { 
  let errorOccurred = false;
  try {
    console.log('Ensuring Supabase admin client is initialized...');
    initializeSupabaseAdmin(); // Call the exported initializer
    // No need to check supabaseAdmin here, the imported functions will ensure it's ready or throw.

    console.log('\n--- Listing Buckets ---');
    const { data: buckets, error: listBucketsError } = await getStorageBuckets();

    if (listBucketsError) {
      console.error('Error listing buckets:', listBucketsError.message);
      errorOccurred = true;
      return errorOccurred;
    }

    if (!buckets || buckets.length === 0) {
      console.log('No buckets found.');
    } else {
      console.log(`Found ${buckets.length} bucket(s):`);
      for (const bucket of buckets) {
        console.log(`- ${bucket.name} (ID: ${bucket.id}, Public: ${bucket.public}, Created: ${bucket.created_at})`);
      }

      console.log('\n--- Listing Contents of Each Bucket ---');
      for (const bucket of buckets) {
        console.log(`\nBucket: ${bucket.name}`);
        // Define options for listing, can be customized
        const listOptions = {
          limit: 100,
          offset: 0,
          sortBy: { column: 'name', order: 'asc' as const }, // 'as const' for specific string literal types if needed by sortBy
        };
        const { data: contents, error: listContentsError } = await getBucketObjects(bucket.name, '', listOptions);

        if (listContentsError) {
          console.error(`  Error listing contents for bucket ${bucket.name}:`, listContentsError.message);
          errorOccurred = true;
        } else if (!contents || contents.length === 0) {
          console.log('  No files or folders found in the root of this bucket.');
        } else {
          console.log(`  Found ${contents.length} item(s):`);
          // Explicitly type 'item' here
          contents.forEach((item: { name: string; id?: string | null; updated_at?: string; created_at?: string; last_accessed_at?: string; metadata?: any }) => {
            // Supabase .list() returns 'id' as null for files and a string for folders.
            // Let's try to be more precise based on typical Supabase FileObject structure.
            // However, the core fields are 'name' and 'id'. Additional fields might be present.
            let type = 'Unknown';
            if (item.id === null) { // Typically files have id: null
                type = 'File';
            } else if (typeof item.id === 'string') { // Folders have an id string
                type = 'Folder';
            }
            // Some items might not have id (e.g. if `list()` is called with different parameters or on older Supabase versions for certain structures)
            // A more robust check might involve checking for a trailing slash in 'name' for folders if 'id' isn't definitive.
            console.log(`  - ${item.name} (${type})`);
          });
        }
      }
    }

  } catch (error) {
    const err = error as Error;
    console.error('\nAn unexpected error occurred in test script:', err.message);
    if (err.stack) {
        console.error(err.stack);
    }
    errorOccurred = true;
  }
  return errorOccurred;
}

listAllBucketsAndContents()
  .then((hadError) => {
    if (hadError) {
      console.error('\nTest read storage script encountered errors during execution.');
    } else {
      console.log('\nTest read storage script finished successfully.');
    }
  })
  .catch(() => {
    // This top-level catch handles truly unexpected errors not caught within listAllBucketsAndContents
    // or issues with the Promise chain itself.
    console.error('\nTest read storage script failed catastrophically due to an unhandled promise rejection or an error outside the main async function.');
  });
