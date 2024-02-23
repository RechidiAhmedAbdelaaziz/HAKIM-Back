import { Schema } from "mongoose";
import { AppResponse, UseCase } from "../../../utils";
import { Post } from "../models/post";
import { Errors, ResStatus } from "../../../constants";

interface Params {
	id: Schema.Types.ObjectId;
	poster: Schema.Types.ObjectId;
	text: String;
}

export const updatePost: UseCase<Params> = async (params) => {
	const { text, poster, id } = params;

	const post = await Post.findOneAndUpdate(
		{
			_id: id,
			poster,
		},
		{
			text,
		},
		{
			new: true,
		}
	);
	if (!post) return { error: Errors.Genric };

	const response = new AppResponse(ResStatus.OK, post);
	return { response };
};
