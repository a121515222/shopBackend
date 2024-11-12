/**
 * 檢查必填欄位
 * @param fields - 欄位
 * @returns - 缺少的欄位
 */
function checkMissingFields(fields: Record<string, unknown>): string[] {
  const missingFields = [];
  for (const [key, value] of Object.entries(fields)) {
    if (!value) {
      missingFields.push(key);
    }
  }
  return missingFields;
}

export default checkMissingFields;
