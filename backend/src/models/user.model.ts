import mongoose, { Schema, model } from "mongoose";
import type { IUser } from "../types/user.interface.js";

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minLength: 3,
      maxLength: 10,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 15,
    },
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 2,
      trim: true,
    },
  },
  { timestamps: true }
);

// Add indexes for better query performance
userSchema.index({ username: 1 });

export const User = model<IUser>("User", userSchema);
