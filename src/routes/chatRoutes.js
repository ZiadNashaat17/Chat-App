import { Router } from "express";
import { createChat, getAllChats } from "../controllers/chatController.js";
import authenticate from "../middlewares/authenticate.js";

const router = Router();

router.post("/", authenticate, createChat);
// router.get("/get-chat/:chatId", authenticate, getChat);
router.get("/all-chats", authenticate, getAllChats);

export default router;
