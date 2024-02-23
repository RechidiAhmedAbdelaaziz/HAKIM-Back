import { Schema } from "mongoose";
import { AppResponse, UseCase } from "../../../utils";
import { Errors, ResStatus } from "../../../constants";
import { Answer } from "../models";

interface Params {
	id: Schema.Types.ObjectId;
	text: string;
}

export const updateAnswer: UseCase<Params> = async (params) => {
	const { text, id } = params;

	const answer = await Answer.findByIdAndUpdate(
		id,
		{
			text,
		},
		{ new: true }
	);
	if (!answer) return { error: Errors.Genric };

	const response = new AppResponse(ResStatus.OK, answer);
	return { response };
};
