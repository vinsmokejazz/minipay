import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { AuthPayload } from "../types/auth.interface.js";


// middlware to check userId and token
export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {

  const authHeader = req.headers.authorization;

  // Check if authorization header exists and has Bearer format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      message: "Unauthorized - No token provided",
    });
    return;
  }

  // Extract token 
  const token = authHeader.split(" ")[1]; // split by space

  if (!token) {
    res.status(401).json({
      message: "Unauthorized - Invalid token format",
    });
    return;
  }

  try {
    // Verify JWT secret exists
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("JWT_SECRET is not defined in environment variables");
      res.status(500).json({
        message: "Internal server error - Authentication configuration missing",
      });
      return;
    }

    // Verify and decode token
    const decoded = jwt.verify(token, jwtSecret) as AuthPayload;

    // Validate payload structure
    if (!decoded.userId) {
      res.status(401).json({
        message: "Unauthorized - Invalid token payload",
      });
      return;
    }

    // Attach userId to request object
    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.error("JWT verification error:", error);

    // Handle specific JWT errors
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        message: "Unauthorized - Invalid token",
      });
      return;
    }

    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        message: "Unauthorized - Token expired",
      });
      return;
    }

    res.status(401).json({
      message: "Unauthorized - Token verification failed",
    });
  }
};
