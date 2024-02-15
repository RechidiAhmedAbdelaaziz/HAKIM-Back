import { Document, Schema, model } from "mongoose";
import { AppModels } from "../../../constants";

export interface ConversationDoc extends Document {
	users: Schema.Types.ObjectId[];
}

const schema = new Schema(
	{
		users: {
			type: [{ type: Schema.Types.ObjectId, ref: AppModels.user }],
			required: true,
		},
	},
	{ timestamps: true }
);
export const Conversation = model<ConversationDoc>(
	AppModels.conversation,
	schema
);

export type ConversationType =
	| (Document<unknown, object, ConversationDoc> &
			ConversationDoc & {
				_id: Schema.Types.ObjectId;
			})
	| null;
