import { Schema, Types } from "mongoose";
import { Errors, ResStatus } from "../../../constants";
import { AppResponse } from "../../../utils";
import { UseCase } from "../../../utils/types/usecases";
import { Donation } from "../models/donation";

interface Params {
	need?: string;
	location?: {
		title: string;
		longtitude: number;
		latitude: number;
	};
	isUrgent?: boolean;
	phone?: String;
	type?: "Blood" | "Medical supplies & equipment";
	date?: Date;
	id: Schema.Types.ObjectId;
}

export const editRequest: UseCase<Params> = async (params) => {
	const { location, need, phone, type, id, isUrgent, date } = params;

	const donation = await Donation.findByIdAndUpdate(
		id,
		{
			location,
			need,
			phone,
			type,
			isUrgent,
			date,
		},
		{ new: true }
	);

	if (!donation) return { error: Errors.No_Model("Donation") };

	//Send Response
	const response = new AppResponse(ResStatus.OK, donation);

	return { response };
};
