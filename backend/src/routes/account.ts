import express from "express";
import type { Request, Response } from "express";
import { authMiddleware } from "../middleware/middleware.js";
import { Account } from "../models/accounts.model.js";
import z from "zod";
import mongoose from "mongoose";

export const accountRouter = express.Router();

const transferSchema = z.object({
  amount: z.number().min(1).positive("Amount must be positive"),
  to: z.string().min(1, "Recipient userId required"),
});

accountRouter.get(
  "/balance",
  authMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized- User not found",
      });
      return;
    }

    try {
      const account = await Account.findOne({ userId }).select("balance");
      if (!account) {
        res.status(404).json({
          success: false,
          message: "Account not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Balance fetched Successfully",
        balance: account.balance,
      });
    } catch (error) {
      console.error("Balance fetch error:", error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
);

accountRouter.post(
  "/transfer",
  authMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized- User not found",
      });
      return;
    }

    // input validation
    const validation = transferSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
      });
      return;
    }

    const { amount, to } = validation.data;

    // prevent self transfer
    if (to == userId) {
      res.status(400).json({
        success: false,
        message: "Cannot transfer to your self",
      });
      return;
    }

    const session = await mongoose.startSession();
    try {
      // start transaction
      session.startTransaction();

      const account = await Account.findOne({ userId: userId }).session(
        session
      );

      // find user account and validate balance
      if (!account || account.balance < amount) {
        await session.abortTransaction();
        res.status(400).json({
          success: false,
          message: "Insufficient balance",
        });
        return;
      }

      // find to account
      const toAccount = await Account.findOne({ userId: to }).session(session);
      if (!toAccount) {
        await session.abortTransaction();
        res.status(404).json({
          success: false,
          message: "Invalid account -Account not found",
        });
        return;
      }

      // update balances
      await Account.updateOne(
        { userId: userId },
        { $inc: { balance: -amount } }
      ).session(session);
      await Account.updateOne(
        { userId: to },
        { $inc: { balance: +amount } }
      ).session(session);

      // commit transaction
      await session.commitTransaction();
      res.status(200).json({
        success: true,
        message: "Transfer Successful",
      });
    } catch (error) {
      // roll back on error
      await session.abortTransaction();
      console.error("Amount Transfer Error:", error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    } finally {
      // cleanup and end session
      session.endSession();
    }
  }
);
