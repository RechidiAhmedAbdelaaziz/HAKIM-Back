import { Schema } from "mongoose";
import { AppResponse, UseCase } from "../../../utils";
import { Errors, ResStatus } from "../../../constants";
import { Like } from "../models/like";
import { Post } from "../models/post";

interface Params {
	user: Schema.Types.ObjectId;
	post: Schema.Types.ObjectId;
}

export const deleteLike: UseCase<Params> = async (params) => {
	const { post, user } = params;

	const check = await Post.findById(post);
	if (!check) return { error: Errors.No_Model("Post") };

	const like = await Like.findOne({ post, user });
	if (!like) return { error: Errors.Genric };

	check.likers -= 1;
	await check.save();
	await like.deleteOne();

	const response = new AppResponse(ResStatus.OK, {}, "You unliked the post");
	return { response };
};
