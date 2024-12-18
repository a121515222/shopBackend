import type { NextFunction, Request, Response } from "express";

export function postUserProductSwagger(
  _req: Request,
  _res: Response,
  next: NextFunction
): void {
  /**
   * #swagger.tags = ["Product-商品"]
   * #swagger.description = "新增商品"
   * #swagger.security = [{
      "apiKeyAuth":[]
      }]
   * #swagger.parameters['body'] = {
      in: "body",
      required: true,
      type: "Object",
      description: "商品資料",
      schema: {
        title: "apple",
        description: "juicy and delicious",
        price: 100,
        discount: 0.9,
        unit: "kg",
        imagesUrl: ["https://www.google.com"],
        imageUrl: "https://www.google.com",
        category: ["fruit"],
        content: "juicy and delicious, sweet and sour, a day keeps the doctor away",
        tag: ["apple", "fruit"]
      }
    }
    * #swagger.responses[201] = {
        description: '新增商品',
        schema: {
          status: true,
          message: "新增商品成功",
          data: {
            product: {
              title: "apple",
              description: "juicy and delicious",
              price: 100,
              discount: 0.9,
              unit: "kg",
              imagesUrl: ["https://www.google.com"],
              imageUrl: "https://www.google.com",
              category: ["fruit"],
              content: "juicy and delicious, sweet and sour, a day keeps the doctor away",
              tag: ["apple", "fruit"]
            }
          }
      }      
    }     
   */
  next();
}

