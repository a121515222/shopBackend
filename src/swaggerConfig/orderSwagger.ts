import type { NextFunction, Request, Response } from "express";

export function buyerAddOrderSwagger(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  /**
   * #swagger.tags = ["Order-訂單"]
   * #swagger.description = "新增訂單"
   * #swagger.security = [{
      "apiKeyAuth":[]
      }]
   * #swagger.parameters['body'] = {
      in: "body",
      required: true,
      type: "Object",
      description: "訂單資料",
      schema: {
        $userId: "adfzcsdv565sadf",
        $sellerId: "adfzcsdv565sadf",
        $address: "台北市信義區",
        $tel: "0912345678",
      }
    }
    * #swagger.responses[201] = {
        description: '新增訂單成功',
        schema: {
          status: true,
          message: "新增訂單成功",
          data: {
           
          }
      }      
    }     
   */
  next();
}

export function buyerEditOrderSwagger(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  /**
   * #swagger.tags = ["Order-訂單"]
   * #swagger.description = "修改訂單"
   * #swagger.security = [{
      "apiKeyAuth":[]
      }]
   * #swagger.parameters['body'] = {
      in: "body",
      required: true,
      type: "Object",
      description: "訂單資料",
      schema: {
        $orderId: "adfzcsdv565sadf",
        $address: "台北市信義區",
        $tel: "0912345678",
      }
    }
    * #swagger.responses[200] = {
        description: '修改訂單成功',
        schema: {
          status: true,
          message: "修改訂單成功",
          data: {
           
          }
      }      
    }     
   */
  next();
}

export function sellerEditOrderSwagger(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  /**
   * #swagger.tags = ["Order-訂單"]
   * #swagger.description = "賣家修改訂單"
   * #swagger.security = [{
      "apiKeyAuth":[]
      }]
   * #swagger.parameters['body'] = {
      in: "body",
      required: true,
      type: "Object",
      description: "訂單資料",
      schema: {
        $orderId: "adfzcsdv565sadf",
        $status: "已出貨",
      }
    }
    * #swagger.responses[200] = {
        description: '修改訂單成功',
        schema: {
          status: true,
          message: "修改訂單成功",
          data: {
           
          }
      }      
    }     
   */
  next();
}

export function buyerDeleteOrderSwagger(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  /**
   * #swagger.tags = ["Order-訂單"]
   * #swagger.description = "刪除訂單"
   * #swagger.security = [{
      "apiKeyAuth":[]
      }]
   * #swagger.parameters['body'] = {
      in: "body",
      required: true,
      type: "Object",
      description: "訂單資料",
      schema: {
        $orderId: "adfzcsdv565sadf",
      }
    }
    * #swagger.responses[200] = {
        description: '刪除訂單成功',
        schema: {
          status: true,
          message: "刪除訂單成功",
          data: {
           
          }
      }      
    }     
   */
  next();
}

export function buyerGetOrderListSwagger(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  /**
   * #swagger.tags = ["Order-訂單"]
   * #swagger.description = "取得訂單列表"
   * #swagger.security = [{
      "apiKeyAuth":[]
      }]
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
        description: '取得訂單列表成功',
        schema: {
          status: true,
          message: "取得訂單列表成功",
          data: {
           
          }
      }      
    }     
   */
  next();
}

export function sellerGetOrderListSwagger(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  /**
   * #swagger.tags = ["Order-訂單"]
   * #swagger.description = "賣家取得訂單列表"
   * #swagger.security = [{
      "apiKeyAuth":[]
      }]
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
        description: '取得訂單列表成功',
        schema: {
          status: true,
          message: "取得訂單列表成功",
          data: {
           
          }
      }      
    }     
   */
  next();
}
