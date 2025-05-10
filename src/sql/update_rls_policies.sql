-- Drop existing policies
DROP POLICY IF EXISTS logs_view_policy ON logs;
DROP POLICY IF EXISTS logs_insert_policy ON logs;

-- Make sure RLS is enabled
ALTER TABLE logs ENABLE ROW LEVEL SECURITY;

-- Create a more permissive policy for viewing logs
-- Allow anyone to view logs (you can restrict this later if needed)
CREATE POLICY logs_view_policy ON logs
FOR SELECT
USING (true);

-- Create a more permissive policy for inserting logs
-- Allow anyone to insert logs
CREATE POLICY logs_insert_policy ON logs
FOR INSERT
WITH CHECK (true);

-- Verify the policies
SELECT tablename, policyname, permissive, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename = 'logs';
