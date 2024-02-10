import { Document, Schema, model } from "mongoose";
import { AppModels } from "../constants";

export interface ConversationMedicalDoc extends Document {
	patient: Schema.Types.ObjectId;
	doctor: Schema.Types.ObjectId;
	messages: Schema.Types.ObjectId[];
}

const schema = new Schema(
	{
		patient: {
			type: Schema.Types.ObjectId,
			ref: AppModels.user,
			required: true,
		},
		doctor: {
			type: Schema.Types.ObjectId,
			ref: AppModels.doctor,
			required: true,
		},
		messages: [{ type: Schema.Types.ObjectId, ref: AppModels.message }],
	},
	{ timestamps: true }
);
export const ConversationMedical = model<ConversationMedicalDoc>(
	AppModels.conversationMedical,
	schema
);

export type ConversationMedicalType =
	| (Document<unknown, object, ConversationMedicalDoc> &
			ConversationMedicalDoc & {
				_id: Schema.Types.ObjectId;
			})
	| null;
