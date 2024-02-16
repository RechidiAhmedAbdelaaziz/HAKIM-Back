import { Schema } from "mongoose";
import expressAsyncHandler from "express-async-handler";
import { ConversationUseCases as useCases } from "../usecases";
import { AuthPayload } from "../../auth/dio/auth";
import { SendErorrOrResponse } from "../../../utils";

const contrller = {
	sendMessage: expressAsyncHandler(async (req, res, next) => {
		const { id: sender, kind: senderKind } = req.user as AuthPayload;
		const receiver = req.params.id as unknown as Schema.Types.ObjectId;
		const { text } = req.body;

		const result = await useCases.sendMessage({
			sender,
			receiver,
			text,
			senderKind,
		});

		SendErorrOrResponse(result, res, next);
	}),

	listMessages: expressAsyncHandler(async (req, res, next) => {
		const conversation = req.params.id as unknown as Schema.Types.ObjectId;

		const result = await useCases.getMessages({
			conversation,
			setting: req.query,
		});

		SendErorrOrResponse(result, res, next);
	}),

	listConversations: expressAsyncHandler(async (req, res, next) => {
		const { id: user } = req.user as AuthPayload;

		const result = await useCases.getConversations({
			user,
			setting: req.query,
		});

		SendErorrOrResponse(result, res, next);
	}),

	changeConversationTyped: expressAsyncHandler(async (req, res, next) => {
		const { id: owner } = req.user as AuthPayload;
		const id = req.params.id as unknown as Schema.Types.ObjectId;

		const result = await useCases.changeConversationType({
			id,
			owner,
		});

		SendErorrOrResponse(result, res, next);
	}),
};

export { contrller as ConversationController };
