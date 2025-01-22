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
    .custom((value, { req }) => {
      if (req.query?.maxPrice) {
        if (Number(value) > Number(req.query.maxPrice)) {
          throw new Error("minPrice 不得大於 maxPrice");
        }
      }
      if (value === null || value === "null") {
        return true; // 接受 null 或 "null"
      }
      if (!Number.isInteger(Number(value)) || Number(value) < 1) {
        throw new Error("minPrice 必須是正整數或 null");
      }
      return true;
    }),
  query("maxPrice")
    .optional()
    .custom((value, { req }) => {
      if (req.query?.minPrice) {
        if (Number(value) < Number(req.query.minPrice)) {
          throw new Error("maxPrice 不得小於 minPrice");
        }
      }
      if (value === null || value === "null") {
        return true; // 接受 null 或 "null"
      }
      if (!Number.isInteger(Number(value)) || Number(value) < 1) {
        throw new Error("maxPrice 必須是正整數或 null");
      }
      return true;
    })
];
