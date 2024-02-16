import expressAsyncHandler from "express-async-handler";
import { Schema } from "mongoose";
import { Errors, ResStatus } from "../../../constants";
import { AppERROR, AppResponse, sendResponse } from "../../../utils";
import { AuthPayload } from "../../auth/dio/auth";
import { Conversation, ConversationTypes } from "../models/conversation";
import { Message } from "../models/message";
import { User } from "../../auth/models";
import { UseCase } from "../../../utils/types/usecases";

interface Params {
	sender: Schema.Types.ObjectId;
	receiver: Schema.Types.ObjectId;
	text: String;
	senderKind: String;
}

export const sendMessage: UseCase<Params> = async (params) => {
	const { sender, receiver, text, senderKind } = params;
	let type = ConversationTypes.personal;
	//Check user exists
	const checkUser = await User.findById(receiver);
	if (!checkUser) return { error: Errors.No_Model("User") };
	if (checkUser.kind !== senderKind) type = ConversationTypes.patient;

	//Check if conversation exists and create a new conversation
	let conversation = new Conversation({
		users: [sender, receiver],
		type: type,
	});

	const checkConversationExist = await Conversation.findOne({
		users: { $in: [receiver, sender] },
	});
	if (checkConversationExist) conversation = checkConversationExist;

	//Create the message
	const message = await new Message({
		sender,
		receiver,
		text,
		chat: conversation,
	}).save();

	conversation.lastMessage = message._id;
	await conversation.save();

	//Send Response
	const response = new AppResponse(
		ResStatus.OK,
		{},
		"Message sent successfully"
	);

	return { response };
};
