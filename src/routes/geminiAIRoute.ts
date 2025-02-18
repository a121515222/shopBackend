import type { RequestHandler, Handler } from "express";
import {
  geminiAIgenerateProductContent,
  geminiAIGenerateArticleContent
} from "@/services/geminiAI";
import { Router } from "express";
import { checkLogIn } from "@/middlewares/auth";
import {
  geminiAIgenerateProductContentSwagger,
  geminiAIGenerateArticleContentSwagger
} from "@/swaggerConfig/geminiAISwagger";
import asyncErrorHandler from "@/middlewares/asyncErrorHandler";
const router = Router();

router.post(
  "/generateProductByGeminiAI",
  geminiAIgenerateProductContentSwagger,
  checkLogIn as Handler,
  asyncErrorHandler(geminiAIgenerateProductContent) as RequestHandler
);

router.post(
  "/generateArticleByGeminiAI",
  geminiAIGenerateArticleContentSwagger,
  checkLogIn as Handler,
  asyncErrorHandler(geminiAIGenerateArticleContent) as RequestHandler
);

export default router;
