import validator from "validator"

/**
 * 驗證密碼是否至少有一個字母和至少有7個數字
 * @param password
 * @returns
 */
function validatePassword (password: string): boolean {
  // 定義密碼驗證的正則表達式：至少一個字母和至少7個數字
  const passwordRegex = /^(?=.*[a-zA-Z])(?=(?:\D*\d){7})[a-zA-Z\d]+$/

  // 使用 validator.matches 來檢查密碼
  if (validator.matches(password, passwordRegex)) {
    return true
  }

  return false
}

export default validatePassword
