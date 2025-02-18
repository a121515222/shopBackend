import { type NextFunction, type Request, type Response } from "express";

export function geminiAIgenerateProductContentSwagger(
  _req: Request,
  _res: Response,
  next: NextFunction
): void {
  /**
    * #swagger.tags = ["GeminiAI"]
    * #swagger.description = "AI 產品介紹生成"
    * #swagger.security = [{
      "apiKeyAuth":[]
    }]
    * #swagger.parameters['body'] = {
      in: "body",
      required: true,
      type: "Object",
      description: "產品介紹生成",
      schema: {
        title: "產品標題",
        description: "產品描述",
        category: "產品類別",
        content: "產品內容",
        tag: ["apple", "fruit"],
        }
    }
    * #swagger.responses[200] = {
      description: 'AI 產品介紹生成結果',
      schema: {
        status: true,
        message: "AI 產品介紹生成成功",
        data:"來自果園的鮮甜滋味！我們自家果園栽種的蘋果，採用最天然的耕作方式，不使用化學農藥及肥料，讓您品嚐到最純粹的蘋果風味。從採收到包裝，全程嚴格控管，確保每一顆蘋果都新鮮多汁、甜脆可口。  我們的蘋果，果肉細膩，汁液飽滿，咬一口，滿滿的蘋果香氣在口中蔓延，是您午後時光、早餐搭配、或製作甜點的最佳選擇。  我們堅持「自產自銷」，將最新鮮、最優質的蘋果直接送到您的餐桌。  體驗來自果園的天然美味，立即選購我們的蘋果 (apple, fruit)，感受這份來自土地的饋贈！  別錯過這一年一度的盛產期，數量有限，售完為止！<br>"
      }
    }
   */
  next();
}

export function geminiAIGenerateArticleContentSwagger(
  _req: Request,
  _res: Response,
  next: NextFunction
): void {
  /**
    * #swagger.tags = ["GeminiAI"]
    * #swagger.description = "AI 文章生成"
    * #swagger.security = [{apiKeyAuth: []}]
    * #swagger.parameters['body'] = {
      in: "body",
      required: true,
      type: "Object",
      description: "文章生成",
      schema: {
        title: "文章標題",
        description: "文章描述",
        content: "文章內容",
        tag: ["apple", "fruit"],
      }
     }
     * #swagger.responses[200] = {
      description: 'AI 文章生成結果',
      schema: {
        status: true,
        message: "AI 文章生成成功",
        data:"<br>"
      }
    }   

      
  **/
  next();
}
