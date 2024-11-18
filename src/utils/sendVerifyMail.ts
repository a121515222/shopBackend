import nodemailer from "nodemailer";
import { google } from "googleapis";
import axios from "axios";
// 創建 OAuth2 客戶端
const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_OAUTH_CLIENT_ID,
  process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  process.env.GOOGLE_OAUTH_REDIRECT_UR
);
// 設置憑證（含 refresh_token）
oAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_OAUTH_REDIRECT_URI
});
interface TokenInfo {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  obtainedAt: number;
}
const tokenInfo: TokenInfo = {
  accessToken: "",
  refreshToken: process.env.GOOGLE_OAUTH_REFRESH_TOKEN || "",
  expiresIn: 3600, // 1小時
  obtainedAt: Date.now() // 當前的時間戳，表示 token 獲取的時間
};
// 創建傳送器
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.GOOGLE_SMTP_USER,
    clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_OAUTH_REFRESH_TOKEN,
    accessToken: tokenInfo.accessToken
  }
});
const createTransporter = (accessToken: string) => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.GOOGLE_SMTP_USER,
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_OAUTH_REFRESH_TOKEN,
      accessToken: accessToken // 使用最新的 accessToken
    }
  });
};
const isTokenExpired = async (tokenInfo: TokenInfo) => {
  const currentTime = Date.now();
  const tokenAge = (currentTime - tokenInfo.obtainedAt) / 1000; // token 已使用的秒數
  return tokenAge >= tokenInfo.expiresIn; // 如果 token 已使用的時間超過了有效期，則判定過期
};

const checkTokenAndRefresh = async (
  clientId: string,
  clientSecret: string,
  refreshToken: string,
  accessToken: string
) => {
  if ((await isTokenExpired(tokenInfo)) || !accessToken) {
    console.log(
      "Access token 已過期，請使用 refresh token 獲取新的 access token"
    );
    const newAccessToken = await refreshAccessToken(
      clientId,
      clientSecret,
      refreshToken
    );
    tokenInfo.accessToken = newAccessToken.accessToken;
    transporter = createTransporter(tokenInfo.accessToken);
    return true;
    // 使用 refresh token 獲取新的 access token 的邏輯
  } else {
    return true;
  }
};
const refreshAccessToken = async (
  clientId: string,
  clientSecret: string,
  refreshToken: string
) => {
  try {
    const response = await axios.post("https://oauth2.googleapis.com/token", {
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token"
    });

    const newTokenInfo = {
      accessToken: response.data.access_token,
      expiresIn: response.data.expires_in,
      obtainedAt: Date.now() // 記錄新的 token 獲取時間
    };

    return newTokenInfo;
  } catch (error) {
    throw error;
  }
};

interface verifyUrlToken {
  id: string;
  verifyToken: string;
}

// 發送驗證碼的函數
const sendVerificationEmail = async (
  recipient: string,
  code: { id: string; verifyToken: string }
): Promise<boolean> => {
  let isAccessTokenValid = false;
  if (
    process.env.GOOGLE_OAUTH_CLIENT_ID &&
    process.env.GOOGLE_OAUTH_CLIENT_SECRET &&
    process.env.GOOGLE_OAUTH_REFRESH_TOKEN
  ) {
    isAccessTokenValid = await checkTokenAndRefresh(
      process.env.GOOGLE_OAUTH_CLIENT_ID,
      process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      process.env.GOOGLE_OAUTH_REFRESH_TOKEN,
      tokenInfo.accessToken
    );
  } else {
    throw new Error("Missing required environment variables for OAuth2");
  }
  const { id, verifyToken } = code;
  const mailOptions = {
    from: process.env.GOOGLE_SMTP_USER, // 發件人地址
    to: recipient, // 收件人地址
    subject: "驗證連結", // 郵件主題
    text: `您的驗證碼是：${process.env.MAIL_DOMAIN}/verifyToken/${id}/${verifyToken}` // 郵件內容
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("郵件發送成功:", info.response);
    return true; // 發送成功
  } catch (error) {
    console.log("發送失敗:", error);
    return false; // 發送失敗
  }
};
export { sendVerificationEmail };
// 測試發送郵件
// sendVerificationEmail("recipient-email@example.com", "123456");
