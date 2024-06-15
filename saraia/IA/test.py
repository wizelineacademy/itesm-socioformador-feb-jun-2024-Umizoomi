import os
import re
import psycopg2
from flask import Flask, request, jsonify, render_template_string
from flask_cors import CORS
from openai import OpenAI
from config import api_key

# Establish client
client = OpenAI(api_key=api_key)

# Define a dictionary to store profiles
profiles = {}

# Initialize Flask app
app = Flask(__name__)
CORS(app)

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
        INSERT INTO feedback (id_user, id_team, "Performance", well_being, flow, communication, activity, collaboration, efficiency, satisfaction, thread_id)
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

def add_new_user_message(response, user_id, team_id):
    try:
        connection = connect_to_db()
        cursor = connection.cursor()
        insert_query = """
        INSERT INTO user_messages (message, id_user, id_team) VALUES (%s, %s, %s);
        """
        cursor.execute(insert_query, (response, user_id, team_id))
        connection.commit()
        cursor.close()
        connection.close()
        print("New user message added.")
    except Exception as e:
        print(f"Error in add_new_user_message: {e}")

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



def thread_process(user_id, user_thread_id, message, team_id):
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
            response = ""
            for message in reversed(messages.data):
                response = message.content[0].text.value
            print(response)
            add_new_ai_message(response, user_id, team_id)
            metrics = {}

            def extract_feedback(feedback_type):
                pattern = re.compile(r"\*\*(.*?)\*\*.*?\((\d+)\)", re.DOTALL)
                matches = pattern.findall(response)
                for match in matches:
                    metric_name = match[0].strip().lower().replace(" ", "_")
                    score = int(match[1])
                    metrics[metric_name] = [score]
                    

            if "Self-Evaluation" in response:
                pattern = re.compile(r"\*{1,2}(.*?)\*{1,2}.*?\((\d+)-(\d+)\)", re.DOTALL)
                matches = pattern.findall(response)
                for match in matches:
                    metric_name = match[0].strip().lower().replace(" ", "_")
                    low, high = int(match[1]), int(match[2])
                    average = (low + high) / 2
                    metrics[metric_name] = average

                for metric, value in metrics.items():
                    print(f"{metric}: {value}")

                update_profile_in_db(user_id, metrics)
                # add_feedback_to_profile(1, metrics)
                print("Adrian feedback added")

            if "Adrian's feedback" in response:
                # Define the regular expression pattern to match the scores in parentheses
                pattern = r'\(\d+\)'

                # Use re.findall to find all matches of the pattern
                scores = re.findall(pattern, response)

                # Extract only the numbers from the matched strings
                scores = [int(score[1:-1]) for score in scores]

                print(scores)
                print("Performance: ",scores[0])
                print("Well_being: ",scores[1])
                print("Flow: ",scores[2])
                print("Communication: ",scores[3])
                print("Activity: ",scores[4])
                print("Collaboration: ",scores[5])
                print("Efficiency: ",scores[6])
                print("Satisfaction: ",scores[7])
                update_profile_in_db('e70826d5-eceb-4eb7-b48e-1fbca900128a', metrics)
                print("Adrian feedback added")
            

            if "Carlos's feedback" in response:
                # Define the regular expression pattern to match the scores in parentheses
                pattern = r'\(\d+\)'

                # Use re.findall to find all matches of the pattern
                scores = re.findall(pattern, response)

                # Extract only the numbers from the matched strings
                scores = [int(score[1:-1]) for score in scores]

                print(scores)
                print("Performance: ",scores[0])
                print("Well_being: ",scores[1])
                print("Flow: ",scores[2])
                print("Communication: ",scores[3])
                print("Activity: ",scores[4])
                print("Collaboration: ",scores[5])
                print("Efficiency: ",scores[6])
                print("Satisfaction: ",scores[7])

                update_profile_in_db(3, metrics)
                print("Carlos feedback added")



            if "Oscar's Feedback" in response:
                print("Oscar feedback")
                # Define the regular expression pattern to match the scores in parentheses
                pattern = r'\(\d+\)'

                # Use re.findall to find all matches of the pattern
                scores = re.findall(pattern, response)

                # Extract only the numbers from the matched strings
                scores = [int(score[1:-1]) for score in scores]

                print(scores)
                print("Performance: ",scores[0])
                print("Well_being: ",scores[1])
                print("Flow: ",scores[2])
                print("Communication: ",scores[3])
                print("Activity: ",scores[4])
                print("Collaboration: ",scores[5])
                print("Efficiency: ",scores[6])
                print("Satisfaction: ",scores[7])
                update_profile_in_db('6d3e0c51-3e22-421a-a9b7-b1e81d6c53d7', scores)
                print("Oscar feedback added")


            if "Luis' feedback" in response:
                # Define the regular expression pattern to match the scores in parentheses
                pattern = r'\(\d+\)'

                # Use re.findall to find all matches of the pattern
                scores = re.findall(pattern, response)

                # Extract only the numbers from the matched strings
                scores = [int(score[1:-1]) for score in scores]

                print(scores)
                print("Performance: ",scores[0])
                print("Well_being: ",scores[1])
                print("Flow: ",scores[2])
                print("Communication: ",scores[3])
                print("Activity: ",scores[4])
                print("Collaboration: ",scores[5])
                print("Efficiency: ",scores[6])
                print("Satisfaction: ",scores[7])
                update_profile_in_db(5, metrics)
                print("Luis feedback added")


            if "Kraken's feedback" in response:
                # Define the regular expression pattern to match the scores in parentheses
                pattern = r'\(\d+\)'

                # Use re.findall to find all matches of the pattern
                scores = re.findall(pattern, response)

                # Extract only the numbers from the matched strings
                scores = [int(score[1:-1]) for score in scores]

                print(scores)
                print("Performance: ",scores[0])
                print("Well_being: ",scores[1])
                print("Flow: ",scores[2])
                print("Communication: ",scores[3])
                print("Activity: ",scores[4])
                print("Collaboration: ",scores[5])
                print("Efficiency: ",scores[6])
                print("Satisfaction: ",scores[7])
                update_profile_in_db('8aeb8834-04d4-4095-a0bf-56041e4093f7', metrics)
                print("Kraken feedback added")

            return response
        else:
            print("Run status: ", run.status)
            return "AI response is not ready yet"
    except Exception as e:
        print(f"Error in thread_process: {e}")
        return
        # return f"Error: {e}"

