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
    model="gpt-4-1106-preview",
)


# Print the assistant object
print("Assistant Object:")
print(assistant)


# Create thread
thread = client.beta.threads.create()

# Add a message to the thread
message = client.beta.threads.messages.create(
    thread_id=thread.id,
    role="user",
    content="I need to solve the equation `3x + 11 = 14`. Can you help me?"
)

# Function to add feedback data to the thread
def add_feedback(thread_id, team_member_name, feedback_data):
    feedback_message = (
        f"Team Member: {team_member_name}\n"
        f"Performance: {feedback_data['Performance']}\n"
        f"Well-being: {feedback_data['Well-being']}\n"
        f"Flow: {feedback_data['Flow']}\n"
        f"Communication: {feedback_data['Communication']}\n"
        f"Activity: {feedback_data['Activity']}\n"
        f"Collaboration: {feedback_data['Collaboration']}\n"
        f"Efficiency: {feedback_data['Efficiency']}\n"
        f"Satisfaction: {feedback_data['Satisfaction']}\n"
    )
    client.beta.threads.messages.create(
        thread_id=thread_id,
        role="user",
        content=feedback_message
    )

# Function to interpret feedback and generate a profile
def generate_profile(feedback_data):
    profile = (
        f"Feedback Profile for Team Member:\n\n"
        f"- Performance: {feedback_data['Performance']}\n"
        f"- Well-being: {feedback_data['Well-being']}\n"
        f"- Flow: {feedback_data['Flow']}\n"
        f"- Communication: {feedback_data['Communication']}\n"
        f"- Activity: {feedback_data['Activity']}\n"
        f"- Collaboration: {feedback_data['Collaboration']}\n"
        f"- Efficiency: {feedback_data['Efficiency']}\n"
        f"- Satisfaction: {feedback_data['Satisfaction']}\n\n"
        f"Strengths:\n"
        f"- Excellent communication skills ({feedback_data['Communication']})\n"
        f"- Strong performance and collaboration ({feedback_data['Performance']})\n\n"
        f"Areas for Improvement:\n"
        f"- Needs to work on efficiency and maintaining flow ({feedback_data['Efficiency']})\n"
    )
    return profile

# Example feedback data for a team member
feedback_data_example = {
    "Performance": "nil",
    "Well-being": "nil",
    "Flow": "nil",
    "Communication": "nil",
    "Activity": "nil",
    "Collaboration": "nil",
    "Efficiency": "nil",
    "Satisfaction": "nil"
}

# Add example feedback data to the thread
add_feedback(thread.id, "Jane Doe", feedback_data_example)

# Generate and print the feedback profile
profile = generate_profile(feedback_data_example)
print(profile)

# WITHOUT STREAMING (AT FIRST)
# Create a run
run = client.beta.threads.runs.create_and_poll(
    thread_id=thread.id,
    assistant_id=assistant.id,
    instructions="Please address the user as Jane Doe. The user has a premium account."
)

# List messages added to the thread by the assistant
if run.status == 'completed':
    messages = client.beta.threads.messages.list(
        thread_id=thread.id
    )
    print(messages)
else:
    print(run.status)