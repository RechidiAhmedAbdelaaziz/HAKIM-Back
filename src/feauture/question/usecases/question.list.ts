import { Schema } from "mongoose";
import { AppResponse, UseCase } from "../../../utils";
import { Errors, ResStatus } from "../../../constants";
import { Question } from "../models";
import { paginate } from "../../../utils/pagination";

interface Params {
	queries: any;
}

export const listQuestions: UseCase<Params> = async (params) => {
	const { queries } = params;

	const page = queries.page * 1 || 1;
	const limit = queries.limit * 1 || 10;

	const question = await Question.find({})
		.sort({
			createdAt: -1,
		})
		.skip((page - 1) * limit)
		.limit(page);
	if (!question) return { error: Errors.No_Models("Question") };

	const pagination = paginate(question.length, limit, page);

	const response = new AppResponse(ResStatus.OK, {
		result: question,
		pagination,
	});
	return { response };
};
