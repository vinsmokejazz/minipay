import express from "express";
import { authMiddleware } from "../middleware/middleware.js";
import { postRefresh, postLogout } from "../controllers/authController.js";

export const authRouter = express.Router();

// Refresh access token
authRouter.post("/refresh", postRefresh);

// Logout (requires auth to revoke tokens)
authRouter.post("/logout", authMiddleware, postLogout);