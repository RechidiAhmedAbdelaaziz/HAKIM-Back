import { Schema } from "mongoose";
import { Errors, ResStatus } from "../../../constants";
import { AppResponse, UseCase } from "../../../utils";
import { Appointment } from "../models/appointment";
import { User } from "../../auth/models";

interface Params {
	type: string;
	date: Date;
	doctor: Schema.Types.ObjectId;
	patient: Schema.Types.ObjectId;
}

export const CreateAppointment: UseCase<Params> = async (params) => {
	const { date, doctor, patient, type } = params;

	const checkPatient = await User.findById(patient);
	if (!checkPatient) return { error: Errors.No_Model("Patient") };

	const appointment = await Appointment.create({
		date,
		doctor,
		patient,
		type,
	});
	if (!appointment) return { error: Errors.Genric };

	const response = new AppResponse(ResStatus.OK);
	return { response };
};
