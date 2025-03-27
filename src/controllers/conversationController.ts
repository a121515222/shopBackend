import type { NextFunction, Request, Response } from "express";
import appErrorHandler from "@/utils/appErrorHandler";
import appSuccessHandler from "@/utils/appSuccessHandler";
import { Conversation } from "@/models/conversation";
import { handlePagination } from "@/utils/paginationHandler";
const getConversationList = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.headers.userId;
  let page: number | undefined = req.query.page
    ? Number(req.query.page)
    : undefined;
  let limit: number | undefined = req.query.limit
    ? Number(req.query.limit)
    : undefined;
  if (!userId) {
    appErrorHandler(500, "缺少必要資料", next);
    return;
  }
  page = page || 1;
  limit = limit || 10;
  const conversationList = await Conversation.find({userId})
    .sort({ updatedAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  const getTotal = await Conversation.find({userId}).countDocuments();
  const [conversations, totalCount] = await Promise.all([conversationList, getTotal]);
  const pagination = handlePagination(page, limit, totalCount);
  appSuccessHandler(200, "取得對話列表成功", {conversations, pagination }, res);
};

export { getConversationList };