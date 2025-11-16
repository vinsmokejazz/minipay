import jwt from "jsonwebtoken";
import { createUser, findByUsername, verifyPassword } from "./user.service.js";
import { Account } from "../models/accounts.model.js";
import type { CreateUserInput, SignInInput, UserResponse } from "../types/api.interface.js";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const signUp = async (input: CreateUserInput): Promise<{ user: UserResponse; token: string }> => {
  // create user
  const user = await createUser(input);
  // create account with some test balance
  await Account.create({ userId: user.id, balance: Math.floor(Math.random() * 1000) + 1 });

  // issue token
  const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: "7d" });

  return { user, token };
};

export const signIn = async (input: SignInInput): Promise<{ user: UserResponse; token: string }> => {
  const existing = await findByUsername(input.username);
  if (!existing) {
    const err: any = new Error("Invalid credentials");
    err.status = 401;
    throw err;
  }

  const passwordValid = await verifyPassword(input.password, existing.password);
  if (!passwordValid) {
    const err: any = new Error("Invalid credentials");
    err.status = 401;
    throw err;
  }

  const user: UserResponse = {
    id: String(existing._id),
    username: existing.username,
    firstName: existing.firstName,
    lastName: existing.lastName,
  };

  const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: "7d" });

  return { user, token };
};