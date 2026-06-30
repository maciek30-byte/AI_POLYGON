import { Router } from "express";
import { healthCheck } from "./catfish-chatbot/handlers/heath.js";
import { handlePostMessage } from "./catfish-chatbot/handlers/handleUserMessage.js";

const router = Router();

router.get("/", healthCheck)
router.post('/', handlePostMessage)


export default router;
