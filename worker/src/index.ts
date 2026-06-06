export interface Env {
  CLOUDFLARE_GATEWAY_TOKEN: string;
  AI_BYOK_ALIAS: string;
  AI_MODEL: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
const url = new URL(request.url);

    if (request.method === "POST" && url.pathname === "/generate"){
		
		const body = await request.json() as {
			title: string;
		};

		const prompt = `
		You are a project management assistant.

		Generate a concise software development task description.

		Task Title:
		${body.title}

		Return only the description.
		`;

		const aiResponse = await fetch(`https://gateway.ai.cloudflare.com/v1/da58a9fb0522194891ce0dd564bda5eb/gemini-gateway/compat/chat/completions`,
		{
			method: "POST",
			headers: {
			"Content-Type": "application/json",
			"cf-aig-byok-alias": env.AI_BYOK_ALIAS,
			Authorization: `Bearer ${env.CLOUDFLARE_GATEWAY_TOKEN}`
			},
			body: JSON.stringify({
					"model": "google-ai-studio/gemini-2.5-flash",
					"messages": [
						{
						"role": "user",
						"content": prompt
						}
					]
					}),
		});

		const data = await aiResponse.json() as any;
		
		const description = data.choices[0].message.content;
		
		return Response.json({
			description
		});
    }


    return new Response("Not Found", {
      status: 404,
    });
  },
};