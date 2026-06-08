import { pool } from "../db/connection.js";

export async function getTasks(userId: number) {
  const result = await pool.query(
    `SELECT * FROM tasks
    WHERE user_id = $1;`
    , [userId]
  );

  return result.rows;
}

export async function createTask(title: string, userId: number, description: string | null = null) {
  const result = await pool.query(
    `INSERT INTO tasks (id, title, status, user_id, description)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`,
    [
      Date.now(),
      title,
      "Backlog",
      userId,
      description
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
    `UPDATE tasks
    SET status = $1
    WHERE id = $2
    RETURNING *`,
    [status, id]
  );

  return result.rows[0];
}