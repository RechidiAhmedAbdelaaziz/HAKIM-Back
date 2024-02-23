import { Schema } from "mongoose";
import { AppResponse, UseCase } from "../../../utils";
import { Errors, ResStatus } from "../../../constants";
import { Comment } from "../models/comment";

interface Params {
	id: Schema.Types.ObjectId;
	text: String;
}

export const updateComment: UseCase<Params> = async (params) => {
	const { text, id } = params;

	const comment = await Comment.findByIdAndUpdate(
		id,
		{
			text,
		},
		{ new: true }
	);
	if (!comment) return { error: Errors.Genric };

	const response = new AppResponse(ResStatus.OK, comment);
	return { response };
};
