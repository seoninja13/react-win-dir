#!/bin/bash
# Vertex AI Image Generation - Curl Implementation
# 
# This script demonstrates how to use curl to interact with the Vertex AI REST API for image generation.
# Based on: https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/imagen-api

# Load environment variables from .env.local file
if [ -f "../../.env.local" ]; then
  export $(grep -v '^#' ../../.env.local | xargs)
  echo "Loaded environment variables from .env.local"
else
  echo "Error: .env.local file not found"
  exit 1
fi

# Constants
PROJECT_ID="${GOOGLE_CLOUD_PROJECT}"
LOCATION="${GOOGLE_CLOUD_LOCATION:-us-west1}"
API_KEY="${GEMINI_API_KEY}"
MODEL_VERSION="imagen-3.0-generate-002"
OUTPUT_DIR="../../Docs/Image generation/test-output"

# Ensure output directory exists
mkdir -p "$OUTPUT_DIR"

# Display configuration
echo "Vertex AI Configuration:"
echo "Project ID: $PROJECT_ID"
echo "Location: $LOCATION"
echo "Model Version: $MODEL_VERSION"
echo "API Key: ${API_KEY:0:10}..."

# Test prompt
TEST_PROMPT="A beautiful double-hung window with white frame against a blue sky, photorealistic"
echo "Test prompt: \"$TEST_PROMPT\""

# Create JSON payload file
PAYLOAD_FILE="$OUTPUT_DIR/curl-payload.json"
cat > "$PAYLOAD_FILE" << EOF
{
  "instances": [
    {
      "prompt": "$TEST_PROMPT"
    }
  ],
  "parameters": {
    "sampleCount": 1,
    "aspectRatio": "4:3",
    "addWatermark": false,
    "enhancePrompt": true,
    "outputOptions": {
      "mimeType": "image/png"
    }
  }
}
EOF

echo "Created payload file: $PAYLOAD_FILE"
echo "Payload content:"
cat "$PAYLOAD_FILE"

# API URL
API_URL="https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${MODEL_VERSION}:predict"
echo "API URL: $API_URL"

# Make the API request
echo "Sending request to Vertex AI..."
RESPONSE_FILE="$OUTPUT_DIR/curl-response.json"

curl -X POST \
  -H "Authorization: Bearer ${API_KEY}" \
  -H "Content-Type: application/json" \
  "$API_URL" \
  -d @"$PAYLOAD_FILE" \
  -o "$RESPONSE_FILE"

# Check if the request was successful
if [ $? -eq 0 ]; then
  echo "Request successful! Response saved to: $RESPONSE_FILE"
  
  # Extract the base64 image data
  echo "Extracting image data..."
  BASE64_DATA=$(cat "$RESPONSE_FILE" | grep -o '"bytesBase64": "[^"]*"' | sed 's/"bytesBase64": "\(.*\)"/\1/')
  
  if [ -n "$BASE64_DATA" ]; then
    # Save the image
    IMAGE_FILE="$OUTPUT_DIR/curl-test-image.png"
    echo "$BASE64_DATA" | base64 --decode > "$IMAGE_FILE"
    echo "Image saved to: $IMAGE_FILE"
    
    # Extract enhanced prompt if available
    ENHANCED_PROMPT=$(cat "$RESPONSE_FILE" | grep -o '"enhancedPrompt": "[^"]*"' | sed 's/"enhancedPrompt": "\(.*\)"/\1/')
    
    if [ -n "$ENHANCED_PROMPT" ]; then
      PROMPT_FILE="$OUTPUT_DIR/curl-enhanced-prompt.txt"
      echo "$ENHANCED_PROMPT" > "$PROMPT_FILE"
      echo "Enhanced prompt saved to: $PROMPT_FILE"
    fi
    
    echo "Curl API test completed successfully!"
  else
    echo "Error: No image data found in the response"
    exit 1
  fi
else
  echo "Error: Request failed"
  exit 1
fi
