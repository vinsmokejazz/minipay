import { Document, Types } from "mongoose";

export interface IAccount extends Document {
  userId: Types.ObjectId | string;
  balance: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITransferInput {
  to: string;
  amount: number;
}

export interface ITransferResponse {
  success: boolean;
  message: string;
  fromBalance?: number;
  toBalance?: number;
}