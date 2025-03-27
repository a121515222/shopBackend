import type { NextFunction, Request, Response } from "express";

export function getConversationListSwagger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  /**
   * #swagger.tags = ["Conversation-私聊列表"]
   * #swagger.description = "私聊列表"
   * #swagger.security  = [{
      "apiKeyAuth":[]
      }]
    * #swagger.parameters["page"] = {
       in: "query",
       required: false,
       type: "integer",
       description: "頁數，用於分頁",
       default: 1
     }
   * #swagger.parameters["limit"] = {
       in: "query",
       required: false,
       type: "integer",
       description: "每頁顯示的項目數，默認為 10",
       default: 10
     }
    * #swagger.responses[200] = {
        description: "取得私聊列表成功",
        schema: {
          status: true,
          message: "取得私聊列表成功",
          data: {
            conversations: [
              {
                _id: "123",
                userId: "123",
                sellerId: "123",
                sellerName: "seller",
                sellerAvatar: "url",
                message: "hello",
                timestamp: "2021-01-01",
                isRead: false
              }
            ],
            pagination: {
              totalPage: 1,
              totalItems: 1,
              currentPage: 1,
              limit: 10,
              hasPrevPage: false,
              hasNextPage: false
            }
          }
        }
    }   
      **/
  next();
}