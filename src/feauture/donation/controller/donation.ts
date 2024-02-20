import { Schema } from "mongoose";
import expressAsyncHandler from "express-async-handler";
import { DonationUseCases as useCases } from "../usecases";
import { AuthPayload } from "../../auth/dio/auth";
import { SendErorrOrResponse } from "../../../utils";

const contrller = {
	requestDonation: expressAsyncHandler(async (req, res, next) => {
		const { id: user } = req.user as AuthPayload;
		const { date, location, need, phone, type, isUrgent } = req.body;

		const result = await useCases.makeDonationRequest({
			date,
			location,
			need,
			phone,
			type,
			user,
			isUrgent,
		});

		SendErorrOrResponse(result, res, next);
	}),

	listDonations: expressAsyncHandler(async (req, res, next) => {
		const result = await useCases.getDonationRequests({
			query_: req.query,
		});

		SendErorrOrResponse(result, res, next);
	}),

	editRequest: expressAsyncHandler(async (req, res, next) => {
		const id = req.params.id as unknown as Schema.Types.ObjectId;
		const { date, location, need, phone, type, isUrgent } = req.body;

		const result = await useCases.editRequest({
			id,
			date,
			location,
			need,
			phone,
			type,
			isUrgent,
		});

		SendErorrOrResponse(result, res, next);
	}),
};

export { contrller as DonationController };
