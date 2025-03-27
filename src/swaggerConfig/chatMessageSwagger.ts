import type { NextFunction, Request, Response } from "express";

export function getChatMessageListSwagger(
  req: Request,
  res: Response,
  next: NextFunction
){
  /**
  * #swagger.tags = ["Chat-私聊內容"]
  * #swagger.description = "私聊內容"
  * #swagger.security  = [{
      "apiKeyAuth":[]
      }]
  * #swagger.parameters["messageTimestamp"] = {
     in: "query",
     required: false,
     type: "string",
     description: "最後一筆訊息的時間戳記，用於取得比此時間更早的訊息",
     default: ""
    }
  * #swagger.parameters["chatId"] = {
     in: "query",
     required: true,
     type: "string",
     description: "聊天室ID"
    }
  * #swagger.responses[200] = {
     schema: {
          status: true,
          message: "取得聊天訊息成功",
           data: {
            latestMessages: [
              {
                senderId: "123",
                receiverId: "123",
                receiverName: "user",
                message: "hello",
                timestamp: "2021-09-01T06:00:00.000Z",
                isRead: false
              },
            ],
            messageTimestamp: "2021-09-01T06:00:00.000Z"
           }
          }
       }
   */
  next();
}