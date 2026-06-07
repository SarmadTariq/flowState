const API_URL = "http://localhost:5000/tasks";

export async function getTasks() {
  const response = await fetch(API_URL
    ,{
      headers: getAuthHeaders(),
    }
  );
  return response.json();
}

function getAuthHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${
      localStorage.getItem("token")
    }`,
  };
}

export async function addTask(title: string) {

    const response = await fetch(
        API_URL,
        {
        method: "POST",
        headers: {
            ...getAuthHeaders(),
        },
        body: JSON.stringify({ title }),
    });

    return response.json();
}

export async function deleteTask(id: number) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
}

export async function updateStatus(id: number, status: string) {

  const response = await fetch(
    `http://localhost:5000/tasks/${id}`,
    {
      method: "PATCH",
      headers: {
        ...getAuthHeaders()
      },
      body: JSON.stringify({
        status: status,
      }),
    }
  );

  return response.json();
}

export async function generateDescription(title: string) {
  console.log("Generating description for title:", title);
  const response = await fetch(
    "http://localhost:5000/tasks/generate",
    {
      method: "POST",
      headers: {
        ...getAuthHeaders()
      },
      body: JSON.stringify({
        title,
      }),
    }
  );

  return response.json();
}