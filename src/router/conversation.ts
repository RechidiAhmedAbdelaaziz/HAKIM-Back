import express from "express";
import { isUserKind, verifyAuthorization } from "../middlewares";
import { ConversationController as conversation } from "../feauture/chat/controller/conversation";

const router = express.Router();

router.use(verifyAuthorization);
router.route("/").get(conversation.listConversations);
router
	.route("/:id")
	.post(conversation.sendMessage)
	.get(conversation.listMessages)
	.patch(isUserKind.Doctor, conversation.changeConversationTyped);

export { router as ConversationRouter };
