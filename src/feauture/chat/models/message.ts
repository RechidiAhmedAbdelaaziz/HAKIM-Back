import { Document, Schema, model } from "mongoose";
import { AppModels } from "../../../constants";

export interface MessageDoc extends Document {
	sender: Schema.Types.ObjectId;
	receiver: Schema.Types.ObjectId;
	text: String;
}

const schema = new Schema(
	{
		text: { type: String, required: true },
		sender: {
			type: Schema.Types.ObjectId,
			ref: AppModels.user,
			required: true,
		},
		receiver: {
			type: Schema.Types.ObjectId,
			ref: AppModels.user,
			required: true,
		},
	},
	{ timestamps: true }
);
export const Message = model<MessageDoc>(AppModels.message, schema);

export type MessageType =
	| (Document<unknown, object, MessageDoc> &
			MessageDoc & {
				_id: Schema.Types.ObjectId;
			})
	| null;
