import { Answer, AnswerType, Question, QuestionType } from "../models";
import { CreateAnswerDio, CreateQuestionDio, EditAnswerDio, EditQuestionDio } from "../dio";

//**
//* @part Question
//**

//*  create
export const createQuestion = async (info: CreateQuestionDio): Promise<QuestionType> => {
	const { questioner, question } = info;
	const created = await Question.create({ questioner, question });
	return created;
};

//*  getAll
export const getQuestions = async (): Promise<QuestionType[]> => {
	const questions = await Question.find({});
	return questions;
};

//*  get
export const getQuestion = async (id: any): Promise<QuestionType> => {
	const question = await Question.findById(id);
	return question;
};

//* edit
export const editQuestion = async (info: EditQuestionDio): Promise<QuestionType> => {
	const { questioner, question, id, pullAnswer, pushAnswer } = info;
	const updated = await Question.findOne({ _id: id });
	if (updated) {
		if (question && updated.questioner === questioner) updated.question = question;
		await updated.updateOne({
			$addToSet: { answers: pushAnswer },
			$pull: { answers: pullAnswer },
		});
		await updated.save();
	}
	return updated;
};

//* delete
export const deleteQuestion = async ({ id, questioner }): Promise<QuestionType> => {
	const deleted = await Question.findOneAndDelete({ _id: id, questioner: questioner });
	return deleted;
};

//**
//* @part Answer
//**

//*  create
export const createAnswer = async (info: CreateAnswerDio): Promise<AnswerType> => {
	const created = await Answer.create({ ...info });
	return created;
};

//*  getAll
export const getAnswers = async (question: any): Promise<AnswerType[]> => {
	const answers = await Answer.find({ question });
	return answers;
};

//*  get
export const getAnswer = async (id: any): Promise<AnswerType> => {
	const answer = await Answer.findById(id);
	return answer;
};

//* edit
export const editAnswer = async (info: EditAnswerDio): Promise<AnswerType> => {
	const { answer, respondent, id } = info;
	const updated = await Answer.findOneAndUpdate({ _id: id, respondent }, { answer });
	return updated;
};

//* delete
export const deleteAnswer = async (id: any): Promise<AnswerType> => {
	return await Answer.findByIdAndDelete(id);
};
export const deleteOwnAnswer = async (id: any, respondent: any): Promise<AnswerType> => {
	return await Answer.findOneAndDelete({ _id: id, respondent });
};
