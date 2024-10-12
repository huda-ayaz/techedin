import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get database credentials from environment variables
SUPABASE_URL = os.environ.get('SUPABASE_URL')
SUPABASE_KEY = os.environ.get('SUPABASE_KEY')

# Check if credentials are available
if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Database credentials are missing. Please check your .env file.")

# Create Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def get_user_info():
    try:
        response = supabase.table('users').select('*').execute()
        print("Query executed successfully")
        return response.data
    except Exception as e:
        print(f"An error occurred: {e}")
        return None
    
def get_user_projects(user_id):
    """Fetch all projects posted by a specific user."""
    try:
        projects = supabase.table('projects').select('*').eq('project_owner_id', user_id).execute()
        print("User projects retrieved successfully")
        return projects.data
    except Exception as e:
        print(f"An error occurred: {e}")
        return None
    
def get_interested_projects(user_id):
    """Fetch all projects a user is interested in."""
    try:
        interested_projects = supabase.table('interestedprojects').select('project_id').eq('user_id', user_id).execute()
        if interested_projects.data:
            project_ids = [proj['project_id'] for proj in interested_projects.data]
            projects = supabase.table('projects').select('*').in_('id', project_ids).execute()
            print("Interested projects retrieved successfully")
            return projects.data
        print("No interested projects found for user.")
        return []
    except Exception as e:
        print(f"An error occurred: {e}")
        return None
    
if __name__ == "__main__":
    user_id = 2 # Set the user ID for fetching projects

    # Fetch user info
    users = get_user_info()
    if users:
        print(f"Retrieved {len(users)} user(s):")
        for user in users:
            print(f" - {user['first_name']} {user['last_name']} (ID: {user['id']})")
    else:
        print("No users retrieved or an error occurred.")

    # Fetch and print user projects
    user_projects = get_user_projects(user_id)
    if user_projects:
        print(f"\nUser Projects for ID {user_id}:")
        for project in user_projects:
            print(f" - {project['project_title']}: {project['project_description']} (Link: {project['project_link']})")
    else:
        print("No user projects retrieved or an error occurred.")

    # Fetch and print interested projects
    interested_projects = get_interested_projects(user_id)
    if interested_projects:
        print(f"\nInterested Projects for ID {user_id}:")
        for project in interested_projects:
            # Adjusting keys based on the actual structure of the project
            print(f" - Project Title: {project['project_title']}")
            print(f"   Description: {project['project_description']}")
            print(f"   Project Link: {project['project_link']}")
            print(f"   Time Posted: {project['time_posted']}")
            print(f"   Project Owner ID: {project['project_owner_id']}")
    else:
        print("No interested projects retrieved or an error occurred.")