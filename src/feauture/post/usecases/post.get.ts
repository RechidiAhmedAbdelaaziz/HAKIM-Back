import { Schema } from "mongoose";
import { AppResponse, UseCase } from "../../../utils";
import { Post } from "../models/post";
import { Errors, ResStatus } from "../../../constants";

interface Params {
	id: Schema.Types.ObjectId;
	poster: Schema.Types.ObjectId;
}

export const getPostById: UseCase<Params> = async (params) => {
	const { poster, id } = params;

	const post = await Post.findOne({
		poster,
		_id: id,
	});
	if (!post) return { error: Errors.Genric };

	const response = new AppResponse(ResStatus.OK, post);
	return { response };
};
