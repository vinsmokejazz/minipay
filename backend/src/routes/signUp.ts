import express from "express";
import { zodMiddleware } from "../utils/zodExpress.js";
import { postSignUp } from "../controllers/authController.js";
import { signUpSchema } from "../utils/validators.js";

export const signUpRouter = express.Router();

signUpRouter.post("/", zodMiddleware(signUpSchema), postSignUp);
