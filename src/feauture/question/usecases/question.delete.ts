import { Schema } from "mongoose";
import { AppResponse, UseCase } from "../../../utils";
import { Errors, ResStatus } from "../../../constants";
import { Answer, Question } from "../models";

interface Params {
	id: Schema.Types.ObjectId;
}

export const deleteQuestion: UseCase<Params> = async (params) => {
	const { id } = params;

	const question = await Question.findByIdAndDelete(id);
	if (!question) return { error: Errors.Genric };

	await Answer.deleteMany({ question: id });

	const response = new AppResponse(ResStatus.No_Content);
	return { response };
};