import dotenv from 'dotenv';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import path from 'path';
import { fileURLToPath } from 'url';

// Determine the project root directory using import.meta.url for ESM compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..', '..'); // Adjust based on script location relative to root
const envPath = path.resolve(projectRoot, '.env.local');

// Load environment variables from .env.local in the project root
console.log('Attempting to load environment variables from:', envPath);
console.log('Current __dirname:', __dirname); // Added for debugging
console.log('Resolved projectRoot:', projectRoot); // Added for debugging

const dotenvResult = dotenv.config({ path: envPath, override: true });

if (dotenvResult.error) {
  console.error('Error loading .env.local file:', dotenvResult.error);
  process.exit(1);
}

console.log('.env.local loaded:', dotenvResult.parsed !== undefined);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('NEXT_PUBLIC_SUPABASE_URL_loaded:', !!supabaseUrl);
console.log('SUPABASE_SERVICE_ROLE_KEY_loaded:', !!supabaseServiceKey);

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Supabase URL or Service Role Key is missing from environment variables.');
  console.log('Please ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local at the project root.');
  process.exit(1);
}

console.log('Supabase URL:', supabaseUrl ? supabaseUrl.substring(0, 20) + '...' : 'Not Loaded'); // Log a portion for verification

// Initialize Supabase client
let supabase: SupabaseClient;
try {
  supabase = createClient(supabaseUrl, supabaseServiceKey);
  console.log('Supabase client initialized successfully.');
} catch (error) {
  console.error('Error initializing Supabase client:', error);
  process.exit(1);
}

async function listSchemas() {
  console.log('\nAttempting to fetch schemas from Supabase database using information_schema.schemata...');
  try {
    const schemasToExcludeFromOutput = [
      'pg_catalog',
      'pg_toast',
      'graphql',
      'graphql_public',
      'net',
      'pgsodium',
      'pgsodium_masks',
      'realtime',
      'storage',
      'supabase_functions',
      'supabase_migrations',
      'information_schema', // Exclude information_schema itself from the list of results
      // Add any other temporary or internal schemas if they appear and are not user-defined
      'pg_temp_1', 
      'pg_toast_temp_1'
    ];

    const excludeString = `(${schemasToExcludeFromOutput.map(s => `'${s}'`).join(',')})`;

    const { data, error } = await supabase
      .schema('information_schema') // Specify the schema correctly
      .from('schemata')          // Table in information_schema
      .select('schema_name')     // The column name for schema names in this table
      .not('schema_name', 'in', excludeString);

    if (error) {
      console.error('Error fetching schemas:', error.message);
      if (error.details) console.error('Details:', error.details);
      if (error.hint) console.error('Hint:', error.hint);
      return;
    }

    if (data && data.length > 0) {
      console.log('Successfully fetched schemas (from information_schema.schemata):');
      data.forEach((schema: any) => {
        console.log(`- ${schema.schema_name}`); // Column name is schema_name here
      });
    } else {
      console.log('No user-defined schemas found or no data returned from information_schema.schemata.');
    }
  } catch (e: any) {
    console.error('An unexpected error occurred while trying to fetch schemas:', e.message);
  }
}

listSchemas();
