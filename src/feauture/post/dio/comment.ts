import { Schema } from "mongoose";

export interface CreateCommentDio {
	comment: string;
	commentator: Schema.Types.ObjectId;
	post: string;
}
