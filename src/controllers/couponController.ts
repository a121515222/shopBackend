import type { NextFunction, Request, Response } from "express";
import appErrorHandler from "@/utils/appErrorHandler";
import appSuccessHandler from "@/utils/appSuccessHandler";
import checkMissingFields from "@/utils/checkMissingFields";
import { Coupon } from "@/models/coupon";
import { handlePagination } from "@/utils/paginationHandler";

const createCoupon = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { title, description, discount, code, expireDate, isPublic } = req.body;

  const missingFields = checkMissingFields({
    title,
    description,
    discount,
    code,
    expireDate
  });
  if (missingFields.length > 0) {
    const missingFieldsMsg = `缺少: ${missingFields.join(", ")}`;
    appErrorHandler(400, missingFieldsMsg, next);
    return;
  }
  const newCoupon = await Coupon.create({
    title,
    description,
    discount,
    code,
    expireDate: new Date(expireDate),
    isPublic
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
  const userId = req.params.userId;
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
  const { title, description, discount, code, expireDate, isPublic } = req.body;
  const updateCoupon = await Coupon.findByIdAndUpdate(
    couponId,
    {
      title,
      description,
      discount,
      code,
      expireDate: new Date(expireDate),
      isPublic
    },
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
