import { Schema, Types } from "mongoose";

export interface CreatePostDio {
	post: string;
	poster: Schema.Types.ObjectId;
}

export interface UpdatePostDio {
	id: any;
	posterId?: Schema.Types.ObjectId | Types.ObjectId;
	post?: string;
	pushLike?: any;
	pullLike?: any;
	pullComment?: Schema.Types.ObjectId | string;
	pushComment?: Schema.Types.ObjectId;
}
