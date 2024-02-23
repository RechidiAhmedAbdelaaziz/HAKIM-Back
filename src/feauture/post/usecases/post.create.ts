import { Schema } from "mongoose";
import { AppResponse, UseCase } from "../../../utils";
import { Post } from "../models/post";
import { Errors, ResStatus } from "../../../constants";

interface Params {
	poster: Schema.Types.ObjectId;
	text: String;
}

export const createPost: UseCase<Params> = async (params) => {
	const { text, poster } = params;

	const post = await Post.create({
		poster,
		text,
	});
	if (!post) return { error: Errors.Genric };

	const response = new AppResponse(ResStatus.OK, post);
	return { response };
};
