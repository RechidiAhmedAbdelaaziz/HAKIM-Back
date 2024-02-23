import { Schema } from "mongoose";
import { AppResponse, UseCase } from "../../../utils";
import { Errors, ResStatus } from "../../../constants";
import { Comment } from "../models/comment";

interface Params {
	id: Schema.Types.ObjectId;
}

export const deleteComment: UseCase<Params> = async (params) => {
	const { id } = params;

	const comment = await Comment.findByIdAndDelete(id);
	if (!comment) return { error: Errors.Genric };

	const response = new AppResponse(ResStatus.OK);
	return { response };
};
