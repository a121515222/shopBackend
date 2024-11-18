import { type NextFunction, type Request, type Response } from "express";
export function verifyTokenSwagger(
  _req: Request,
  _res: Response,
  next: NextFunction
): void {
  /**
   * #swagger.tags = ["VerifyTokenAndSendToken-驗證與寄送Token"]
    * #swagger.parameters["path"] = {
        in: "path",
        name: "id",
        required: true,
        type: "string",
        description: "使用者Id"
    }
        * #swagger.parameters["path"] = {
        in: "path",
        name: "token",
        required: true,
        type: "string",
        description: "Token"
    }
    * #swagger.responses[201] = {
      description: '驗證成功',
      schema: {
        status: true,
        message: "驗證成功",
        data: {
            user:{
              username: "Eason",
              email: "56asdf@hotmail.com",
              gender:"male",
              birthday:595396800000,
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
export function sendVerifyTokenSwagger(
  _req: Request,
  _res: Response,
  next: NextFunction
): void {
  /**
    * #swagger.tags = ["VerifyTokenAndSendToken-驗證與寄送Token"]
    * #swagger.parameters["path"] = {
        in: "path",
        name: "id",
        required: true,
        type: "string",
        description: "使用者Id"
    }
    * #swagger.responses[201] = {
      description: '驗證成功',
      schema: {
        status: true,
        message: "寄送驗證碼成功",
        data: {
            info: "請至信箱收取驗證信",
            sendVerifyTokenTime: "2021-09-01T00:00:00.000Z",
            sendVerifyTokenCount: 1,
            }
          }
      }
   */
  next();
}
