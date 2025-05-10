import { supabase } from './supabase';

// Example function to fetch data from a table
export async function fetchData(tableName: string) {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*');
    
    if (error) {
      throw error;
    }
    
    return { data, error: null };
  } catch (error) {
    console.error(`Error fetching data from ${tableName}:`, error);
    return { data: null, error };
  }
}

// Example function to insert data into a table
export async function insertData(tableName: string, data: any) {
  try {
    const { data: result, error } = await supabase
      .from(tableName)
      .insert(data)
      .select();
    
    if (error) {
      throw error;
    }
    
    return { data: result, error: null };
  } catch (error) {
    console.error(`Error inserting data into ${tableName}:`, error);
    return { data: null, error };
  }
}

// Example function to update data in a table
export async function updateData(tableName: string, id: string, data: any) {
  try {
    const { data: result, error } = await supabase
      .from(tableName)
      .update(data)
      .eq('id', id)
      .select();
    
    if (error) {
      throw error;
    }
    
    return { data: result, error: null };
  } catch (error) {
    console.error(`Error updating data in ${tableName}:`, error);
    return { data: null, error };
  }
}

// Example function to delete data from a table
export async function deleteData(tableName: string, id: string) {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', id);
    
    if (error) {
      throw error;
    }
    
    return { data, error: null };
  } catch (error) {
    console.error(`Error deleting data from ${tableName}:`, error);
    return { data: null, error };
  }
}
