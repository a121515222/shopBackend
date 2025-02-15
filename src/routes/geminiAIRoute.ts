import type { RequestHandler, Handler } from "express";
import { geminiAIgenerateProductContent } from "@/services/geminiAI";
import { Router } from "express";
import { checkLogIn } from "@/middlewares/auth";
import { geminiAIgenerateProductContentSwagger } from "@/swaggerConfig/geminiAISwagger";
import asyncErrorHandler from "@/middlewares/asyncErrorHandler";
const router = Router();

router.post(
  "/generateProductByGeminiAI",
  geminiAIgenerateProductContentSwagger,
  checkLogIn as Handler,
  asyncErrorHandler(geminiAIgenerateProductContent) as RequestHandler
);

export default router;
