import { Schema } from "mongoose";
import { AppResponse, UseCase } from "../../../utils";
import { Errors, ResStatus } from "../../../constants";
import { Like } from "../models/like";

interface Params {
	id: Schema.Types.ObjectId;
}

export const deleteLike: UseCase<Params> = async (params) => {
	const { id } = params;

	const like = await Like.findByIdAndDelete(id);
	if (!like) return { error: Errors.Genric };

	const response = new AppResponse(ResStatus.OK, {}, "You unliked the post");
	return { response };
};
