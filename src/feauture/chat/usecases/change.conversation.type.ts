import { Schema } from "mongoose";
import { Errors, ResStatus } from "../../../constants";
import { UseCase, AppResponse } from "../../../utils";
import { Conversation, ConversationTypes } from "../models/conversation";

interface Params {
	id: Schema.Types.ObjectId;
	owner: Schema.Types.ObjectId;
}

export const changeConversationType: UseCase<Params> = async (params) => {
	const { owner, id } = params;

	//Get conversation
	const conversation = await Conversation.findOne({
		_id: id,
		users: { $in: [owner] },
	});
	if (!conversation) return { error: Errors.No_Model("Conversation") };

	//Change the type of conversation
	if (conversation.type === ConversationTypes.patient)
		conversation.type = ConversationTypes.personal;
	else conversation.type = ConversationTypes.patient;
	await conversation.save();

	//Send Response
	const response = new AppResponse(
		ResStatus.OK,
		conversation,
		"Conversation kind changed Successfully"
	);

	return { response };
};
