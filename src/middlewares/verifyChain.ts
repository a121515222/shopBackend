import { query } from "express-validator";

export const productSearchQueryChain = [
  query("page").optional().isInt({ min: 1 }).withMessage("page 必須是正整數"),
  query("limit").optional().isInt({ min: 1 }).withMessage("limit 必須是正整數"),
  query("search")
    .optional()
    .isString()
    .isLength({ max: 50 })
    .withMessage("search 字串長度不得超過 50"),
  query("minPrice")
    .optional()
    .isInt({ min: 1 })
    .withMessage("minPrice 必須是正整數"),
  query("maxPrice")
    .optional()
    .isInt({ min: 1 })
    .withMessage("maxPrice 必須是正整數")
];