export function getAllUserProductSwagger(
  _req: Request,
  _res: Response,
  next: NextFunction
) {
  /**
   * #swagger.tags = ["Product-商品"]
   * #swagger.description = "取得商品資料"
   * #swagger.security = [{
      "apiKeyAuth":[]
      }]
   * #swagger.parameters["userId"] = {
      in: "path",
      required: true,
      type: "string",
      description: "使用者id",
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
        description: '取得商品資料',
        schema: {
          status: true,
          message: "取得商品資料成功",
            "data": {
    "products": [
      {
        "_id": "674ecd448d091f0024c8a70a",
        "userId": "67405af5e85ca5d5551ed8a7",
        "title": "orange",
        "description": "juicy and delicious",
        "price": 100,
        "discount": 0.9,
        "imagesUrl": [
          "https://www.google.com"
        ],
        "imageUrl": "https://www.google.com",
        "category": [
          "fruit"
        ],
        "content": "juicy and delicious, sweet and sour",
        "tag": [],
        "unit": "",
        "createdAt": "2024-12-03T09:20:04.314Z",
        "updatedAt": "2024-12-03T09:20:04.314Z"
      },
      {
        "_id": "674ecd558d091f0024c8a70d",
        "userId": "67405af5e85ca5d5551ed8a7",
        "title": "apple",
        "description": "juicy and delicious",
        "price": 100,
        "discount": 0.9,
        "imagesUrl": [
          "https://www.google.com"
        ],
        "imageUrl": "https://www.google.com",
        "category": [
          "fruit"
        ],
        "content": "juicy and delicious, sweet and sour, a day keeps the doctor away",
        "tag": [],
        "unit": "",
        "createdAt": "2024-12-03T09:20:21.404Z",
        "updatedAt": "2024-12-03T09:20:21.404Z"
      },
      {
        "_id": "674ecdce8d091f0024c8a710",
        "userId": "67405af5e85ca5d5551ed8a7",
        "title": "bnana",
        "description": "juicy and delicious",
        "price": 100,
        "discount": 0.9,
        "imagesUrl": [
          "https://www.google.com"
        ],
        "imageUrl": "https://www.google.com",
        "category": [
          "fruit"
        ],
        "content": "juicy and delicious, sweet and sour,Bananas for banana",
        "tag": [],
        "unit": "",
        "createdAt": "2024-12-03T09:22:22.942Z",
        "updatedAt": "2024-12-03T09:22:22.942Z"
      },
      {
        "_id": "674ece4d8d091f0024c8a713",
        "userId": "67405af5e85ca5d5551ed8a7",
        "title": "grapes",
        "description": "juicy and delicious",
        "price": 100,
        "discount": 0.9,
        "imagesUrl": [
          "https://www.google.com"
        ],
        "imageUrl": "https://www.google.com",
        "category": [
          "fruit"
        ],
        "content": "juicy and delicious, sweet and sour,A bunch of grapes",
        "tag": [],
        "unit": "",
        "createdAt": "2024-12-03T09:24:29.399Z",
        "updatedAt": "2024-12-03T09:24:29.399Z"
      },
      {
        "_id": "674eceb68d091f0024c8a716",
        "userId": "67405af5e85ca5d5551ed8a7",
        "title": "lemon",
        "description": "juicy and delicious",
        "price": 100,
        "discount": 0.9,
        "imagesUrl": [
          "https://www.google.com"
        ],
        "imageUrl": "https://www.google.com",
        "category": [
          "fruit"
        ],
        "content": "When life gives you lemons, make lemonade",
        "tag": [],
        "unit": "",
        "createdAt": "2024-12-03T09:26:14.244Z",
        "updatedAt": "2024-12-03T09:26:14.244Z"
      },
      {
        "_id": "674ecf348d091f0024c8a719",
        "userId": "67405af5e85ca5d5551ed8a7",
        "title": "carrot",
        "description": "juicy and delicious",
        "price": 80,
        "discount": 0.6,
        "imagesUrl": [
          "https://www.google.com"
        ],
        "imageUrl": "https://www.google.com",
        "category": [
          "vegetable"
        ],
        "content": "Carrot and stick",
        "tag": [],
        "unit": "",
        "createdAt": "2024-12-03T09:28:20.352Z",
        "updatedAt": "2024-12-03T09:28:20.352Z"
      },
      {
        "_id": "674ecfc98d091f0024c8a71c",
        "userId": "67405af5e85ca5d5551ed8a7",
        "title": "pineapple",
        "description": "tropical and tangy",
        "price": 120,
        "discount": 0.25,
        "imagesUrl": [
          "https://example.com/pineapple.jpg"
        ],
        "imageUrl": "https://example.com/pineapple.jpg",
        "category": [
          "fruit"
        ],
        "content": "Perfect for desserts",
        "tag": [],
        "unit": "",
        "createdAt": "2024-12-03T09:30:49.242Z",
        "updatedAt": "2024-12-03T09:30:49.242Z"
      },
      {
        "_id": "674ed0188d091f0024c8a71f",
        "userId": "67405af5e85ca5d5551ed8a7",
        "title": "mango",
        "description": "juicy and delicious",
        "price": 180,
        "discount": 0.85,
        "imagesUrl": [
          "https://www.google.com"
        ],
        "imageUrl": "https://www.google.com",
        "category": [
          "fruit"
        ],
        "content": "Carrot and stick",
        "tag": [],
        "unit": "",
        "createdAt": "2024-12-03T09:32:08.407Z",
        "updatedAt": "2024-12-03T09:32:08.407Z"
      },
      {
        "_id": "674ed151746672480f1afc51",
        "userId": "67405af5e85ca5d5551ed8a7",
        "title": "strawberry",
        "description": "small and tart",
        "price": 250,
        "discount": 0.15,
        "imagesUrl": [
          "https://example.com/strawberry.jpg"
        ],
        "imageUrl": "https://example.com/strawberry.jpg",
        "category": [
          "fruit"
        ],
        "content": "Great for smoothies",
        "tag": [
          "strawberry",
          "fruit"
        ],
        "unit": "",
        "createdAt": "2024-12-03T09:37:21.922Z",
        "updatedAt": "2024-12-03T09:37:21.922Z"
      },
      {
        "_id": "674ed173746672480f1afc54",
        "userId": "67405af5e85ca5d5551ed8a7",
        "title": "tomato",
        "description": "juicy and versatile",
        "price": 50,
        "discount": 0.1,
        "imagesUrl": [
          "https://example.com/tomato.jpg"
        ],
        "imageUrl": "https://example.com/tomato.jpg",
        "category": [
          "vegetable",
          "fruit"
        ],
        "content": "Used in salads and sauces",
        "tag": [
          "tomato",
          "vegetable",
          "fruit"
        ],
        "unit": "",
        "createdAt": "2024-12-03T09:37:55.122Z",
        "updatedAt": "2024-12-03T09:37:55.122Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalCount": 22,
      "totalPages": 3,
      "limit": 10,
      "hasPrevPage": false,
      "hasNextPage": true
    }
  }
          }
      }      
   */
  next();
}

