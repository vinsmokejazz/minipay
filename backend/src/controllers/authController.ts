import type { Request, Response } from "express";
import { signUp, signIn } from "../services/auth.service.js";

export const postSignUp = async (req: Request, res: Response) => {
  try {
    const result = await signUp(req.body);
    res.status(201).json(result);
  } catch (err: any) {
    const status = err.status || 500;
    res.status(status).json({ error: err.message });
  }
};

export const postSignIn = async (req: Request, res: Response) => {
  try {
    const result = await signIn(req.body);
    res.status(200).json(result);
  } catch (err: any) {
    const status = err.status || 500;
    res.status(status).json({ error: err.message });
  }
};