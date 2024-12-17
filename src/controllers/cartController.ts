import type { NextFunction, Request, Response } from "express";
import type { Types } from "mongoose";
import type { ProductType } from "@/types/productTypes";
import appErrorHandler from "@/utils/appErrorHandler";
import appSuccessHandler from "@/utils/appSuccessHandler";
import checkMissingFields from "@/utils/checkMissingFields";
import { Coupon } from "@/models/coupon";
import { Cart } from "@/models/cart";
import { Product } from "@/models/product";
import { handlePagination } from "@/utils/paginationHandler";

const postUserAddCart = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.headers.userId as string;
  const sellerId = req.body.sellerId;
  const { productId, num } = req.body;

  const missingFields = checkMissingFields({
    sellerId,
    userId,
    productId,
    num
  });

  if (missingFields.length > 0) {
    appErrorHandler(400, `缺少: ${missingFields.join(", ")}`, next);
    return;
  }

  const productInfo = await findProductAndValidate(productId, num, next);
  if (!productInfo) {
    appErrorHandler(400, "找不到此商品", next);
    return;
  }

  const { product, productSellPrice } = productInfo;

  let cart = await Cart.findOne({ userId, sellerId });
  if (cart) {
    // 更新購物車
    const cardId = cart._id;
    cart = await updateCart(cardId, product, productSellPrice, num, next);
  } else {
    // 新增購物車
    cart = await createNewCart(
      userId,
      sellerId,
      product,
      productSellPrice,
      num,
      next
    );
  }

  if (!cart) return;

  appSuccessHandler(201, "新增購物車成功", cart, res);
};

const findProductAndValidate = async (
  productId: Types.ObjectId,
  buyNum: number,
  next: NextFunction
) => {
  const product = await Product.findById(productId);
  if (!product) {
    appErrorHandler(404, "查無商品", next);
    return null;
  }
  if (product.price === null) {
    appErrorHandler(400, "商品價格為空", next);
    return null;
  }
  if (product.num === 0 || buyNum > product.num) {
    appErrorHandler(400, "商品庫存不足", next);
    return null;
  }
  const productSellPrice = (product.price * product.discount) / 100;
  return { product, productSellPrice };
};

const updateCart = async (
  cartId: Types.ObjectId,
  product: Partial<ProductType>,
  productSellPrice: number,
  num: number,
  next: NextFunction
) => {
  const { _id } = product;
  const updatedCart = await Cart.findOneAndUpdate(
    { _id: cartId, "productList.productId": _id },
    {
      $inc: {
        "productList.$.num": num, // 將 num 加上新數量
        totalPrice: productSellPrice * num // 更新 totalPrice
      }
    },
    { new: true }
  );
  if (!updatedCart) {
    const newCart = await Cart.findOneAndUpdate(
      { _id: cartId },
      {
        $addToSet: {
          productList: {
            productId: product._id,
            num,
            title: product.title,
            price: product.price,
            discount: product.discount,
            imageUrl: product.imageUrl,
            productSellPrice
          }
        },
        $inc: { totalPrice: productSellPrice * num }
      },
      { new: true }
    );

    if (!newCart) {
      appErrorHandler(500, "新增購物車商品失敗", next);
      return null;
    }
    return newCart;
  }

  return updatedCart;
};

const createNewCart = async (
  userId: string,
  sellerId: string,
  product: any,
  productSellPrice: number,
  num: number,
  next: NextFunction
) => {
  const newCart = await Cart.create({
    userId,
    sellerId,
    totalPrice: productSellPrice * num,
    productList: [
      {
        productId: product._id,
        num,
        title: product.title,
        price: product.price,
        discount: product.discount,
        imageUrl: product.imageUrl,
        productSellPrice
      }
    ]
  });

  if (!newCart) {
    appErrorHandler(500, "新增購物車失敗", next);
    return null;
  }

  return newCart;
};

const getUserCart = async (
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
  const carts = await Cart.find({ userId }).skip(skip).limit(limit);

  appSuccessHandler(200, "取得購物車成功", carts, res);
};

const putUserCart = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.headers.userId as string;
  const { cartId, productId, num, isDeleteProduct } = req.body;
  if (!cartId) {
    appErrorHandler(400, "缺少 cartId", next);
    return;
  }
  if (!productId) {
    appErrorHandler(400, "缺少 productId", next);
    return;
  }
  if (isDeleteProduct) {
    const updateCart = await deleteProductFromCart(
      userId,
      cartId,
      productId,
      next
    );
    if (!updateCart) {
      appErrorHandler(500, "刪除商品失敗", next);
      return;
    }
    appSuccessHandler(200, "刪除商品成功", updateCart, res);
  }
  if (!num || num <= 0) {
    appErrorHandler(400, "缺少產品數量或產品數量不能為0", next);
    return;
  }
};
const deleteProductFromCart = async (
  userId: string,
  cartId: string,
  productId: string,
  next: NextFunction
) => {
  const productInfoInCart = await Cart.find({
    _id: cartId,
    userId,
    "productList.productId": productId
  }).select("productList");
  if (!productInfoInCart) {
    appErrorHandler(400, "找不到商品", next);
    return null;
  }
  const { num, productSellPrice } = productInfoInCart[0].productList[0];
  const cart = await Cart.findOneAndUpdate(
    { _id: cartId, userId }, // 指定 cartId 來匹配要修改的文件
    {
      $inc: {
        totalPrice: -1 * num * productSellPrice // 更新 totalPrice
      },
      $pull: {
        productList: { productId: productId } // 從 productList 陣列中刪除符合條件的元素
      }
    },
    { new: true }
  ); // 返回更新後的文件);

  return cart;
};

const deleteCart = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.headers.userId as string;
  const cart = await Cart.findOneAndDelete({ userId });
  if (!cart) {
    appErrorHandler(404, "找不到購物車", next);
    return;
  }
  appSuccessHandler(200, "刪除購物車成功", cart, res);
};

export { postUserAddCart, getUserCart, putUserCart, deleteCart };
