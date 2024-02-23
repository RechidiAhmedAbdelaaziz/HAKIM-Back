import { Document, Schema, model } from "mongoose";
import { AppModels } from "../../../constants";

export interface LikeDoc extends Document {
	user: Schema.Types.ObjectId;
	post: Schema.Types.ObjectId;
}

const schema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: AppModels.user,
		required: true,
	},
	post: {
		type: Schema.Types.ObjectId,
		ref: AppModels.post,
		required: true,
		index: true,
	},
});

export const Like = model<LikeDoc>(AppModels.like, schema);
