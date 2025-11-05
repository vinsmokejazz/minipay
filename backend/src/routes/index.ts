import express from "express";
import { userRouter } from "./user.js";
import { signUpRouter } from "./signUp.js";
import { signInRouter } from "./signIn.js";

const router = express.Router();

router.use("/user", userRouter);
router.use("/signup", signUpRouter);
router.use("/signin", signInRouter);

export const Rootrouter = router;
