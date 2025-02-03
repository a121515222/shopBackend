import type { NextFunction, Request, Response } from "express";
import { ArticleType } from "@/types/articleTypes";
import appErrorHandler from "@/utils/appErrorHandler";
import appSuccessHandler from "@/utils/appSuccessHandler";
import checkMissingFields from "@/utils/checkMissingFields";
import { Article } from "@/models/article";
import { handlePagination } from "@/utils/paginationHandler";
const postUserArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.headers.userId;
  const {
    title,
    description,
    content,
    tag,
    imageUrl,
    author,
    articleDate,
    isPublic
  } = req.body;

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
    imageUrl,
    author,
    articleDate: new Date(articleDate),
    isPublic
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
  const userId = req.headers.userId;
  let page: number | undefined = req.query.page
    ? parseInt(req.query.page as string)
    : 1;
  let limit: number | undefined = req.query.limit
    ? Number(req.query.limit)
    : undefined;
  page = page || 1;
  limit = limit || 10;
  const skip = (page - 1) * limit;
  const findArticlesById = await Article.find({ userId })
    .skip(skip)
    .limit(limit);
  const getTotal = await Article.find({ userId }).countDocuments();
  const [articles, totalCount] = await Promise.all([
    findArticlesById,
    getTotal
  ]);
  const pagination = handlePagination(page, limit, totalCount);
  appSuccessHandler(200, "查詢成功", { articles, pagination }, res);
};

const getUserArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const articleId = req.params.id;
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
  const articleId = req.params.id;
  const userId = req.headers.userId;
  const {
    title,
    description,
    content,
    tag,
    imageUrl,
    author,
    articleDate,
    isPublic
  } = req.body;
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
  if (author) {
    updateArticle.author = author;
  }
  if (articleDate) {
    updateArticle.articleDate = new Date(articleDate);
  }
  if (typeof isPublic === "boolean") {
    updateArticle.isPublic = isPublic;
  }

  const article = await Article.findOneAndUpdate(
    { _id: articleId, userId },
    updateArticle,
    {
      new: true
    }
  );
  if (!article) {
    appErrorHandler(500, "更新文章失敗", next);
    return;
  } else {
    appSuccessHandler(200, "更新文章成功", article, res);
  }
};

const searchArticles = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { search, page, limit } = req.query;
  let pageNumber: number = page ? Number(page) : 1;
  let limitNumber: number = limit ? Number(limit) : 10;
  const query: Record<string, any> = {};
  if (search) {
    const keywords = (search as string).split(" ").filter(Boolean);
    query.$or = keywords.map((keyword) => ({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { author: { $regex: keyword, $options: "i" } }
      ]
    }));
  }
  query.isPublic = { $eq: true };
  const findArticles = await Article.find(query)
    .limit(limitNumber)
    .skip((pageNumber - 1) * limitNumber);
  const getTotal = await Article.find(query).countDocuments();
  const [articles, totalCount] = await Promise.all([findArticles, getTotal]);
  const pagination = handlePagination(pageNumber, limitNumber, totalCount);
  appSuccessHandler(200, "查詢成功", { articles, pagination }, res);
};

const deleteUserArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const articleId = req.params.id;
  const userId = req.headers.userId;
  if (!articleId) {
    appErrorHandler(400, "缺少文章 id", next);
    return;
  }
  const article = await Article.findOneAndDelete({ _id: articleId, userId });
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
  searchArticles,
  updateUserArticle,
  deleteUserArticle
};
