import { v4 as uuidv4 } from "uuid";
import { generateJWTVerifyMail } from "@/utils/generateJWT";
import { User } from "@/models/user";

// 生成驗證碼
const generateVerificationCode = async (id: string) => {
  // 生成唯一的 UUID 驗證碼
  const verificationCode = uuidv4();
  // 資料庫寫入驗證碼
  const user = await User.findByIdAndUpdate(id, {
    verifyToken: verificationCode
  });
  // 創建 JWT，將驗證碼封裝在 JWT 中，並設定過期時間
  const verifyToken = generateJWTVerifyMail(verificationCode);

  return verifyToken;
};

export { generateVerificationCode };
