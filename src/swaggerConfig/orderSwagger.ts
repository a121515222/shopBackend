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
        $sellerId: "adfzcsdv565sadf",
        $cartId: "adfzcsdv565sadf",
        $address: "台北市信義區",
        $tel: "0912345678",
        $username: "Jack",
        $email: "a121515222@yahoo.com"
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
           "data": {
    "orderList": [
      {
        "_id": "676a59c8752d68bc1a3b5d51",
        "sellerId": "67405af5e85ca5d5551ed8a7",
        "totalPrice": 180,
        "status": "unpaid",
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
        "isPaid": false,
        "paidDate": null,
        "buyerMessage": "",
        "sellerInfo": {
          "email": "a121515222@hotmail.com",
          "tel": "0927173739",
          "username": "Eason"
        },
        "couponInfo": {}
      },
      {
        "_id": "676a7cbdd8427834aa82b88f",
        "sellerId": "67650411ccb48d8ebb4b75dd",
        "totalPrice": 2375000,
        "status": "unpaid",
        "productList": [
          {
            "productId": "67650faeefb0ef81f1998ff4",
            "num": 50,
            "title": "apple1111",
            "price": 50000,
            "discount": 95,
            "imageUrl": "https://storage.googleapis.com/imagestorge-b6395.appspot.com/profiles/3c4ba073-6463-408b-9916-25a3c32b3ebf.jpg?GoogleAccessId=firebase-adminsdk-jlltd%40imagestorge-b6395.iam.gserviceaccount.com&Expires=16756646400&Signature=gYliF8C%2FqvwGDrp1Ia6vrMfORhoTV8ZL8av7rfoXYs8E4WQOFaoV9fFk0kNQbFNPPu96SDWFmwUypLyvY01XsZnln85yYNaAo1Au3YEaqruHC54tQX6fxUmkFwuzzhYk3rRvyIhb3ggdj9mteEKxiCapcyNRw7V2fyzdAC8RlneViIwkQwlj1%2F3dbaW4HOvWdlNdpLVRjfki7auV0fOG6tZ%2FSmv1Cywy5bkkq3mDZHSO7eBo2y3b8Y868R8N2TAJ9JI%2FknIZJbjJaFHBi9zaGYjV00p613NlP2hN6t4bdPaQqE%2B6Z%2Fg3xeCgguK6YfH3e%2BrFaSwof5aVjZto7JU8dw%3D%3D",
            "productSellPrice": 47500,
            "_id": "676a7c91d8427834aa82b88a"
          }
        ],
        "createdAt": "2024-12-24T09:19:57.777Z",
        "isPaid": false,
        "paidDate": null,
        "buyerMessage": "",
        "sellerInfo": {
          "email": "a84174426@gmail.com",
          "tel": "0911111111",
          "username": "jack"
        },
        "couponInfo": {}
      },
      {
        "_id": "676e44ec65fba599f4825557",
        "sellerId": "67650411ccb48d8ebb4b75dd",
        "totalPrice": 100,
        "isPaid": false,
        "status": "unpaid",
        "paidDate": null,
        "buyerMessage": "測試",
        "productList": [
          {
            "productId": "676509e8efb0ef81f1998fe1",
            "num": 1,
            "title": "測試",
            "price": 100,
            "discount": 100,
            "imageUrl": "https://storage.googleapis.com/imagestorge-b6395.appspot.com/profiles/a0e91ebf-c3f1-4c02-b537-fa5c2f9b0474.png?GoogleAccessId=firebase-adminsdk-jlltd%40imagestorge-b6395.iam.gserviceaccount.com&Expires=16756646400&Signature=NAWPyf7TBTEAJJUTMUmg5c9kwPzHwI6JfgY%2B0T37MXF4eXBFFttwO9Qev%2FEtgVqrW0aOd%2BVyrPQHUgPecD%2B4CwngmHCZUD07nZPx85sNT1H1Joz0pGG8tTWocBUDuAgxBa61wlt6WGup96zlX9fzINrDv9TN42cQY%2BumMiKxbGyPqHVLzt2ZN81tkPnHGMOp95cZc0L6iA90Rge3GJBm31RfyWWlUDD%2FVo71n45LLJx7zCKo0KDH0X5kH9J1pmcHkZCZ5ntW8MHZHoo9qB2cvGSnWwECKhCDI%2FUwgJ3q0ogWiimw1Zokfe3ZhtOnYOlNHQd6ElrkKhmYWmZK8oSvoA%3D%3D",
            "productSellPrice": 100,
            "_id": "676d1a7ef711261a300f4890"
          }
        ],
        "createdAt": "2024-12-27T06:10:52.790Z",
        "sellerInfo": {
          "email": "a84174426@gmail.com",
          "tel": "0911111111",
          "username": "jack"
        },
        "couponInfo": {}
      },
      {
        "_id": "67738be0c4dc92800e0f57a3",
        "sellerId": "67405af5e85ca5d5551ed8a7",
        "totalPrice": 1790,
        "isPaid": false,
        "status": "unpaid",
        "paidDate": null,
        "buyerMessage": "",
        "productList": [
          {
            "productId": "674ecd448d091f0024c8a70a",
            "num": 20,
            "title": "orange",
            "price": 100,
            "discount": 90,
            "imageUrl": "https://www.google.com",
            "productSellPrice": 90,
            "_id": "67738342e6739de5d5fdd6c4"
          }
        ],
        "createdAt": "2024-12-31T06:14:56.912Z",
        "sellerInfo": {
          "email": "a121515222@hotmail.com",
          "tel": "0927173739",
          "username": "Eason"
        },
        "couponInfo": {
          "couponId": null
        }
      },
      {
        "_id": "6773997ed7dc8e578003a2f9",
        "sellerId": "67405af5e85ca5d5551ed8a7",
        "totalPrice": 1590,
        "isPaid": false,
        "status": "unpaid",
        "paidDate": null,
        "buyerMessage": "",
        "productList": [
          {
            "productId": "674ecdce8d091f0024c8a710",
            "num": 20,
            "title": "bnana",
            "price": 100,
            "discount": 80,
            "imageUrl": "https://www.google.com",
            "productSellPrice": 80,
            "_id": "6773928a77669ac1ed0a0929"
          }
        ],
        "createdAt": "2024-12-31T07:13:02.499Z",
        "sellerInfo": {
          "email": "a121515222@hotmail.com",
          "tel": "0927173739",
          "username": "Eason"
        },
        "couponInfo": {
          "couponId": null
        }
      },
      {
        "_id": "67739fe9d8b0d2771fcd5fe3",
        "sellerId": "67405af5e85ca5d5551ed8a7",
        "totalPrice": 790,
        "isPaid": false,
        "status": "unpaid",
        "paidDate": null,
        "buyerMessage": "",
        "productList": [
          {
            "productId": "674ecdce8d091f0024c8a710",
            "num": 10,
            "title": "bnana",
            "price": 100,
            "discount": 80,
            "imageUrl": "https://www.google.com",
            "productSellPrice": 80,
            "_id": "67739f97d8b0d2771fcd5fd3"
          }
        ],
        "createdAt": "2024-12-31T07:40:25.733Z",
        "sellerInfo": {
          "email": "a121515222@hotmail.com",
          "tel": "0927173739",
          "username": "Eason"
        },
        "couponInfo": {
          "code": "Discount10Dollar",
          "discount": 10,
          "expireDate": "2025-12-31T00:00:00.000Z",
          "title": "折10元",
          "couponId": "67613dba66fcdb3832a4d35b"
        }
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalCount": 6,
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

export function buyerGetOrderSwagger(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  /**
   * #swagger.tags = ["Order-訂單"]
   * #swagger.description = "取得訂單"
   * #swagger.security = [{
      "apiKeyAuth":[]
      }]
   * #swagger.parameters['orderId'] = {
      in: "path",
      required: true,
      type: "string",
      description: "訂單 ID"
    }
    * #swagger.responses[200] = {
        description: '取得訂單成功',
        schema: {
          status: true,
          message: "取得訂單成功",
          data: {
           "_id": "676a59c8752d68bc1a3b5d51",
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
        "createdAt": "2024-12-24T06:50:48.597Z",
        "updatedAt": "2024-12-24T06:50:48.597Z"
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
            
    "orderList": [
      {
        "_id": "676a59c8752d68bc1a3b5d51",
        "sellerId": "67405af5e85ca5d5551ed8a7",
        "totalPrice": 180,
        "status": "unpaid",
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
        "isPaid": false,
        "paidDate": null,
        "buyerInfo": {
          "tel": "0912345000",
          "address": "新北市中和區",
          "buyerMessage": ""
        },
        "couponInfo": {}
      },
      {
        "_id": "67738be0c4dc92800e0f57a3",
        "sellerId": "67405af5e85ca5d5551ed8a7",
        "totalPrice": 1790,
        "isPaid": false,
        "status": "unpaid",
        "paidDate": null,
        "productList": [
          {
            "productId": "674ecd448d091f0024c8a70a",
            "num": 20,
            "title": "orange",
            "price": 100,
            "discount": 90,
            "imageUrl": "https://www.google.com",
            "productSellPrice": 90,
            "_id": "67738342e6739de5d5fdd6c4"
          }
        ],
        "createdAt": "2024-12-31T06:14:56.912Z",
        "buyerInfo": {
          "email": "a121515222@yahoo.com",
          "tel": "0912345678",
          "username": "JACK",
          "address": "台北市信義區測是測試",
          "buyerMessage": ""
        },
        "couponInfo": {
          "couponId": null
        }
      },
      {
        "_id": "6773997ed7dc8e578003a2f9",
        "sellerId": "67405af5e85ca5d5551ed8a7",
        "totalPrice": 1590,
        "isPaid": false,
        "status": "unpaid",
        "paidDate": null,
        "productList": [
          {
            "productId": "674ecdce8d091f0024c8a710",
            "num": 20,
            "title": "bnana",
            "price": 100,
            "discount": 80,
            "imageUrl": "https://www.google.com",
            "productSellPrice": 80,
            "_id": "6773928a77669ac1ed0a0929"
          }
        ],
        "createdAt": "2024-12-31T07:13:02.499Z",
        "buyerInfo": {
          "email": "a121515222@yahoo.com",
          "tel": "0912345678",
          "username": "JACK測試",
          "address": "台北市信義區測是測試6555",
          "buyerMessage": ""
        },
        "couponInfo": {
          "code": "Discount10Dollar",
          "discount": 10,
          "expireDate": "2025-12-31T00:00:00.000Z",
          "title": "折10元",
          "couponId": "67613dba66fcdb3832a4d35b"
        }
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalCount": 3,
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

export function buyerPayOrderSwagger(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  /**
   * #swagger.tags = ["Order-訂單"]
   * #swagger.description = "付款"
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
        $paidMethod: "creditCard",
      }
    }
    * #swagger.responses[200] = {
        description: '付款成功',
        schema: {
          status: true,
          message: "付款成功",
          data: {
            "couponId": null,
          "_id": "676a59c8752d68bc1a3b5d51",
          "buyerId": "67405af5e85ca5d5551ed8a7",
          "sellerId": "67405af5e85ca5d5551ed8a7",
          "cartId": "676a59ae752d68bc1a3b5d45",
          "totalPrice": 180,
          "status": "paid",
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
          "updatedAt": "2025-01-06T08:47:12.181Z",
          "isPaid": true,
          "paidDate": "2025-01-06T08:47:12.181Z",
          "buyerMessage": "",
          "paidMethod": "creditCard"
                }
            }      
    }     
   */
  next();
}

export function buyerCancelOrderSwagger(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  /**
   * #swagger.tags = ["Order-訂單"]
   * #swagger.description = "取消訂單"
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
        description: '取消訂單成功',
        schema: {
          status: true,
          message: "取消訂單成功",
          data: {
    couponId: null,
    isCommented: false,
    _id: "676e44ec65fba599f4825557",
    buyerId: "67405af5e85ca5d5551ed8a7",
    sellerId: "67650411ccb48d8ebb4b75dd",
    cartId: "676d1a7ef711261a300f488f",
    totalPrice: 100,
    isPaid: false,
    status: "buyerCancelled",
    paidDate: null,
    address: "屏東縣高樹鄉高樹村",
    username: "Eason",
    email: "a121515222@hotmail.com",
    tel: "0927173739",
    buyerMessage: "測試",
    productList: [
      {
        productId: "676509e8efb0ef81f1998fe1",
        num: 1,
        title: "測試",
        price: 100,
        discount: 100,
        imageUrl: "https://storage.googleapis.com/imagestorge-b6395.appspot.com/profiles/a0e91ebf-c3f1-4c02-b537-fa5c2f9b0474.png?GoogleAccessId=firebase-adminsdk-jlltd%40imagestorge-b6395.iam.gserviceaccount.com&Expires=16756646400&Signature=NAWPyf7TBTEAJJUTMUmg5c9kwPzHwI6JfgY%2B0T37MXF4eXBFFttwO9Qev%2FEtgVqrW0aOd%2BVyrPQHUgPecD%2B4CwngmHCZUD07nZPx85sNT1H1Joz0pGG8tTWocBUDuAgxBa61wlt6WGup96zlX9fzINrDv9TN42cQY%2BumMiKxbGyPqHVLzt2ZN81tkPnHGMOp95cZc0L6iA90Rge3GJBm31RfyWWlUDD%2FVo71n45LLJx7zCKo0KDH0X5kH9J1pmcHkZCZ5ntW8MHZHoo9qB2cvGSnWwECKhCDI%2FUwgJ3q0ogWiimw1Zokfe3ZhtOnYOlNHQd6ElrkKhmYWmZK8oSvoA%3D%3D",
        productSellPrice: 100,
        _id: "676d1a7ef711261a300f4890"
      }
    ],
    createdAt: "2024-12-27T06:10:52.790Z",
    updatedAt: "2025-01-11T05:45:42.510Z",
    isUsedCoupon: false,
    couponCode: "",
    discountPriceWhitCoupon: 0,
    paidMethod: ""
  }
      }      
    }     
   */
  next();
}
