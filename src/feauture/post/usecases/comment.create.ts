import { Schema } from "mongoose";
import { AppResponse, UseCase } from "../../../utils";
import { Errors, ResStatus } from "../../../constants";
import { Comment } from "../models/comment";

interface Params {
	commentator: Schema.Types.ObjectId;
	post: Schema.Types.ObjectId;
	text: String;
}

export const createComment: UseCase<Params> = async (params) => {
	const { text, post, commentator } = params;

	const comment = await Comment.create({
		text,
		post,
		commentator,
	});
	if (!comment) return { error: Errors.Genric };

	const response = new AppResponse(ResStatus.OK, comment);
	return { response };
};
