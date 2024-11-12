import { Request, Response, NextFunction, Router } from "express";
import { type RequestHandler, type Handler } from "express";
import asyncErrorHandler from "@/middlewares/asyncErrorHandler";
import { signIn } from "@/controllers/signInController";
const router = Router();

router.post("/signIn", asyncErrorHandler(signIn) as RequestHandler);
router.get("/logIn", (req: Request, res: Response) => {
  res.send("Hello, signIn!");
});
export default router;
