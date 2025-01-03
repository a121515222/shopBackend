import swaggerAutogen from "swagger-autogen";
import dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const doc = {
  info: {
    title: "shop",
    description: "the backend"
  },
  host: process.env.PORT
    ? `localhost:${process.env.PORT}`
    : "backnuxt.zeabur.app",
  schemes: ["http", "https"],
  securityDefinitions: {
    apiKeyAuth: {
      type: "apiKey",
      in: "cookie",
      name: "authorization",
      description: "請加上API Token"
    },
    bearerAuth: {
      type: "apiKey", // 授權類型
      in: "header", // 指定使用 header 傳遞 token
      name: "Authorization", // Header 名稱
      description: "請在 Header 中加上 Bearer Token 格式：Bearer <Token>"
    }
  }
};
const outputFile = "./src/swagger-output.json";

const endpointsFiles = ["./app.ts"];
swaggerAutogen(outputFile, endpointsFiles, doc);
