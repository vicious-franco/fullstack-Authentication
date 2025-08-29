import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ConnectDB } from "./config/ConnectDB.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoute.js";

const app = express();

// middlewares
app.use(cors({ credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  ConnectDB();
  console.log(`server has started on http://127.0.0.1:${PORT}`);
});
