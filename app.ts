import createError from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import connectMongoDB from "@/DB/Mongo";
import globalErrorHandler from "@/utils/globalErrorHandler";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
const app = express();
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Express!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

connectMongoDB();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/users", usersRouter);

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
