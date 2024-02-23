import { Schema } from "mongoose";
import { AppResponse, UseCase } from "../../../utils";
import { Errors, ResStatus } from "../../../constants";
import { Answer } from "../models";
import { paginate } from "../../../utils/pagination";

interface Params {
	question: Schema.Types.ObjectId;
	queries: any;
}

export const listQuestionAnswers: UseCase<Params> = async (params) => {
	const { question, queries } = params;

	const page = queries.page * 1 || 1;
	const limit = queries.limit * 1 || 10;

	const answer = await Answer.find({ question })
		.skip((page - 1) * limit)
		.limit(limit);
	if (!answer) return { error: Errors.Genric };

	const pagination = paginate(answer.length, page, limit);
	const response = new AppResponse(ResStatus.OK, {
		result: answer,
		pagination,
	});
	return { response };
};
