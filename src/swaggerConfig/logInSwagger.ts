import { type NextFunction, type Request, type Response } from "express";
export function logInSwagger(
  _req: Request,
  _res: Response,
  next: NextFunction
): void {
  /**
   * #swagger.tags = ["LogIn-登入"]
   * #swagger.parameters['body'] = {
      in: "body",
      required: true,
      type: "Object",
      description: "登入資訊",
      schema: {
        $account: "56asdf@hotmail.com",
        $password: "a1234567",
        }
      }
    * #swagger.responses[200] = {
      description: '登入成功',
      schema: {
        status: true,
        message: "登入成功",
        data: {
            userId: "66441880635c6a9bc95c164b",
            email:"56asdf@hotmail.com",
            name: "Eason",
            gender: "male",
            birthday: 595396800000,
            token: "as4d5fa421sdfasdf",
            rank: "normal"
            }
        }
      }
   */

  next();
}

export function logOutSwagger(
  _req: Request,
  _res: Response,
  next: NextFunction
): void {
  /**
   * #swagger.tags = ["LogIn-登入"]
   * #swagger.security = [{ apiKeyAuth: [] }]
   * #swagger.parameters['body'] = {
      in: "body",
      required: true,
      type: "Object",
      description: "登出資訊",
      schema: {
        $id: "adfzcsdv565sadf",
        }
      }
    * #swagger.responses[200] = {
      description: '登出成功',
      schema: {
        status: true,
        message: "登出成功",
        data: null,
        }
      }
   */

  next();
}
