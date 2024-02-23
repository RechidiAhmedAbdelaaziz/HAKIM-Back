import { Schema } from "mongoose";
import { AppResponse, UseCase } from "../../../utils";
import { Errors, ResStatus } from "../../../constants";
import { Question } from "../models";

interface Params {
	id: Schema.Types.ObjectId;
	text: String;
}

export const updateQuestion: UseCase<Params> = async (params) => {
	const { text, id } = params;

	const question = await Question.findByIdAndUpdate(
		id,
		{
			text,
		},
		{ new: true }
	);
	if (!question) return { error: Errors.Genric };

	const response = new AppResponse(ResStatus.OK, question);
	return { response };
};
