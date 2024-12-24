import type { NextFunction, Request, Response } from "express";

export function buyerAddOrderSwagger(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  /**
   * #swagger.tags = ["Order-訂單"]
   * #swagger.description = "新增訂單"
   * #swagger.security = [{
      "apiKeyAuth":[]
      }]
   * #swagger.parameters['body'] = {
      in: "body",
      required: true,
      type: "Object",
      description: "訂單資料",
      schema: {
        $userId: "adfzcsdv565sadf",
        $sellerId: "adfzcsdv565sadf",
        $cartId: "adfzcsdv565sadf",
        $address: "台北市信義區",
        $tel: "0912345678",
      }
    }
    * #swagger.responses[201] = {
        description: '新增訂單成功',
        schema: {
          status: true,
          message: "新增訂單成功",
          data: {
           "buyerId": "67405af5e85ca5d5551ed8a7",
    "sellerId": "67405af5e85ca5d5551ed8a7",
    "cartId": "676a59ae752d68bc1a3b5d45",
    "totalPrice": 180,
    "status": "unpaid",
    "orderDate": "2024-12-24T06:50:48.594Z",
    "address": "台北市信義區",
    "tel": "0912345678",
    "productList": [
      {
        "productId": "674ecd448d091f0024c8a70a",
        "num": 2,
        "title": "orange",
        "price": 100,
        "discount": 90,
        "imageUrl": "https://www.google.com",
        "productSellPrice": 90,
        "_id": "676a59ae752d68bc1a3b5d46"
      }
    ],
    "_id": "676a59c8752d68bc1a3b5d51",
    "createdAt": "2024-12-24T06:50:48.597Z",
    "updatedAt": "2024-12-24T06:50:48.597Z"
          }
      }      
    }     
   */
  next();
}

export function buyerEditOrderSwagger(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  /**
   * #swagger.tags = ["Order-訂單"]
   * #swagger.description = "修改訂單"
   * #swagger.security = [{
      "apiKeyAuth":[]
      }]
   * #swagger.parameters['body'] = {
      in: "body",
      required: true,
      type: "Object",
      description: "訂單資料",
      schema: {
        $orderId: "adfzcsdv565sadf",
        $address: "台北市信義區",
        $tel: "0912345678",
      }
    }
    * #swagger.responses[200] = {
        description: '修改訂單成功',
        schema: {
          status: true,
          message: "修改訂單成功",
          data: {
           "_id": "676a59c8752d68bc1a3b5d51",
    "buyerId": "67405af5e85ca5d5551ed8a7",
    "sellerId": "67405af5e85ca5d5551ed8a7",
    "cartId": "676a59ae752d68bc1a3b5d45",
    "totalPrice": 180,
    "status": "paid",
    "orderDate": "2024-12-24T06:50:48.594Z",
    "address": "新北市中和區",
    "tel": "0912345000",
    "productList": [
      {
        "productId": "674ecd448d091f0024c8a70a",
        "num": 2,
        "title": "orange",
        "price": 100,
        "discount": 90,
        "imageUrl": "https://www.google.com",
        "productSellPrice": 90,
        "_id": "676a59ae752d68bc1a3b5d46"
      }
    ],
    "createdAt": "2024-12-24T06:50:48.597Z",
    "updatedAt": "2024-12-24T09:03:31.220Z"
          }
      }      
    }     
   */
  next();
}

export function sellerEditOrderSwagger(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  /**
   * #swagger.tags = ["Order-訂單"]
   * #swagger.description = "賣家修改訂單"
   * #swagger.security = [{
      "apiKeyAuth":[]
      }]
   * #swagger.parameters['body'] = {
      in: "body",
      required: true,
      type: "Object",
      description: "訂單資料",
      schema: {
        $orderId: "adfzcsdv565sadf",
        $status: "paid",
      }
    }
    * #swagger.responses[200] = {
        description: '修改訂單成功',
        schema: {
          status: true,
          message: "修改訂單成功",
          data: {
           
          }
      }      
    }     
   */
  next();
}

export function buyerDeleteOrderSwagger(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  /**
   * #swagger.tags = ["Order-訂單"]
   * #swagger.description = "刪除訂單"
   * #swagger.security = [{
      "apiKeyAuth":[]
      }]
   * #swagger.parameters['body'] = {
      in: "body",
      required: true,
      type: "Object",
      description: "訂單資料",
      schema: {
        $orderId: "adfzcsdv565sadf",
      }
    }
    * #swagger.responses[200] = {
        description: '刪除訂單成功',
        schema: {
          status: true,
          message: "刪除訂單成功",
          data: {
           
          }
      }      
    }     
   */
  next();
}

export function buyerGetOrderListSwagger(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  /**
   * #swagger.tags = ["Order-訂單"]
   * #swagger.description = "取得訂單列表"
   * #swagger.security = [{
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
        description: '取得訂單列表成功',
        schema: {
          status: true,
          message: "取得訂單列表成功",
          data: {
           "orderList": [
      {
        "_id": "676a59c8752d68bc1a3b5d51",
        "sellerId": "67405af5e85ca5d5551ed8a7",
        "sellerInfo": {
          "tel": "0927173739"
        }
      },
      {
        "_id": "676a7cbdd8427834aa82b88f",
        "sellerId": "67650411ccb48d8ebb4b75dd",
        "sellerInfo": {
          "tel": "0911111111"
        }
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalCount": 2,
      "totalPages": 1,
      "limit": 10,
      "hasPrevPage": false,
      "hasNextPage": false
    }
          }
      }      
    }     
   */
  next();
}

export function sellerGetOrderListSwagger(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  /**
   * #swagger.tags = ["Order-訂單"]
   * #swagger.description = "賣家取得訂單列表"
   * #swagger.security = [{
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
        description: '取得訂單列表成功',
        schema: {
          status: true,
          message: "取得訂單列表成功",
          data: {
           
          }
      }      
    }     
   */
  next();
}
