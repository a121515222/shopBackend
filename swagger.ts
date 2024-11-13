import swaggerAutogen from "swagger-autogen";
import dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const doc = {
  info: {
    title: "shop",
    description: "the backend"
  },
  host: process.env.PORT ? `localhost:${process.env.PORT}` : "",
  schemes: ["http", "https"],
  securityDefinitions: {
    apiKeyAuth: {
      type: "apiKey",
      in: "cookie",
      name: "authorization",
      description: "請加上API Token"
    }
  }
};
const outputFile = "./swagger-output.json";

const endpointsFiles = ["./app.ts"];
swaggerAutogen(outputFile, endpointsFiles, doc);
