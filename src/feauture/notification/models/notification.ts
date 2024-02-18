import { Document, Schema, model } from "mongoose";
import { AppModels } from "../../../constants";

export interface NotificationDoc extends Document {
	sender: Schema.Types.ObjectId;
	receiver: Schema.Types.ObjectId;
	chat: Schema.Types.ObjectId;
	text: String;
}

const schema = new Schema(
	{
		text: { type: String, required: true },
		sender: {
			type: Schema.Types.ObjectId,
			ref: AppModels.user,
		},
		receiver: {
			type: Schema.Types.ObjectId,
			ref: AppModels.user,
		},
	},
	{ timestamps: true }
);
export const Notification = model<NotificationDoc>(
	AppModels.notification,
	schema
);
