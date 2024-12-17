import type { NextFunction, Request, Response } from "express";
import appErrorHandler from "@/utils/appErrorHandler";
import appSuccessHandler from "@/utils/appSuccessHandler";
import checkMissingFields from "@/utils/checkMissingFields";
import { Coupon, type CouponSchema } from "@/models/coupon";
import { handlePagination } from "@/utils/paginationHandler";

const createCoupon = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { discount, code, expireDate, isPublic, couponNum } = req.body;
  const userId = req.headers.userId;
  const missingFields = checkMissingFields({
    discount,
    code,
    expireDate,
    couponNum
  });
  if (missingFields.length > 0) {
    const missingFieldsMsg = `缺少: ${missingFields.join(", ")}`;
    appErrorHandler(400, missingFieldsMsg, next);
    return;
  }
  const newCoupon = await Coupon.create({
    userId,
    discount,
    code,
    expireDate: new Date(expireDate),
    isPublic,
    couponNum
  });
  if (!newCoupon) {
    appErrorHandler(500, "新增優惠券失敗", next);
    return;
  } else {
    appSuccessHandler(201, "新增優惠券成功", newCoupon, res);
  }
};

const getUserCreateCoupon = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.headers.userId;
  let page: number | undefined = req.query.page
    ? parseInt(req.query.page as string)
    : 1;
  let limit: number | undefined = req.query.limit
    ? Number(req.query.limit)
    : undefined;
  page = page || 1;
  limit = limit || 10;
  const skip = (page - 1) * limit;
  const coupons = await Coupon.find({ userId: userId }).skip(skip).limit(limit);
  const totalCount = await Coupon.find({ userId: userId }).countDocuments();
  const pagination = handlePagination(page, limit, totalCount);
  appSuccessHandler(200, "取得優惠券成功", { coupons, pagination }, res);
};

const getCouponById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const couponId = req.params.couponId;
  const coupon = await Coupon.findById(couponId);
  if (!coupon) {
    appErrorHandler(404, "找不到該優惠券", next);
    return;
  }
  appSuccessHandler(200, "取得優惠券成功", coupon, res);
};

const putUserCoupon = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const couponId = req.params.couponId;
  const { discount, code, expireDate, isPublic, couponNum } = req.body;
  const updateCouponData: Partial<CouponSchema> = {};
  if (discount) {
    if (discount <= 0) {
      appErrorHandler(400, "折扣不能為負數或0", next);
      return;
    }
    updateCouponData.discount = discount;
  }
  if (code) {
    updateCouponData.code = code;
  }
  if (expireDate) {
    updateCouponData.expireDate = new Date(expireDate);
  }
  if (isPublic) {
    updateCouponData.isPublic = isPublic;
  }
  if (couponNum) {
    updateCouponData.couponNum = couponNum;
  }
  const updateCoupon = await Coupon.findByIdAndUpdate(
    couponId,
    updateCouponData,
    { new: true }
  );
  if (!updateCoupon) {
    appErrorHandler(404, "找不到該優惠券", next);
    return;
  }
  appSuccessHandler(200, "更新優惠券成功", updateCoupon, res);
};

const deleteCoupon = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const couponId = req.params.couponId;
  const deleteCoupon = await Coupon.findByIdAndDelete(couponId);
  if (!deleteCoupon) {
    appErrorHandler(404, "找不到該優惠券", next);
    return;
  }
  appSuccessHandler(200, "刪除優惠券成功", deleteCoupon, res);
};

export {
  createCoupon,
  getUserCreateCoupon,
  getCouponById,
  putUserCoupon,
  deleteCoupon
};
