import express from "express";
import { userRouter } from "./user.js";
import { signUpRouter } from "./signUp.js";
import { signInRouter } from "./signIn.js";
import { accountRouter } from "./account.js";
import { authRouter } from "./auth.js";

const router = express.Router();

router.use("/user", userRouter);
router.use("/signup", signUpRouter);
router.use("/signin", signInRouter);
router.use("/account",accountRouter);
router.use("/auth", authRouter);

export const Rootrouter = router;
