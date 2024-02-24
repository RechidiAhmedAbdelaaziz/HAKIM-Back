import { Schema } from "mongoose";
import { Errors, ResStatus } from "../../../constants";
import { AppResponse, UseCase } from "../../../utils";
import { Appointment } from "../models/appointment";

interface Params {
	id: Schema.Types.ObjectId;
}

export const CancelAppointment: UseCase<Params> = async (params) => {
	const { id } = params;

	const appointment = await Appointment.findByIdAndDelete(id);
	if (!appointment) return { error: Errors.No_Model("Appointment") };

	const response = new AppResponse(
		ResStatus.No_Content,
		{},
		"Appointment canceled"
	);
	return { response };
};
