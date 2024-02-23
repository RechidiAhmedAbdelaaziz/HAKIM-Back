import { Schema } from "mongoose";
import { AppResponse, UseCase } from "../../../utils";
import { Errors, ResStatus } from "../../../constants";
import { Question } from "../models";

interface Params {
	id: Schema.Types.ObjectId;
}

export const getQuestionById: UseCase<Params> = async (params) => {
	const { id } = params;

	const question = await Question.findById(id);
	if (!question) return { error: Errors.Genric };

	const response = new AppResponse(ResStatus.OK, question);
	return { response };
};
