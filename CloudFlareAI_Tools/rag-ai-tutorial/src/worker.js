/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
// Load environment variables from the .env file using dotenv

export default {
	async fetch(request, env) {
	  const url = new URL(request.url);
	  const userId = url.searchParams.get('user_id');
  
	  if (!userId) {
		return new Response(JSON.stringify({ error: 'User ID is required' }), { status: 400 });
	  }
  
	  try {
		// Step 1: Fetch user profile from Flask API hosted on Railway
		const flaskResponse = await fetch(`https://techedin-production.up.railway.app/user/${userId}`);
		if (!flaskResponse.ok) {
		  throw new Error(`Failed to fetch user data from Flask API. Status Code: ${flaskResponse.status}`);
		}
  
		const userData = await flaskResponse.json();
		const { inputted_interests, college } = userData;

  
		if (!inputted_interests || !college) {
		  throw new Error('Missing required fields (interests or college) in user data');
		}
  
		// Step 2: Construct input for LLaMA API
		const prompt = `
		You are an AI assistant that responds strictly with JSON data. Do not provide any additional text, explanations, or notes.
		
		Given the following user data:
		- Interests: ${inputted_interests}
		- College: ${college}
		
		Provide a list of relevant project IDs from the available projects. Make sure that projects are ordered by how well they match the interests, and prioritize projects from the same college if applicable.
		
		Respond only in the following JSON format:
		
		{
		  "result": {
			"recommendations": [
			  { "projectId": "10345", "projectTitle": "Project Title", "priority": "High" },
			  { "projectId": "9581", "projectTitle": "Another Project Title", "priority": "Medium" }
			]
		  }
		}
		`;
		
  
		// Step 3: Call Cloudflare's AI API using Meta's LLaMA
		const llamaApiUrl = `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT}/ai/run/@cf/meta/llama-3.1-8b-instruct`;
		const apiToken = env.CLOUDFLARE_API_KEY;
  
		const llamaResponse = await fetch(llamaApiUrl, {
		  method: 'POST',
		  headers: {
			'Authorization': `Bearer ${apiToken}`,
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({ prompt })
		});
  
		if (!llamaResponse.ok) {
		  throw new Error(`Failed to get response from LLaMA API. Status Code: ${llamaResponse.status}`);
		}
  
		const llamaData = await llamaResponse.json();
  
		// Step 4: Validate Response Format
		let recommendedProjectIds = [];
		if (llamaData.result && Array.isArray(llamaData.result.recommendations)) {
		  recommendedProjectIds = llamaData.result.recommendations.map(rec => rec.projectId);
		} else {
		  throw new Error('Unexpected response format from LLaMA API');
		}
  
		// Step 5: Return recommended project IDs as JSON for the frontend to access via Express API
		return new Response(JSON.stringify({ projectIds: recommendedProjectIds }), { status: 200 });
  
	  } catch (error) {
		console.log("Error occurred:", error.message);
		return new Response(JSON.stringify({ error: error.message }), { status: 500 });
	  }
	}
  };
  