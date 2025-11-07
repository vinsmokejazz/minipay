import type { Request, Response } from "express";
import type { Request, Response } from "express";
import express from "express";
import { authMiddleware } from "../middleware/middleware.js";
import { User } from "../models/user.model.js";
import { success, z } from "zod";

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

// Update User
userRouter.put("/update", authMiddleware, async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.userId;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
        return;
      }

      const updateBody = z.object({
        password: z.string().min(6).optional(),
        firstName: z.string().min(1).max(50).optional(),
        lastName: z.string().min(1).max(50).optional(),
      });

      const validationResult = updateBody.safeParse(req.body);
      if (!validationResult.success) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: validationResult.error.issues.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        });
        return;
      }

      // Update user
      await User.findByIdAndUpdate(userId, validationResult.data);

      // Fetch updated user
      const updatedUser = await User.findById(userId).select("-password");

      if (!updatedUser) {
        res.status(404).json({
          success: false,
          message: "User not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "User updated successfully",
        user: {
          id: String(updatedUser._id),
          username: updatedUser.username,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          updatedAt: updatedUser.updatedAt,
        },
      });
    } catch (error) {
      console.error("Update user error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

userRouter.get("/bulk", authMiddleware, async (req: Request, res: Response): Promise<void> => {
    try {
      // const querySchema = z.object({
      //   filter: z.string().max(50).optional(),
      // });

      const filter = req.query.filter || "";

      const users = await User.find({
        $or: [
          {
            firstName: {
              $regex: filter,
              $options: "i",
            },
          },
          {
            lastName: {
              $regex: filter,
              $options: "i",
            },
          },
        ],
      });

      res.status(200).json({
        success: true,
        users: users.map((user) => ({
          id: String(user._id),
          firstName: user.firstName,
          lastName: user.lastName,
        })),
      });
    } catch (error) {
      console.error("Bulk fetch users error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);
