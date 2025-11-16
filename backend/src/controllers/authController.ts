import type { Request, Response } from "express";
import { signUp, signIn } from "../services/auth.service.js";
import { verifyAndRotateRefreshToken, revokeAllTokensForUser, generateAccessToken } from "../services/token.service.js";
import { User } from "../models/user.model.js";

export const postSignUp = async (req: Request, res: Response) => {
  try {
    const result = await signUp(req.body);
    // Set refresh token as httpOnly cookie
    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure in production
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    // Return user and accessToken only
    res.status(201).json({ user: result.user, accessToken: result.accessToken });
  } catch (err: any) {
    const status = err.status || 500;
    res.status(status).json({ error: err.message });
  }
};

export const postSignIn = async (req: Request, res: Response) => {
  try {
    const result = await signIn(req.body);
    // Set refresh token as httpOnly cookie
    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    // Return user and accessToken only
    res.status(200).json({ user: result.user, accessToken: result.accessToken });
  } catch (err: any) {
    const status = err.status || 500;
    res.status(status).json({ error: err.message });
  }
};

export const postRefresh = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.cookies; // Get from cookie
    if (!refreshToken) {
      return res.status(401).json({ error: 'Refresh token not provided' });
    }
    const { userId, newRefreshToken } = await verifyAndRotateRefreshToken(refreshToken);
    // Fetch username for access token
    const user = await User.findById(userId).select('username');
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    const accessToken = generateAccessToken({ userId, username: user.username });
    // Set new refresh token cookie
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.json({ accessToken });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};

export const postLogout = async (req: Request, res: Response) => {
  try {
    const userId = req.userId; // From auth middleware
    if (userId) {
      await revokeAllTokensForUser(userId);
    }
    // Clear cookie
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};