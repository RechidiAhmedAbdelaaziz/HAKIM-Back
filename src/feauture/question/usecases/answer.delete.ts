import { Schema } from "mongoose";
import { AppResponse, UseCase } from "../../../utils";
import { Errors, ResStatus } from "../../../constants";
import { Answer } from "../models";

interface Params {
	id: Schema.Types.ObjectId;
}

export const deleteAnswer: UseCase<Params> = async (params) => {
	const { id } = params;

	const answer = await Answer.findByIdAndDelete(id);
	if (!answer) return { error: Errors.Genric };

	const response = new AppResponse(ResStatus.No_Content);
	return { response };
};
