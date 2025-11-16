import express from "express";
import { authMiddleware } from "../middleware/middleware.js";
import { zodMiddleware } from "../utils/zodExpress.js";
import { transferSchema } from "../utils/validators.js";
import { getBalance, transfer } from "../controllers/accountController.js";

export const accountRouter = express.Router();

accountRouter.get("/balance", authMiddleware, getBalance);
accountRouter.post("/transfer", authMiddleware, zodMiddleware(transferSchema), transfer);
