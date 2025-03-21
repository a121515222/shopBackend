import { Schema, model, type Types } from "mongoose";

interface ChatMessageSchema {
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
}
const ChatMessageSchema = new Schema<ChatMessageSchema>(
  {
    senderId: {
      type: String, // 發送者 ID
      required: true,
      index: true // 為查詢優化添加索引
    },
    receiverId: {
      type: String, // 接收者 ID
      required: true,
      index: true // 為查詢優化添加索引
    },
    message: {
      type: String, // 訊息內容
      required: true
    },
    timestamp: {
      type: Date, // 發送時間
      default: Date.now // 預設為當前時間
    },
    isRead: {
      type: Boolean, // 是否已讀（可選）
      default: false
    }
  },
  {
    timestamps: true // 自動添加 createdAt 和 updatedAt 欄位
  }
);
// 為 senderId 和 receiverId 添加複合索引
ChatMessageSchema.index({ senderId: 1, receiverId: 1 });
const ChatMessage = model<ChatMessageSchema>("ChatMessage", ChatMessageSchema);
export { ChatMessage, type ChatMessageSchema };