export function getUserProductByIdSwagger(
  _req: Request,
  _res: Response,
  next: NextFunction
) {
  /**
   * #swagger.tags = ["Product-商品"]
   * #swagger.description = "取得商品資料"
    * #swagger.parameters["id"] = {
      in: "path",
      required: true,
      type: "string",
      description: "產品id",
    }
    * #swagger.responses[200] = {
        description: '取得商品資料',
        schema: {
          status: true,
          message: "取得商品資料成功",
            "data": {
              "_id": "674ed32b746672480f1afc78",
    "userId": "67405af5e85ca5d5551ed8a7",
    "title": "avocado",
    "description": "creamy and nutritious",
    "price": 250,
    "discount": 0.15,
    "imagesUrl": [
      "https://example.com/avocado.jpg"
    ],
    "imageUrl": "https://example.com/avocado.jpg",
    "category": [
      "fruit"
    ],
    "content": "A must-have for guacamole",
    "tag": [
      "avocado",
      "fruit"
    ],
    "unit": "",
    "createdAt": "2024-12-03T09:45:15.028Z",
    "updatedAt": "2024-12-03T09:45:15.028Z"
            } ,
        } 
      }
   */
  next();
}

export function putUserProductSwagger(
  _req: Request,
  _res: Response,
  next: NextFunction
) {
  /**
   * #swagger.tags = ["Product-商品"]
   * #swagger.description = "更新商品"
   * #swagger.security = [{
      "apiKeyAuth":[]
      }]
   * #swagger.parameters['id'] = {
      in: "path",
      required: true,
      type: "string",
      description: "商品id",
    }   
   * #swagger.parameters['body'] = {
      in: "body",
      required: true,
      type: "Object",
      description: "商品資料",
      schema: {
        title: "apple",
        description: "juicy and delicious",
        price: 100,
        discount: 0.9,
        unit: "kg",
        num: 10,
        imagesUrl: ["https://www.google.com"],
        imageUrl: "https://www.google.com",
        category: ["fruit"],
        content: "juicy and delicious, sweet and sour, a day keeps the doctor away",
        tag: ["apple", "fruit"]
      }
    }
    * #swagger.responses[200] = {
        description: '更新商品',
        schema: {
          status: true,
          message: "更新商品成功",
          data: {
            product: {
              title: "apple",
              description: "juicy and delicious",
              price: 100,
              discount: 0.9,
              unit: "kg",
              num: 10,
              imagesUrl: ["https://www.google.com"],
              imageUrl: "https://www.google.com",
              category: ["fruit"],
              content: "juicy and delicious, sweet and sour, a day keeps the doctor away",
              tag: ["apple", "fruit"]
            }
          }
      }      
    }     
   */
  next();
}

export function deleteUserProductSwagger(
  _req: Request,
  _res: Response,
  next: NextFunction
) {
  /**
   * #swagger.tags = ["Product-商品"]
   * #swagger.description = "刪除商品"
   * #swagger.security = [{
      "apiKeyAuth":[]
      }]
   * #swagger.parameters["id"] = {
      in: "path",
      required: true,
      type: "string",
      description: "產品id",
    }
    * #swagger.responses[200] = {
        description: '刪除商品',
        schema: {
          status: true,
          message: "刪除商品成功",
          data: {
            product: {
              title: "apple",
              description: "juicy and delicious",
              price: 100,
              discount: 0.9,
              unit: "kg",
              imagesUrl: ["https://www.google.com"],
              imageUrl: "https://www.google.com",
              category: ["fruit"],
              content: "juicy and delicious, sweet and sour, a day keeps the doctor away",
              tag: ["apple", "fruit"]
            }
          }
      }      
    }     
   */
  next();
}
