import { Schema, Types } from "mongoose";
import { Errors, ResStatus } from "../../../constants";
import { AppResponse, genrateSign } from "../../../utils";
import { UseCase } from "../../../utils/types/usecases";
import { User } from "../models";
import { sendVerificationEmail } from "../helpers/verify.email";

interface Params {
	id: Schema.Types.ObjectId;
	specialization: string;
	location?: {
		title: string;
		longtitude: number;
		latitude: number;
	}[];
	phone: number;
	worktime?: {
		day:
			| "Sunday"
			| "Monday"
			| "Tuesday"
			| "Wednesday"
			| "Thursday"
			| "Friday"
			| "Saturday";
		periods: {
			start: { hh: number; mm: number };
			end: { hh: number; mm: number };
		}[];
	}[];
}

export const createDoctor: UseCase<Params> = async (params) => {
	const { id, location, phone, specialization, worktime } = params;

	const doctor = await User.findByIdAndUpdate(
		id,
		{
			location,
			phone,
			specialization,
			worktime,
			kind: "Doctor",
		},
		{
			new: true,
			overwriteDiscriminatorKey: true,
		}
	).select("-password ");

	if (!doctor) return { error: Errors.No_Model("Doctor") };

	const token = genrateSign(doctor);
	await sendVerificationEmail(doctor._id, doctor.email);

	//Send Response
	const response = new AppResponse(ResStatus.OK, { result: doctor, token });

	return { response };
};
