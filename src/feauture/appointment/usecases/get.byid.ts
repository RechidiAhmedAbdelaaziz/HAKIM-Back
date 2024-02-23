import { Schema } from "mongoose";
import { Errors, ResStatus } from "../../../constants";
import { AppResponse, UseCase } from "../../../utils";
import { Appointment } from "../models/appointment";

interface Params {
	id: Schema.Types.ObjectId;
}

export const GetAppointmentById: UseCase<Params> = async (params) => {
	const { id } = params;

	const appointment = await Appointment.findById(id);
	if (!appointment) return { error: Errors.No_Model("Appointment") };

	const response = new AppResponse(ResStatus.OK, appointment);
	return { response };
};
