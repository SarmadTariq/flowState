import { pool } from "../db/connection.js";

export async function getTasks() {
  const result = await pool.query(
    "SELECT * FROM tasks"
  );

  return result.rows;
}

export async function createTask(title: string) {
  const result = await pool.query(
    `
    INSERT INTO tasks (id, title, status)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [
      Date.now(),
      title,
      "Backlog",
    ]
  );

  return result.rows[0];
}

export async function deleteTask(id: number) {
  await pool.query(
    "DELETE FROM tasks WHERE id = $1",
    [id]
  );
}

export async function updateTaskStatus(
  id: number,
  status: string
) {
  const result = await pool.query(
    `
    UPDATE tasks
    SET status = $1
    WHERE id = $2
    RETURNING *
    `,
    [status, id]
  );

  return result.rows[0];
}