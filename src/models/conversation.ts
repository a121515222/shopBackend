import { Schema, model, type Types } from "mongoose";

interface ConversationSchema {
  userId: string;
  participantId: string;
  participantName: { type: String; required: true };
  lastMessage: Types.ObjectId;
  lastMessageTime: Date;
  unreadCount: number;
}

const ConversationSchema = new Schema<ConversationSchema>(
  {
    userId: {
      type: String, // 主用戶 ID（例如 "我"）
      required: true,
      index: true // 為查詢優化
    },
    participantId: {
      type: String, // 對話對象 ID（例如 "誰跟我聊天"）
      required: true,
      index: true // 為查詢優化
    },
    participantName: {
      type: String, // 對話對象名稱
      required: true
    },
    lastMessage: {
      type: Schema.Types.ObjectId, // 最後一條訊息的參考
      ref: "ChatMessage" // 指向 ChatMessage 集合
    },
    lastMessageTime: {
      type: Date, // 最後訊息的時間
      default: Date.now
    },
    unreadCount: {
      type: Number, // 未讀訊息數量
      default: 0
    }
  },
  {
    timestamps: true
  }
);
// 為 userId 和 participantId 添加複合索引
ConversationSchema.index({ userId: 1, participantId: 1 }, { unique: true });

const Conversation = model<ConversationSchema>(
  "Conversation",
  ConversationSchema
);
export { Conversation, type ConversationSchema };
