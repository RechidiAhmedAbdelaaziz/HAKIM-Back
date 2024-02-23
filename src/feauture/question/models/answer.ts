import { Schema, model } from "mongoose";
import { AppModels } from "../../../constants";

export interface AnswerDoc extends Document {
	question: Schema.Types.ObjectId;
	text: string;
	respondent: Schema.Types.ObjectId;
}
const schema = new Schema(
	{
		question: {
			type: Schema.Types.ObjectId,
			ref: AppModels.question,
			required: true,
			index: true,
		},
		text: { type: String, required: true },
		respondent: {
			type: Schema.Types.ObjectId,
			ref: AppModels.user,
			required: true,
		},
	},
	{ timestamps: true }
);

export const Answer = model<AnswerDoc>(AppModels.answer, schema);
