import express from "express";
import { verifyAuthorization } from "../middlewares";
import { ConversationController as conversation } from "../feauture/chat/controller/conversation";

const router = express.Router();

router.use(verifyAuthorization);
router.route("/").get(conversation.getConversations);
router
	.route("/:id")
	.post(conversation.sendMessage)
	.get(conversation.getConversation);

export { router as ConversationRouter };
