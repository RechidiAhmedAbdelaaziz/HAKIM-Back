import express from "express";
import { verifyAuthorization, verifyDoctor } from "../middlewares";
import { ConversationController as conversation } from "../feauture/chat/controller/conversation";

const router = express.Router();

router.use(verifyAuthorization);
router.route("/").get(conversation.listConversations);
router
	.route("/:id")
	.post(conversation.sendMessage)
	.get(conversation.listMessages)
	.patch(verifyDoctor, conversation.changeConversationTyped);

export { router as ConversationRouter };
