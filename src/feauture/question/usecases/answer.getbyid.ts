import { Schema } from "mongoose";
import { AppResponse, UseCase } from "../../../utils";
import { Errors, ResStatus } from "../../../constants";
import { Answer } from "../models";

interface Params {
	id: Schema.Types.ObjectId;
}

export const getAnswerById: UseCase<Params> = async (params) => {
	const { id } = params;

	const answer = await Answer.findById(id);
	if (!answer) return { error: Errors.Genric };

	const response = new AppResponse(ResStatus.OK, answer);
	return { response };
};
