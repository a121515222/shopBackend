import type { NextFunction, Request, Response } from "express";
import appErrorHandler from "@/utils/appErrorHandler";
import appSuccessHandler from "@/utils/appSuccessHandler";
import { Comment } from "@/models/comment";
import { User } from "@/models/user";
import { Order } from "@/models/order";
import { handlePagination } from "@/utils/paginationHandler";
import mongoose from "mongoose";
const buyerAddComment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.headers.userId;
  const { sellerId, comment, score, orderId } = req.body;
  if (!sellerId || !comment || !score || !orderId) {
    appErrorHandler(500, "缺少必要資料", next);
    return;
  }
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    appErrorHandler(500, "訂單不存在", next);
    return;
  }
  if (order.status !== "completed") {
    appErrorHandler(500, "訂單尚未完成", next);
    return;
  }
  if (order.isCommented) {
    appErrorHandler(500, "已經評論過了", next);
    return;
  }
  const buyerComment = await Comment.create({
    sellerId,
    userId,
    orderId,
    comment,
    score
  });
  if (buyerComment) {
    appSuccessHandler(200, "新增評論成功", buyerComment, res);
    await Order.findOneAndUpdate({ _id: orderId }, { isCommented: true });
    await User.findOneAndUpdate({ _id: sellerId }, [
      {
        $set: {
          averageScore: {
            $round: [
              // 四捨五入
              {
                $divide: [
                  // 計算平均分數  (評分總和+新評分)/(評分次數+1)
                  {
                    $add: [
                      // 總分數計算
                      {
                        $multiply: [
                          { $ifNull: ["$averageScore", 0] },
                          { $ifNull: ["$commentCount", 0] }
                        ]
                      }, // 如果不存在，默認為 0
                      score
                    ]
                  },
                  { $add: [{ $ifNull: ["$commentCount", 0] }, 1] } // 如果 commentCount 不存在，默認為 0
                ]
              },
              1 // 四捨五入到小數點後 1 位
            ]
          },
          commentCount: { $add: [{ $ifNull: ["$commentCount", 0] }, 1] } // 如果 commentCount 不存在，默認為 0
        }
      }
    ]);
    return;
  } else {
    appErrorHandler(500, "新增評論失敗", next);
    return;
  }
};

const sellerGetComment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const sellerId = req.headers.userId as string;
  let page: number | undefined = req.query.page
    ? parseInt(req.query.page as string)
    : 1;
  let limit: number | undefined = req.query.limit
    ? Number(req.query.limit)
    : undefined;
  page = page || 1;
  limit = limit || 10;
  const skip = (page - 1) * limit;
  const getTotalCount = await Comment.find({ sellerId }).countDocuments();
  const sellerGetCommentList = await Comment.aggregate([
    {
      $match: {
        sellerId: new mongoose.Types.ObjectId(sellerId)
      }
    },
    {
      $lookup: {
        from: "orders",
        localField: "orderId",
        foreignField: "_id",
        as: "orderInfo"
      }
    },
    {
      $set: {
        orderInfo: { $arrayElemAt: ["$orderInfo", 0] } // 将数组格式的 couponInfo 转换为对象
      }
    },
    {
      $skip: skip
    },
    {
      $limit: limit
    },
    {
      $project: {
        _id: 1,
        sellerId: 1,
        userId: 1,
        comment: 1,
        score: 1,
        createdAt: 1,
        orderInfo: 1
      }
    }
  ]);
  const [commentList, totalCount] = await Promise.all([
    sellerGetCommentList,
    getTotalCount
  ]);
  const pagination = handlePagination(page, limit, totalCount);
  appSuccessHandler(200, "取得評論成功", { commentList, pagination }, res);
};

const buyerGetSellerComment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { sellerId } = req.query;
  let page: number | undefined = req.query.page
    ? parseInt(req.query.page as string)
    : 1;
  let limit: number | undefined = req.query.limit
    ? Number(req.query.limit)
    : undefined;
  page = page || 1;
  limit = limit || 10;
  if (!sellerId) {
    appErrorHandler(500, "缺少sellerId", next);
    return;
  }
  const skip = (page - 1) * limit;
  const getTotalCount = await Comment.find({
    sellerId
  }).countDocuments();
  const getSellerCommentList = await Comment.aggregate([
    {
      $match: {
        sellerId: new mongoose.Types.ObjectId(sellerId as string)
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "commenterInfo"
      }
    },
    {
      $set: {
        commenterInfo: { $arrayElemAt: ["$commenterInfo", 0] }
      }
    },
    {
      $skip: skip
    },
    {
      $limit: limit
    },
    {
      $project: {
        _id: 1,
        sellerId: 1,
        comment: 1,
        score: 1,
        createdAt: 1,
        commenterName: "$commenterInfo.username"
      }
    }
  ]);

  const [comments, totalCount] = await Promise.all([
    getSellerCommentList,
    getTotalCount
  ]);
  const pagination = handlePagination(page, limit, totalCount);
  appSuccessHandler(200, "取得賣家評論成功", { comments, pagination }, res);
};

export { buyerAddComment, sellerGetComment, buyerGetSellerComment };
