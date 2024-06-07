import os
import re
import time
import psycopg2
from openai import OpenAI
from config import api_key

# Establish client
client = OpenAI(api_key=api_key)

# Define a dictionary to store profiles
profiles = {}

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
        return connection
    except Exception as e:
        print(f"Error connecting to the database: {e}")
        return None

# Function to get the email from the user_id
def get_email_user_id(user_id):
    try:
        connection = connect_to_db()
        cursor = connection.cursor()
        query = "SELECT email FROM users WHERE id_user = %s;"
        cursor.execute(query, (user_id,))
        result = cursor.fetchone()
        cursor.close()
        connection.close()
        return result
    except Exception as e:
        print(f"Error in get_email_user_id: {e}")
        return None

# Function to create a new thread using OpenAI's API
def create_new_thread():
    try:
        thread = client.beta.threads.create()
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
        insert_query = """
        INSERT INTO feedback (id_user, id_team, performance, well_being, flow, communication, proactivity, collaboration, efficiency, satisfaction, thread_id)
        VALUES (%s, %s, 0, 0, 0, 0, 0, 0, 0, 0, %s);
        """
        cursor.execute(insert_query, (user_id, team_id, thread_id))
        connection.commit()
        cursor.close()
        connection.close()
        print("New feedback entry added.")
    except Exception as e:
        print(f"Error in add_new_feedback: {e}")

# Function to add a new AI message
def add_new_ai_message(response, user_id, team_id):
    try:
        connection = connect_to_db()
        cursor = connection.cursor()
        insert_query = """
        INSERT INTO messages (message, id_user, id_team) VALUES (%s, %s, %s);
        """
        cursor.execute(insert_query, (response, user_id, team_id))
        connection.commit()
        cursor.close()
        connection.close()
        print("New message added.")
    except Exception as e:
        print(f"Error in add_new_ai_message: {e}")

# Function to corroborate user ID with feedback table
def check_feedback_table(user_id, team_id):
    try:
        connection = connect_to_db()
        cursor = connection.cursor()
        query = "SELECT thread_id FROM feedback WHERE id_user = %s;"
        cursor.execute(query, (user_id,))
        result = cursor.fetchone()
        if result:
            thread_id = result[0]
        else:
            thread_id = create_new_thread()
            add_new_feedback(user_id, team_id, thread_id)
        cursor.close()
        connection.close()
        return thread_id
    except Exception as e:
        print(f"Error in check_feedback_table: {e}")
        return None

def thread_process(user_id, user_thread_id):
    message = input("Type message: ")
    try:
        print("Enter thread process")
        message_thread = client.beta.threads.messages.create(
            thread_id=user_thread_id,
            role="user",
            content=message
        )
        print("Message thread created with ID: ", message_thread.id)

        run = client.beta.threads.runs.create_and_poll(
            thread_id=user_thread_id,
            assistant_id=os.getenv('ASSISTANT_ID')
        )
        if run.status == 'completed':
            messages = client.beta.threads.messages.list(
                thread_id=user_thread_id
            )
            for message in reversed(messages.data):
                response = "Sara" + ':' + message.content[0].text.value
            print(response)
            add_new_ai_message(response, user_id, team_id)
            metrics = {}
            if "###" in response or 'Metrics' in response:
                pattern = re.compile(r"\*{1,2}(.*?)\*{1,2}.*?\((\d+)-(\d+)\)", re.DOTALL)
                matches = pattern.findall(response)
                for match in matches:
                    metric_name = match[0].strip().lower().replace(" ", "_")
                    low, high = int(match[1]), int(match[2])
                    average = (low + high) / 2
                    metrics[metric_name] = average

                for metric, value in metrics.items():
                    print(f"{metric}: {value}")

                add_feedback_to_profile(user_id, metrics)
        else:
            print("Run status: ", run.status)
        return run
    except Exception as e:
        print(f"Error in thread_process: {e}")
        return None

# Function to update profile in the database
def update_profile_in_db(user_id, profile):
    try:
        connection = connect_to_db()
        cursor = connection.cursor()
        update_query = """
        UPDATE feedback
        SET performance = %s, well_being = %s, flow = %s, communication = %s, activity = %s,
            collaboration = %s, efficiency = %s, satisfaction = %s
        WHERE id_user = %s;
        """
        cursor.execute(update_query, (
            int(sum(profile['performance']) / len(profile['performance'])) if profile['performance'] else 0,
            int(sum(profile['well_being']) / len(profile['well_being'])) if profile['well_being'] else 0,
            int(sum(profile['flow']) / len(profile['flow'])) if profile['flow'] else 0,
            int(sum(profile['communication']) / len(profile['communication'])) if profile['communication'] else 0,
            int(sum(profile['activity']) / len(profile['activity'])) if profile['activity'] else 0,
            int(sum(profile['collaboration']) / len(profile['collaboration'])) if profile['collaboration'] else 0,
            int(sum(profile['efficiency']) / len(profile['efficiency'])) if profile['efficiency'] else 0,
            int(sum(profile['satisfaction']) / len(profile['satisfaction'])) if profile['satisfaction'] else 0,
            user_id
        ))
        connection.commit()
        cursor.close()
        connection.close()
        print("Profile updated in database.")
    except Exception as e:
        print(f"Error updating profile in database: {e}")

# Function to create or get a profile
def get_or_create_profile(user_id):
    if user_id not in profiles:
        profiles[user_id] = {
            "performance": [],
            "well_being": [],
            "flow": [],
            "communication": [],
            "activity": [],
            "collaboration": [],
            "efficiency": [],
            "satisfaction": []
        }
    return profiles[user_id]

# Function to update profile
def update_profile(profile, feedback_data):
    for key in profile:
        if key in feedback_data:
            profile[key].append(feedback_data[key])

# Adding feedback to profile
def add_feedback_to_profile(user_id, feedback_data):
    profile = get_or_create_profile(user_id)
    update_profile(profile, feedback_data)
    update_profile_in_db(user_id, profile)

class Sara:
    def __init__(self, team_id, user_id):
        self.team_id = team_id
        self.user_id = user_id

    def handle_feedback(self):
        try:
            profile = get_or_create_profile(self.user_id)
            thread_id = check_feedback_table(self.user_id, self.team_id)
            print(f"Thread ID to use: {thread_id}")
            thread_process(self.user_id, thread_id)
        except Exception as e:
            print(f"Error in handle_feedback: {e}")

    def run(self):
        while True:
            self.handle_feedback()
            # time.sleep(1)

# Example usage
email = "Select email from users where id_user = 3" # This user already has a thread
user_id = 1  # This should be the user's ID
team_id = 21 # This should be the team ID associated with the user

print("Team id: ", team_id)
print("User id: ", user_id)
chatbot = Sara(team_id, user_id)

# Output the extracted metrics
chatbot.run()
