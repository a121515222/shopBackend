import { type Server as HttpServer } from "http";
import type { LoginResData } from "@/types/logInTypes";
import { Server, type Socket } from "socket.io";
import appErrorHandler from "@/utils/appErrorHandler";
import { User } from "@/models/user";
import { verifyToken } from "@/middlewares/auth";
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
    // 嘗試從 auth.token 取得 JWT Token
    const token = socket.handshake.headers.authorization;
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
    socket.on("message", (msg: any) => {
      console.log("message: ", JSON.stringify(msg));
      socket.broadcast.emit("message", msg);
    });
    socket.on("chatSomeone", (msg: any) => {
      const toSocketUserId = onlineUsers.get(msg.toUserId);
      if (toSocketUserId) {
        socket.to(toSocketUserId).emit("chatSomeone", msg);
      } else {
        socket.emit("chatSomeone", {
          error: "對方不在線上"
        });
      }
    });
  });

  return io;
};

export { initializeSocket };
