import axios from "axios";
import type { Request, Response, NextFunction } from "express";
import appErrorHandler from "@/utils/appErrorHandler";
import appSuccessHandler from "@/utils/appSuccessHandler";
const geminiUrl = process.env.GEMINI_URL;
const geminiModel = process.env.GEMINI_MODEL;
const geminiKey = process.env.GEMINI_KEY;
function stripHtmlTags(html: string) {
  // 使用正則表達式移除所有 HTML 標籤
  html = html.replace(/<[^>]*>/g, "");

  // 移除 &nbsp;
  html = html.replace(/&nbsp;/g, "");

  return html;
}
export const geminiAIgenerateProductContent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, description, category, content, tag } = req.body;
  if (
    !title &&
    !description &&
    category.length === 0 &&
    !content &&
    tag.length === 0
  ) {
    appErrorHandler(400, "缺少必要欄位", next);
    return;
  }
  const cleanTitle = stripHtmlTags(title);
  const cleanDescription = stripHtmlTags(description);
  const cleanCategory = Array.isArray(category)
    ? category.map(stripHtmlTags).join(" ")
    : "";
  const cleanContent = stripHtmlTags(content);
  const cleanTag = Array.isArray(tag) ? tag.map(stripHtmlTags).join(" ") : "";
  const sendData = {
    contents: [
      {
        parts: [
          {
            text: `請幫我寫產品介紹大約100到200字，以下是關鍵字${cleanTitle} ${cleanDescription} ${cleanCategory} ${cleanContent} ${cleanTag}`
          }
        ]
      }
    ]
  };
  const parseData = JSON.stringify(sendData);
  const response = await axios.post(
    `${geminiUrl}/${geminiModel}?key=${geminiKey}`,
    parseData,
    {
      headers: { "Content-Type": "application/json" }
    }
  );
  const sendBackToFront = response.data.candidates[0].content.parts[0].text;
  const formattedText = sendBackToFront.replace(/\n/g, "<br>");
  if (response.data) {
    appSuccessHandler(200, "AI 產品介紹生成成功", formattedText, res);
  }
};

export const geminiAIGenerateArticleContent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, description, content, tag } = req.body;
  if (!title && !description && !content && tag.length === 0) {
    appErrorHandler(400, "缺少必要欄位", next);
    return;
  }
  const sendData = {
    contents: [
      {
        parts: [
          {
            text: `請幫我寫或潤飾文章大約200到350字，以下是關鍵字${
              title ?? ""
            } ${description ?? ""} ${content ?? ""} ${tag ?? ""}`
          }
        ]
      }
    ]
  };
  const parseData = JSON.stringify(sendData);
  const response = await axios.post(
    `${geminiUrl}/${geminiModel}?key=${geminiKey}`,
    parseData,
    {
      headers: { "Content-Type": "application/json" }
    }
  );
  const sendBackToFront = response.data.candidates[0].content.parts[0].text;
  const formattedText = sendBackToFront.replace(/\n/g, "<br>");
  if (response.data) {
    appSuccessHandler(200, "AI 文章生成成功", formattedText, res);
  }
};
