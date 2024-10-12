import os
from flask import Flask, request, jsonify
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()  # take environment variables from .env.

SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_KEY')

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
app = Flask(__name__)

@app.route("/",methods=["GET","POST"])
def hello():
    return jsonify("Hello World")

@app.route('/users', methods=['GET', 'POST'])
def users():
    if request.method == 'GET':
        response = supabase.table('users').select('*').execute()
        return jsonify(response.data)
    elif request.method == 'POST':
        data = request.json
        response = supabase.table('users').insert(data).execute()
        return jsonify(response.data)

@app.route('/projects', methods=['GET', 'POST'])
def projects():
    if request.method == 'GET':
        response = supabase.table('projects').select('*').execute()
        return jsonify(response.data)
    elif request.method == 'POST':
        data = request.json
        response = supabase.table('projects').insert(data).execute()
        return jsonify(response.data)

@app.route('/interested_projects', methods=['GET', 'POST'])
def interested_projects():
    if request.method == 'GET':
        response = supabase.table('interestedprojects').select('*').execute()
        return jsonify(response.data)
    elif request.method == 'POST':
        data = request.json
        response = supabase.table('interestedprojects').insert(data).execute()
        return jsonify(response.data)

@app.route('/accepted_projects', methods=['GET', 'POST'])
def accepted_projects():
    if request.method == 'GET':
        response = supabase.table('acceptedprojects').select('*').execute()
        return jsonify(response.data)
    elif request.method == 'POST':
        data = request.json
        response = supabase.table('acceptedprojects').insert(data).execute()
        return jsonify(response.data)

@app.route('/rejected_projects', methods=['GET', 'POST'])
def rejected_projects():
    if request.method == 'GET':
        response = supabase.table('rejectedprojects').select('*').execute()
        return jsonify(response.data)
    elif request.method == 'POST':
        data = request.json
        response = supabase.table('rejectedprojects').insert(data).execute()
        return jsonify(response.data)

@app.route('/notifications', methods=['GET', 'POST'])
def notifications():
    if request.method == 'GET':
        response = supabase.table('notifications').select('*').execute()
        return jsonify(response.data)
    elif request.method == 'POST':
        data = request.json
        response = supabase.table('notifications').insert(data).execute()
        return jsonify(response.data)

@app.route('/user/<user_id>', methods=['GET'])
def get_user(user_id):
    response = supabase.table('users').select('*').eq('id', user_id).execute()
    if response.data:
        return jsonify(response.data[0])
    else:
        return jsonify({"error": "User not found"}), 404


@app.route('/user', methods=['GET'])
def get_user_by_id():
    user_id = request.args.get('id')
    if not user_id:
        return jsonify({"error": "User ID is required"}), 400
    
    try:
        user_id = int(user_id)
    except ValueError:
        return jsonify({"error": "Invalid user ID"}), 400

    response = supabase.table('users').select('*').eq('id', user_id).execute()
    if response.data:
        return jsonify(response.data[0])
    else:
        return jsonify({"error": "User not found"}), 404

@app.route('/user_profile/<user_id>', methods=['GET'])
def get_user_profile(user_id):
    # Fetch user data
    user = supabase.table('users').select('*').eq('id', user_id).execute()
    
    if not user.data:
        return jsonify({"error": "User not found"}), 404
    
    user_data = user.data[0]
    
    # Fetch user's projects
    projects = supabase.table('projects').select('*').eq('project_owner_id', user_id).execute()
    
    # Fetch user's interested projects
    interested_projects = supabase.table('interestedprojects')\
        .select('projects(*)')\
        .eq('user_id', user_id)\
        .execute()
    
    # Fetch user's accepted projects
    accepted_projects = supabase.table('acceptedprojects')\
        .select('projects(*)')\
        .eq('user_id', user_id)\
        .execute()
    
    # Fetch user's rejected projects
    rejected_projects = supabase.table('rejectedprojects')\
        .select('projects(*)')\
        .eq('user_id', user_id)\
        .execute()
    
    # Fetch user's notifications
    notifications = supabase.table('notifications')\
        .select('*')\
        .eq('user_id', user_id)\
        .order('time_stamp', desc=True)\
        .execute()
    
    # Combine all data
    profile_data = {
        "user": user_data,
        "owned_projects": projects.data,
        "interested_projects": [item['projects'] for item in interested_projects.data],
        "accepted_projects": [item['projects'] for item in accepted_projects.data],
        "rejected_projects": [item['projects'] for item in rejected_projects.data],
        "notifications": notifications.data
    }
    
    return jsonify(profile_data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
