import { Schema } from "mongoose";
import expressAsyncHandler from "express-async-handler";
import { AuthPayload, SendErorrOrResponse } from "../../../utils";
import { useCases } from "../usecases";

const controller = {
	getById: expressAsyncHandler(async (req, res, next) => {
		const id = req.params.id as unknown as Schema.Types.ObjectId;

		const result = await useCases.getQuestionById({ id });
		SendErorrOrResponse(result, res, next);
	}),

	create: expressAsyncHandler(async (req, res, next) => {
		const { id: questioner } = <AuthPayload>req.user;
		const { text } = req.body;

		const result = await useCases.createQuestion({
			questioner,
			text,
		});
		SendErorrOrResponse(result, res, next);
	}),

	update: expressAsyncHandler(async (req, res, next) => {
		const id = req.params.id as unknown as Schema.Types.ObjectId;
		const { text } = req.body;

		const result = await useCases.updateQuestion({
			id,
			text,
		});
		SendErorrOrResponse(result, res, next);
	}),

	delete: expressAsyncHandler(async (req, res, next) => {
		const id = req.params.id as unknown as Schema.Types.ObjectId;

		const result = await useCases.deleteQuestion({ id });
		SendErorrOrResponse(result, res, next);
	}),

	listAll: expressAsyncHandler(async (req, res, next) => {
		const result = await useCases.listQuestions({
			queries: req.query,
		});
		SendErorrOrResponse(result, res, next);
	}),
};

export { controller as QuestionController };
