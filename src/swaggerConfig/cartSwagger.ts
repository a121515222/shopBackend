import type { NextFunction, Request, Response } from "express";

export function postUserAddCartSwagger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  /**
   * #swagger.tags = ["Cart-購物車"]
   * #swagger.description = "新增購物車"
   * #swagger.security  = [{
      "apiKeyAuth":[]
      }]
   * #swagger.parameters['body'] = {
      in: "body",
      required: true,
      type: "Object",
      description: "新增購物車資料",
      schema: {
        $productId: "123456",
        quantity: 1
      }
    }
    * #swagger.responses[201] = {
        description: '新增購物車成功',
        schema: {
          status: true,
          message: "新增購物車成功",
          data: {
            cart: {
              productId: "123456",
              num: 1
            }
          }
      }      
    }
  */
  next();
}

export function getUserCartSwagger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  /**
   * #swagger.tags = ["Cart-購物車"]
   * #swagger.description = "取得購物車"
   * #swagger.security = [{
      "apiKeyAuth":[]
      }]
    * #swagger.responses[200] = {
        description: '取得購物車成功',
        schema: {
          status: true,
          message: "取得購物車成功",
          data: {
            carts: [
            {userId: "123",
            sellerId: "456",
            totalPrice: 100,
            productList: [
              {
                productId: "123456",
                title: "apple",
                price: 100,
                discount: 0,
                imageUrl: "https://www.google.com",
                num: 1,
                unit: "kg",
                productSellPrice: 100,
              }
            ],}
           ]
          }
      }      
    }
  */
  next();
}

export function putUserCartSwagger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  /**
   * #swagger.tags = ["Cart-購物車"]
   * #swagger.description = "更新購物車"
   * #swagger.security = [{
      "apiKeyAuth":[]
      }]
    * #swagger.parameters['body'] = {
      in: "body",
      required: true,
      type: "Object",
      description: "更新購物車資料",
      schema: {
        $cartId:"12345655555",
        $productId: "123456",
        $num: 1,
        $isDelete: true,
      }
    }
    * #swagger.responses[200] = {
        description: '更新購物車成功',
        schema: {
          status: true,
          message: "更新購物車成功",
          data: {
            cart: {
              productId: "123456",
              num: 1
            }
          }
      }      
    }
  */
  next();
}
