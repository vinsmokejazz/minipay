import { z } from "zod";

export const signUpSchema = z.object({
  username: z.string().min(3).max(19).regex(/^[a-zA-Z0-9_]+$/),
  password: z.string().min(6).max(15),
  firstName: z.string().min(3).max(50).trim(),
  lastName: z.string().min(2).max(50).trim(),
});

export const signInSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const transferSchema = z.object({
  to: z.string().min(1),
  amount: z.number().min(1).positive(),
});

export const updateUserSchema = z.object({
  password: z.string().min(6).optional(),
  firstName: z.string().min(1).max(50).optional(),
  lastName: z.string().min(1).max(50).optional(),
});

export const bulkUsersSchema = z.object({
  filter: z.string().max(50).optional(),
});