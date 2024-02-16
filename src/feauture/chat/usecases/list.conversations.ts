import { Schema, Types } from "mongoose";
import { Errors, ResStatus } from "../../../constants";
import { AppResponse } from "../../../utils";
import { Conversation } from "../models/conversation";
import { Message } from "../models/message";
import { UseCase } from "../../../utils/types/usecases";

interface Params {
	user: Schema.Types.ObjectId;
}

export const getConversations: UseCase<Params> = async (params) => {
	const { user } = params;

	//Get conversation
	const conversations = await Conversation.find({
		users: { $in: [user] },
	});
	if (!conversations) return { error: Errors.No_Conversations };

	//Get 15 Messages for each conversation
	conversations.map(async (conversation) => {
		const messages = await Message.find({
			chat: conversation._id,
		})
			.sort({ createdAt: -1 })
			.limit(15);

		if (messages)
			conversation.messages = messages.map((message) => message._id);
	});

	//Send Response
	const response = new AppResponse(ResStatus.OK, conversations);

	return { response };
};
