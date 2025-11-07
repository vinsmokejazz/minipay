import type { Request, Response } from "express";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { User } from "../models/user.model.js";

export const signInRouter = express.Router();

// Zod validation schema
const signInSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

signInRouter.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate input
    const validationResult = signInSchema.safeParse(req.body);
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

    const { username, password } = validationResult.data;

    // Find user by username (lowercase)
    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user) {
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
      return;
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
      return;
    }

    // Verify JWT secret exists
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("JWT_SECRET is not defined in environment variables");
      res.status(500).json({
        success: false,
        message: "Internal server error - Authentication configuration missing",
      });
      return;
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: String(user._id),
        username: user.username,
      },
      jwtSecret,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Sign in successful",
      token,
      user: {
        id: String(user._id),
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.error("SignIn error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});
