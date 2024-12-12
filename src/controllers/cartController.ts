import type { NextFunction, Request, Response } from "express";
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
  const userId = req.params.userId ?? req.body.userId;
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
  if (!productInfo) return;

  const { product, productSellPrice } = productInfo;

  let cart = await Cart.findOne({ userId, sellerId });

  if (cart) {
    // 更新購物車
    cart = await updateCart(cart, product, productSellPrice, num, next);
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
  productId: string,
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
  cart: any,
  product: any,
  productSellPrice: number,
  num: number,
  next: NextFunction
) => {
  const updatedCart = await Cart.findOneAndUpdate(
    { _id: cart._id },
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
      $inc: {
        totalPrice: productSellPrice * num
      }
    },
    { new: true }
  );

  if (!updatedCart) {
    appErrorHandler(500, "更新購物車失敗", next);
    return null;
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
export { postUserAddCart };
