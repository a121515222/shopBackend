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
        $sellerId: "123",
        num: 1
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
              sellerId: "123",
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
                isUsedCoupon: false,
                discountPriceWhitCoupon: 0
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
          "data": {
    "_id": "67615d0d9d1199301364380e",
    "userId": "67405af5e85ca5d5551ed8a7",
    "sellerId": "67405af5e85ca5d5551ed8a7",
    "totalPrice": 340,
    isUsedCoupon: false,
    discountPriceWhitCoupon: 0,
    "productList": [
      {
        "productId": "674ecd448d091f0024c8a70a",
        "num": 2,
        "title": "orange",
        "price": 100,
        "discount": 90,
        "imageUrl": "https://www.google.com",
        "productSellPrice": 90,
        "_id": "67615d0d9d1199301364380f"
      },
      {
        "productId": "674ecdce8d091f0024c8a710",
        "num": 2,
        "title": "bnana",
        "price": 100,
        "discount": 80,
        "imageUrl": "https://www.google.com",
        "productSellPrice": 80,
        "_id": "6761735d6a4a0a52b18fc601"
      }
    ],
    "createdAt": "2024-12-17T11:14:21.781Z",
    "updatedAt": "2024-12-18T05:43:45.469Z"
  }
      }      
    }
  */
  next();
}

export function deleteUserCartSwagger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  /**
   * #swagger.tags = ["Cart-購物車"]
   * #swagger.description = "刪除購物車"
   * #swagger.security = [{
      "apiKeyAuth":[]
      }]
    * #swagger.parameters['body'] = {
      in: "body",
      required: true,
      type: "Object",
      description: "刪除購物車資料",
      schema: {
        $cartId:"12345655555",
        $sellerId: "123"
      }
    }
    * #swagger.responses[200] = {
        description: '刪除購物車成功',
        schema: {
          status: true,
          message: "刪除購物車成功",
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

export function postCouponCartSwagger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  /**
   * #swagger.tags = ["Cart-購物車"]
   * #swagger.description = "使用優惠券"
   * #swagger.security = [{
      "apiKeyAuth":[]
      }]
   * #swagger.parameters['body'] = {
      in: "body",
      required: true,
      type: "Object",
      description: "使用優惠券資料",
      schema: {
       $coupon:"Discount10",
      }
    }
    * #swagger.responses[201] = {
        description: '使用優惠券成功',
        schema: {
          status: true,
          message: "使用優惠券成功",
          "data": {
    "_id": "67615d0d9d1199301364380e",
    "userId": "67405af5e85ca5d5551ed8a7",
    "sellerId": "67405af5e85ca5d5551ed8a7",
    "totalPrice": 60,
    isUsedCoupon: false,
    discountPriceWhitCoupon: 0,
    "productList": [
      {
        "productId": "674ecdce8d091f0024c8a710",
        "num": 2,
        "title": "bnana",
        "price": 100,
        "discount": 80,
        "imageUrl": "https://www.google.com",
        "productSellPrice": 80,
        "_id": "6761735d6a4a0a52b18fc601"
      }
    ],
    "createdAt": "2024-12-17T11:14:21.781Z",
    "updatedAt": "2024-12-18T08:21:57.563Z",
    "isUsedCoupon": true
  }
      }      
    }
    */
  next();
}
