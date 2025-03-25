import { Schema, model, type Types } from "mongoose";

interface ChatMessageSchema {
  chatId: string;
  messageList: MessageList[];
}
interface MessageList {
  senderId: string;
  receiverId: string;
  receiverName: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
}
const ChatMessageSchema = new Schema<ChatMessageSchema>(
  {
    chatId: {
      type: String, // 聊天室 ID
      required: true
    },
    messageList: {
      type: [
        new Schema<MessageList>({
          senderId: { type: String, required: true }, // 發送者 ID
          receiverId: { type: String, required: true }, // 接收者 ID
          receiverName: { type: String, required: true }, // 接收者名稱
          message: { type: String, required: true }, // 訊息內容
          timestamp: { type: Date, required: true, default: Date.now }, // 發送時間
          isRead: { type: Boolean, required: true, default: false } // 是否已讀
        })
      ], // 訊息列表
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

ChatMessageSchema.index({ chatId: 1 });
const ChatMessage = model<ChatMessageSchema>("ChatMessage", ChatMessageSchema);
export { ChatMessage, type ChatMessageSchema };
