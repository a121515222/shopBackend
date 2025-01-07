import type { NextFunction, Request, Response } from "express";
import appErrorHandler from "@/utils/appErrorHandler";
import appSuccessHandler from "@/utils/appSuccessHandler";
import { Comment } from "@/models/comment";
import { User } from "@/models/user";
import { Order } from "@/models/order";
const buyerAddComment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.headers.userid;
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
  const buyerComment = await Comment.create({
    sellerId,
    userId,
    comment,
    score
  });
  if (buyerComment) {
    appSuccessHandler(200, "新增評論成功", buyerComment, res);
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

export { buyerAddComment };
