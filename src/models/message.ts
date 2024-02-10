import { Document, Schema, model } from "mongoose";
import { AppModels } from "../constants";

export interface MessageDoc extends Document {
	patient: Schema.Types.ObjectId;
	doctor: Schema.Types.ObjectId;
	messages: Schema.Types.ObjectId[];
}

const schema = new Schema(
	{
		text: { type: String, required: true },
		sender: {
			type: Schema.Types.ObjectId,
			ref: AppModels.user,
			required: true,
		},
		reciver: {
			type: Schema.Types.ObjectId,
			ref: AppModels.user,
			required: true,
		},
	},
	{ timestamps: true }
);
export const Message = model<MessageDoc>(AppModels.conversationMedical, schema);

export type MessageType =
	| (Document<unknown, object, MessageDoc> &
			MessageDoc & {
				_id: Schema.Types.ObjectId;
			})
	| null;
