import { Request, Response, NextFunction, Router } from "express";
import type { RequestHandler, Handler } from "express";
import asyncErrorHandler from "@/middlewares/asyncErrorHandler";
import { checkLogIn, checkAdmin } from "@/middlewares/auth";
import {
  postUserArticle,
  getAllUserArticles,
  getUserArticle,
  searchArticles,
  updateUserArticle,
  deleteUserArticle
} from "@/controllers/articleController";
import {
  postUserArticleSwagger,
  getAllUserArticleSwagger,
  getUserArticleByIdSwagger,
  searchArticleSwagger,
  updateUserArticleSwagger,
  deleteUserArticleSwagger
} from "@/swaggerConfig/articleSwagger";
const router = Router();

router.post(
  "/article",
  postUserArticleSwagger,
  checkLogIn as Handler,
  asyncErrorHandler(postUserArticle) as RequestHandler
);
router.get(
  "/articles",
  getAllUserArticleSwagger,
  checkLogIn as Handler,
  asyncErrorHandler(getAllUserArticles) as RequestHandler
);

router.get(
  "/articleById/:id",
  getUserArticleByIdSwagger,
  asyncErrorHandler(getUserArticle) as RequestHandler
);

router.put(
  "/articleById/:id",
  updateUserArticleSwagger,
  checkLogIn as Handler,
  asyncErrorHandler(updateUserArticle) as RequestHandler
);

router.delete(
  "/articleById/:id",
  deleteUserArticleSwagger,
  checkLogIn as Handler,
  asyncErrorHandler(deleteUserArticle) as RequestHandler
);

router.get(
  "/searchArticles",
  searchArticleSwagger,
  asyncErrorHandler(searchArticles) as RequestHandler
);

export default router;
