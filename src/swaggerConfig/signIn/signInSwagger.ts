import { type NextFunction, type Request, type Response } from "express";
export function signUpSwagger(
  _req: Request,
  _res: Response,
  next: NextFunction
): void {
  /**
   * #swagger.tags = ["SignIn-註冊"]
   * #swagger.parameters['body'] = {
      in: "body",
      required: true,
      type: "Object",
      description: "註冊資訊",
      schema: {
        $username: "Eason",
        $email: "56asdf@hotmail.com",
        $password: "a1234567",
        $confirmPassword: "a1234567",
        $gender:"male",
        $birthday:595396800000,
      }
    }
    * #swagger.responses[201] = {
      description: '註冊成功',
      schema: {
        status: true,
        message: "註冊成功",
        data: {
            user:{
              username: "Eason",
              email: "56asdf@hotmail.com",
              gender:"male",
              birthday:595396800000,
              rank:"normal",
              }
            }
          }
      }
   */

  next();
}
