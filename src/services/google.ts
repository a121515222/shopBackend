import {
  Strategy as GoogleStrategy,
  type Profile,
  type VerifyCallback
} from "passport-google-oauth20";
import type { LoginResData, LoginBody } from "@/types/logInTypes";
import type { Express, Request, Response, NextFunction } from "express";
import passport from "passport";
import appErrorHandler from "@/utils/appErrorHandler";
// import bcrypt from "bcrypt";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import { generateJWT } from "@/utils/generateJWT";
import nodemailer from "nodemailer";
import { User } from "@/models/user";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
interface GoogleProfile {
  sub: string;
  name: string;
  given_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
}
export const setupAuth = (app: Express) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_OAUTH_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
        callbackURL: process.env.GOOGLE_OAUTH_REDIRECT_URI!
      },
      (
        _accessToken: string,
        _refreshToken: string,
        profile: Profile,
        done: VerifyCallback
      ) => {
        // 取得使用者資料
        const googleProfile: GoogleProfile = profile._json as GoogleProfile;

        // 傳遞使用者資料
        done(null, googleProfile);
      }
    )
  );
};
const googleAuthenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  passport.authenticate("google", {
    scope: [
      "profile",
      "email",
      "https://www.googleapis.com/auth/user.birthday.read"
    ]
  })(req, res, next);
};

