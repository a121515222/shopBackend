import type { NextFunction, Request, Response } from "express";

export function createCouponSwagger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  /**
   * #swagger.tags = ["Coupon-優惠券"]
   * #swagger.description = "新增優惠券"
   * #swagger.security  = [{
      "apiKeyAuth":[]
      }]
   * #swagger.parameters['body'] = {
      in: "body",
      required: true,
      type: "Object",
      description: "新增優惠券資料",
      schema: {
        $userId: "123",
        $code: "Discount100",
        $discount: 100,
        $expireDate: "2022-12-31",
        isPublic: true,
        $couponNum: 10000
      }
    }
    * #swagger.responses[201] = {
        description: '新增優惠券成功',
        schema: {
          status: true,
          message: "新增優惠券成功",
          data: {
            coupon: {
              "userId": "67405af5e85ca5d5551ed8a7",
             "code": "Discount100",
             "discount": 100,
              "expireDate": "2022-12-31T00:00:00.000Z",
             "isPublic": true,
             "couponNum": 10000,
             "_id": "676135f0da5b7d452386ec9f",
             "createdAt": "2024-12-17T08:27:28.832Z",
              "updatedAt": "2024-12-17T08:27:28.832Z"
            }
          }
      }      
    }
  */
  next();
}

export function getUserCreateCouponSwagger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  /**
   * #swagger.tags = ["Coupon-優惠券"]
   * #swagger.description = "取得使用者建立的優惠券"
   * #swagger.security = [{
      "apiKeyAuth":[]
      }]
    * #swagger.responses[200] = {
        description: '取得使用者建立的優惠券成功',
        schema: {
          status: true,
          message: "取得使用者建立的優惠券成功",
          data: {
            coupons: [
              {
                _id: "676135
                code: "Discount100",
                discount: 100,
                expireDate: "2022-12-31",
                isPublic: true,
                couponNum: 10000
              }
            ]
          }
        }
      }
  */
  next();
}
export function getCouponByIdSwagger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  /**
   * #swagger.tags = ["Coupon-優惠券"]
   * #swagger.description = "取得優惠券"
   * #swagger.security = [{
      "apiKeyAuth":[]
      }]
   * #swagger.parameters['couponId'] = {
      in: "path",
      required: true,
      type: "string",
      description: "優惠券 ID"
    }
    * #swagger.responses[200] = {
        description: '取得優惠券成功',
        schema: {
          status: true,
          message: "取得優惠券成功",
          data: {
            coupon: {
              code: "Discount100",
              discount: 100,
              expireDate: "2022-12-31",
              isPublic: true,
              couponNum: 10000
            }
          }
        }
      }
  */
  next();
}
export function putUserCouponSwagger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  /**
   * #swagger.tags = ["Coupon-優惠券"]
   * #swagger.description = "更新優惠券"
   * #swagger.security = [{
      "apiKeyAuth":[]
      }]
   * #swagger.parameters['couponId'] = {
      in: "path",
      required: true,
      type: "string",
      description: "優惠券 ID"
    }
    * #swagger.parameters['body'] = {
      in: "body",
      required: true,
      type: "Object",
      description: "更新優惠券資料",
      schema: {
        discount: 100,
        code: "Discount100",
        expireDate: "2022-12-31",
        isPublic: true,
      }
    }
    * #swagger.responses[200] = {
        description: '更新優惠券成功',
        schema: {
          status: true,
          message: "更新優惠券成功",
          data: {
            coupon: {
              _id: "676135f0da5b7d555f86ec9f",
              userId: "67405af5e85ca5d9991ed8a7",
              code: "Discount10",
              discount: 10,
              expireDate: "2022-12-31T00:00:00.000Z",
              isPublic: true,
              couponNum: 10000,
              createdAt: "2024-12-17T08:27:28.832Z",
              updatedAt: "2024-12-17T09:48:33.019Z"
            }
          }
        }
      }
  */
  next();
}
export function deleteCouponSwagger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  /**
   * #swagger.tags = ["Coupon-優惠券"]
   * #swagger.description = "刪除優惠券"
   * #swagger.security = [{
      "apiKeyAuth":[]
      }]
   * #swagger.parameters['couponId'] = {
      in: "path",
      required: true,
      type: "string",
      description: "優惠券 ID"
    }
    * #swagger.responses[200] = {
        description: '刪除優惠券成功',
        schema: {
          status: true,
          message: "刪除優惠券成功",
          data: {
            coupon: {
              "_id": "676135f0da5b7da44f86ec9f",
    "userId": "67405af5e85ca5d5551ed8a7",
    "code": "Discount10",
    "discount": 10,
    "expireDate": "2022-12-31T00:00:00.000Z",
    "isPublic": true,
    "couponNum": 10000,
    "createdAt": "2024-12-17T08:27:28.832Z",
    "updatedAt": "2024-12-17T09:48:33.019Z"
            }
          }
        }
      }
  */
  next();
}
