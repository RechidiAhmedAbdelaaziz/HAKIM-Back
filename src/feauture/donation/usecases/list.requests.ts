import { Schema, Types } from "mongoose";
import { Errors, ResStatus } from "../../../constants";
import { AppResponse } from "../../../utils";
import { UseCase } from "../../../utils/types/usecases";
import { Donation } from "../models/donation";
import ModelsGetter from "../../../utils/model.getter";

interface Param {
	query_: any;
}

export const getDonationRequests: UseCase<Param> = async (param) => {
	const { query, pagination } = new ModelsGetter(
		Donation.find({}).sort({ date: -1 }),
		param.query_
	).paginate(await Donation.countDocuments({}));

	const donations = await query.exec();
	if (!donations) return { error: Errors.No_Models("Donation requestes") };

	//Send Response
	const response = new AppResponse(ResStatus.OK, {
		result: donations,
		pagination,
	});

	return { response };
};
