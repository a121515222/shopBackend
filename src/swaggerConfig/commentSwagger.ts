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

export function sellerGetCommentSwagger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  /**
   * #swagger.tags = ["Comment-評論"]
   * #swagger.description = "賣家取得評論"
   * #swagger.security = [{
       "apiKeyAuth": []
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
       description: "取得評論成功",
       schema: {
         status: true,
         message: "取得評論成功",
         data: {
           comments: [
             {
               sellerId: "123",
               userId: "123",
               comment: "很棒",
               score: 5
             }
           ],
           pagination: {
             totalPage: 1,
             totalItems: 1,
             currentPage: 1,
             limit: 10
           }
         }
       }
     }
   */
  next();
}

export function buyerGetSellerCommentSwagger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  /**
   * #swagger.tags = ["Comment-評論"]
   * #swagger.description = "買家取得賣家評論"
   * #swagger.parameters["sellerId"] = {
       in: "query",
       required: true,
       type: "string",
       description: "賣家 ID"
     }
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
       description: "取得賣家評論成功",
       schema: {
         status: true,
         message: "取得賣家評論成功",
         data: {
           comments: [
             {
               sellerId: "123adsfasdfaefdsf",
               _id:"123asdfasdeasdfaf",
               comment: "很棒",
               score: 5,
               productList:[
               {
               imageUrl:"https://www.google.com",
               productId:"123asdfasdfase",
               title:"Orange",
               }
               ]
             }
           ],
           pagination: {
             totalPage: 1,
             totalItems: 1,
             currentPage: 1,
             limit: 10
           }
         }
       }
     }
   */
  next();
}
