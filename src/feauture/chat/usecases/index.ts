import { getConversations } from "./list.conversations";
import { getMessages } from "./list.messages";
import { sendMessage } from "./send.message";

const useCases = {
	sendMessage,
	getMessages,
	getConversations,
};

export { useCases as ConversationUseCases };
