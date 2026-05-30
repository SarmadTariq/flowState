const API_URL = "http://localhost:5000/tasks";

export async function getTasks() {
  const response = await fetch(API_URL);
  return response.json();
}

export async function addTask(title: string) {

    const response = await fetch(
        API_URL,
        {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
    });

    return response.json();
}

export async function deleteTask(id: number) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}

export async function updateStatus(id: number, status: string) {

    const response = await fetch(
      `http://localhost:5000/tasks/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: status,
        }),
      }
    );

    return response.json();

  }