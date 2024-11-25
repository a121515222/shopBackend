import { type NextFunction, type Request, type Response } from "express";
export function sendVerifyTokenSwagger(
  _req: Request,
  _res: Response,
  next: NextFunction
): void {
  /**
    * #swagger.tags = ["ForgetPassword-忘記密碼"]
    * #swagger.parameters['body'] = {
      in: "body",
      required: true,
      type: "Object",
      description: "寄送驗證碼",
      schema: {
        $password: "1111111111a",
        $confirmPassword: "1111111111a",
        $id: "614b2f3,
        $token:"sadfasd555a5sd5fa5sdf5asd5f"
        }
      }
    * #swagger.responses[201] = {
      description: '密碼更新結果',
      schema: {
        status: true,
        message: "密碼更新成功",
      }
   */
  next();
}
