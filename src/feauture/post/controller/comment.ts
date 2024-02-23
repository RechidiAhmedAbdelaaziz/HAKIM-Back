import expressAsyncHandler from "express-async-handler";
import { useCases } from "../usecases";
import { Schema } from "mongoose";
import { AuthPayload, SendErorrOrResponse } from "../../../utils";

const controller = {
	getById: expressAsyncHandler(async (req, res, next) => {
		const id = req.params.id as unknown as Schema.Types.ObjectId;

		const result = await useCases.getCommentById({ id });
		SendErorrOrResponse(result, res, next);
	}),

	create: expressAsyncHandler(async (req, res, next) => {
		const { id: commentator } = <AuthPayload>req.user;
		const post = req.params.id as unknown as Schema.Types.ObjectId;
		const { text } = req.body;

		const result = await useCases.createComment({
			commentator,
			post,
			text,
		});
		SendErorrOrResponse(result, res, next);
	}),

	update: expressAsyncHandler(async (req, res, next) => {
		const id = req.params.id as unknown as Schema.Types.ObjectId;
		const { text } = req.body;

		const result = await useCases.updateComment({ id, text });
		SendErorrOrResponse(result, res, next);
	}),

	delete: expressAsyncHandler(async (req, res, next) => {
		const id = req.params.id as unknown as Schema.Types.ObjectId;

		const result = await useCases.deleteComment({ id });
		SendErorrOrResponse(result, res, next);
	}),

	listComments: expressAsyncHandler(async (req, res, next) => {
		const post = req.params.id as unknown as Schema.Types.ObjectId;

		const result = await useCases.listPostComments({
			post,
			queries: req.query,
		});
		SendErorrOrResponse(result, res, next);
	}),
};

export { controller as CommentController };
