import jwt from "jsonwebtoken";
import crypto from "crypto";
import { RefreshToken } from "../models/refreshToken.model.js";


const JWT_SECRET = process.env.JWT_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;  // Add to .env (different from JWT_SECRET)

export interface AuthPayload {
  userId: string;
  username: string;
}

// Generate access token (short-lived)
export const generateAccessToken = (payload: AuthPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });  // 15 minutes
};

// Generate and store refresh token (long-lived)
export const generateRefreshToken = async (userId: string): Promise<string> => {
  const token = crypto.randomBytes(64).toString("hex");  // Random string
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");  // Hash for DB
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);  // 7 days

  await RefreshToken.create({ userId, token: hashedToken, expiresAt });
  return token;  // Return plain token to client
};

// Verify access token
export const verifyAccessToken = (token: string): AuthPayload => {
  return jwt.verify(token, JWT_SECRET) as AuthPayload;
};

// Verify and rotate refresh token
export const verifyAndRotateRefreshToken = async (token: string): Promise<{ userId: string; newRefreshToken: string }> => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const refreshDoc = await RefreshToken.findOne({ token: hashedToken, isRevoked: false });

  if (!refreshDoc || refreshDoc.expiresAt < new Date()) {
    throw new Error("Invalid or expired refresh token");
  }

  // Rotate: Revoke old token and create new one
  await RefreshToken.findByIdAndUpdate(refreshDoc._id, { isRevoked: true });
  const newRefreshToken = await generateRefreshToken(refreshDoc.userId.toString());

  return { userId: refreshDoc.userId.toString(), newRefreshToken };
};

// Revoke all tokens for a user
export const revokeAllTokensForUser = async (userId: string): Promise<void> => {
  await RefreshToken.revokeAllForUser(userId);
};