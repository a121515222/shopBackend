import type { CorsOptions } from "cors";
const allowedOrigins = [
  "https://localhost:3000",
  "http://localhost:3000",
  "http://localhost:8086",
  "https://localhost:8086",
  "https://backnuxt.zeabur.app",
  "http://backnuxt.zeabur.app",
  `https://${process.env.BACK_DOMAIN}`,
  `https://${
    process.env.NODE_ENV === "dev" ? "localhost:3000" : process.env.FRONT_DOMAIN
  }`
];

export const corsOptions: CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    if (
      (typeof origin === "string" && allowedOrigins.indexOf(origin) !== -1) ||
      !origin
    ) {
      // 如果請求的 Origin 在允許的列表中，或者沒有 Origin（例如從同源的請求），則允許
      callback(null, true);
    } else {
      // 否則，返回一個錯誤
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true // 允許攜帶憑證（cookies）
};
