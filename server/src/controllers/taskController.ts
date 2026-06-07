import * as taskService from "../services/taskServices.js";
import * as aiService from "../services/aiService.js";
import { Request, Response } from "express";

export async function getTasks(req: Request, res: Response) {
  const tasks = await taskService.getTasks(req.user!.userId);

  res.json(tasks);
}

export async function createTask(req: Request, res: Response) {
  const task = await taskService.createTask(req.body.title, req.user!.userId, req.body.description);

  res.status(201).json(task);
}

export async function deleteTask(req: Request, res: Response) {
  const taskId = Number(req.params.id);

  await taskService.deleteTask(taskId);

  res.json({message: "Task deleted"});
}

export async function updateTaskStatus(req: Request, res: Response) {
  const taskId = Number(req.params.id);

  const task = await taskService.updateTaskStatus(taskId, req.body.status);

  res.json(task);
}

export async function generateDescription(req: Request, res: Response) {

  console.log("Received title for description generation:", req.body.title);
  const description = await aiService.generateDescription(req.body.title);
  console.log("Generated description:", description);

  res.json({ description });
}