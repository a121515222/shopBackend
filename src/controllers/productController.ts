import type { NextFunction, Request, Response } from "express";
import type { ProductType } from "@/types/productTypes";
import appErrorHandler from "@/utils/appErrorHandler";
import appSuccessHandler from "@/utils/appSuccessHandler";
import checkMissingFields from "@/utils/checkMissingFields";
import { Product } from "@/models/product";
import { handlePagination } from "@/utils/paginationHandler";
const postUserProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.params.userId ?? req.body.userId;
  const {
    title,
    description,
    price,
    discount,
    imagesUrl,
    imageUrl,
    category,
    content,
    tag,
    productStatus,
    num,
    unit
  } = req.body;
  const missingFields = checkMissingFields({
    userId
  });
  if (missingFields.length > 0) {
    const missingFieldsMsg = `缺少userId: ${missingFields.join(", ")}`;
    appErrorHandler(400, missingFieldsMsg, next);
    return;
  }
  const newProduct = await Product.create({
    userId,
    title,
    description,
    price,
    discount,
    imagesUrl,
    imageUrl,
    category,
    content,
    tag,
    productStatus,
    num,
    unit
  });
  if (!newProduct) {
    appErrorHandler(500, "新增商品失敗", next);
    return;
  } else {
    appSuccessHandler(201, "新增商品成功", newProduct, res);
  }
};

const getAllUserProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.params.userId;
  let page: number | undefined = req.query.page
    ? Number(req.query.page)
    : undefined;
  let limit: number | undefined = req.query.limit
    ? Number(req.query.limit)
    : undefined;
  if (!userId) {
    appErrorHandler(400, "缺少 userId", next);
    return;
  }
  page = page || 1;
  limit = limit || 10;

  const findProductById = await Product.find({ userId: userId })
    .skip((page - 1) * limit)
    .limit(limit);
  const getTotal = await Product.find({ userId: userId }).countDocuments();
  const [products, totalCount] = await Promise.all([findProductById, getTotal]);
  const pagination = handlePagination(page, limit, totalCount);
  appSuccessHandler(200, "查詢成功", { products, pagination }, res);
};

const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const productId = req.params.id;
  if (!productId) {
    appErrorHandler(400, "缺少 productId", next);
    return;
  }
  const product = await Product.findById(productId);
  if (!product) {
    appErrorHandler(404, "查無此商品", next);
    return;
  }
  appSuccessHandler(200, "查詢成功", product, res);
};

const updateUserProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const productId = req.params.id ?? req.body.id;
  const userId = req.headers.userId;
  if (!productId) {
    appErrorHandler(400, "缺少 productId", next);
    return;
  }
  if (!userId) {
    appErrorHandler(400, "缺少 userId", next);
    return;
  }
  let updateProductData: Partial<ProductType> = {};
  const {
    title,
    description,
    price,
    discount,
    imagesUrl,
    imageUrl,
    category,
    content,
    tag,
    num
  } = req.body;
  if (title) {
    updateProductData.title = title;
  }
  if (description) {
    updateProductData.description = description;
  }
  if (price) {
    updateProductData.price = price;
  }
  if (discount) {
    updateProductData.discount = discount;
  }
  if (imagesUrl.length > 0) {
    updateProductData.imagesUrl = imagesUrl;
  }
  if (imageUrl) {
    updateProductData.imageUrl = imageUrl;
  }
  if (category.length > 0) {
    updateProductData.category = category;
  }
  if (content) {
    updateProductData.content = content;
  }
  if (num) {
    updateProductData.num;
  }
  if (tag.length > 0) {
    updateProductData.tag = tag;
  }
  const updateProduct = await Product.findOneAndUpdate(
    {
      _id: productId,
      userId
    },
    updateProductData,
    { new: true }
  );
  if (!updateProduct) {
    appErrorHandler(500, "更新失敗", next);
    return;
  } else {
    appSuccessHandler(200, "更新成功", updateProduct, res);
  }
};

const deleteUserProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const productId = req.params.id ?? req.body.id;
  const userId = req.headers.userId;
  if (!productId) {
    appErrorHandler(400, "缺少 productId", next);
    return;
  }
  const deleteProduct = await Product.findOneAndDelete({
    _id: productId,
    userId
  });
  if (!deleteProduct) {
    appErrorHandler(500, "刪除失敗", next);
    return;
  } else {
    appSuccessHandler(200, "刪除成功", deleteProduct, res);
  }
};

export {
  postUserProduct,
  getAllUserProducts,
  getProductById,
  updateUserProduct,
  deleteUserProduct
};
