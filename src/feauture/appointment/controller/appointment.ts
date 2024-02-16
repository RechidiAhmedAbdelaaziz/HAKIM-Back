import expressAsyncHandler from "express-async-handler";

import {
	AppModels,
	ErrorMessage,
	ErrorStatus,
	Errors,
	ResStatus,
} from "../../../constants";
import { AppERROR, AppResponse, sendResponse } from "../../../utils";
import { Applogger } from "../../../service";
import { AuthPayload } from "../../auth/dio/auth";
import { User, Doctor } from "../../auth/models";
import {
	createAppointment,
	getAppointment,
	updateAppointment,
	deleteAppointment,
	getDoctorAppoinments,
	getPatientAppoinments,
} from "../db/appointment";
import { CreateAppointmentDio } from "../dio/appointment";
import { AppointmentDoc } from "../models/appointment";

const controller = {
	create: expressAsyncHandler(async (req, res, next) => {
		const { date, type, patient } = <CreateAppointmentDio>req.body;

		const { id } = <AuthPayload>req.user;

		const checkUser = await User.findById(patient);
		if (!checkUser)
			return next(
				new AppERROR(ErrorMessage.Generic, ErrorStatus.Bad_Gateway)
			);

		const appointment = await createAppointment({
			date,
			doctor: id,
			type,
			patient,
		});
		if (!appointment)
			return next(
				new AppERROR(ErrorMessage.Generic, ErrorStatus.Bad_Gateway)
			);

		await checkUser.updateOne({
			$push: { "patient.appointments": appointment },
		});
		await Doctor.findByIdAndUpdate(id, {
			$push: { appointments: appointment },
		});

		const Response = new AppResponse(
			ResStatus.OK,
			{ appointment },
			"Appointment created successfully"
		);
		sendResponse(Response, res);
	}),

	get: expressAsyncHandler(async (req, res, next) => {
		const { id } = <AuthPayload>req.user;
		const AppointmentId = req.params.id;

		const appointment = await getAppointment(AppointmentId, id);
		if (!appointment)
			return next(
				new AppERROR(ErrorMessage.Not_Found, ErrorStatus.Not_Found)
			);

		const Response = new AppResponse(ResStatus.OK, { appointment });
		sendResponse(Response, res);
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
		if (!appointment)
			return next(
				new AppERROR(ErrorMessage.Not_Found, ErrorStatus.Not_Found)
			);

		const Response = new AppResponse(
			ResStatus.OK,
			{ appointment },
			"Appointment rescheduled"
		);
		sendResponse(Response, res);
	}),

	cancel: expressAsyncHandler(async (req, res) => {
		const id = req.params.id;
		Applogger.warn(id);
		await deleteAppointment(id);

		const Response = new AppResponse(
			ResStatus.OK,
			{},
			"Appointment canceld"
		);
		sendResponse(Response, res);
	}),
};

export { controller as AppointmentController };

const getDoctor = expressAsyncHandler(async (req, res, next) => {
	const { id } = <AuthPayload>req.user;
	const appointments = await getDoctorAppoinments(id, req.query);
	if (!appointments) return next(new Errors(AppModels.appointment).Not_found);

	const Response = new AppResponse(ResStatus.OK, appointments);
	sendResponse(Response, res);
});

const getPatient = expressAsyncHandler(async (req, res, next) => {
	const { id } = <AuthPayload>req.user;

	const appointments = await getPatientAppoinments(id, req.query);
	if (!appointments) return next(new Errors(AppModels.appointment).Not_found);

	const Response = new AppResponse(ResStatus.OK, appointments);
	sendResponse(Response, res);
});
