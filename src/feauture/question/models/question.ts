import { Document, Schema, model } from "mongoose";
import { AppModels } from "../../../constants";

export interface QuestionDoc extends Document {
	text: string;
	questioner: Schema.Types.ObjectId;
}
const schema = new Schema(
	{
		text: { type: String, required: true },
		questioner: {
			type: Schema.Types.ObjectId,
			ref: AppModels.user,
			required: true,
		},
	},
	{ timestamps: true }
);

export const Question = model<QuestionDoc>(AppModels.question, schema);
