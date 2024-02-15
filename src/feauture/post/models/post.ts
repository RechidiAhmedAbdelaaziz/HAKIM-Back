import { Document, Schema, model } from "mongoose";
import { AppModels } from "../../../constants";

export interface PostDoc extends Document {
	post: string;
	poster: Schema.Types.ObjectId;
	likers: Schema.Types.ObjectId[];
	comments: Schema.Types.ObjectId[];
}

const schema = new Schema(
	{
		post: { type: String, required: true },
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

export type PostType =
	| (Document<unknown, object, PostDoc> &
			PostDoc & {
				_id: Schema.Types.ObjectId;
			})
	| null;
