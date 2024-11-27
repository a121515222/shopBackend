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

export function userUpdateSwagger(
  _req: Request,
  _res: Response,
  next: NextFunction
): void {
  /**
   * #swagger.tags = ["user-使用者"]
   * #swagger.description = "更新使用者資料"
   * #swagger.security = [{
      "apiKeyAuth":[]
      }]
   * #swagger.parameters['body'] = {
      in: "body",
      required: true,
      type: "Object",
      description: "更新使用者資訊",
      schema: {
        $id: "adfzcsdv565sadf",
        username: "Eason",
        password: "a1234567",
        newPassword: "a1234567",
        gender:"male",
        birthday:595396800000,
      }
    }
    * #swagger.responses[200] = {
        description: '更新使用者資料',
        schema: {
          status: true,
          message: "更新使用者資料成功",
          data: {
            user: {
              username: "Eason",
              email: "56asdf@hotmail.com",
              rank:"normal",
              isVerify: true,
              createdAt: "2024-11-15T15:46:09.033Z",
              updatedAt: "2024-11-18T10:29:10.644Z",
              sendVerifyTokenCount: 3,
              sendVerifyTokenTime: "2024-11-18T10:13:52.005Z"
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
            rank: "normal",
            
          }
        }
      }
    }
*/
  next();
}
