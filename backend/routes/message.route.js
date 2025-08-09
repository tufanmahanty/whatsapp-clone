import { Router } from "express";
import { getChatByUser, getChatList, sendMessage } from "../controllers/message.controller.js";

const messageRouter = Router();

messageRouter.get("/get-chat-list", getChatList);

messageRouter.get("/get-chat-by-user", getChatByUser);

messageRouter.post("/send-message", sendMessage);

export default messageRouter;