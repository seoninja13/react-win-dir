# Setting Up the Supabase MCP Server

This guide provides step-by-step instructions for setting up the Supabase MCP server for the Water Damage CA project.

## Prerequisites

1. A Supabase account and project
2. Node.js installed on your machine
3. Access to the project repository

## Step 1: Set Up Supabase Database

1. Create a new Supabase project or use an existing one
2. Run the database schema script from `scripts/supabase-schema.sql`
3. Create the read-only query function from `scripts/create-read-only-function.sql`

## Step 2: Configure Environment Variables

1. Add the following variables to your `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_CONNECTION_STRING=postgresql://postgres:your_password@db.your-project-ref.supabase.co:6543/postgres?pgbouncer=true
```

Replace the placeholders with your actual Supabase credentials.

## Step 3: Install Dependencies

```bash
npm install dotenv @supabase/supabase-js zod @modelcontextprotocol/server-postgres
```

## Step 4: Update MCP Configuration

Run the update-mcp script to configure the MCP server:

```bash
node scripts/temp-update-mcp.js
```

This will create or update the `.mcp.json` file in the project root with the correct configuration.

## Step 5: Test the Integration

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Visit the test pages:
   - `/test/supabase` - Test basic Supabase operations
   - `/test/mcp` - Test the MCP server integration

## Step 6: Configure AI Tools

### Claude Desktop

1. Open Claude desktop and navigate to **Settings**
2. Under the **Developer** tab, tap **Edit Config** to open the configuration file
3. Make sure the configuration includes:

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "your_connection_string"]
    }
  }
}
```

### Windsurf

1. Open Windsurf and navigate to the Cascade assistant
2. Tap on the hammer (MCP) icon, then **Configure** to open the configuration file
3. Make sure the configuration includes:

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "your_connection_string"]
    }
  }
}
```

## Using the MCP Server

Once configured, you can use natural language to query your Supabase database through AI tools. For example:

- "Show me all cities in the database"
- "List the top 5 businesses with the highest ratings"
- "Find all emergency services"

The AI tool will use the MCP server to execute the appropriate SQL queries and display the results.

## Troubleshooting

### Connection Issues

If you encounter connection issues:

1. Verify that your database password is correct
2. Check that your connection string is formatted correctly
3. Ensure that your IP address is allowed in Supabase (Project Settings > Database > Connection Pooling)

### Permission Issues

If you encounter permission issues:

1. Check the Row Level Security (RLS) policies in Supabase
2. Verify that the anon key has the necessary permissions
3. Check that the tables exist in the database

### Query Execution Issues

If queries fail to execute:

1. Make sure the `run_read_only_query` function is created in your Supabase database
2. Verify that you're only trying to run SELECT queries (for security reasons)
3. Check the query syntax for errors
