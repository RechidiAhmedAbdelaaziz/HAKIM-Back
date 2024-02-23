import { Schema } from "mongoose";
import { AppResponse, UseCase } from "../../../utils";
import { Post } from "../models/post";
import { Errors, ResStatus } from "../../../constants";
import { Comment } from "../models/comment";
import { Like } from "../models/like";

interface Params {
	id: Schema.Types.ObjectId;
	poster: Schema.Types.ObjectId;
}

export const deletePost: UseCase<Params> = async (params) => {
	const { poster, id } = params;

	const post = await Post.findOneAndDelete({
		poster,
		_id: id,
	});
	if (!post) return { error: Errors.Genric };

	await Comment.deleteMany({ post: id });
	await Like.deleteMany({ post: id });

	const response = new AppResponse(
		ResStatus.OK,
		{},
		"Post was successfully deleted."
	);
	return { response };
};
