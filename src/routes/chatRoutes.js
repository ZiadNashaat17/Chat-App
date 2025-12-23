import { Router } from "express";
import { createChat, getAllChats, getChat } from "../controllers/chatController.js";
import authenticate from "../middlewares/authenticate.js";

const router = Router();

router.post("/new-chat", authenticate, createChat);
router.get("/get-chat/:chatId", authenticate, getChat);
router.get("/all-chats", authenticate, getAllChats);

export default router;
