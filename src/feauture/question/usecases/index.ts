import { createAnswer } from "./answer.create";
import { deleteAnswer } from "./answer.delete";
import { getAnswerById } from "./answer.getbyid";
import { listQuestionAnswers } from "./answer.listbyquestion";
import { updateAnswer } from "./answer.update";
import { createQuestion } from "./question.create";
import { deleteQuestion } from "./question.delete";
import { getQuestionById } from "./question.getbyid";
import { listQuestions } from "./question.list";
import { updateQuestion } from "./question.update";

export const useCases = {
	createAnswer,
	updateAnswer,
	deleteAnswer,
	getAnswerById,
	listQuestionAnswers,
	listQuestions,
	createQuestion,
	updateQuestion,
	deleteQuestion,
	getQuestionById,
};
