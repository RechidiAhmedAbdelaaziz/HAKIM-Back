import { ResStatus } from "../../../constants/res.status";
import expressAsyncHandler from "express-async-handler";

import { AppModels, Errors } from "../../../constants";
import { AppResponse, sendResponse } from "../../../utils";
import {
	createAnswer,
	createQuestion,
	deleteAnswer,
	deleteOwnAnswer,
	deleteQuestion,
	editAnswer,
	editQuestion,
	getAnswer,
	getAnswers,
	getQuestion,
	getQuestions,
} from "../db/question";
import { AuthPayload } from "../../auth/dio/auth";
import {
	CreateQuestionDio,
	EditQuestionDio,
	CreateAnswerDio,
	EditAnswerDio,
} from "../dio/question";

const controller = {
	//*
	//** @Question */
	//*
	getAllQues: expressAsyncHandler(async (req, res, next) => {
		const questions = await getQuestions();
		if (!questions) return next(new Errors(AppModels.question).Not_found);

		const response = new AppResponse(ResStatus.OK, { questions });
		sendResponse(response, res);
	}),
	getQues: expressAsyncHandler(async (req, res, next) => {
		const question = await getQuestion(req.params.id);
		if (!question) return next(new Errors(AppModels.question).Not_found);

		const response = new AppResponse(ResStatus.OK, question);
		sendResponse(response, res);
	}),

	ask: expressAsyncHandler(async (req, res, next) => {
		const { question } = <CreateQuestionDio>req.body;
		const { id: questioner } = <AuthPayload>req.user;

		const created = await createQuestion({
			question,
			questioner: questioner,
		});
		if (!created) return next(new Errors(AppModels.question).Not_found);

		const response = new AppResponse(
			ResStatus.OK,
			{ question: created },
			"Your question was created"
		);
		sendResponse(response, res);
	}),

	editQues: expressAsyncHandler(async (req, res, next) => {
		const { question } = <EditQuestionDio>req.body;
		const { id } = req.params;
		const { id: questioner } = <AuthPayload>req.user;

		const updated = await editQuestion({ id, questioner, question });
		if (!updated) return next(new Errors(AppModels.question).Not_found);

		const response = new AppResponse(
			ResStatus.OK,
			{},
			"Your question was updated"
		);
		sendResponse(response, res);
	}),

	deleteQues: expressAsyncHandler(async (req, res, next) => {
		const { id } = req.params;
		const { id: questioner } = <AuthPayload>req.user;

		const question = await deleteQuestion({ id, questioner });
		if (!question) return next(new Errors(AppModels.question).Not_found);
		question.answers.forEach(async (e) => {
			await deleteAnswer(e);
		});

		const response = new AppResponse(
			ResStatus.OK,
			{},
			"Your question was deleted"
		);
		sendResponse(response, res);
	}),

	//*
	//** @Answer */
	//*

	getAllAnswr: expressAsyncHandler(async (req, res, next) => {
		const { id } = req.params;
		const answers = await getAnswers(id);
		if (!answers) return next(new Errors(AppModels.answer).Not_found);

		const response = new AppResponse(ResStatus.OK, { answers });
		sendResponse(response, res);
	}),
	getAnswr: expressAsyncHandler(async (req, res, next) => {
		const answer = await getAnswer(req.params.id);
		if (!answer) return next(new Errors(AppModels.answer).Not_found);

		const response = new AppResponse(ResStatus.OK, { answer });
		sendResponse(response, res);
	}),

	answer: expressAsyncHandler(async (req, res, next) => {
		const { answer } = <CreateAnswerDio>req.body;
		const { id: question } = req.params;
		const { id: respondent } = <AuthPayload>req.user;

		const checkQuestion = await getQuestion(question);
		if (!checkQuestion)
			return next(new Errors(AppModels.question).Not_found);
		const created = await createAnswer({ question, respondent, answer });
		if (!created) return next(new Errors(AppModels.answer).Not_found);
		await editQuestion({ id: created.question, pushAnswer: created._id });

		const response = new AppResponse(
			ResStatus.OK,
			{ answer: created },
			"Your answer was posted"
		);
		sendResponse(response, res);
	}),

	editAnswr: expressAsyncHandler(async (req, res, next) => {
		const { answer } = <EditAnswerDio>req.body;
		const { id } = req.params;
		const { id: respondent } = <AuthPayload>req.user;

		const updated = await editAnswer({ id, respondent, answer });
		if (!updated) return next(new Errors(AppModels.answer).Not_found);

		const response = new AppResponse(
			ResStatus.OK,
			{},
			"Your answer was updated"
		);
		sendResponse(response, res);
	}),

	deleteAnswr: expressAsyncHandler(async (req, res, next) => {
		const { id } = req.params;
		const { id: respondent } = <AuthPayload>req.user;

		const answer = await deleteOwnAnswer(id, respondent);
		if (!answer) return next(new Errors(AppModels.answer).Not_found);
		await editQuestion({ id: answer.question, pullAnswer: answer._id });

		const response = new AppResponse(
			ResStatus.OK,
			{},
			"Your answer was deleted"
		);
		sendResponse(response, res);
	}),
};

export { controller as QuestionController };
