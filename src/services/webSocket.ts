import { type Server as HttpServer } from "http";
import type { LoginResData } from "@/types/logInTypes";
import { Server, type Socket } from "socket.io";
import appErrorHandler from "@/utils/appErrorHandler";
import { User } from "@/models/user";
import { verifyToken } from "@/middlewares/auth";
import { ChatMessage } from "@/models/chatMessage";
import { Conversation } from "@/models/conversation";
interface ChatMessageType {
  message: string;
  userId: string;
  name: string;
  toUserId: string;
  chatId: string;
  date?: Date;
}

// message: '6666', userId: '67762bfa519f0b083c3c17ee', name: 'C.C Liang', toUserId: '67405af5e85ca5d5551ed8a7', chatId: '67762bfa519f0b083c3c17ee-67405af5e85ca5d5551ed8a7'

// 建立socketIOId與userId的對應
const onlineUsers = new Map<string, string>();

const initializeSocket = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin:
        process.env.NODE_ENV === "dev"
          ? "*"
          : `https://${process.env.FRONT_DOMAIN}`
    }
  });
  // 驗證 Token
  io.use(async (socket, next: (err?: Error) => void) => {
    // 從 auth.token 取得 JWT Token
    const token =
      socket.handshake.headers.Authorization ||
      socket.handshake.auth.Authorization;
    if (!token) {
      return next(new Error("未提供 Token"));
    }

    const decoded = verifyToken(token, next);
    if (!decoded) {
      socket.disconnect();
      return;
    } else {
      let id;
      if (typeof decoded === "object" && "userId" in decoded) {
        id = (decoded as LoginResData).userId;
        const logInVerifyToken = await User.findById(id).select(
          "logInVerifyToken"
        );
        if (!logInVerifyToken) {
          appErrorHandler(404, "查無使用者", next);
          return;
        }
        if (logInVerifyToken.logInVerifyToken !== token) {
          appErrorHandler(403, "token不符", next);
          return;
        }
      } else {
        appErrorHandler(401, "無效的 Token", next);
        return;
      }
      onlineUsers.set(decoded.userId, socket.id); // 建立 socket.id 與 userId 的對應
      socket.data.userId = decoded.userId; // 建立 socket.data.userId
      next(); // 通過驗證，繼續連線
    }
  });

  io.on("connection", (socket: Socket) => {
    socket.on("disconnect", () => {
      onlineUsers.delete(socket.data.userId);
      socket.data.userId = null;
    });
    socket.on(
      "sendMessage",
      ({ toUserId, message }: { toUserId: string; message: string }) => {
        const fromUserId = onlineUsers.get(socket.id); // 發送者的 userId

        // 廣播消息給所有連接的用戶
        io.emit("receiveMessage", { fromUserId, toUserId, message });
      }
    );
    socket.on("message", (msg: ChatMessageType) => {
      socket.broadcast.emit("receiveMessage", msg);
    });
    socket.on("chatSomeone", async (msg: ChatMessageType) => {
      const { userId, toUserId, message, chatId } = msg;
      const senderSocketId = onlineUsers.get(userId);
      const receiverSocketId = onlineUsers.get(toUserId);
      // 發送方接受自己的訊息
      if (senderSocketId) {
        socket.emit("receiveChat", msg);
      }

      // 檢查chatId是不是對的
      if (
        chatId === `${userId}-${toUserId}` ||
        chatId === `${toUserId}-${userId}`
      ) {
        const conversations = await Conversation.find({
          $or: [
            { userId: userId, participantId: toUserId }, // userId -> toUserId
            { userId: toUserId, participantId: userId } // toUserId -> userId
          ]
        });
        if (conversations.length <= 1) {
          const senderToReceiverExists = conversations.some(
            (conv) => conv.userId === userId && conv.participantId === toUserId
          );
          const receiverToSenderExists = conversations.some(
            (conv) => conv.userId === toUserId && conv.participantId === userId
          );

          const sender = await User.findById(userId).select("username");
          const participant = await User.findById(toUserId).select("username");
          const senderName = sender?.name || "Unknown";
          const participantName = participant?.name || "Unknown";

          // 如果雙向記錄不存在，創建缺少的那一方
          if (!senderToReceiverExists) {
            await Conversation.create({
              userId,
              participantId: toUserId,
              participantName,
              chatId,
              lastMessageTime: new Date(),
              unreadCount: receiverSocketId ? 0 : 1
            });
          }
          if (!receiverToSenderExists) {
            await Conversation.create({
              userId: toUserId,
              participantId: userId,
              participantName: senderName,
              chatId,
              lastMessageTime: new Date(),
              unreadCount: receiverSocketId ? 0 : 1
            });
          }
        } else if (conversations.length === 2) {
          const isChatMessagesExist = await ChatMessage.findOne({ chatId });
          if (!isChatMessagesExist) {
            await ChatMessage.create({
              chatId,
              messageList: []
            });
          }
        }
      } else {
        socket.emit("receiveChat", { chatId, error: "無效的對話" });
        return;
      }

      // 發送方給接收方的訊息
      if (receiverSocketId) {
        socket.to(receiverSocketId).emit("receiveChat", msg);
        // 將未讀訊息數量加1
        console.log("toUserId", toUserId);
       const result = await Conversation.findOneAndUpdate(
          { chatId },
          { $inc: { unreadCount: 1 } },
          { new: true }
        );
        console.log("result", result);
        // 儲存聊天訊息
        await ChatMessage.findOneAndUpdate(
          { chatId },
          {
            $push: {
              messageList: {
                senderId: userId,
                receiverId: toUserId,
                receiverName: msg.name,
                message,
                timestamp: new Date(),
                isRead: true
              }
            }
          }
        );
      } else {
        socket.emit("receiveChat", { chatId, error: "對方不在線上" });
        // 將未讀訊息數量加1
       const result = await Conversation.findOneAndUpdate(
         { chatId },
         { $inc: { unreadCount: 1 } },
         { new: true }
       );
       console.log("result", result);
        // 儲存聊天訊息
        await ChatMessage.findOneAndUpdate(
          { chatId },
          {
            $push: {
              messageList: {
                senderId: userId,
                receiverId: toUserId,
                receiverName: msg.name,
                message,
                timestamp: new Date(),
                isRead: false
              }
            }
          }
        );
      }
    });
  });

  return io;
};

export { initializeSocket };
