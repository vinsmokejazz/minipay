import { Schema } from "mongoose";
import mongoose from "mongoose";

interface IAccount {
  userId: mongoose.Types.ObjectId;
  balance: number;
}

const accountSchema = new Schema<IAccount>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      index: true,
    },
    balance: {
      type: Number,
      required: true,
      min: [0, "Balance can't be negative for now"],
      default: 0,
    },
  },
  { timestamps: true }
);

// Static method for safe balance updates (prevents race conditions:e.g., two users updating balance at the same time )

accountSchema.statics.updateBalance = async function (
  userId: string,
  amount: number
) {
  return this.findOneAndUpdate(
    { userId }, // Match by userId
    { $inc: { balance: amount } }, // Increment balance by 'amount' (can be negative for withdrawals)
    { new: true, upsert: true } // Return updated doc; create if account doesn't exist
  );
};

export const Account = mongoose.model<IAccount>("Account", accountSchema);
