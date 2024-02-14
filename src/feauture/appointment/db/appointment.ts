import { login } from "../../auth/controller/auth.controller";
import { getSkip } from "../../../utils/paginate";
import { dontShow } from "../../../constants";
import { Applogger } from "../../../service";
import { Doctor, User } from "../../auth/models";
import { CreateAppointmentDio, EditAppointmentDio } from "../dio/appointment";
import { AppointmentType, Appointment } from "../models/appointment";

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
	query?: any
): Promise<AppointmentType[]> => {
	const { skip, limit } = getSkip({ page: query.page, limit: query.limit });
	const appoinments = Appointment.find({ patient: patientId }, dontShow)
		.sort({ date: -1 })
		.skip(skip)
		.limit(limit);
	return appoinments;
};
export const getDoctorAppoinments = async (
	doctorId: any,
	query?: any
): Promise<AppointmentType[]> => {
	const { skip, limit } = getSkip({ page: query.page, limit: query.limit });

	const appoinments = await Appointment.find({ doctor: doctorId }, dontShow)
		.sort({ date: -1 })
		.skip(skip)
		.limit(limit);

	return appoinments;
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
