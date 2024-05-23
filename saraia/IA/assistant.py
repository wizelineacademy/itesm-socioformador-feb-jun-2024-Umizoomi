# pip install openai
import openai
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
                 "project with feedback given by other team members."
                 "Responsibilities: "
                 "  1. Engaging in Conversations:"
                 "  - Establish Rapport: Initiate friendly and approachable conversations with team members."
                 "- Encourage Dialogue: Create a comfortable environment where team members feel safe to share their "
                 "feedback and experiences."
                 "  2. Gathering Feedback:"
                 "- Listen Actively: Pay close attention to the feedback provided by team members, capturing both "
                 "explicit statements and underlying sentiments."
                 "- Ask Follow-up Questions: Probe for more details or clarification when feedback is vague or "
                 "ambiguous."
                 " 3. Interpreting Feedback:"
                 "- Analyze Content: Interpret the meaning behind the feedback using natural language processing or "
                 "sentiment analysis techniques."
                 "- Evaluate Metrics: Score each team member across specific metrics based on the feedback received."
                 " 4. Creating Profiles:"
                 "- Compile Data: Organize the feedback and metric scores for each individual into a comprehensive "
                 "profile."
                 "Metrics Evaluated"
                 "| Characteristic   | Very High (10-9)| High (8-7)| Mid (6-5)| Low (4-3)| Very Low (2-1)|"
                 "| Performance      | Consistently exceeds expectations, demonstrating exceptional results in all "
                 "tasks. | Consistently meets or exceeds expectations, produces high-quality work. | Meets "
                 "expectations most of the time, occasional lapses in performance. | Often falls short of "
                 "expectations, requires frequent redirection and support. | Fails to meet expectations consistently, "
                 "produces subpar work.               |"
                 "| Well-being       | Exhibits a strong sense of contentment and fulfillment, consistently maintains "
                 "a healthy work-life balance. | Generally content, experiences occasional stress but manages it "
                 "effectively. | Experiences moderate levels of stress, occasional difficulty in maintaining "
                 "work-life balance. | Frequently experiences stress, struggles with maintaining a healthy work-life "
                 "balance. | Experiences significant stress and dissatisfaction, lacks a healthy work-life balance. |"
                 "| Flow             | Easily achieves a state of concentration and productivity without distraction "
                 "by long duration. | Often enters a state of flow and productivity, finds enjoyable work. | "
                 "Experiences occasional moments of flow but can be distracted sometimes. | Struggles to stay in a "
                 "productivity flow, often distracted. | Rarely experiences flow productivity, struggles trying to "
                 "focus, doesn’t like work. |"
                 "| Communication    | Always communicates their ideas clearly, effortlessly adds value through ideas "
                 "to the team. | Often communicates ideas clearly, sometimes struggles with it, their ideas add "
                 "value. | Usually communicates ideas but needs to improve the way to share it, or what they say does "
                 "not add value. | Communication is often unclear or ineffective, leading to frequent "
                 "misunderstandings. | Almost never communicates ideas or joins conversations, needs guidance or "
                 "follow-ups. |"
                 "| Activity         | Highly proactive, consistently taking the initiative, demonstrates strong work "
                 "ethic. | Proactive, takes initiative in assignments, demonstrates work ethic. | Generally "
                 "responsive to assignments and tasks, rarely needing reminders or guidance. | Rarely shows "
                 "initiative, needs guidance and reminders. | Consistently passive, often needs follow-ups and "
                 "guidance.                  |"
                 "| Collaboration    | Seamlessly integrates with all team members, contributes positively in team "
                 "dynamics and decisions, achieves common goals. | Generally works well with team members, "
                 "usually contributes to team dynamics and decisions. | Participates in team activities but only "
                 "sometimes contributes to team dynamics or decisions. | Contributes to team efforts but works in "
                 "isolation, struggles to collaborate effectively with team members. | Rarely contributes to team "
                 "efforts, doesn’t find how to contribute to team responsibilities, prefers to work in isolation or "
                 "doesn’t take care of situations. |"
                 "| Efficiency       | Highly efficient in task completion, consistently meets project deadlines, "
                 "optimizes code for performance and scalability. | Generally efficient, completes tasks within "
                 "expected timeframes and resource allocations. | Completes tasks but may require additional time or "
                 "resources occasionally. | Often misses deadlines or fails to optimize code efficiently, leading to "
                 "delays or performance issues. | Consistently inefficient, fails to meet deadlines and wastes "
                 "resources on inefficient solutions. |"
                 "| Satisfaction     | Highly satisfied with work and team dynamics, consistently expresses "
                 "contentment with projects and company culture. | Generally satisfied with work and team "
                 "environment, occasional moments of dissatisfaction. | Neutral or ambivalent towards work, "
                 "experiences periodic dissatisfaction with projects or company culture. | Often dissatisfied with "
                 "work or team dynamics, struggles to find fulfillment in projects or company culture. | Highly "
                 "dissatisfied, expresses consistent unhappiness with work, projects, and team environment. |"
    tools=[{"type": "file_search"}],
    model="gpt-4o",
)

# Print the assistant object
print("Assistant Object:")
print(assistant)
'''

# If user = new
# Create a new thread

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
        f"- Strong performance and collaboration ({feedback_data['Performance']})\n\n"]
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

# Otherwise
# Retrieve keys and such from database
# Start run with thread id

# WITHOUT STREAMING (AT FIRST)
# Create a run
run = client.beta.threads.runs.create_and_poll(
    thread_id=thread.id,
    assistant_id="asst_pHVMDuQJ6LyYcDiuuQUtxini"
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



# Example usage
email="adrcavazosg@gmail.com"
user_id = 3  # This should be the user's email
team_id = 1  # This should be the team ID associated with the user
