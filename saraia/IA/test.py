import os
import re
import json
import boto3
import psycopg2
import openai

# Get OpenAI API key from environment variables
openai.api_key = os.environ['OPENAI_API_KEY']

def lambda_handler(event, context):
    try:
        user_id = event['body']['user_id']
        team_id = event['body']['team_id']
        message = event['body']['message']

        if not user_id or not team_id or not message:
            return {
                'statusCode': 400,
                'body': json.dumps({"error": "Missing user_id, team_id, or message"})
            }

        chatbot = Sara(int(team_id), user_id)
        add_new_user_message(message, user_id, team_id)
        response = chatbot.run(message)

        return {
            'statusCode': 200,
            'body': json.dumps({"response": response})
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({"error": str(e)})
        }

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

def create_new_thread():
    try:
        thread = openai.Threads.create()
        thread_id = thread.id
        return thread_id
    except Exception as e:
        print(f"Error creating new thread: {e}")
        return None

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

def thread_process(user_id, user_thread_id, message, team_id):
    try:
        print("Enter thread process")
        message_thread = openai.Threads.create_message(
            thread_id=user_thread_id,
            role="user",
            content=message
        )
        print("Message thread created with ID: ", message_thread.id)

        run = openai.Threads.run(
            thread_id=user_thread_id,
            assistant_id=os.getenv('ASSISTANT_ID')
        )

        if run.status == 'completed':
            messages = openai.Threads.list_messages(
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
                print("Self-evaluation feedback added")

            return response
        else:
            print("Run status: ", run.status)
            return "AI response is not ready yet"
    except Exception as e:
        print(f"Error in thread_process: {e}")
        return

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

        performance = profile.get("performance", 0)
        well_being = profile.get("well_being", 0)
        flow = profile.get("flow", 0)
        communication = profile.get("communication", 0)
        activity = profile.get("activity", 0)
        collaboration = profile.get("collaboration", 0)
        efficiency = profile.get("efficiency", 0)
        satisfaction = profile.get("satisfaction", 0)

        cursor.execute(update_query, (
            performance, well_being, flow, communication, activity, collaboration, efficiency, satisfaction, user_id
        ))

        connection.commit()
        cursor.close()
        connection.close()
        print("Profile updated in database.")
    except Exception as e:
        print(f"Error updating profile in database: {e}")

def get_or_create_profile(user_id):
    profile = {
        "performance": 0,
        "well_being": 0,
        "flow": 0,
        "communication": 0,
        "activity": 0,
        "collaboration": 0,
        "efficiency": 0,
        "satisfaction": 0
    }
    try:
        connection = connect_to_db()
        cursor = connection.cursor()
        query = "SELECT * FROM feedback WHERE id_user = %s;"
        cursor.execute(query, (user_id,))
        result = cursor.fetchone()
        if result:
            profile = {
                "performance": result[2],
                "well_being": result[3],
                "flow": result[4],
                "communication": result[5],
                "activity": result[6],
                "collaboration": result[7],
                "efficiency": result[8],
                "satisfaction": result[9]
            }
        cursor.close()
        connection.close()
    except Exception as e:
        print(f"Error in get_or_create_profile: {e}")

    return profile
