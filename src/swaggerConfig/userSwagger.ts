import { type NextFunction, type Request, type Response } from "express";

export function userDateSwagger(
  _req: Request,
  _res: Response,
  next: NextFunction
): void {
  /**
   * #swagger.tags = ["user-使用者"]
   * #swagger.description = "取得使用者資料"
   * #swagger.security = [{
      "apiKeyAuth":[]
    }]
   * #swagger.parameters['id'] = {
      in: 'path',
      description: '使用者Id',
      required: true,
      type: 'string'
    }
   * #swagger.responses[200] = {
      description: '取得使用者資料',
      schema: {
        status: true,
        message: "取得使用者資料成功",
        data: {
          user: {
            username: "Eason",
            email: "56asdf@hotmail.com",
            gender: "male",
            birthday: 595396800000,
            rank: "normal"
          }
        }
      }
    }
*/
  next();
}

export function userDateAdminSwagger(
  _req: Request,
  _res: Response,
  next: NextFunction
): void {
  /**
   * #swagger.tags = ["user-使用者"]
   * #swagger.description = "取得使用者資料Admin"
   * #swagger.security = [{
      "apiKeyAuth":[]
    }]
   * #swagger.responses[200] = {
      description: '取得使用者資料',
      schema: {
        status: true,
        message: "取得使用者資料成功",
        data: {
          user: {
            username: "Eason",
            email: "56asdf@hotmail.com",
            gender: "male",
            birthday: 595396800000,
            rank: "normal"
          }
        }
      }
    }
*/
  next();
}
