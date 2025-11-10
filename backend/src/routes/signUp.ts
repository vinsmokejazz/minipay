import type { Request, Response } from "express";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { User } from "../models/user.model.js";
import { Account } from "../models/accounts.model.js";

export const signUpRouter = express.Router();

// Zod validation schema
const signUpSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(19, "Username must be at most 19 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(15, "Password must be at most 15 characters"),
  firstName: z
    .string()
    .min(3, "First name must be at least 3 characters")
    .max(50, "First name must be at most 50 characters")
    .trim(),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be at most 50 characters")
    .trim(),
});

signUpRouter.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate input
    const validationResult = signUpSchema.safeParse(req.body);
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

    const { username, password, firstName, lastName } = validationResult.data;

    // Check if user already exists
    const existingUser = await User.findOne({
      username: username.toLowerCase(),
    });
    if (existingUser) {
      res.status(409).json({
        success: false,
        message: "Username already exists",
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

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const newUser = new User({
      username: username.toLowerCase(),
      password: hashedPassword,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
    });

    await newUser.save();

    // Generate JWT token for auto sign-in
    const token = jwt.sign(
      {
        userId: String(newUser._id),
        username: newUser.username,
      },
      jwtSecret,
      { expiresIn: "7d" }
    );

    // random balance This is so we don’t have to integrate with banks and give them random balances to start with
    await Account.create({
      userId: newUser._id,
      balance: Math.floor(Math.random() * 1000) + 1, // between 1 and 10000
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      token,
      user: {
        id: String(newUser._id),
        username: newUser.username,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
    });
  } catch (error) {
    console.error("SignUp error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});
