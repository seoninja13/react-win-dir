-- Create logs table for storing application logs
CREATE TABLE IF NOT EXISTS logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  level TEXT NOT NULL CHECK (level IN ('error', 'warning', 'info', 'debug')),
  message TEXT NOT NULL,
  source TEXT NOT NULL,
  details JSONB,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index on level for filtering
CREATE INDEX IF NOT EXISTS logs_level_idx ON logs (level);

-- Create index on source for filtering
CREATE INDEX IF NOT EXISTS logs_source_idx ON logs (source);

-- Create index on timestamp for sorting and filtering
CREATE INDEX IF NOT EXISTS logs_timestamp_idx ON logs (timestamp);

-- Create a function to clean up old logs (older than 30 days)
CREATE OR REPLACE FUNCTION cleanup_old_logs()
RETURNS TRIGGER AS $$
BEGIN
  DELETE FROM logs
  WHERE timestamp < NOW() - INTERVAL '30 days';
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to clean up old logs daily
DROP TRIGGER IF EXISTS trigger_cleanup_old_logs ON logs;
CREATE TRIGGER trigger_cleanup_old_logs
AFTER INSERT ON logs
EXECUTE PROCEDURE cleanup_old_logs();

-- Add RLS policies
ALTER TABLE logs ENABLE ROW LEVEL SECURITY;

-- Policy for authenticated users to insert logs
CREATE POLICY insert_logs_policy ON logs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy for authenticated users to select logs
CREATE POLICY select_logs_policy ON logs
  FOR SELECT
  TO authenticated
  USING (true);

-- Comment on table and columns
COMMENT ON TABLE logs IS 'Application logs for tracking errors, warnings, and information';
COMMENT ON COLUMN logs.id IS 'Unique identifier for the log entry';
COMMENT ON COLUMN logs.level IS 'Log level (error, warning, info, debug)';
COMMENT ON COLUMN logs.message IS 'Log message';
COMMENT ON COLUMN logs.source IS 'Source of the log (e.g., function name, file name)';
COMMENT ON COLUMN logs.details IS 'Additional log details in JSON format';
COMMENT ON COLUMN logs.timestamp IS 'Timestamp when the log was created';
COMMENT ON COLUMN logs.created_at IS 'Timestamp when the log entry was inserted into the database';