# Function to update profile in the database
def update_profile_in_db(user_id, profile):
    try:
        connection = connect_to_db()
        cursor = connection.cursor()
        update_query = """
        UPDATE feedback
        SET "Performance" = %s, well_being = %s, flow = %s, communication = %s, activity = %s,
            collaboration = %s, efficiency = %s, satisfaction = %s
        WHERE id_user = %s;
        """
        
        performance = profile[0]
        well_being = profile[1]
        flow = profile[2]
        communication = profile[3]
        activity = profile[4]
        collaboration = profile[5]
        efficiency = profile[6]
        satisfaction = profile[7]

        print(cursor.mogrify(update_query, (
            performance, well_being, flow, communication, activity, collaboration, efficiency, satisfaction, user_id
        )))
        
        cursor.execute(update_query, (
            performance, well_being, flow, communication, activity, collaboration, efficiency, satisfaction, user_id
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
            "Performance": [],
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

    def handle_feedback(self, message):
        try:
            profile = get_or_create_profile(self.user_id)
            thread_id = check_feedback_table(self.user_id, self.team_id)
            print(f"Thread ID to use: {thread_id}")
            response = thread_process(self.user_id, thread_id, message, self.team_id)
            return response
        except Exception as e:
            print(f"Error in handle_feedback: {e}")
            return f"Error: {e}"

    def run(self, message):
        return self.handle_feedback(message)

@app.route('/get_ai_response', methods=['POST'])
def get_ai_response():
    
    if request.method == 'POST':
        user_id = request.form.get('user_id')
        team_id = request.form.get('team_id')
        message = request.form.get('message')

    if not user_id or not team_id or not message:
        return jsonify({"error": "Missing user_id, team_id, or message"})

    chatbot = Sara(int(team_id), (user_id))
    add_new_user_message(message, user_id, team_id)
    response = chatbot.run(message)
    return jsonify({"response": response})


if __name__ == '__main__':
    app.run(debug=True)