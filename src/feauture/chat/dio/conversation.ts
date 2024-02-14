import { Schema } from "mongoose";

export interface CreateConversationDio {
	sender: Schema.Types.ObjectId;
	receiver: Schema.Types.ObjectId;
}
export interface UpdateConversationDio {
	id: Schema.Types.ObjectId;
	message: Schema.Types.ObjectId;
}
export interface GetConversationByIdDio {
	id: Schema.Types.ObjectId;
	user: Schema.Types.ObjectId;
}
export interface GetConversationDio {
	sender: Schema.Types.ObjectId;
	receiver: Schema.Types.ObjectId;
}
export interface GetConversationsDio {
	userId: Schema.Types.ObjectId;
}

export interface CreateMessageDio extends CreateConversationDio {
	message: String;
}
export interface DeleteMessageDio {
	sender: Schema.Types.ObjectId;
	id: Schema.Types.ObjectId;
}
export interface GetMessageDio {
	id: Schema.Types.ObjectId;
}
