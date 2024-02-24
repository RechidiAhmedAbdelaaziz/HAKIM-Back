import { Schema } from "mongoose";
import { ResStatus } from "../../../constants";
import { AppResponse, UseCase } from "../../../utils";
import { Appointment } from "../models/appointment";
import moment from "moment";
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

	const startOfDay = moment(date).startOf("day").toDate();
	const endOfDay = moment(date).endOf("day").toDate();
	const appointments = await Appointment.find({
		$or: [{ doctor }, { patient }],
		date: {
			$gte: startOfDay,
			$lt: endOfDay,
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
