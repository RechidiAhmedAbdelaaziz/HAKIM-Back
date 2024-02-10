import { Appointment, AppointmentType, Doctor, User } from "../models";
import { EditAppointmentDio, CreateAppointmentDio } from "../dio";
import { dontShow } from "../constants";
import { Applogger } from "../service";

export const createAppointment = async (info: CreateAppointmentDio): Promise<AppointmentType> => {
	const appoinment = await Appointment.create(info);
	return appoinment;
};

export const getAppointment = async (id: any, userID: any): Promise<AppointmentType> => {
	const appoinment = await Appointment.findById(id, dontShow);
	Applogger.warn(appoinment && (appoinment.doctor != userID || appoinment.patient != userID));
	if (appoinment && !(appoinment.doctor == userID || appoinment.patient == userID)) return null;
	return appoinment;
};

export const getPatientAppoinments = async (patientId: any): Promise<AppointmentType[]> => {
	const appoinments = await Appointment.find({ patient: patientId }, dontShow).sort({ date: -1 });
	return appoinments;
};
export const getDoctorAppoinments = async (doctorId: any): Promise<AppointmentType[]> => {
	const appoinments = await Appointment.find({ doctor: doctorId }, dontShow).sort({ date: -1 });
	return appoinments;
};

export const updateAppointment = async (
	id: string,
	update: EditAppointmentDio
): Promise<AppointmentType> => {
	const { date, type } = update;
	const updated = await Appointment.findByIdAndUpdate(id, { date, type }, { new: true });
	return updated;
};

export const deleteAppointment = async (id: string): Promise<AppointmentType> => {
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
