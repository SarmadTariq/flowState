const AUTH_URL = "http://localhost:5000/auth";

export async function login(email: string, password: string) {
  
    const response = await fetch(`${AUTH_URL}/login`,
    {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email, password})
    }
  );

  return response.json();
}

export async function register(email: string, password: string) {

  const response = await fetch(`${AUTH_URL}/register`,
    {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email,password})
    }
  );

  return response.json();
}