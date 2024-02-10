import { Document, Schema, model } from "mongoose";
import { AppModels } from "../constants";

export interface CommentDoc extends Document {
	comment: string;
	commentator: Schema.Types.ObjectId;
	post: Schema.Types.ObjectId;
	replys: Schema.Types.ObjectId[];
}

const schema = new Schema(
	{
		comment: { type: String, required: true },
		commentator: { type: Schema.Types.ObjectId, ref: AppModels.user, required: true },
		post: { type: Schema.Types.ObjectId, ref: AppModels.post, required: true },
		replys: [{ type: Schema.Types.ObjectId, ref: AppModels.comment }],
	},
	{ timestamps: true }
);

export const Comment = model<CommentDoc>(AppModels.comment, schema);

export type CommentType =
	| (Document<unknown, object, CommentDoc> &
			CommentDoc & {
				_id: Schema.Types.ObjectId;
			})
	| null;
