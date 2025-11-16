import { createUser, findByUsername, verifyPassword } from "./user.service.js";
import { Account } from "../models/accounts.model.js";
import { generateAccessToken, generateRefreshToken } from "./token.service.js";
import type { CreateUserInput, SignInInput, UserResponse } from "../types/api.interface.js";

export const signUp = async (input: CreateUserInput): Promise<{ user: UserResponse; accessToken: string; refreshToken: string }> => {
  // create user
  const user = await createUser(input);
  // create account with some test balance
  await Account.create({ userId: user.id, balance: Math.floor(Math.random() * 1000) + 1 });

  // issue tokens
  const accessToken = generateAccessToken({ userId: user.id, username: user.username });
  const refreshToken = await generateRefreshToken(user.id);

  return { user, accessToken, refreshToken };
};

export const signIn = async (input: SignInInput): Promise<{ user: UserResponse; accessToken: string; refreshToken: string }> => {
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

  const accessToken = generateAccessToken({ userId: user.id, username: user.username });
  const refreshToken = await generateRefreshToken(user.id);

  return { user, accessToken, refreshToken };
};