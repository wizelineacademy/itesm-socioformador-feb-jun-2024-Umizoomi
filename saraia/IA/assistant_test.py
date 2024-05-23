# pip install openai
import openai
import psycopg2
from openai import OpenAI
from config import api_key
import os


# Connect to PostgresSQL
def connect_to_db():
    return psycopg2.connect(
        host=os.getenv('DB_HOST'),
        database=os.getenv('DB_NAME'),
        user=os.getenv('DB_USER'),
        password=os.getenv('DB_PASSWORD'),
        port=os.getenv('DB_PORT')
    )


# Function to get the user ID from the users table
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
    thread = openai.Thread.create()

    # Extract the thread ID from the thread object
    thread_id = thread['id']
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


# Function to check if a user is in the feedback table and create a thread if not
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


# Example usage
email="adrcavazosg@gmail.com"
user_id = 3  # This should be the user's email
team_id = 1  # This should be the team ID associated with the user

handle_feedback(email)
# check_feedback_table(user_id, team_id)
