import { login } from "../../auth/controller/auth.controller";
import { getSkip } from "../../../utils/paginate";
import { dontShow } from "../../../constants";
import { Applogger } from "../../../service";
import { Doctor, User } from "../../auth/models";
import { CreateAppointmentDio, EditAppointmentDio } from "../dio/appointment";
import {
	AppointmentType,
	Appointment,
	AppointmentDoc,
} from "../models/appointment";
import ModelsGetter, { ModelsGetterReturn } from "../../../utils/model.getter";

export const createAppointment = async (
	info: CreateAppointmentDio
): Promise<AppointmentType> => {
	const appoinment = await Appointment.create(info);
	return appoinment;
};

export const getAppointment = async (
	id: any,
	userID: any
): Promise<AppointmentType> => {
	const appoinment = await Appointment.findById(id, dontShow);
	Applogger.warn(
		appoinment &&
			(appoinment.doctor != userID || appoinment.patient != userID)
	);
	if (
		appoinment &&
		!(appoinment.doctor == userID || appoinment.patient == userID)
	)
		return null;
	return appoinment;
};

export const getPatientAppoinments = async (
	patientId: any,
	queryString?: any
): Promise<ModelsGetterReturn<any>> => {
	const query_ = new ModelsGetter(Appointment.find(), queryString);
	const { query, paginationResults } = query_
		.select({ patient: patientId })
		.sort()
		.fields()
		.filter()
		.search(["type"])
		.paginate(await Appointment.countDocuments({}));

	Applogger.info(query);

	const appointments = await query.exec();

	return { result: appointments, pagination: paginationResults };
};
export const getDoctorAppoinments = async (
	patientId: any,
	queryString?: any
): Promise<ModelsGetterReturn<any>> => {
	const query_ = new ModelsGetter(Appointment.find(), queryString);
	const { query, paginationResults } = query_
		.select({ doctor: patientId })
		.sort()
		.fields()
		.filter()
		.search(["type"])
		.paginate(await Appointment.countDocuments({}));

	const appointments = await query.exec();

	return { result: appointments, pagination: paginationResults };
};

export const updateAppointment = async (
	id: string,
	update: EditAppointmentDio
): Promise<AppointmentType> => {
	const { date, type } = update;
	const updated = await Appointment.findByIdAndUpdate(
		id,
		{ date, type },
		{ new: true }
	);
	return updated;
};

export const deleteAppointment = async (
	id: string
): Promise<AppointmentType> => {
	const appointment = await Appointment.findById(id, dontShow);

	if (appointment) {
		await Doctor.findByIdAndUpdate(appointment?.doctor, {
			$pull: { appointments: appointment._id },
		});

		await User.findByIdAndUpdate(appointment?.patient, {
			$pull: { "patient.appointments": appointment._id },
		});

		return await appointment?.deleteOne();
	}
	return appointment;
};
