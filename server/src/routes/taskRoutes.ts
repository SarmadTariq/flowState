import { Router } from "express";
import * as taskController from "../controllers/taskController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", authenticate, taskController.getTasks);

router.post("/", authenticate, taskController.createTask);

router.post("/generate", authenticate, taskController.generateDescription);

router.delete("/:id", authenticate, taskController.deleteTask);

router.patch("/:id", authenticate, taskController.updateTaskStatus);

export default router;