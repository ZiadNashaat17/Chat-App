import { Router } from "express";
import { createMessage } from "../controllers/messagesController.js";
import authenticate from "../middlewares/authenticate.js";
import validateMessages from "../middlewares/validateMessages.js";

const router = Router();

router.post("/send-message", authenticate, validateMessages, createMessage);

export default router;
