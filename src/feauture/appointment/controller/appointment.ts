import expressAsyncHandler from "express-async-handler";
import { AuthPayload, SendErorrOrResponse } from "../../../utils";
import { useCases } from "../usecases";
import { AppModels } from "../../../constants";
import { Schema } from "mongoose";

const controller = {
	create: expressAsyncHandler(async (req, res, next) => {
		const { id: doctor } = <AuthPayload>req.user;
		const { date, patient, type } = req.body;

		const result = await useCases.CreateAppointment({
			date,
			doctor,
			patient,
			type,
		});
		SendErorrOrResponse(result, res, next);
	}),

	listAppointments: expressAsyncHandler(async (req, res, next) => {
		const { id, kind } = <AuthPayload>req.user;
		const { date } = req.body;

		const check = {};
		check[kind] = id;

		const result = await useCases.listAppointments({
			date,
			doctor: check["Doctor"],
			patient: check["Patient"],
			queries: req.query,
		});
		SendErorrOrResponse(result, res, next);
	}),

	getById: expressAsyncHandler(async (req, res, next) => {
		const id = req.params.id as unknown as Schema.Types.ObjectId;

		const result = await useCases.GetAppointmentById({ id });
		SendErorrOrResponse(result, res, next);
	}),

	reschedule: expressAsyncHandler(async (req, res, next) => {
		const id = req.params.id as unknown as Schema.Types.ObjectId;
		const { date } = req.body;

		const result = await useCases.RescheduleAppointment({ id, date });
		SendErorrOrResponse(result, res, next);
	}),

	cancel: expressAsyncHandler(async (req, res, next) => {
		const id = req.params.id as unknown as Schema.Types.ObjectId;

		const result = await useCases.CancelAppointment({ id });
		SendErorrOrResponse(result, res, next);
	}),
};

export { controller as AppointmentController };
