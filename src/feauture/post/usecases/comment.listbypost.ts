import { Schema } from "mongoose";
import { AppResponse, UseCase } from "../../../utils";
import { Errors, ResStatus } from "../../../constants";
import { Comment } from "../models/comment";
import { paginate } from "../../../utils/pagination";

interface Params {
	post: Schema.Types.ObjectId;
	queries: any;
}

export const listPostComments: UseCase<Params> = async (params) => {
	const { post, queries } = params;

	const page = queries.page * 1 || 1;
	const limit = queries.limit * 1 || 10;

	const comments = await Comment.find({ post })
		.sort({ createdAt: -1 })
		.skip((page - 1) * limit)
		.limit(limit);
	if (!comments) return { error: Errors.Genric };

	const pagination = paginate(comments.length, page, limit);
	const response = new AppResponse(ResStatus.OK, {
		result: comments,
		pagination,
	});
	return { response };
};
