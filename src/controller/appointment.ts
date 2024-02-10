import expressAsyncHandler from "express-async-handler";
import {
	createAppointment,
	deleteAppointment,
	getAppointment,
	getDoctorAppoinments,
	getPatientAppoinments,
	updateAppointment,
} from "../db";
import { AppointmentDoc, Doctor, User } from "../models";
import { AuthPayload, CreateAppointmentDio } from "../dio";
import { AppModels, ErrorMessage, ErrorStatus, ResStatus } from "../constants";
import { AppERROR, AppResponse, sendRes } from "../utils";
import { Applogger } from "../service";

export default {
	create: expressAsyncHandler(async (req, res, next) => {
		const { date, type, patient } = <CreateAppointmentDio>req.body;

		const { id } = <AuthPayload>req.user;

		const checkUser = await User.findById(patient);
		if (!checkUser) return next(new AppERROR(ErrorMessage.Generic, ErrorStatus.Bad_Gateway));

		const appointment = await createAppointment({ date, doctor: id, type, patient });
		if (!appointment) return next(new AppERROR(ErrorMessage.Generic, ErrorStatus.Bad_Gateway));

		await checkUser.updateOne({ $push: { "patient.appointments": appointment } });
		await Doctor.findByIdAndUpdate(id, { $push: { appointments: appointment } });

		const Response = new AppResponse(
			ResStatus.OK,
			{ appointment },
			"Appointment created successfully"
		);
		sendRes(Response, res);
	}),

	get: expressAsyncHandler(async (req, res, next) => {
		const { id } = <AuthPayload>req.user;
		const AppointmentId = req.params.id;

		const appointment = await getAppointment(AppointmentId, id);
		if (!appointment) return next(new AppERROR(ErrorMessage.Not_Found, ErrorStatus.Not_Found));

		const Response = new AppResponse(ResStatus.OK, { appointment });
		sendRes(Response, res);
	}),

	getAll: expressAsyncHandler(async (req, res, next) => {
		const { kind } = <AuthPayload>req.user;
		if (kind === AppModels.doctor) return getDoctor(req, res, next);
		return getPatient(req, res, next);
	}),

	reschedule: expressAsyncHandler(async (req, res, next) => {
		const id = req.params.id;
		const { date } = <AppointmentDoc>req.body;

		const appointment = await updateAppointment(id, { date });
		if (!appointment) return next(new AppERROR(ErrorMessage.Not_Found, ErrorStatus.Not_Found));

		const Response = new AppResponse(ResStatus.OK, { appointment }, "Appointment rescheduled");
		sendRes(Response, res);
	}),

	cancel: expressAsyncHandler(async (req, res) => {
		const id = req.params.id;
		Applogger.warn(id);
		await deleteAppointment(id);

		const Response = new AppResponse(ResStatus.OK, {}, "Appointment canceld");
		sendRes(Response, res);
	}),
};

const getDoctor = expressAsyncHandler(async (req, res, next) => {
	const { id } = <AuthPayload>req.user;

	const appointments = await getDoctorAppoinments(id);
	if (!appointments) return next(new AppERROR(ErrorMessage.Not_Found, ErrorStatus.Not_Found));

	const Response = new AppResponse(ResStatus.OK, { appointments });
	sendRes(Response, res);
});

const getPatient = expressAsyncHandler(async (req, res, next) => {
	const { id } = <AuthPayload>req.user;

	const appointments = await getPatientAppoinments(id);
	if (!appointments) return next(new AppERROR(ErrorMessage.Not_Found, ErrorStatus.Not_Found));

	const Response = new AppResponse(ResStatus.OK, { appointments });
	sendRes(Response, res);
});
