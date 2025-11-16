import mongoose from "mongoose";
import { Account } from "../models/accounts.model.js";
import type { ITransferInput, ITransferResponse } from "../types/account.interface.js";
import redisClient from "../config/redis.js";

export const getAccountBalance = async (userId: string) => {
  const cacheKey = `balance:${userId}`;
  const cachedBalance = await redisClient.get(cacheKey);
  if (cachedBalance) {
    return { balance: parseFloat(cachedBalance) };
  }

  

  
  
  const account = await Account.findOne({ userId });
  if (!account) {
    const err: any = new Error("Account not found");
    err.status = 404;
    throw err;
  }

  // Cache for 5 minutes
  await redisClient.setEx(cacheKey, 300, account.balance.toString());
  return { balance: account.balance };
};

export const transferFunds = async (fromUserId: string, input: ITransferInput): Promise<ITransferResponse> => {
  const { amount, to } = input;

  if (!mongoose.Types.ObjectId.isValid(to)) {
    const error: any = new Error("Invalid recipient user ID");
    error.status = 400;
    throw error;
  }

  if (fromUserId === to) {
    const error: any = new Error("Cannot transfer to yourself");
    error.status = 400;
    throw error;
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const fromAccount = await Account.findOne({ userId: fromUserId }).session(session);
    if (!fromAccount) {
      const error: any = new Error("Sender account not found");
      error.status = 404;
      throw error;
    }

    if (fromAccount.balance < amount) {
      const error: any = new Error("Insufficient balance");
      error.status = 400;
      throw error;
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);
    if (!toAccount) {
      const error: any = new Error("Recipient account not found");
      error.status = 404;
      throw error;
    }

    const newFromBalance = fromAccount.balance - amount;
    const newToBalance = toAccount.balance + amount;

    await Account.updateOne({ userId: fromUserId }, { $set: { balance: newFromBalance } }).session(session);
    await Account.updateOne({ userId: to }, { $set: { balance: newToBalance } }).session(session);

    await session.commitTransaction();

    // Invalidate cache for both users
    await redisClient.del(`balance:${fromUserId}`);
    await redisClient.del(`balance:${to}`);

    return { success: true, message: "Transfer successful", fromBalance: newFromBalance, toBalance: newToBalance };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};