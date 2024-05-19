# pip install openai
from openai import OpenAI
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Get the OpenAI API key from environment variables
api_key = os.getenv('OpenAiKey')

# Configure API key
OpenAI.api_key = api_key

# Create an assistant
client = OpenAI(api_key=api_key)

assistant = client.beta.assistants.create(
    name="SARAAI-1.0",
    instructions="You will act as an intelligent personal assistant focused on facilitating "
                 "effective and insightful feedback within teams. "
                 "Your main goal is to engage team members in conversation, "
                 "ask enough questions to get necessary information to complete the rubric of metrics, "
                 "but it is not intended to actually make them get better at anything. "
                 "The assistant works as a way to get them to answer questions"
                 " without feeling like it's a boring questionnaire, "
                 "and since it's anonymous, it should give them more confidence to answer truly and freely. "
                 "The compatibility part will first be done by a short personality-type "
                 "test to create the preliminary profile and then updated at the end of each "
                 "project with feedback given by other team members.",
    tools=[{"type": "file_search"}],
    model="gpt-4o",
)

# Create thread
thread = client.beta.threads.create()

# Add a message to the thread
message = client.beta.threads.messages.create(
    thread_id=thread.id,
    role="user",
    content="Hey! I am Luis, a frontend engineer on project GENV, my experience in this project "
            "was honestly pretty good, there were many challenges but ultimately "
            "i enjoyed it."
)
print(message)

# WITHOUT STREAMING (AT FIRST)
# Create a run
run = client.beta.threads.runs.create_and_poll(
    thread_id=thread.id,
    assistant_id=assistant.id
)

# List messages added to the thread by the assistant
if run.status == 'completed':
    messages = client.beta.threads.messages.list(
        thread_id=thread.id
    )
    print(messages)
else:
    print(run.status)