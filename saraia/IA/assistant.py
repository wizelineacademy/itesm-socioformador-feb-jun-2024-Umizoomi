# pip install openai
import psycopg2
from openai import OpenAI
from config import api_key
import os


# Establish client
client = OpenAI(api_key=api_key)


# Connect to PostgresSQL
def connect_to_db():
    return psycopg2.connect(
        host=os.getenv('DB_HOST'),
        database=os.getenv('DB_NAME'),
        user=os.getenv('DB_USER'),
        password=os.getenv('DB_PASSWORD'),
        port=os.getenv('DB_PORT')
    )


# Function to get the user ID from the users table (corroborating from email)
def get_user_id(email):
    connection = connect_to_db()
    cursor = connection.cursor()

    # Query to get the user ID from the users table
    query = "SELECT id_user FROM users WHERE email = %s;"
    cursor.execute(query, (email,))
    result = cursor.fetchone()

    cursor.close()
    connection.close()

    return result


# Function to create a new thread using OpenAI's API
def create_new_thread():
    # Create a new thread using the API client
    thread = client.beta.threads.create()

    # Extract the thread ID from the thread object
    thread_id = thread.id
    return thread_id


# Function to add a new feedback entry for a user
def add_new_feedback(user_id, team_id, thread_id):
    connection = connect_to_db()
    cursor = connection.cursor()

    # Insert the new feedback entry into the feedback table
    insert_query = """
    INSERT INTO feedback (id_user, id_team, id_feedback, purpose, productivity, autonomy, support, mastery, creativity, challenge, performance)
    VALUES (%s, %s, %s, 0, 0, 0, 0, 0, 0, 0, 0);
    """
    cursor.execute(insert_query, (user_id, team_id, thread_id))

    connection.commit()
    cursor.close()
    connection.close()


# Function to corroborate user ID with feedback table
def check_feedback_table(user_id, team_id):
    connection = connect_to_db()
    cursor = connection.cursor()

    # Query to check if the user exists in the feedback table
    query = "SELECT id_feedback FROM feedback WHERE id_user = %s;"
    cursor.execute(query, (user_id,))
    result = cursor.fetchone()

    if result:
        # User already has feedback
        thread_id = result[0]
        print(f"User already has feedback. Thread ID is: {thread_id}")
        # Placeholder line for further actions
        # TBD
    else:
        # User does not have feedback, create a new thread
        thread_id = create_new_thread()
        add_new_feedback(user_id, team_id, thread_id)
        print(f"User is new to feedback. Created new thread ID: {thread_id}")

    cursor.close()
    connection.close()

    return thread_id


# Function to handle user feedback
def handle_feedback(email):
    user = get_user_id(email)

    if user:
        user_id = user[0]
        thread_id = check_feedback_table(user_id, team_id)
        # Continue the conversation using the thread ID
        print(f"Thread ID to use: {thread_id}")
    else:
        print("User does not exist in the users table.")


'''
COMMENTED BECAUSE NO LONGER NEEDED (ASSISTANT ID ALREADY DETERMINED)

'''

# If user = new
# Create a new thread


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
print(message_thread.id)


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
add_new_feedback(thread.id, "Jane Doe", feedback_data_example)

# Generate and print the feedback profile
profile = generate_profile(feedback_data_example)
print(profile)


# Otherwise
# Retrieve keys and such from database
# Start run with thread id

# WITHOUT STREAMING (AT FIRST)
# Create a run
run = client.beta.threads.runs.create_and_poll(
    thread_id=thread.id,
    assistant_id='asst_pHVMDuQJ6LyYcDiuuQUtxini'
)

# List messages added to the thread by the assistant
if run.status == 'completed':
    messages = client.beta.threads.messages.list(
        thread_id=thread.id
    )
    print("this is the message")
    for message in reversed(messages.data):
        print(message.role + ':' + message.content[0].text.value)
else:
    print("this is the run status")
    print(run.status)



# Example usage
email="adrcavazosg@gmail.com"
user_id = 3  # This should be the user's email
team_id = 1  # This should be the team ID associated with the user

