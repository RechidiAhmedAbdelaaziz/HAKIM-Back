import { Schema } from "mongoose";
import { AppResponse, UseCase } from "../../../utils";
import { Errors, ResStatus } from "../../../constants";
import { Like } from "../models/like";
import { Post } from "../models/post";

interface Params {
	post: Schema.Types.ObjectId;
	user: Schema.Types.ObjectId;
}

export const createLike: UseCase<Params> = async (params) => {
	const { user, post } = params;

	const check = await Post.findById(post);
	if (!check) return { error: Errors.No_Model("Post") };

	const checkLiked = await Like.findOne({ post, user });
	if (checkLiked) return { error: Errors.Genric };

	const like = await Like.create({
		post,
		user,
	});
	if (!like) return { error: Errors.Genric };

	check.likers += 1;
	await check.save();

	const response = new AppResponse(ResStatus.OK, {}, "You liked the post");
	return { response };
};
