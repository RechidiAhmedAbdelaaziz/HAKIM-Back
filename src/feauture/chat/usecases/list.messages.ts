import { Schema, Types } from "mongoose";
import { Errors, ResStatus } from "../../../constants";
import { AppResponse } from "../../../utils";
import { Conversation } from "../models/conversation";
import { Message } from "../models/message";
import { UseCase } from "../../../utils/types/usecases";
import ModelsGetter from "../../../utils/model.getter";
import { PaginationInput } from "../../../utils/types/pagination";

interface Params {
	conversation: Schema.Types.ObjectId;
	setting?: PaginationInput;
}

export const getMessages: UseCase<Params> = async (params) => {
	const { conversation, setting } = params;

	//Get conversation
	const checkConversation = await Conversation.findById(conversation);
	if (!checkConversation) return { error: Errors.No_Model("Conversation") };

	const { query, pagination: paginationResults } = new ModelsGetter(
		Message.find().sort({ createdAt: -1 }),
		setting
	)
		.select({ chat: conversation })
		.paginate(await Message.countDocuments({}));

	const messages = await query.exec();
	if (!messages) return { error: Errors.No_Models("Messages") };
	//Send Response
	const response = new AppResponse(ResStatus.OK, {
		result: messages,
		pagination: paginationResults,
	});

	return { response };
};
