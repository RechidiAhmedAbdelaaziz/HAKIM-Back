import { Schema } from "mongoose";

export interface UpdateUserDio {
	id: string;
	name?: string;
	email?: string;
	password?: string;
	pic?: string;
	isVerified?: boolean;
	pushAppointment?: Schema.Types.ObjectId;
    pullAppointment?: Schema.Types.ObjectId;
	isOnline?: boolean;
}
