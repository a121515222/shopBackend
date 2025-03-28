import createError from "http-errors";
import express from "express";
import connectMongoDB from "@/services/mongo";
import globalErrorHandler from "@/utils/globalErrorHandler";
import swaggerUI from "swagger-ui-express";
import swaggerFile from "@/swagger-output.json";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import { corsOptions } from "@/corsOption/corsOptions";
import googleService from "@/services/google";
import http from "http";
import { initializeSocket } from "@/services/webSocket";
import logInAndSigInRoute from "@/routes/logInAndSigInRoute";
import userRoute from "@/routes/userRoute";
import verifyTokenRoute from "@/routes/verifyTokenRoute";
import forgetPasswordRoute from "@/routes/forgetPasswordRoute";
import imageUploadRoute from "@/routes/imageUploadRoute";
import productRoute from "@/routes/productRoute";
import articleRoute from "@/routes/articleRoute";
import couponRoute from "@/routes/couponRoute";
import cartRoute from "@/routes/cartRoute";
import orderRoute from "@/routes/orderRoute";
import commentRoute from "@/routes/commentRoute";
import geminiRoute from "@/routes/geminiAIRoute";
import conversationRoute from "@/routes/conversationRoute";
import chatMessageRoute from "@/routes/chatMessageRoute";

const app = express();
const httpServer = http.createServer(app);
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const port = process.env.PORT || 8086;
// 建立google auth
googleService.setupAuth(app);
app.use(cors(corsOptions));
/* 未捕捉的 Error */
process.on("uncaughtException", (err: Error) => {
  console.error(`[server]：捕獲到 uncaughtException: ${err.message}`);
  process.exit(1);
});

/* 連接 MongoDB */

connectMongoDB();
/*  SocketIO  */

initializeSocket(httpServer);
// app.use(logger("dev"));
// 解析body的JSON格式
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/v1", logInAndSigInRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", verifyTokenRoute);
app.use("/api/v1", forgetPasswordRoute);
app.use("/api/v1", productRoute);
app.use("/api/v1", imageUploadRoute);
app.use("/api/v1", articleRoute);
app.use("/api/v1", couponRoute);
app.use("/api/v1", cartRoute);
app.use("/api/v1", orderRoute);
app.use("/api/v1", commentRoute);
app.use("/api/v1", geminiRoute);
app.use("/api/v1", conversationRoute);
app.use("/api/v1", chatMessageRoute);
app.get("/", (req, res) => {
  res.send("Backend is running!");
});
httpServer.listen(port, () => {
  if (process.env.NODE_ENV === "dev") {
    console.log(`Server is running at http://localhost:${port}`);
  } else {
    console.log(`Server is running ${process.env.BACK_DOMAIN}`);
  }
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
  // process.exit(1);
  app.use((_, res) => {
    res.status(500).send("500 Internal Server Error");
  });
});

export default app;
