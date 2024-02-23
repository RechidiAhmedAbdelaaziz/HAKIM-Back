import expressAsyncHandler from "express-async-handler";
import useCases from "../usecases";
import { AuthPayload, SendErorrOrResponse } from "../../../utils";
import { Schema } from "mongoose";

const controller = {
	signUp: expressAsyncHandler(async (req, res, next) => {
		const { email, password, name } = req.body;

		const result = await useCases.signUp({
			email,
			name,
			password,
		});

		SendErorrOrResponse(result, res, next);
	}),

	login: expressAsyncHandler(async (req, res, next) => {
		const { login, password } = req.body;

		const result = await useCases.login({
			login,
			password,
		});

		SendErorrOrResponse(result, res, next);
	}),

	createDoctorProfile: expressAsyncHandler(async (req, res, next) => {
		const { id } = <AuthPayload>req.user;
		const { phone, specialization, location, worktime } = req.body;

		const result = await useCases.createDoctor({
			id,
			phone,
			specialization,
			location,
			worktime,
		});

		SendErorrOrResponse(result, res, next);
	}),

	showMyProfile: expressAsyncHandler(async (req, res, next) => {
		const { id } = <AuthPayload>req.user;

		const result = await useCases.getProfile({ id });

		SendErorrOrResponse(result, res, next);
	}),
	showProfile: expressAsyncHandler(async (req, res, next) => {
		const { id } = req.params as unknown as { id: Schema.Types.ObjectId };

		const result = await useCases.getProfile({ id });

		SendErorrOrResponse(result, res, next);
	}),
};

export { controller as AuthController };
