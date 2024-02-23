import { Schema } from "mongoose";
import { AppResponse, UseCase } from "../../../utils";
import { Errors, ResStatus } from "../../../constants";
import { Question } from "../models";

interface Params {
	questioner: Schema.Types.ObjectId;
	text: String;
}

export const createQuestion: UseCase<Params> = async (params) => {
	const { text, questioner } = params;

	const question = await Question.create({
		text,
		questioner,
	});
	if (!question) return { error: Errors.Genric };

	const response = new AppResponse(ResStatus.OK, question);
	return { response };
};