const googleCallback = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  passport.authenticate(
    "google",
    { session: false },
    async (err, user, _info) => {
      if (err) {
        appErrorHandler(500, "Google 驗證失敗", next);
      }
      if (!user) {
        appErrorHandler(401, "取得使用者資訊失敗", next);
      }

      let userResData;

      // 檢查使用者是否存在
      const userExist = await User.findOne({
        email: user.email
      });
      // 若使用者存在，則回傳使用者資料
      if (userExist) {
        userResData = userExist;

        // 產生 token
        let jwtPayload: LoginResData = {
          userId: userResData._id,
          email: userResData.email,
          name: userResData.username,
          gender: userResData.gender ?? "",
          birthday: userResData.birthday,
          rank: userResData.rank ?? "normal",
          token: ""
        };
        const token = generateJWT(jwtPayload);
        const logInToken = await User.findByIdAndUpdate(
          { _id: userExist._id },
          { logInVerifyToken: token }
        ).select("logInVerifyToken");

        jwtPayload = {
          ...jwtPayload,
          token
        };
        if (!logInToken) {
          res.redirect(
            `https://${
              process.env.NODE_ENV === "dev"
                ? "localhost:3000"
                : process.env.FRONT_DOMAIN
            }/login`
          );
          return;
        } else {
          res.cookie("authorization", token, {
            httpOnly: false, // 保護 cookie 免受 JavaScript 訪問
            secure: true, // 只有在 HTTPS 連線下傳送
            sameSite: "none"
          });
          res.cookie("userId", logInToken._id.toString(), {
            httpOnly: false, // JavaScript 可以訪問（如果需要在前端讀取）
            secure: true, // 只有在 HTTPS 連線下傳送
            sameSite: "none"
          });
          res.redirect(
            `https://${
              process.env.NODE_ENV === "dev"
                ? "localhost:3000"
                : process.env.FRONT_DOMAIN
            }/`
          );
        }
      } else {
        const hashPassword = await bcryptjs.hash(user.email as string, 10);
        const newUser = await User.create({
          username: user.name,
          email: user.email.toLowerCase(),
          birthday: user.birthday,
          password: hashPassword,
          isVerify: true,
          rank: "normal"
        });
        // 轉跳回登入頁
        if (newUser) {
          res.redirect(
            `https://${
              process.env.NODE_ENV === "dev"
                ? "localhost:3000"
                : process.env.FRONT_DOMAIN
            }/login`
          );
        } else {
          appErrorHandler(500, "註冊失敗", next);
        }
      }
    }
  )(req, res);
};
const sendMail = async (
  recipient: string,
  code: { id: string; verifyToken: string },
  isValidate: boolean
): Promise<boolean> => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_MAIL_USER,
      pass: process.env.GOOGLE_MAIL_PASSWORD
    }
  });
  const { id, verifyToken } = code;
  await transporter.verify();

  const mailOptions = {
    from: `\u201C自種自售\u201D帳號管理中心 <${process.env.GOOGLE_SMTP_USER}>`,
    to: recipient,
    subject: "\u201C自種自售\u201D 帳號驗證信件",
    html: `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Verification Email</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
          }
          .container {
            background-color: #fff2f2;
            padding: 20px;
            margin: 0 auto;
            max-width: 600px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            color: #52525b;
          }
          .button {
            background: linear-gradient(96.66deg, #fe839a 9.67%, #4a72ff 112.21%);
            display: block;
            width: fit-content;
            padding: 10px 20px;
            margin: 20px auto;
            color: white !important;
            text-align: center;
            text-decoration: none;
            font-weight: bold;
            border-radius: 99999px;
          }
          .button:hover {
            transform: scale(1.05);
          }
          table {
            width: 100%;
          }
          .centered-content {
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>
            <img
              src="https://ixtbnloabxgtkxigyllw.supabase.co/storage/v1/object/public/images/logo.png"
              alt="自種自售"
            />
          </h1>
          <p>
            這是一封<strong>帳號驗證</strong>的確認信件，請點擊下方按鈕以完成驗證！
          </p>
          <p>如果不記得有申請帳號，請忽略此信件。</p>
          <table>
            <tr>
              <td class="centered-content">
                <img
                  src="https://ixtbnloabxgtkxigyllw.supabase.co/storage/v1/object/public/images/decorate.png"
                  alt="裝飾用圖片"
                />
              </td>
            </tr>
          </table>
          <a
            href="https://${
              process.env.NODE_ENV === "dev"
                ? "localhost:3000"
                : process.env.FRONT_DOMAIN
            }/verifyToken/${id}/${verifyToken}"
            class="button"
            >完成驗證</a
          >
        </div>
      </body>
    </html>
    `
  };

  const forgetPasswordMailOptions = {
    from: `\u201C自種自售\u201D帳號管理中心 <${process.env.GOOGLE_SMTP_USER}>`,
    to: recipient,
    subject: "\u201C自種自售\u201D 密碼重設信件",
    html: `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Reset Password Email</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
          }
          .container {
            background-color: #fff2f2;
            padding: 20px;
            margin: 0 auto;
            max-width: 600px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            color: #52525b;
          }
          .button {
            background: linear-gradient(96.66deg, #fe839a 9.67%, #4a72ff 112.21%);
            display: block;
            width: fit-content;
            padding: 10px 20px;
            margin: 20px auto;
            color: white !important;
            text-align: center;
            text-decoration: none;
            font-weight: bold;
            border-radius: 99999px;
          }
          .button:hover {
            transform: scale(1.05);
          }
          table {
            width: 100%;
          }
          .centered-content {
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>
            <img
              src="https://ixtbnloabxgtkxigyllw.supabase.co/storage/v1/object/public/images/logo.png"
              alt="自種自售"
            />
          </h1>
          <p>
            這是一封<strong>重設密碼</strong>的確認信件，如果需要重設密碼，請點擊下方按鈕立即跳轉！
          </p>
          <p>如果不記得有申請重設密碼，請忽略此信件。</p>
          <table>
            <tr>
              <td class="centered-content">
                <img
                  src="https://ixtbnloabxgtkxigyllw.supabase.co/storage/v1/object/public/images/decorate.png"
                  alt="裝飾用圖片"
                />
              </td>
            </tr>
          </table>
          <a
            href="https://${
              process.env.NODE_ENV === "dev"
                ? "localhost:3000"
                : process.env.FRONT_DOMAIN
            }/forgetPassword/${id}/${verifyToken}"
            class="button"
            >重設密碼</a
          >
        </div>
      </body>
    </html>
    `
  };
  try {
    const options = isValidate ? forgetPasswordMailOptions : mailOptions;
    await transporter.sendMail(options);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

const googleService = {
  setupAuth,
  sendMail,
  googleAuthenticate,
  googleCallback
};

export default googleService;
