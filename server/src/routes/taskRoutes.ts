import { Router } from "express";

const router = Router();

let tasks = [
    {
      id: 1,
      title: "Design login flow",
      status: "In Progress",
    },
    {
      id: 2,
      title: "Set up backend API",
      status: "Done",
    },
  ];

router.post("/", (req, res) => {
  const newTask = {
    id: Date.now(),
    title: req.body.title,
    status: "Backlog",
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

router.get("/", (req, res) => {
  res.json(tasks);
});

router.delete("/:id", (req, res) => {
  const taskId = Number(req.params.id);

  tasks = tasks.filter((task) => task.id !== taskId);

  res.json({
    message: "Task deleted",
  });
});

router.patch("/:id", (req, res) => {
  const taskId = Number(req.params.id);

  tasks = tasks.map((task) => task.id === taskId ? { ...task, status: req.body.status } : task);

  const updatedTask = tasks.find((task) => task.id === taskId);

  res.json(updatedTask);
});

export default router;