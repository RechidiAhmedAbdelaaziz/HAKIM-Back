import { Schema } from "mongoose";
import { Errors, ResStatus, dontShow } from "../../../constants";
import { AppResponse } from "../../../utils";
import { UseCase } from "../../../utils/types/usecases";
import { User } from "../models";

interface Params {
	id: Schema.Types.ObjectId;
}

export const getProfile: UseCase<Params> = async (params) => {
	const { id } = params;

	const user = await User.findById(id, dontShow);

	if (!user) return { error: Errors.No_Model("User") };

	const response = new AppResponse(ResStatus.OK, user);

	return { response };
};
