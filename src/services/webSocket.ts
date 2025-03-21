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
      onlineUsers.delete(socket.id);
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
    socket.on("chatSomeone", (msg: ChatMessageType) => {
      const toSocketUserId = onlineUsers.get(msg.toUserId);
      const socketUserId = onlineUsers.get(msg.userId);
      if (toSocketUserId) {
        // 把資料回傳給發送者
        if (socketUserId) {
          socket.emit("receiveChat", msg);
        }
        // 把資料回傳給接收者
        socket.to(toSocketUserId).emit("receiveChat", msg);
      } else {
        if (socketUserId) {
          socket.emit("receiveChat", msg);
        }
        const { userId, toUserId, message, chatId } = msg;
        socket.emit("receiveChat", {
          chatId,
          error: "對方不在線上"
        });
      }
    });
  });

  return io;
};

export { initializeSocket };
