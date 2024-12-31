import type { NextFunction, Request, Response } from "express";
import { Order } from "@/models/order";
import { Cart } from "@/models/cart";
import { Product } from "@/models/product";
import appErrorHandler from "@/utils/appErrorHandler";
import appSuccessHandler from "@/utils/appSuccessHandler";
import { handlePagination } from "@/utils/paginationHandler";
import checkMissingFields from "@/utils/checkMissingFields";
import mongoose from "mongoose";
const buyerAddOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.headers.userId as string;
  const { sellerId, cartId, address, tel, email, username, buyerMessage } =
    req.body;
  const missingFields = checkMissingFields({
    sellerId,
    cartId,
    address,
    tel,
    email,
    username
  });

  if (missingFields.length > 0) {
    appErrorHandler(400, `缺少: ${missingFields.join(", ")}`, next);
    return;
  }
  const cart = await Cart.findOne({ _id: cartId, userId }).select(
    " productList totalPrice couponId"
  );
  if (!cart) {
    appErrorHandler(400, "找不到此購物車", next);
    return;
  }
  const { productList, totalPrice, couponId } = cart;
  const order = await Order.create({
    buyerId: userId,
    sellerId,
    cartId,
    totalPrice,
    productList,
    status: "unpaid",
    address,
    tel,
    email,
    username,
    buyerMessage,
    couponId
  });
  const productBulkOperate = productList.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.productId }, // 匹配 productId
        update: { $inc: { num: -item.num } } // 動態調整數量
      }
    };
  });
  if (!order) {
    appErrorHandler(500, "新增訂單失敗", next);
    return;
  } else {
    // 批量更新商品庫存
    await Product.bulkWrite(productBulkOperate);
    // 刪除購物車
    await Cart.findByIdAndDelete(cartId);
    appSuccessHandler(201, "新增訂單成功", order, res);
  }
};
const buyerEditOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.headers.userId as string;
  const { orderId, address, tel, buyerMessage } = req.body;
  if (address) {
  }
  const updatedOrder = await Order.findOneAndUpdate(
    { _id: orderId, buyerId: userId },
    { address, tel, buyerMessage },
    { new: true }
  );
  if (!updatedOrder) {
    appErrorHandler(500, "更新訂單失敗", next);
    return;
  } else {
    appSuccessHandler(200, "更新訂單成功", updatedOrder, res);
  }
};
interface sellerEditOrder {
  status: string;
  isPaid?: boolean;
}
const sellerEditOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const sellerId = req.headers.userId as string;
  const { orderId, status } = req.body;
  const updateData: sellerEditOrder = { status };
  if (status === "paid") {
    updateData.isPaid = true;
  }
  if (status === "unpaid") {
    updateData.isPaid = false;
  }
  const updatedOrder = await Order.findOneAndUpdate(
    { _id: orderId, sellerId },
    updateData,
    { new: true }
  );
  if (!updatedOrder) {
    appErrorHandler(500, "更新訂單失敗", next);
    return;
  } else {
    appSuccessHandler(200, "更新訂單成功", updatedOrder, res);
  }
};

const buyerDeleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.headers.userId as string;
  const orderId = req.params.orderId;
  const order = await Order.findOne({ _id: orderId, userId });

  if (!order) {
    throw new Error("訂單不存在");
  }
  if (order.status !== "unpaid" && order.status !== "cancelled") {
    // 假設狀態欄位名稱是 `status`，並且確認狀態為 `confirmed`
    throw new Error("訂單已確認，無法刪除");
  }
  const deleteOrder = await Order.findOneAndDelete({ _id: orderId, userId });
  if (!deleteOrder) {
    appErrorHandler(400, "找不到此訂單", next);
    return;
  } else {
    const productBulkOperate = deleteOrder.productList.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.productId }, // 匹配 productId
          update: { $inc: { num: item.num } } // 動態調整數量
        }
      };
    });
    // 批量更新商品庫存
    await Product.bulkWrite(productBulkOperate);
    appSuccessHandler(200, "刪除訂單成功", order, res);
  }
};

