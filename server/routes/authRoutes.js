import express from "express";
import {
  createOtp,
  resetOtp,
  isAuthenicated,
  login,
  logout,
  register,
  resetPassword,
  verifyEmail,
} from "../controllers/authController.js";
import { userAuthMiddlware } from "../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.route("/register").post(register);
authRouter.route("/login").post(login);
authRouter.route("/logout").post(logout);
authRouter.route("/send-verify-otp").post(userAuthMiddlware, createOtp);
authRouter.route("/verify-account").post(userAuthMiddlware, verifyEmail);
authRouter.route("/is-auth").get(userAuthMiddlware, isAuthenicated);
authRouter.route("/send-reset-otp").post(resetOtp);
authRouter.route("/reset-password").post(resetPassword);

export default authRouter;
