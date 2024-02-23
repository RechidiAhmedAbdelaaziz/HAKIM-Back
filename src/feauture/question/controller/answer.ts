import expressAsyncHandler from "express-async-handler";
import { useCases } from "../usecases";
import { AuthPayload, SendErorrOrResponse } from "../../../utils";
import { Schema } from "mongoose";

const controller = {
	getById: expressAsyncHandler(async (req, res, next) => {
		const id = req.params.id as unknown as Schema.Types.ObjectId;

		const result = await useCases.getAnswerById({ id });
		SendErorrOrResponse(result, res, next);
	}),

	create: expressAsyncHandler(async (req, res, next) => {
		const { id: respondent } = <AuthPayload>req.body;
		const { text } = req.body;
		const question = req.params.id as unknown as Schema.Types.ObjectId;

		const result = await useCases.createAnswer({
			question,
			respondent,
			text,
		});
		SendErorrOrResponse(result, res, next);
	}),

	update: expressAsyncHandler(async (req, res, next) => {
		const { text } = req.body;
		const id = req.params.id as unknown as Schema.Types.ObjectId;

		const result = await useCases.updateAnswer({ id, text });
		SendErorrOrResponse(result, res, next);
	}),

	delete: expressAsyncHandler(async (req, res, next) => {
		const id = req.params.id as unknown as Schema.Types.ObjectId;

		const result = await useCases.deleteAnswer({ id });
		SendErorrOrResponse(result, res, next);
	}),

	listAll: expressAsyncHandler(async (req, res, next) => {
		const question = req.params.id as unknown as Schema.Types.ObjectId;

		const result = await useCases.listQuestionAnswers({
			question,
			queries: req.query,
		});
		SendErorrOrResponse(result, res, next);
	}),
};

export { controller as AnswerController };
