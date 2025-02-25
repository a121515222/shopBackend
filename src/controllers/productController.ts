import type { NextFunction, Request, Response } from "express";
import type { ProductType } from "@/types/productTypes";
import appErrorHandler from "@/utils/appErrorHandler";
import appSuccessHandler from "@/utils/appSuccessHandler";
import checkMissingFields from "@/utils/checkMissingFields";
import { Product } from "@/models/product";
import { handlePagination } from "@/utils/paginationHandler";
import mongoose from "mongoose";
const postUserProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.headers.userId;
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
  if (discount >= price) {
    appErrorHandler(400, "折扣價格不可高於原價", next);
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
  const userId = req.headers.userId;
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
  const product = await Product.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(productId) }
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "sellerInfo"
      }
    },
    {
      $unwind: "$sellerInfo"
    },
    {
      $project: {
        userId: 1,
        title: 1,
        price: 1,
        discount: 1,
        imagesUrl: 1,
        imageUrl: 1,
        category: 1,
        tag: 1,
        content: 1,
        unit: 1,
        productStatus: 1,
        num: 1,
        "sellerInfo.username": 1,
        "sellerInfo.email": 1,
        "sellerInfo.tel": 1,
        "sellerInfo.averageScore": 1
      }
    }
  ]);
  if (product.length === 0) {
    appErrorHandler(404, "查無此商品", next);
    return;
  }
  appSuccessHandler(200, "查詢成功", product[0], res);
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
    num,
    productStatus,
    unit
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
    if (discount >= price) {
      appErrorHandler(400, "折扣價格不可高於原價", next);
      return;
    } else {
      updateProductData.discount = discount;
    }
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
    updateProductData.num = num;
  }
  if (tag.length > 0) {
    updateProductData.tag = tag;
  }
  if (unit) {
    updateProductData.unit = unit;
  }
  if (productStatus) {
    updateProductData.productStatus = productStatus;
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

const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { page, limit, search, minPrice, maxPrice } = req.query;
  let pageNumber: number = page ? Number(page) : 1;
  let limitNumber: number = limit ? Number(limit) : 10;
  const query: Record<string, any> = {};
  if (search) {
    const keywords = (search as string).split(" ").filter(Boolean); // 後面的filter可以去除"空字串" 0 false null undefined
    query.$or = keywords.map((keyword) => ({
      $or: [
        { name: { $regex: keyword, $options: "i" } }, //i是忽略大小寫
        { description: { $regex: keyword, $options: "i" } },
        { category: { $regex: keyword, $options: "i" } },
        { tag: { $regex: keyword, $options: "i" } }
      ]
    }));
  }
  if (
    (minPrice !== undefined && minPrice !== null && minPrice !== "null") ||
    (maxPrice !== undefined && maxPrice !== null && maxPrice !== "null")
  ) {
    query.price = {};
  }
  if (minPrice !== undefined && minPrice !== null && minPrice !== "null") {
    query.price = { $gte: Number(minPrice) };
  }
  if (maxPrice !== undefined && maxPrice !== null && maxPrice !== "null") {
    if (query.price.$gte) {
      query.price.$lte = Number(maxPrice);
    } else {
      query.price = { $lte: Number(maxPrice) };
    }
  }
  // 產品狀態未上架就不傳出去
  query.productStatus = { $ne: "notListed" };
  const findProduct = await Product.aggregate([
    {
      $match: query
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "sellerInfo"
      }
    },
    {
      $unwind: "$sellerInfo"
    },
    {
      $project: {
        userId: 1,
        title: 1,
        price: 1,
        discount: 1,
        imagesUrl: 1,
        imageUrl: 1,
        category: 1,
        tag: 1,
        content: 1,
        unit: 1,
        productStatus: 1,
        num: 1,
        "sellerInfo.username": 1,
        "sellerInfo.email": 1,
        "sellerInfo.tel": 1,
        "sellerInfo.averageScore": 1
      }
    },
    {
      $skip: (pageNumber - 1) * limitNumber
    },
    {
      $limit: limitNumber
    }
  ]);
  const getTotal = await Product.find(query).countDocuments();

  const [products, totalCount] = await Promise.all([findProduct, getTotal]);

  const pagination = handlePagination(pageNumber, limitNumber, totalCount);
  appSuccessHandler(200, "查詢成功", { products, pagination }, res);
};
export {
  postUserProduct,
  getAllUserProducts,
  getProductById,
  getProducts,
  updateUserProduct,
  deleteUserProduct
};
