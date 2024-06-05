# pip install openai
import psycopg2
from openai import OpenAI
from config import api_key
import os
import time


# Establish client
client = OpenAI(api_key=api_key)


# Connect to PostgreSQL
def connect_to_db():
    try:
        connection = psycopg2.connect(
            host=os.getenv('POSTGRES_HOST'),
            database=os.getenv('POSTGRES_DATABASE'),
            user=os.getenv('POSTGRES_USER'),
            password=os.getenv('POSTGRES_PASSWORD'),
            port=os.getenv('POSTGRES_PORT')
        )
        #print("Connected to the database.")
        return connection
    except Exception as e:
        print(f"Error connecting to the database: {e}")
        return None


connection = connect_to_db()
cursor = connection.cursor()


# Function to get the user ID from the users table (corroborating from email)
def get_user_id(email):
    try:
        # Query to get the user ID from the users table
        query = "SELECT id_user FROM users WHERE email = %s;"
        cursor.execute(query, (email,))
        result = cursor.fetchone()

        return result
    except Exception as e:
        print(f"Error in get_user_id: {e}")
        return None


# Function to create a new thread using OpenAI's API
def create_new_thread():
    try:
        # Create a new thread using the API client
        thread = client.beta.threads.create()

        # Extract the thread ID from the thread object
        thread_id = thread.id
        return thread_id
    except Exception as e:
        print(f"Error creating new thread: {e}")
        return None


# Function to add a new feedback entry for a user
def add_new_feedback(user_id, team_id, thread_id):
    try:
        connection = connect_to_db()
        cursor = connection.cursor()

        # Insert the new feedback entry into the feedback table
        insert_query = """
        INSERT INTO feedback (id_user, id_team, Performance, Well-being, Flow, Communication, Proactivity, Efficiency, Satisfaction, thread_id)
        VALUES (%s, %s, 0, 0, 0, 0, 0, 0, 0, 0, %s);
        """
        print(f"Executing insert query: {insert_query} with values {user_id}, {team_id}, {thread_id}")
        cursor.execute(insert_query, (user_id, team_id, thread_id))

        connection.commit()
        cursor.close()
        connection.close()
        print("New feedback entry added.")
    except Exception as e:
        print(f"Error in add_new_feedback: {e}")


# Function to corroborate user ID with feedback table
def check_feedback_table(user_id, team_id):
    try:
        connection = connect_to_db()
        cursor = connection.cursor()

        # Query to check if the user exists in the feedback table
        query = "SELECT thread_id FROM feedback WHERE id_user = %s;"
        cursor.execute(query, (user_id,))
        result = cursor.fetchone()
        #print(f"check_feedback_table result: {result}")

        if result:
            # User already has feedback
            thread_id = result[0]
            #print(f"User already has feedback. Thread ID is: {thread_id}")
            return thread_id
        else:
            # User does not have feedback, create a new thread
            thread_id = create_new_thread()
            add_new_feedback(user_id, team_id, thread_id)
            #print(f"User is new to feedback. Created new thread ID: {thread_id}")

        cursor.close()
        connection.close()
        return thread_id

    except Exception as e:
        print(f"Error in check_feedback_table: {e}")
        return None


def thread_process(user_id, thread_id):
    message = str(input())
    try:
        message_thread = client.beta.threads.messages.create(
            thread_id=thread_id,
            role="user",
            content = message
            #content="1. Juan insulted the team in various occations, he once told me I didn't knew whta I was talking about- while I was talking about my tasks. And constanly showed late to meetings. 2. He only worked when asked, really didn't showed any interest, and sometimes did not met his deadlines. 3. None. 4. The other team members were also conflicted with him."
        )
        #print("Message thread created with ID: ", message_thread.id)

        run = client.beta.threads.runs.create_and_poll(
            thread_id=check_feedback_table(user_id, team_id),
            assistant_id=os.getenv('ASSISTANT_ID')
        )
        if run.status == 'completed':
            messages = client.beta.threads.messages.list(
                thread_id=thread_id
            )
            for message in reversed(messages.data):
                response = "Sara" + ':' + message.content[0].text.value
            print(response)
        else:
            print("Run status: ", run.status)

        return run
    except Exception as e:
        print(f"Error in thread_process: {e}")
        return None


# Function to handle user feedback
def handle_feedback(email):
    try:
        user = get_user_id(email)
        if user:
            user_id = user[0]
            thread_id = check_feedback_table(user_id, team_id)
            print(f"Thread ID to use: {thread_id}")
            print("type message")
            thread_process(user_id, thread_id)
        else:
            print("User does not exist in the users table.")
    except Exception as e:
        print(f"Error in handle_feedback: {e}")

class Sara:
    def __init__(self, team_id, email, user_id):
        self.team_id = team_id
        self.email = email
        self.user_id = user_id

    def handle_feedback(self):
        try:
            user = True
            if user:
                user_id = 3
                thread_id = check_feedback_table(user_id, team_id)
                print(f"Thread ID to use: {thread_id}")
                print("type message")
                thread_process(user_id, thread_id)
            else:
                print("User does not exist in the users table.")
        except Exception as e:
            print(f"Error in handle_feedback: {e}")

    def run(self):
        while True:
            self.handle_feedback()
            #time.sleep(1)


# Example usage
email = "Select email from users where id_user = 3" #cambiese segun necesidad de prueba, este ya cuenta con thread
user_id = 3  # This should be the user's email
team_id = "select id_team from userteamposition where id_user = 3"  # This should be the team ID associated with the user

chatbot = Sara(team_id, email, user_id)
chatbot.run()

cursor.close()
connection.close()

