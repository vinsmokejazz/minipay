import type { Request, Response } from "express";
import express from "express";
import { authMiddleware } from "../middleware/middleware.js";
import { zodMiddleware } from "../utils/zodExpress.js";
import { updateUserSchema, bulkUsersSchema } from "../utils/validators.js";
import { getProfile, putUpdateUser, getUsersBulk } from "../controllers/userController.js";

export const userRouter = express.Router();

// Get current user profile (protected route)
userRouter.get("/me", authMiddleware, getProfile);

// Update User
userRouter.put("/update", authMiddleware, zodMiddleware(updateUserSchema), putUpdateUser);

// Bulk users
userRouter.get("/bulk", authMiddleware, zodMiddleware(bulkUsersSchema), getUsersBulk);
