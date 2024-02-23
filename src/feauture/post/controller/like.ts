import expressAsyncHandler from "express-async-handler";
import { useCases } from "../usecases";
import { Schema } from "mongoose";
import { AuthPayload, SendErorrOrResponse } from "../../../utils";

const controller = {
	like: expressAsyncHandler(async (req, res, next) => {
		const { id: user } = <AuthPayload>req.user;
		const post = req.params.id as unknown as Schema.Types.ObjectId;

		const result = await useCases.createLike({ post, user });
		SendErorrOrResponse(result, res, next);
	}),

	unlike: expressAsyncHandler(async (req, res, next) => {
		const id = req.params.id as unknown as Schema.Types.ObjectId;

		const result = await useCases.deleteLike({ id });
		SendErorrOrResponse(result, res, next);
	}),
};

export { controller as LikeController };
