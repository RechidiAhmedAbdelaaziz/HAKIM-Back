import expressAsyncHandler from "express-async-handler";

import { AppResponse, sendResponse } from "../../../utils";
import { AppModels, Errors, ResStatus } from "../../../constants";

import { Schema } from "mongoose";
import { AuthPayload } from "../../auth/dio/auth";
import {
	createMessage,
	getConversation,
	createConversation,
	updateConversation,
	getConversations,
	getConversationById,
} from "../usecases/conversation";
import { CreateMessageDio } from "../dio/conversation";

const contrller = {
	sendMessage: expressAsyncHandler(async (req, res, next) => {
		const { id: sender } = req.user as AuthPayload;
		const receiver = req.params.id as unknown as Schema.Types.ObjectId;
		const { message } = <CreateMessageDio>req.body;

		const message_ = await createMessage({ sender, receiver, message });
		if (!message_) return next(new Errors(AppModels.message).Not_found);

		let conversation = await getConversation({ receiver, sender });
		if (!conversation)
			conversation = await createConversation({ sender, receiver });
		if (!conversation)
			return next(new Errors(AppModels.conversation).Not_found);

		conversation = await updateConversation({
			id: conversation._id,
			message: message_._id,
		});
		if (!conversation)
			return next(new Errors(AppModels.conversation).Not_found);

		const response = new AppResponse(
			ResStatus.OK,
			message_,
			"Message sent successfully"
		);
		sendResponse(response, res);
	}),

	// getMessages: expressAsyncHandler(async (req, res) => {
	// 	const user = req.user;
	// 	const { receiver, sender } = <GetConversationDio>req.body;
	// 	const messages = await getConversation({ receiver, sender });
	// }),

	getConversations: expressAsyncHandler(async (req, res, next) => {
		const { id: userId } = req.user as AuthPayload;

		const conversations = await getConversations({ userId });
		if (!conversations)
			return next(new Errors(AppModels.conversation).Not_found);

		const response = new AppResponse(
			ResStatus.OK,
			conversations,
			"Conversations g successfully"
		);
		sendResponse(response, res);
	}),

	getConversation: expressAsyncHandler(async (req, res, next) => {
		const { id: user } = req.user as AuthPayload;
		const id = req.params.id as unknown as Schema.Types.ObjectId;

		const conversation = await getConversationById({ id, user });
		if (!conversation)
			return next(new Errors(AppModels.conversation).Not_found);

		const response = new AppResponse(
			ResStatus.OK,
			conversation,
			"Conversations gotten successfully"
		);
		sendResponse(response, res);
	}),
};

export { contrller as ConversationController };
