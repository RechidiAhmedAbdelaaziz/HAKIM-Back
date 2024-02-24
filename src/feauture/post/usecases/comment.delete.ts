import { Schema } from "mongoose";
import { AppResponse, UseCase } from "../../../utils";
import { Errors, ResStatus } from "../../../constants";
import { Comment } from "../models/comment";
import { Post } from "../models/post";

interface Params {
	id: Schema.Types.ObjectId;
}

export const deleteComment: UseCase<Params> = async (params) => {
	const { id } = params;

	const comment = await Comment.findById(id);
	if (!comment) return { error: Errors.Genric };

	const post = await Post.findById(comment.post);
	if (!post) return { error: Errors.No_Model("Post") };

	post.comments -= 1;

	await Promise.all([await comment.deleteOne(), await post.save()]);

	const response = new AppResponse(ResStatus.OK);
	return { response };
};
