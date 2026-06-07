import { Request, Response } from "express";
import * as authService from "../services/authService.js";

export async function register(req: Request, res: Response) {

  const user = await authService.register(req.body.email, req.body.password);

  res.status(201).json(user);
}

export async function login(req: Request, res: Response) {

  const token = await authService.login(req.body.email, req.body.password);

  res.json({token});
}