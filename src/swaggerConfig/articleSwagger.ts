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
      type: "Object",
      description: "文章 id",
      schema: {
        userId: "adfzcsdv565sadf"
      }
    }
    * #swagger.responses[200] = {
        description: '取得文章成功',
        schema: {
          status: true,
          message: "取得文章成功",
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

export function getUserArticleByIdSwagger(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  /**
   * #swagger.tags = ["Article-文章"]
   * #swagger.description = "取得單一文章"
   * #swagger.security = [{
      "apiKeyAuth":[]
      }]
   * #swagger.parameters['articleId'] = {
      in: "path",
      required: true,
      type: "Object",
      description: "文章 id",
      schema: {
        articleId: "adfzcsdv565sadf"
      }
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
   * #swagger.parameters['articleId'] = {
      in: "path",
      required: true,
      type: "Object",
      description: "文章 id",
      schema: {
        articleId: "adfzcsdv565sadf"
      }
    }
    * #swagger.parameters['body'] = {
      in: "body",
      required: true,
      type: "Object",
      description: "文章資料",
      schema: {
        userId:"adfzcsdv565sadf",
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
   * #swagger.parameters['articleId'] = {
      in: "path",
      required: true,
      type: "Object",
      description: "文章 id",
      schema: {
        articleId: "adfzcsdv565sadf"
      }
    }
    *   #swagger.parameters['body'] = {
      in: "body",
      required: true,
      type: "Object",
      description: "文章資料",
      schema: {
        $userId: "adfzcsdv565sadf",
      }
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
