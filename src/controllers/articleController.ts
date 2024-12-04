import type { NextFunction, Request, Response } from "express";
import { ArticleType } from "@/types/articleTypes";
import appErrorHandler from "@/utils/appErrorHandler";
import appSuccessHandler from "@/utils/appSuccessHandler";
import checkMissingFields from "@/utils/checkMissingFields";
import { Article } from "@/models/article";

const postUserArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.params.userId ?? req.body.userId;
  const { title, description, content, tag, imageUrl } = req.body;

  const missingFields = checkMissingFields({
    userId
  });
  if (missingFields.length > 0) {
    const missingFieldsMsg = `缺少userId: ${missingFields.join(", ")}`;
    appErrorHandler(400, missingFieldsMsg, next);
    return;
  }
  const newArticle = await Article.create({
    userId,
    title,
    description,
    content,
    tag,
    imageUrl
  });
  if (!newArticle) {
    appErrorHandler(500, "新增文章失敗", next);
    return;
  } else {
    appSuccessHandler(201, "新增文章成功", newArticle, res);
  }
};

const getAllUserArticles = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.params.userId;
  let page: number | undefined = req.query.page
    ? parseInt(req.query.page as string)
    : 1;
  let limit: number | undefined = req.query.limit
    ? Number(req.query.limit)
    : undefined;
  page = page || 1;
  limit = limit || 10;
  const skip = (page - 1) * limit;
  const articles = await Article.find({ userId }).skip(skip).limit(limit);
  if (!articles) {
    appErrorHandler(500, "取得文章失敗", next);
    return;
  } else {
    appSuccessHandler(200, "取得文章成功", articles, res);
  }
};

const getUserArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const articleId = req.params.articleId;
  const article = await Article.findById(articleId);
  if (!article) {
    appErrorHandler(404, "找不到文章", next);
    return;
  } else {
    appSuccessHandler(200, "取得文章成功", article, res);
  }
};

const updateUserArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const articleId = req.params.articleId;
  const { title, description, content, tag, imageUrl } = req.body;
  let updateArticle: Partial<ArticleType> = {};
  if (!articleId) {
    appErrorHandler(400, "缺少文章 id", next);
    return;
  }
  if (title) {
    updateArticle.title = title;
  }
  if (description) {
    updateArticle.description = description;
  }
  if (content) {
    updateArticle.content = content;
  }
  if (tag.length > 0) {
    updateArticle.tag = tag;
  }
  if (imageUrl) {
    updateArticle.imageUrl = imageUrl;
  }

  const article = await Article.findByIdAndUpdate(articleId, updateArticle);
  if (!article) {
    appErrorHandler(500, "更新文章失敗", next);
    return;
  } else {
    appSuccessHandler(200, "更新文章成功", article, res);
  }
};

const deleteUserArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const articleId = req.params.articleId;
  if (!articleId) {
    appErrorHandler(400, "缺少文章 id", next);
    return;
  }
  const article = await Article.findByIdAndDelete(articleId);
  if (!article) {
    appErrorHandler(500, "刪除文章失敗", next);
    return;
  } else {
    appSuccessHandler(200, "刪除文章成功", article, res);
  }
};

export {
  postUserArticle,
  getAllUserArticles,
  getUserArticle,
  updateUserArticle,
  deleteUserArticle
};
