import { Schema } from "mongoose";
import { Errors, ResStatus } from "../../../constants";
import { AppResponse, UseCase } from "../../../utils";
import { Appointment } from "../models/appointment";
import { User } from "../../auth/models";
import ModelsGetter from "../../../utils/model.getter";
import { paginate } from "../../../utils/pagination";

interface Params {
	date: Date;
	doctor?: Schema.Types.ObjectId;
	patient?: Schema.Types.ObjectId;
	queries: any;
}

export const listAppointments: UseCase<Params> = async (params) => {
	const { date, doctor, patient, queries } = params;

	const page = queries.page * 1 || 1;
	const limit = queries.limit * 1 || 10;

	const appointments = await Appointment.find({
		$or: [{ doctor }, { patient }],
		date: {
			$gte: date.setHours(0, 0, 0, 0),
			$lt: date.setHours(23, 59, 59, 999),
		},
	})
		.sort("-date")
		.skip((page - 1) * limit)
		.limit(limit);

	const pagination = paginate(appointments.length, page, limit);

	const response = new AppResponse(ResStatus.OK, {
		result: appointments,
		pagination,
	});
	return { response };
};
