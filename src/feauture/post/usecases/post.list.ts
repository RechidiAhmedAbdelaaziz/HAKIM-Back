import { Schema } from "mongoose";
import { AppResponse, UseCase } from "../../../utils";
import { Post } from "../models/post";
import { Errors, ResStatus } from "../../../constants";
import { paginate } from "../../../utils/pagination";

interface Params {
	queries: any;
}

export const listPosts: UseCase<Params> = async (params) => {
	const { queries } = params;

	const page = queries.page * 1 || 1;
	const limit = queries.limit * 1 || 10;

	const posts = await Post.find({})
		.sort({ createdAt: -1 })
		.skip((page - 1) * limit)
		.limit(limit);
	if (!posts) return { error: Errors.Genric };

	const pagination = paginate(posts.length, page, limit);
	const response = new AppResponse(ResStatus.OK, {
		result: posts,
		pagination,
	});
	return { response };
};