const buyerGetOrderList = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.headers.userId as string;
  let page: number | undefined = req.query.page
    ? parseInt(req.query.page as string)
    : 1;
  let limit: number | undefined = req.query.limit
    ? Number(req.query.limit)
    : undefined;
  page = page || 1;
  limit = limit || 10;
  const skip = (page - 1) * limit;

  const totalCount = await Order.countDocuments({ buyerId: userId });
  const pagination = handlePagination(page, limit, totalCount);
  const orderList = await Order.aggregate([
    { $match: { buyerId: new mongoose.Types.ObjectId(userId) } }, // 匹配條件在aggregate中要確認是不是ObjectId
    { $skip: skip }, // 跳過指定數量的文檔（分頁）
    { $limit: limit }, // 限制返回的文檔數量
    {
      $lookup: {
        from: "users", // 關聯的集合名稱（User 的集合名，通常小寫且復數）
        localField: "sellerId", // Order 集合中的字段
        foreignField: "_id", // User 集合中的字段
        as: "sellerInfo" // 關聯結果存儲的字段名稱
      }
    },
    {
      $unwind: "$sellerInfo" // 展平關聯結果，如果確定每個訂單對應一個賣家
    },
    {
      $lookup: {
        from: "coupons",
        localField: "couponId",
        foreignField: "_id",
        as: "couponInfo"
      }
    },
    {
      $unwind: {
        path: "$couponInfo",
        preserveNullAndEmptyArrays: true // 允许空数组，结果为 null
      }
    },
    {
      $addFields: {
        "couponInfo.couponId": "$couponId"
      }
    },
    {
      $project: {
        _id: 1, // 保留訂單的 `_id`
        userId: 1, // 保留用戶 ID
        sellerId: 1, // 保留賣家 ID
        productList: 1, // 保留訂單內的 `productList`
        createdAt: 1, // 保留訂單的 `createdAt`
        paidDate: 1, // 保留訂單的 `paidDate`
        status: 1, // 保留訂單的 `status`
        isPaid: 1, // 保留訂單的 `isPaid`
        totalPrice: 1, // 保留訂單的 `totalPrice`
        buyerMessage: 1, // 保留訂單的 `buyerMessage`
        couponInfo: {
          code: 1,
          discount: 1,
          expireDate: 1,
          title: 1,
          couponId: 1
        },
        sellerInfo: {
          tel: 1,
          email: 1,
          username: 1
        }
      }
    }
  ]);

  if (!orderList) {
    appErrorHandler(400, "找不到訂單", next);
    return;
  } else {
    appSuccessHandler(200, "取得訂單列表成功", { orderList, pagination }, res);
  }
};

const buyerGetOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.headers.userId as string;
  const orderId = req.params.orderId;
  const order = await Order.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(orderId),
        buyerId: new mongoose.Types.ObjectId(userId)
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "sellerId",
        foreignField: "_id",
        as: "sellerInfo"
      }
    },
    {
      $unwind: "$sellerInfo"
    },
    {
      $lookup: {
        from: "coupons",
        localField: "couponId",
        foreignField: "_id",
        as: "couponInfo"
      }
    },
    {
      $unwind: {
        path: "$couponInfo",
        preserveNullAndEmptyArrays: true // 允许空数组，结果为 null
      }
    },
    {
      $addFields: {
        "buyerInfo.address": "$address", // 將訂單內的 `address` 添加到 `buyerInfo` 中
        "buyerInfo.tel": "$tel", // 將訂單內的 `tel` 添加到 `buyerInfo` 中
        "buyerInfo.email": "$email", // 將訂單內的 `email` 添加到 `buyerInfo` 中
        "buyerInfo.username": "$username", // 將訂單內的 `username` 添加到 `buyerInfo` 中
        "buyerInfo.buyerMessage": "$buyerMessage", // 將訂單內的 `buyerMessage` 添加到 `buyerInfo` 中
        "sellerInfo.sellerId": "$sellerId",
        "couponInfo.couponId": "$couponId"
      }
    },
    {
      $project: {
        _id: 1,
        buyerId: 1,
        productList: 1,
        createdAt: 1,
        paidDate: 1,
        status: 1,
        isPaid: 1,
        totalPrice: 1,
        sellerInfo: {
          tel: 1,
          email: 1,
          username: 1
        },
        couponInfo: {
          code: 1,
          discount: 1,
          expireDate: 1,
          title: 1,
          couponId: 1
        },
        buyerInfo: {
          address: 1,
          tel: 1,
          email: 1,
          username: 1,
          buyerMessage: 1
        }
      }
    }
  ]);
  if (!order) {
    appErrorHandler(400, "找不到訂單", next);
    return;
  } else {
    appSuccessHandler(200, "取得訂單成功", order[0], res);
  }
};

