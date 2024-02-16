import { changeConversationType } from "./change.conversation.type";
import { getConversations } from "./list.conversations";
import { getMessages } from "./list.messages";
import { sendMessage } from "./send.message";

const useCases = {
	sendMessage,
	getMessages,
	getConversations,
	changeConversationType,
};

export { useCases as ConversationUseCases };
