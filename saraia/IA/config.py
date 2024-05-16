from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Get the OpenAI API key from environment variables
GPTKey = os.getenv('OpenAiKey', '')

# Print the API key to verify (optional)
print(f"OpenAI API Key: {GPTKey}")