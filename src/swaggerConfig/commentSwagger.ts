import type { NextFunction, Request, Response } from "express";
export function buyerAddCommentSwagger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  /**
   * #swagger.tags = ["Comment-評論"]
   * #swagger.description = "買家新增評論"
   * #swagger.security  = [{
      "apiKeyAuth":[]
      }]
   * #swagger.parameters['body'] = {
      in: "body",
      required: true,
      type: "Object",
      description: "新增評論資料",
      schema: {
        $sellerId: "123",
        $comment: "很棒",
        $score: 5,
        $orderId: "123456"
      }
    }
    * #swagger.responses[200] = {
        description: '新增評論成功',
        schema: {
          status: true,
          message: "新增評論成功",
          data: {
            sellerId: "123",
            userId: "123",
            comment: "很棒",
            score: 5
          }
      }      
    }
  */
  next();
}
