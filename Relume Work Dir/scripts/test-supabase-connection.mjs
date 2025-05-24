/**
 * Test Supabase Connection
 */

import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: '.env.local' });

console.log('🔧 Testing Supabase Connection...');
console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('Service Key:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Present' : 'Missing');

try {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
  
  console.log('✅ Supabase client created');
  
  // Test connection
  const { data, error } = await supabase.storage.listBuckets();
  
  if (error) {
    console.error('❌ Connection error:', error.message);
  } else {
    console.log('✅ Connection successful');
    console.log('📁 Available buckets:', data.map(b => b.name));
  }
  
} catch (error) {
  console.error('❌ Error:', error.message);
}
