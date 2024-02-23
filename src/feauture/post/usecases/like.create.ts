import { Schema } from "mongoose";
import { AppResponse, UseCase } from "../../../utils";
import { Errors, ResStatus } from "../../../constants";
import { Like } from "../models/like";

interface Params {
	post: Schema.Types.ObjectId;
	user: Schema.Types.ObjectId;
}

export const createLike: UseCase<Params> = async (params) => {
	const { user, post } = params;

	const like = await Like.create({
		post,
		user,
	});
	if (!like) return { error: Errors.Genric };

	const response = new AppResponse(ResStatus.OK, {}, "You liked the post");
	return { response };
};
