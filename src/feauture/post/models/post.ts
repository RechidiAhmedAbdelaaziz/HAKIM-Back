import { Document, Schema, model } from "mongoose";
import { AppModels } from "../../../constants";

export interface PostDoc extends Document {
	text: string;
	poster: Schema.Types.ObjectId;
	likers: number;
	comments: number;
}

const schema = new Schema(
	{
		text: { type: String, required: true },
		poster: {
			type: Schema.Types.ObjectId,
			ref: AppModels.user,
			required: true,
		},
		likers: { type: Number, default: 0 },
		comments: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

export const Post = model<PostDoc>(AppModels.post, schema);
