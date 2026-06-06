export async function generateDescription(title: string): Promise<string> {

  const response = await fetch(
    process.env.AI_WORKER_URL!,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
      }),
    }
  );

  const data = await response.json();

  return data.description;
}