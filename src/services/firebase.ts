import type { Request, Response, NextFunction } from "express";
import * as admin from "firebase-admin";
import { getStorage } from "firebase-admin/storage";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";
import appErrorHandler from "@/utils/appErrorHandler";
import appSuccessHandler from "@/utils/appSuccessHandler";
import dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
// 配置 Firebase
export const config = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: (process.env.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_X509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
};
// 初始化 Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(config as admin.ServiceAccount),
    storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`
  });
}

/**
 * 壓縮圖片
 */
export const compressImage = async (buffer: Buffer): Promise<Buffer> => {
  try {
    return await sharp(buffer)
      .png({ quality: 75 }) // 轉換為 png 格式
      .toBuffer();
  } catch (err) {
    throw new Error("圖片壓縮失敗");
  }
};

/**
 * 上傳圖片到 Firebase
 */
const uploadToFirebase = async (
  buffer: Buffer,
  fileName: string
): Promise<string> => {
  return await new Promise((resolve, reject) => {
    const bucket = getStorage().bucket();
    const blob = bucket.file(`profiles/${fileName}`);
    const blobStream = blob.createWriteStream();

    blobStream.on("finish", () => {
      blob.getSignedUrl(
        {
          action: "read",
          expires: "12-31-2500"
        },
        (err, url) => {
          if (err) {
            reject(err || new Error("獲取簽名網址失敗"));
          } else {
            resolve(url as unknown as string);
          }
        }
      );
    });

    blobStream.on("error", (err) => {
      reject(err);
    });

    blobStream.end(buffer);
  });
};

/**
 * 上傳圖片
 */
export const uploadImage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const file = req.file;
  if (!file) {
    appErrorHandler(400, "請上傳檔案", next);
    return;
  }

  try {
    // 壓縮圖片
    const compressedImage = await compressImage(file.buffer);

    // 生成唯一檔案名稱
    const fileName = `${uuidv4()}.${file.originalname.split(".").pop()}`;

    // 上傳圖片到 Firebase
    const url = await uploadToFirebase(compressedImage, fileName);
    appSuccessHandler(200, "上傳成功", { imageUrl: url }, res);
  } catch (err) {
    console.error(err);
    appErrorHandler(500, "圖片處理或上傳失敗", next);
  }
};

/**
 * 取得圖片列表
 */
export const getImageList = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const bucket = getStorage().bucket();
  const [files] = await bucket.getFiles({ prefix: "profiles/" }); // 只取得 'profiles/' 目錄下的文件
  const fileList = [];

  for (const file of files) {
    const [fileUrl] = await file.getSignedUrl({
      action: "read",
      expires: "03-09-2491"
    });

    // 移除 'profiles/' 前綴，只保留檔案的原始名稱
    const fileName = file.name.replace("profiles/", "");

    fileList.push({
      fileName,
      imgUrl: fileUrl
    });
  }

  if (!fileList.length) {
    appErrorHandler(400, "目前沒有上傳的圖片", next);
    return;
  }

  appSuccessHandler(200, "取得圖片列表成功", fileList, res);
};
