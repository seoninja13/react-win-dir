"""
Vertex AI Image Generation - Python Implementation

This script demonstrates how to use the Vertex AI Python SDK for image generation.
Based on: https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/imagen-api
"""

import os
import base64
from pathlib import Path
from dotenv import load_dotenv
from google.cloud import aiplatform
from vertexai.preview.generative_models import GenerativeModel, Image

# Load environment variables from .env.local file
script_dir = Path(__file__).parent
env_path = script_dir.parent.parent / '.env.local'
load_dotenv(env_path)

# Constants
PROJECT_ID = os.getenv('GOOGLE_CLOUD_PROJECT')
LOCATION = os.getenv('GOOGLE_CLOUD_LOCATION', 'us-west1')
API_KEY = os.getenv('GEMINI_API_KEY')
MODEL_VERSION = 'imagen-3.0-generate-002'
OUTPUT_DIR = script_dir.parent.parent / 'Docs' / 'Image generation' / 'test-output'

# Ensure output directory exists
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

def initialize_vertex_ai():
    """Initialize Vertex AI with the project and location."""
    print(f"Initializing Vertex AI with Project ID: {PROJECT_ID}, Location: {LOCATION}")
    
    # Set API key as environment variable if available
    if API_KEY:
        os.environ['GOOGLE_API_KEY'] = API_KEY
        print(f"Using API Key: {API_KEY[:10]}...")
    
    # Initialize Vertex AI
    aiplatform.init(project=PROJECT_ID, location=LOCATION)

def generate_image_with_python(prompt, options=None):
    """
    Generate an image using Vertex AI Python SDK
    
    Args:
        prompt (str): The text prompt for image generation
        options (dict, optional): Additional options
    
    Returns:
        list: List of generated images with their data
    """
    if options is None:
        options = {}
    
    # Set default options
    number_of_images = options.get('number_of_images', 1)
    aspect_ratio = options.get('aspect_ratio', '1:1')
    
    print(f"Generating image with Python SDK...")
    print(f"Prompt: \"{prompt}\"")
    print(f"Number of images: {number_of_images}")
    print(f"Aspect ratio: {aspect_ratio}")
    
    try:
        # Initialize the generative model
        model = GenerativeModel(MODEL_VERSION)
        
        # Generate images
        response = model.generate_images(
            prompt=prompt,
            number_of_images=number_of_images,
            aspect_ratio=aspect_ratio
        )
        
        print("Received response from Vertex AI")
        
        # Process the response
        images = []
        for i, image in enumerate(response.images):
            # Convert image to base64
            image_bytes = image.bytes
            base64_data = base64.b64encode(image_bytes).decode('utf-8')
            
            # Create image data
            image_data = {
                'imageUrl': f"data:image/png;base64,{base64_data}",
                'enhancedPrompt': response.prompt_feedback.enhanced_prompt if hasattr(response, 'prompt_feedback') else None
            }
            
            images.append(image_data)
        
        return images
    
    except Exception as e:
        print(f"Error generating image: {str(e)}")
        raise

def save_image_to_file(image_url, output_path):
    """
    Save base64 image to file
    
    Args:
        image_url (str): Base64 image data URL
        output_path (str): Path to save the image
    """
    print(f"Saving image to: {output_path}")
    
    try:
        # Extract base64 data from data URL
        base64_data = image_url.split(',')[1]
        if not base64_data:
            raise ValueError('Invalid image data URL')
        
        # Convert base64 to bytes
        image_bytes = base64.b64decode(base64_data)
        
        # Save to file
        with open(output_path, 'wb') as f:
            f.write(image_bytes)
        
        print('Image saved successfully!')
    
    except Exception as e:
        print(f"Error saving image: {str(e)}")
        raise

def test_python_api():
    """Test the Vertex AI Python SDK for image generation."""
    print("Testing Vertex AI Python SDK for image generation...")
    
    try:
        # Initialize Vertex AI
        initialize_vertex_ai()
        
        # Create a test prompt
        test_prompt = 'A beautiful double-hung window with white frame against a blue sky, photorealistic'
        
        # Generate image
        images = generate_image_with_python(test_prompt, {
            'number_of_images': 1,
            'aspect_ratio': '4:3'
        })
        
        if images and len(images) > 0:
            print(f"Generated {len(images)} images successfully!")
            
            # Save the first image
            output_path = OUTPUT_DIR / 'python-api-test.png'
            save_image_to_file(images[0]['imageUrl'], output_path)
            
            # Save enhanced prompt if available
            if images[0]['enhancedPrompt']:
                print(f"Enhanced prompt: {images[0]['enhancedPrompt']}")
                with open(OUTPUT_DIR / 'python-enhanced-prompt.txt', 'w') as f:
                    f.write(images[0]['enhancedPrompt'])
            
            return True
        else:
            print("No images were returned")
            return False
    
    except Exception as e:
        print(f"Test failed: {str(e)}")
        return False

if __name__ == "__main__":
    success = test_python_api()
    if success:
        print("Python API test completed successfully!")
    else:
        print("Python API test failed.")
        exit(1)
