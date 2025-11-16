import type { Request, Response } from "express";
import { getUserById, updateUser, listUsers } from "../services/user.service.js";

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const user = await getUserById(userId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(200).json({ user });
  } catch (err: any) {
    const status = err.status || 500;
    res.status(status).json({ error: err.message });
  }
};

export const putUpdateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const updated = await updateUser(userId, req.body);
    if (!updated) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(200).json({ message: "User updated", user: updated });
  } catch (err: any) {
    const status = err.status || 500;
    res.status(status).json({ error: err.message });
  }
};

export const getUsersBulk = async (req: Request, res: Response) => {
  try {
    const filter = (req.query.filter as string) || "";
    const users = await listUsers(filter);
    res.status(200).json({ users });
  } catch (err: any) {
    const status = err.status || 500;
    res.status(status).json({ error: err.message });
  }
};