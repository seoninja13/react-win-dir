-- Create an extensive logging table
CREATE TABLE IF NOT EXISTS logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    level VARCHAR(10) NOT NULL, -- 'debug', 'info', 'warn', 'error', 'fatal'
    message TEXT NOT NULL,
    details JSONB, -- For structured data
    source VARCHAR(255), -- Component/module that generated the log
    user_id UUID, -- If applicable
    session_id VARCHAR(255), -- Browser session ID
    request_id VARCHAR(255), -- For tracking requests across services
    url TEXT, -- URL that was being accessed
    method VARCHAR(10), -- HTTP method
    status_code INTEGER, -- HTTP status code
    user_agent TEXT, -- Browser/client info
    ip_address VARCHAR(45), -- IPv4 or IPv6
    duration INTEGER, -- Time taken in milliseconds
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    tags TEXT[] -- For categorizing logs
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_logs_level ON logs(level);
CREATE INDEX IF NOT EXISTS idx_logs_created_at ON logs(created_at);
CREATE INDEX IF NOT EXISTS idx_logs_source ON logs(source);
CREATE INDEX IF NOT EXISTS idx_logs_user_id ON logs(user_id);
CREATE INDEX IF NOT EXISTS idx_logs_tags ON logs USING GIN(tags);

-- Create a function to automatically clean up old logs (older than 30 days)
CREATE OR REPLACE FUNCTION cleanup_old_logs()
RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM logs
    WHERE created_at < NOW() - INTERVAL '30 days';
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to run the cleanup function daily
DROP TRIGGER IF EXISTS trigger_cleanup_old_logs ON logs;
CREATE TRIGGER trigger_cleanup_old_logs
AFTER INSERT ON logs
EXECUTE PROCEDURE cleanup_old_logs();

-- Create a view for common log queries
CREATE OR REPLACE VIEW recent_errors AS
SELECT id, message, details, source, url, created_at
FROM logs
WHERE level IN ('error', 'fatal')
AND created_at > NOW() - INTERVAL '24 hours'
ORDER BY created_at DESC;

-- Add RLS (Row Level Security) policies
ALTER TABLE logs ENABLE ROW LEVEL SECURITY;

-- Only authenticated users with specific roles can view logs
CREATE POLICY logs_view_policy ON logs
FOR SELECT
USING (auth.role() IN ('admin', 'developer', 'support'));

-- Only the system can insert logs
CREATE POLICY logs_insert_policy ON logs
FOR INSERT
WITH CHECK (auth.role() IN ('admin', 'service_role'));
