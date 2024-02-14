import { Document, Schema, model } from "mongoose";
import { AppModels } from "../../../constants";

//**
//* Question Schema
//**

export interface QuestionDoc extends Document {
	question: string;
	questioner: Schema.Types.ObjectId;
	answers: Schema.Types.ObjectId[];
}
const schema = new Schema(
	{
		question: { type: String, required: true },
		questioner: {
			type: Schema.Types.ObjectId,
			ref: AppModels.user,
			required: true,
		},
		answers: [{ type: Schema.Types.ObjectId, ref: AppModels.answer }],
	},
	{ timestamps: true }
);

//**
//* Answer Schema
//**

export interface AnswerDoc extends Document {
	question: Schema.Types.ObjectId;
	answer: string;
	respondent: Schema.Types.ObjectId;
}
const schema2 = new Schema(
	{
		question: {
			type: Schema.Types.ObjectId,
			ref: AppModels.question,
			required: true,
		},
		answer: { type: String, required: true },
		respondent: {
			type: Schema.Types.ObjectId,
			ref: AppModels.user,
			required: true,
		},
	},
	{ timestamps: true }
);

//**
//* Models And Types
//**

export const Question = model<QuestionDoc>(AppModels.question, schema);
export type QuestionType =
	| (Document<unknown, object, QuestionDoc> &
			QuestionDoc & {
				_id: Schema.Types.ObjectId;
			})
	| null;

export const Answer = model<AnswerDoc>(AppModels.answer, schema2);
export type AnswerType =
	| (Document<unknown, object, AnswerDoc> &
			AnswerDoc & {
				_id: Schema.Types.ObjectId;
			})
	| null;
