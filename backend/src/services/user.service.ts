import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import type { CreateUserInput } from "../types/api.interface.js";

export const createUser = async (input: CreateUserInput) => {
  // lowercased username
  const username = input.username.toLowerCase();

  // check if exists
  const existing = await User.findOne({ username });
  if (existing) {
    const error: any = new Error("Username already exists");
    error.status = 409;
    throw error;
  }

  const hashed = await bcrypt.hash(input.password, 10);
  const user = new User({
    username,
    password: hashed,
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
  });
  await user.save();

  // Return non-sensitive user fields
  return {
    id: String(user._id),
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
  };
};

export const findByUsername = async (username: string) => {
  return await User.findOne({ username: username.toLowerCase() });
};

export const verifyPassword = async (plain: string, hash: string) => {
  return await bcrypt.compare(plain, hash);
};

export const getUserById = async (userId: string) => {
  return await User.findById(userId).select("-password");
};

export const updateUser = async (userId: string, payload: Partial<{ password: string; firstName: string; lastName: string }>) => {
  if (payload.password) {
    const hashed = await bcrypt.hash(payload.password, 10);
    payload.password = hashed;
  }

  return await User.findByIdAndUpdate(userId, payload, { new: true }).select("-password");
};

export const listUsers = async (filter?: string) => {
  const q = filter || "";
  return await User.find({
    $or: [
      { firstName: { $regex: q, $options: "i" } },
      { lastName: { $regex: q, $options: "i" } },
    ],
  }).select("-password");
};