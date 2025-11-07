import type { Request, Response } from "express";
import express from "express";
import { authMiddleware } from "../middleware/middleware.js";
import { User } from "../models/user.model.js";

export const userRouter = express.Router();

// Get current user profile (protected route)
userRouter.get("/me", authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
      const userId = req.userId;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
        return;
      }

      const user = await User.findById(userId).select("-password");

      if (!user) {
        res.status(404).json({
          success: false,
          message: "User not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        user: {
          id: String(user._id),
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);
