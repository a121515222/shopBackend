import type { NextFunction, Request, Response } from "express";
import appErrorHandler from "@/utils/appErrorHandler";
import appSuccessHandler from "@/utils/appSuccessHandler";
import { ChatMessage } from "@/models/chatMessage";
import { Conversation } from "@/models/conversation";
const getChatMessageList = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = typeof req.headers.userId === 'string' ? req.headers.userId : '';
  const chatId = typeof req.query.chatId === 'string' ? req.query.chatId : '';
  const timestamp = typeof req.query.messageTimestamp === 'string' ? req.query.messageTimestamp : '';
  if (!chatId || !userId ) {
    appErrorHandler(400, "缺少必要資料", next);
  }
  if (!chatId.includes(userId)){
    appErrorHandler(400, "無法取得聊天訊息", next);
  }
  const chatMessage = await ChatMessage.findOne({ chatId })
  if (!chatMessage) {
    appErrorHandler(404, "聊天訊息不存在", next);
    return;
  }
  const chatMessageList = chatMessage.messageList as {
    senderId: string;
    receiverId: string;
    receiverName: string;
    message: string;
    timestamp: Date;
    isRead: boolean;
  }[];
  if (chatMessageList.length === 0) {
    appErrorHandler(404, "聊天訊息不存在", next);
    return;
  }
  
  let latestMessages: { timestamp: Date }[] = [];
  // 更新未讀訊息為已讀（僅針對當前接收者）
  const unreadMessages = chatMessageList.filter(
    (msg) => msg.receiverId === userId && !msg.isRead
  );
  if (unreadMessages.length > 0) {
    await ChatMessage.updateOne(
      { chatId },
      {
        $set: {
          'messageList.$[elem].isRead': true
        }
      },
      {
        arrayFilters: [{ 'elem.receiverId': userId, 'elem.isRead': false }]
      }
    );
  }
  if(!timestamp){
    // 取得最新10筆, 降序由舊到新
    latestMessages = chatMessageList
    .sort((a: { timestamp: Date }, b: { timestamp: Date }) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()) // 降序
    .slice(0, 10);
  } else {
    // 取得比timestamp舊的10筆降序由舊到新
     latestMessages = chatMessageList
    .filter((message: { timestamp: Date }) => new Date(message.timestamp).getTime() < new Date(timestamp).getTime())
    .sort((a: { timestamp: Date }, b: { timestamp: Date }) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()) // 降序
    .slice(0, 10);
  }
  // 取得最新一筆訊息的timestamp
  const messageTimestamp = latestMessages[0].timestamp;
  appSuccessHandler(200, "取得聊天訊息成功", { latestMessages, messageTimestamp }, res);
  // 更新未讀訊息數量為0
  await Conversation.findOneAndUpdate({ chatId },{
    $set: { unreadCount: 0 }
  })
};
export { getChatMessageList };