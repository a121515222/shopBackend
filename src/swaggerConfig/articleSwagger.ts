import type { NextFunction, Request, Response } from "express";
export function postUserArticleSwagger(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  /**
   * #swagger.tags = ["Article-文章"]
   * #swagger.description = "新增文章"
   * #swagger.security = [{
      "apiKeyAuth":[]
      }]
   * #swagger.parameters['body'] = {
      in: "body",
      required: true,
      type: "Object",
      description: "文章資料",
      schema: {
        $userId: "adfzcsdv565sadf",
        title: "apple",
        description: "juicy and delicious",
        imageUrl: "https://www.google.com",
        content: "juicy and delicious, sweet and sour, a day keeps the doctor away",
        tag: ["apple", "fruit"]
      }
    }
    * #swagger.responses[201] = {
        description: '新增文章成功',
        schema: {
          status: true,
          message: "新增文章成功",
          data: {
            article: {
              title: "apple",
              description: "juicy and delicious",
              imageUrl: "https://www.google.com",
              content: "juicy and delicious, sweet and sour, a day keeps the doctor away",
              tag: ["apple", "fruit"]
            }
          }
      }      
    }     
   */
  next();
}
export function getAllUserArticleSwagger(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  /**
   * #swagger.tags = ["Article-文章"]
   * #swagger.description = "取得文章"
   * #swagger.security = [{
      "apiKeyAuth":[]
      }]
   * #swagger.parameters['userId'] = {
      in: "path",
      required: true,
      type: "string",
      description: "使用者Id",
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
        description: '取得文章成功',
        schema: {
          status: true,
          message: "取得文章成功",
          data: {
            articles: [{
              title: "apple",
              description: "juicy and delicious",
              imageUrl: "https://www.google.com",
              content: "juicy and delicious, sweet and sour, a day keeps the doctor away",
              tag: ["apple", "fruit"]
              }],
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

export function getUserArticleByIdSwagger(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  /**
   * #swagger.tags = ["Article-文章"]
   * #swagger.description = "取得單一文章"
   * #swagger.parameters["id"] = {
      in: "path",
      required: true,
      type: "string",
      description: "文章id",
    }
    * #swagger.responses[200] = {
        description: '取得單一文章成功',
        schema: {
          status: true,
          message: "取得單一文章成功",
          data: {
            article: {
              title: "apple",
              description: "juicy and delicious",
              imageUrl: "https://www.google.com",
              content: "juicy and delicious, sweet and sour, a day keeps the doctor away",
              tag: ["apple", "fruit"]
            }

          }
      }      
    }     
   */
  next();
}

export function updateUserArticleSwagger(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  /**
   * #swagger.tags = ["Article-文章"]
   * #swagger.description = "更新文章"
   * #swagger.security = [{
      "apiKeyAuth":[]
      }]
 * #swagger.parameters["id"] = {
      in: "path",
      required: true,
      type: "string",
      description: "文章id",
    }
    * #swagger.parameters['body'] = {
      in: "body",
      required: true,
      type: "Object",
      description: "文章資料",
      schema: {
        title: "apple",
        description: "juicy and delicious",
        imageUrl: "https://www.google.com",
        content: "juicy and delicious, sweet and sour, a day keeps the doctor away",
        tag: ["apple", "fruit"]
      }
    }
    * #swagger.responses[200] = {
        description: '更新文章成功',
        schema: {
          status: true,
          message: "更新文章成功",
          data: {
            article: {
              title: "apple",
              description: "juicy and delicious",
              imageUrl: "https://www.google.com",
              content: "juicy and delicious, sweet and sour, a day keeps the doctor away",
              tag: ["apple", "fruit"]
            }
          }
      }      
    }     
   */
  next();
}

export function deleteUserArticleSwagger(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  /**
   * #swagger.tags = ["Article-文章"]
   * #swagger.description = "刪除文章"
   * #swagger.security = [{
      "apiKeyAuth":[]
      }]
   * #swagger.parameters["id"] = {
      in: "path",
      required: true,
      type: "string",
      description: "文章id",
    } 
    * #swagger.responses[200] = {
        description: '刪除文章成功',
        schema: {
          status: true,
          message: "刪除文章成功",
          data: {
            article: {
              title: "apple",
              description: "juicy and delicious",
              imageUrl: "https://www.google.com",
              content: "juicy and delicious, sweet and sour, a day keeps the doctor away",
              tag: ["apple", "fruit"]
            }
          }
      }      
    }     
   */
  next();
}
