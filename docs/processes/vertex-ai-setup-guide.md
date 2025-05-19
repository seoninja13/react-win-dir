# Process: Setting up Vertex AI Image Generation

**Last Updated**: May 18, 2025

This guide details the steps required to configure and run the Vertex AI image generation scripts within this project.

## 1. Google Cloud Project Configuration

* **Target Project ID**: `windows-doors-website-dir-v2`
* **Service Account Email**: `windows-doors-v2@windows-doors-website-dir-v2.iam.gserviceaccount.com`

### Steps

1. **Select Project**: In Google Cloud Console, ensure you are working within the `windows-doors-website-dir-v2` project.
2. **Enable Vertex AI API**:
   * Navigate to "APIs & Services" > "Enabled APIs & services".
   * Verify that "Vertex AI API" is listed. If not, enable it.
3. **Configure Service Account Permissions (IAM)**:
   * Navigate to "IAM & Admin" > "IAM".
   * Find the service account: `windows-doors-v2@windows-doors-website-dir-v2.iam.gserviceaccount.com`.
   * Ensure it has at least the **`Vertex AI User`** role (`roles/aiplatform.user`). For broader access during initial setup, `Vertex AI Administrator` (`roles/aiplatform.admin`) can be used.
   * If the role is missing, click the pencil icon (Edit principal) next to the service account, add the role, and save.

## 2. Local Environment Setup

### a. Service Account Key File

* **File Name**: `vertex-ai-imagen-service-account-key.json`
* **Location**: Project root (`c:\Users\IvoD\repos\react-win-dir\vertex-ai-imagen-service-account-key.json`)
* **Content**: This file must contain the JSON key downloaded from Google Cloud Console for the service account `windows-doors-v2@windows-doors-website-dir-v2.iam.gserviceaccount.com`.
  * **Important**: Ensure the `private_key` field within the JSON is correctly formatted with literal `\n` characters for newlines, not escaped `\\n`. Example snippet:

    ```json
    {
      // ... other fields
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANB...example...\n-----END PRIVATE KEY-----\n",
      // ... other fields
    }
    ```

* **Security**: This file contains sensitive credentials and **must** be listed in `.gitignore`.

### b. Environment Variables

* **File Name**: `.env.local`
* **Location**: Project root (`c:\Users\IvoD\repos\react-win-dir\.env.local`)
* **Content**:

  ```env
  # Google Vertex AI Configuration
  GOOGLE_CLOUD_PROJECT=windows-doors-website-dir-v2
  GOOGLE_CLOUD_LOCATION=us-west1 # Or your desired region
  GOOGLE_APPLICATION_CREDENTIALS=c:\Users\IvoD\repos\react-win-dir\vertex-ai-imagen-service-account-key.json

  # Other variables (e.g., SUPABASE, GEMINI_API_KEY) should remain as they are.
  ```

  * **Crucial**: `GOOGLE_APPLICATION_CREDENTIALS` must be an **absolute path** to the service account key file.

## 3. Build Process (ESM with esbuild)

The TypeScript source files (e.g., `Relume-root/src/lib/vertex-ai/test-image-generation.ts`) need to be compiled to JavaScript (ESM format for Node.js).

* **Build Command** (run from project root `c:\Users\IvoD\repos\react-win-dir`):

  ```bash
  npx esbuild Relume-root/src/lib/vertex-ai/test-image-generation.ts --bundle --outfile=dist/test-image-generation.mjs --platform=node --format=esm --external:dotenv --external:google-auth-library --external:@google-cloud/vertexai --color=true
  ```

* **Explanation of Key Flags**:
  * `--bundle`: Bundles dependencies.
  * `--platform=node`: Targets the Node.js environment.
  * `--format=esm`: Outputs ES Module format.
  * `--external:dotenv --external:google-auth-library --external:@google-cloud/vertexai`: Marks these packages as external. This is critical for Google Cloud SDKs which may have issues with esbuild's bundling of dynamic `require` or `import` statements if not marked external. They will be resolved from `node_modules` at runtime.

## 4. Running the Script

* **Run Command** (run from project root `c:\Users\IvoD\repos\react-win-dir` after a successful build):

  ```bash
  node --no-warnings dist/test-image-generation.mjs
  ```

## Troubleshooting Common Errors

* **`VertexAIImageServiceError: [VertexAI.GoogleAuthError]` or similar authentication errors**:
  * Verify `GOOGLE_APPLICATION_CREDENTIALS` path in `.env.local` is correct and absolute.
  * Ensure the `vertex-ai-imagen-service-account-key.json` content is valid and correctly formatted (especially `private_key`).
  * Check that the service account specified in the key file matches the one with IAM permissions in the correct project.
* **`PERMISSION_DENIED` errors**:
  * Confirm the service account has the `Vertex AI User` (or more permissive like `Vertex AI Administrator`) role in the `windows-doors-website-dir-v2` project's IAM settings.
  * Ensure the Vertex AI API is enabled for the project.
* **Build Errors or Runtime `require` / `import` issues**:
  * Ensure `google-auth-library` and `@google-cloud/vertexai` (and `dotenv`) are listed as `--external` in the `esbuild` command.
  * Make sure these packages are installed in `node_modules` (`npm install` or `yarn install`).

This setup was validated on May 18, 2025.
