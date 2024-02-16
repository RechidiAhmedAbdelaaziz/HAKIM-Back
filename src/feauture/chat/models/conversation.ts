import { Document, Schema, model } from "mongoose";
import { AppModels } from "../../../constants";

export enum ConversationTypes {
	personal = "Personal",
	patient = "Patient",
}
export interface ConversationDoc extends Document {
	users: Schema.Types.ObjectId[];
	lastMessage: Schema.Types.ObjectId;
	type: ConversationTypes;
}

const schema = new Schema(
	{
		users: {
			type: [{ type: Schema.Types.ObjectId, ref: AppModels.user }],
			required: true,
		},
		type: {
			type: String,
			enum: ["Personal", "Patient"],
			default: "Personal",
		},
		lastMessage: { type: Schema.Types.ObjectId, ref: AppModels.message },
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
