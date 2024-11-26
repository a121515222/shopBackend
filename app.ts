import createError from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import connectMongoDB from "@/DB/Mongo";
import globalErrorHandler from "@/utils/globalErrorHandler";
import swaggerUI from "swagger-ui-express";
import swaggerFile from "./swagger-output.json";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import logInAndSigInRoute from "@/routes/logInAndSigInRoute";
import userRoute from "@/routes/userRoute";
import verifyTokenRoute from "@/routes/verifyTokenRoute";
import forgetPasswordRouter from "@/routes/forgetPassword";
import cors from "cors";
import { corsOptions } from "./cors/corsOptions";

const app = express();
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const port = process.env.PORT || 8086;

app.use(cors(corsOptions));
/* 未捕捉的 Error */
process.on("uncaughtException", (err: Error) => {
  console.error(`[server]：捕獲到 uncaughtException: ${err.message}`);
  process.exit(1);
});

/* 連接 MongoDB */

connectMongoDB();

// app.use(logger("dev"));
// 解析body的JSON格式
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/v1", logInAndSigInRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", verifyTokenRoute);
app.use("/api/v1", forgetPasswordRouter);
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

/* Swagger */

interface ISwaggerFile {
  swagger: string;
  info: {
    title: string;
    description: string;
    version: string;
  };
  host: string;
  basePath: string;
  schemes: string[];
}

app.use(
  "/api-doc",
  swaggerUI.serve,
  swaggerUI.setup(swaggerFile as ISwaggerFile)
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
/* 404 Handler */
app.use((_, res) => {
  res.status(404).send("404 Not Found");
});

/* Mongo 錯誤處理 */
app.use(globalErrorHandler);

/* 未捕捉的 Promise */
process.on("unhandledRejection", (err, promise) => {
  console.error("[server]：捕獲到 rejection：", promise, "原因：", err);
  process.exit(1);
});

export default app;