const sellerGetOrderList = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.headers.userId as string;
  let page: number | undefined = req.query.page
    ? parseInt(req.query.page as string)
    : 1;
  let limit: number | undefined = req.query.limit
    ? Number(req.query.limit)
    : undefined;
  page = page || 1;
  limit = limit || 10;
  const skip = (page - 1) * limit;

  const totalCount = await Order.countDocuments({ sellerId: userId });
  const pagination = handlePagination(page, limit, totalCount);
  const orderList = await Order.aggregate([
    { $match: { sellerId: new mongoose.Types.ObjectId(userId) } }, // 匹配條件在aggregate中要確認是不是ObjectId
    { $skip: skip }, // 跳過指定數量的文檔（分頁）
    { $limit: limit }, // 限制返回的文檔數量
    {
      $lookup: {
        from: "users", // 關聯的集合名稱（User 的集合名，通常小寫且復數）
        localField: "buyerId", // Order 集合中的字段
        foreignField: "_id", // User 集合中的字段
        as: "buyerInfo" // 關聯結果存儲的字段名稱
      }
    },
    {
      $unwind: "$buyerInfo" // 展平關聯結果，如果確定每個訂單對應一個賣家
    },
    {
      $lookup: {
        from: "coupons",
        localField: "couponId",
        foreignField: "_id",
        as: "couponInfo"
      }
    },
    {
      $unwind: {
        path: "$couponInfo",
        preserveNullAndEmptyArrays: true // 允许空数组，结果为 null
      }
    },
    {
      $addFields: {
        "buyerInfo.address": "$address", // 將訂單內的 `address` 添加到 `buyerInfo` 中
        "buyerInfo.tel": "$tel", // 將訂單內的 `tel` 添加到 `buyerInfo` 中
        "buyerInfo.email": "$email", // 將訂單內的 `email` 添加到 `buyerInfo` 中
        "buyerInfo.username": "$username", // 將訂單內的 `username` 添加到 `buyerInfo` 中
        "buyerInfo.buyerMessage": "$buyerMessage", // 將訂單內的 `buyerMessage` 添加到 `buyerInfo` 中
        "couponInfo.couponId": "$couponId"
      }
    },
    {
      $project: {
        _id: 1, // 保留訂單的 `_id`
        userId: 1, // 保留用戶 ID
        sellerId: 1, // 保留賣家 ID
        productList: 1, // 保留訂單內的 `productList`
        createdAt: 1, // 保留訂單的 `createdAt`
        paidDate: 1, // 保留訂單的 `paidDate`
        status: 1, // 保留訂單的 `status`
        isPaid: 1, // 保留訂單的 `isPaid`
        totalPrice: 1, // 保留訂單的 `totalPrice`
        couponInfo: {
          code: 1,
          discount: 1,
          expireDate: 1,
          title: 1,
          couponId: 1
        },
        buyerInfo: {
          address: 1,
          tel: 1,
          email: 1,
          username: 1,
          buyerMessage: 1
        }
      }
    }
  ]);
  if (!orderList) {
    appErrorHandler(400, "找不到訂單", next);
    return;
  } else {
    appSuccessHandler(200, "取得訂單成功", { orderList, pagination }, res);
  }
};

export {
  buyerAddOrder,
  buyerEditOrder,
  sellerEditOrder,
  buyerDeleteOrder,
  buyerGetOrderList,
  buyerGetOrder,
  sellerGetOrderList
};
