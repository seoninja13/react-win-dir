import fs from 'fs';
import path from 'path';
import { supabase } from '../lib/supabase';

async function setupDatabase() {
  try {
    console.log('Setting up database...');
    
    // Read the SQL file
    const sqlFilePath = path.join(process.cwd(), 'src', 'sql', 'create_logging_table.sql');
    const sql = fs.readFileSync(sqlFilePath, 'utf8');
    
    // Execute the SQL
    const { data, error } = await supabase.rpc('exec_sql', { sql });
    
    if (error) {
      throw error;
    }
    
    console.log('Database setup completed successfully!');
    console.log('Created logs table and related objects.');
    
    return { success: true };
  } catch (error) {
    console.error('Error setting up database:', error);
    return { success: false, error };
  }
}

// Run the setup if this file is executed directly
if (require.main === module) {
  setupDatabase()
    .then((result) => {
      if (result.success) {
        console.log('Setup completed successfully.');
        process.exit(0);
      } else {
        console.error('Setup failed:', result.error);
        process.exit(1);
      }
    })
    .catch((err) => {
      console.error('Unhandled error during setup:', err);
      process.exit(1);
    });
}

export default setupDatabase;
