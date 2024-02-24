import { Schema } from "mongoose";
import { AppResponse, UseCase } from "../../../utils";
import { Errors, ResStatus } from "../../../constants";
import { Comment } from "../models/comment";
import { Post } from "../models/post";

interface Params {
	commentator: Schema.Types.ObjectId;
	post: Schema.Types.ObjectId;
	text: String;
}

export const createComment: UseCase<Params> = async (params) => {
	const { text, post, commentator } = params;

	const check = await Post.findById(post);
	if (!check) return { error: Errors.No_Model("Post") };

	const comment = await Comment.create({
		text,
		post,
		commentator,
	});
	if (!comment) return { error: Errors.Genric };

	check.comments += 1;
	await check.save();

	const response = new AppResponse(ResStatus.OK, comment);
	return { response };
};
