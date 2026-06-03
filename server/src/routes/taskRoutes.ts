import { Router } from "express";
import { pool } from "../db/connection.js";

const router = Router();

router.post("/", async (req, res) => {
  const result = await pool.query(
    `
    INSERT INTO tasks (id, title, status)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [
      Date.now(),
      req.body.title,
      "Backlog",
    ]
  );

  res.status(201).json(result.rows[0]);
});

router.get("/", async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM tasks"
  );

  res.json(result.rows);
});

router.delete("/:id", async (req, res) => {
  await pool.query(
    "DELETE FROM tasks WHERE id = $1",
    [req.params.id]
  );

  res.json({
    message: "Task deleted",
  });
});

router.patch("/:id", async (req, res) => {
  const result = await pool.query(
    `
    UPDATE tasks
    SET status = $1
    WHERE id = $2
    RETURNING *
    `,
    [
      req.body.status,
      req.params.id,
    ]
  );

  res.json(result.rows[0]);
});

export default router;