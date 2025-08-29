import express from "express";
import { userAuthMiddlware } from "../middleware/authMiddleware.js";
import { getUserData } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.route("/data").get(userAuthMiddlware, getUserData);

export default userRouter;
