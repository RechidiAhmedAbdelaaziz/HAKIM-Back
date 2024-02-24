import expressAsyncHandler from "express-async-handler";
import { useCases } from "../usecases";
import { AuthPayload, SendErorrOrResponse } from "../../../utils";
import { Schema } from "mongoose";

const controller = {
	getById: expressAsyncHandler(async (req, res, next) => {
		const { id: poster } = <AuthPayload>req.user;
		const id = req.params.id as unknown as Schema.Types.ObjectId;

		const result = await useCases.getPostById({ id, poster });
		SendErorrOrResponse(result, res, next);
	}),

	create: expressAsyncHandler(async (req, res, next) => {
		const { id: poster } = <AuthPayload>req.user;
		const { text } = req.body;

		const result = await useCases.createPost({ poster, text });
		SendErorrOrResponse(result, res, next);
	}),

	update: expressAsyncHandler(async (req, res, next) => {
		const { id: poster } = <AuthPayload>req.user;
		const { text } = req.body;
		const id = req.params.id as unknown as Schema.Types.ObjectId;

		const result = await useCases.updatePost({ id, poster, text });
		SendErorrOrResponse(result, res, next);
	}),

	delete: expressAsyncHandler(async (req, res, next) => {
		const { id: poster } = <AuthPayload>req.user;
		const id = req.params.id as unknown as Schema.Types.ObjectId;

		const result = await useCases.deletePost({ id, poster });
		SendErorrOrResponse(result, res, next);
	}),

	listForUser: expressAsyncHandler(async (req, res, next) => {
		const poster = req.params.id as unknown as Schema.Types.ObjectId;

		const result = await useCases.listUserPosts({
			poster,
			queries: req.query,
		});
		SendErorrOrResponse(result, res, next);
	}),

	listMine: expressAsyncHandler(async (req, res, next) => {
		const { id: poster } = <AuthPayload>req.user;

		const result = await useCases.listUserPosts({
			poster,
			queries: req.query,
		});
		SendErorrOrResponse(result, res, next);
	}),

	listAllPosts: expressAsyncHandler(async (req, res, next) => {
		const result = await useCases.listPosts({
			queries: req.query,
		});
		SendErorrOrResponse(result, res, next);
	}),
};

export { controller as PostController };
