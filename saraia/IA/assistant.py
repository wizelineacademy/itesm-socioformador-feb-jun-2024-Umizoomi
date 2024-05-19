# pip install openai
import psycopg2
from openai import OpenAI
from config import api_key
import os

# Connect to PostgreSQL
conn = psycopg2.connect(
    host=os.getenv('DB_HOST'),
    database=os.getenv('DB_NAME'),
    user=os.getenv('DB_USER'),
    password=os.getenv('DB_PASSWORD'),
    port=os.getenv('DB_PORT')
)

# Create a cursor object
cur = conn.cursor()


# Function to test database connection
def test_db_connection():
    try:
        # Create a test table
        cur.execute("""
            CREATE TABLE IF NOT EXISTS test_table (
                id SERIAL PRIMARY KEY,
                name VARCHAR(50)
            )
        """)
        conn.commit()
        print("Table created successfully.")

        # Insert data into the test table
        cur.execute("INSERT INTO test_table (name) VALUES (%s) RETURNING id", ('Test Name',))
        conn.commit()
        print("Data inserted successfully.")

        # Retrieve data from the test table
        cur.execute("SELECT * FROM test_table")
        rows = cur.fetchall()
        for row in rows:
            print(f"Retrieved row: {row}")

    except Exception as e:
        print(f"An error occurred: {e}")


# Test the database connection
test_db_connection()

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

# Print the assistant object
print("Assistant Object:")
print(assistant)

# Create thread
thread = client.beta.threads.create()

# Add a message to the thread
message_thread = client.beta.threads.messages.create(
    thread_id=thread.id,
    role="user",
    content="Hey! I am Luis, a frontend engineer on project GENV, my experience in this project "
            "was honestly pretty good, there were many challenges but ultimately "
            "i enjoyed it."

)
print("message thread: ")
print(message_thread)

'''
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
'''

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
    print("this is the message")
    print(messages)
else:
    print("this is the run status")
    print(run.status)

# Close the cursor and connection
cur.close()
conn.close()
