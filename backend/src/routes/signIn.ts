import express from "express";
import { zodMiddleware } from "../utils/zodExpress.js";
import { postSignIn } from "../controllers/authController.js";
import { signInSchema } from "../utils/validators.js";

export const signInRouter = express.Router();

signInRouter.post("/", zodMiddleware(signInSchema), postSignIn);
