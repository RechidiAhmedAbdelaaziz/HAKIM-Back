import { Schema, Types } from "mongoose";
import { Errors, ResStatus } from "../../../constants";
import { AppResponse } from "../../../utils";
import { UseCase } from "../../../utils/types/usecases";
import { Donation } from "../models/donation";

interface Params {
	need: string;
	user: Schema.Types.ObjectId;
	location: {
		title: string;
		longtitude: number;
		latitude: number;
	};
	isUrgent?: boolean;
	phone: String;
	type: "Blood" | "Medical supplies & equipment";
	date: Date;
}

export const makeDonationRequest: UseCase<Params> = async (params) => {
	const { location, need, phone, type, user, isUrgent, date } = params;

	const donation = new Donation({
		location,
		need,
		phone,
		type,
		user,
		isUrgent,
		date,
	});
	await donation.save();

	if (!donation) return { error: Errors.No_Model("Donation") };

	//Send Response
	const response = new AppResponse(ResStatus.OK, donation);

	return { response };
};
