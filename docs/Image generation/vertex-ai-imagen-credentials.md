# Vertex AI Imagen API Credentials

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Image Generation](./index.md) > Vertex AI Imagen Credentials

## Table of Contents

1. [Overview](#overview)
2. [Service Account Key Location](#service-account-key-location)
3. [Environment Variables](#environment-variables)
4. [Authentication Methods](#authentication-methods)
5. [Security Considerations](#security-considerations)
6. [Troubleshooting](#troubleshooting)

## Overview

This document provides information about the credentials used for authenticating with the Google Cloud Vertex AI Imagen API. The Windows Doors CA website uses Vertex AI Imagen for generating high-quality images based on textual prompts.

## Service Account Key Location

The Vertex AI Imagen service account key is stored in the following location:

```
c:\Users\IvoD\repos\react-win-dir\vertex-ai-imagen-service-account-key.json
```

This file contains the credentials for the Google Cloud service account that has permissions to access the Vertex AI Imagen API. The service account is associated with the `mold-removal-lead-gen` Google Cloud project.

> **IMPORTANT**: This file is included in the `.gitignore` file to prevent it from being published to GitHub. Never commit this file to version control.

## Environment Variables

To use the service account key with the Vertex AI Imagen implementation, set the following environment variable:

```powershell
# For PowerShell
$env:GOOGLE_APPLICATION_CREDENTIALS="c:\Users\IvoD\repos\react-win-dir\vertex-ai-imagen-service-account-key.json"

# For Command Prompt
set GOOGLE_APPLICATION_CREDENTIALS=c:\Users\IvoD\repos\react-win-dir\vertex-ai-imagen-service-account-key.json
```

This environment variable tells the Google Cloud SDK where to find the service account key file for authentication.

## Authentication Methods

The Windows Doors CA website implements two authentication methods for the Vertex AI Imagen API:

1. **Service Account Authentication** (Recommended for production)
   - Uses the `vertex-ai-imagen-service-account-key.json` file
   - Requires the `GOOGLE_APPLICATION_CREDENTIALS` environment variable
   - Implemented in `scripts/genai-vertexai-imagen3-imagegen-serviceaccount.mjs`

2. **Application Default Credentials (ADC)**
   - Uses the credentials from `gcloud auth application-default login`
   - Requires the `GOOGLE_CLOUD_PROJECT` environment variable
   - Implemented in `scripts/genai-vertexai-imagen3-imagegen-adc.mjs`

The unified implementation (`scripts/genai-vertexai-imagen3-unified.mjs`) supports both authentication methods and will automatically try both if configured.

## Security Considerations

The service account key file contains sensitive information that grants access to Google Cloud resources. Follow these security best practices:

1. **Never commit the key file to version control**
2. **Restrict file permissions** to only authorized users
3. **Use the principle of least privilege** when assigning permissions to the service account
4. **Rotate the key periodically** for enhanced security
5. **Monitor usage** to detect unauthorized access

## Troubleshooting

If you encounter authentication issues with the Vertex AI Imagen API, check the following:

1. **Verify the service account key file exists** at the specified location
2. **Check the environment variable** is correctly set
3. **Ensure the service account has the necessary permissions** in Google Cloud IAM
4. **Verify the project ID** matches the one in the service account key file
5. **Check for API quota limits** (50 RPM for Imagen 3.0 in us-west1)

For more detailed troubleshooting, refer to the [Vertex AI Imagen Implementation Status](./vertex-ai-imagen-implementation-status.md) document.

## Last Updated

May 16, 2025
