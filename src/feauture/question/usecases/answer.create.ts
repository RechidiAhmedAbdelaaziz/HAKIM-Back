import { Schema } from "mongoose";
import { AppResponse, UseCase } from "../../../utils";
import { Errors, ResStatus } from "../../../constants";
import { Answer } from "../models";

interface Params {
	question: Schema.Types.ObjectId;
	text: string;
	respondent: Schema.Types.ObjectId;
}

export const createAnswer: UseCase<Params> = async (params) => {
	const { text, respondent, question } = params;

	const answer = await Answer.create({
		text,
		respondent,
		question,
	});
	if (!answer) return { error: Errors.Genric };

	const response = new AppResponse(ResStatus.OK, answer);
	return { response };
};
