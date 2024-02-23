import { Schema } from "mongoose";
import { Errors, ResStatus } from "../../../constants";
import { AppResponse, UseCase } from "../../../utils";
import { Appointment } from "../models/appointment";

interface Params {
	id: Schema.Types.ObjectId;
	date: Date;
}

export const RescheduleAppointment: UseCase<Params> = async (params) => {
	const { id, date } = params;

	const appointment = await Appointment.findByIdAndUpdate(id, { date });
	if (!appointment) return { error: Errors.No_Model("Appointment") };

	const response = new AppResponse(
		ResStatus.OK,
		appointment,
		"appointment rescheduled "
	);
	return { response };
};
