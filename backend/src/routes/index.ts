import express from "express";
import { userRouter } from "./user.js";
import { signUpRouter } from "./signUp.js";
import { signInRouter } from "./signIn.js";
import { accountRouter } from "./account.js";
import { authRouter } from "./auth.js";
import { apiLimiter, authLimiter, transferLimiter } from "../middleware/rateLimit.js";

const router = express.Router();

// Global API limiter for all routes
router.use(apiLimiter);

// Apply stricter auth limiter to auth-related routes
router.use("/signup", authLimiter, signUpRouter);
router.use("/signin", authLimiter, signInRouter);
router.use("/auth", authLimiter, authRouter);

// Apply transfer limiter to account routes (specifically for transfers)
router.use("/account", (req, res, next) => {
  if (req.path === "/transfer") {
    return transferLimiter(req, res, next);
  }
  next();
}, accountRouter);

// Other routes
router.use("/user", userRouter);

export const Rootrouter = router;
