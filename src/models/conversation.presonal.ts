import { Document, Schema, model } from "mongoose";
import { AppModels } from "../constants";

export interface ConversationPersonalDoc extends Document {
	users: Schema.Types.ObjectId[];
	messages: Schema.Types.ObjectId[];
}

const schema = new Schema(
	{
		users: {
			type: [{ type: Schema.Types.ObjectId, ref: AppModels.user }],
			required: true,
		},
		messages: [{ type: Schema.Types.ObjectId, ref: AppModels.message }],
	},
	{ timestamps: true }
);
export const ConversationPersonal = model<ConversationPersonalDoc>(
	AppModels.conversationPersonal,
	schema
);

export type ConversationPersonalType =
	| (Document<unknown, object, ConversationPersonalDoc> &
			ConversationPersonalDoc & {
				_id: Schema.Types.ObjectId;
			})
	| null;
