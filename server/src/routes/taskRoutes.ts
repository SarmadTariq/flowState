import { Router } from "express";
import * as taskController from "../controllers/taskController.js";

const router = Router();

router.get("/", taskController.getTasks);

router.post("/", taskController.createTask);

router.post("/generate", taskController.generateDescription);

router.delete("/:id",taskController.deleteTask);

router.patch("/:id", taskController.updateTaskStatus);

export default router;