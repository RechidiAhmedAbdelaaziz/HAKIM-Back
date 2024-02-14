import { Schema } from "mongoose";

export interface EditAppointmentDio {
	type?: string;
	date?: Date;
}

export interface CreateAppointmentDio {
	type: string;
	date: Date;
	doctor: Schema.Types.ObjectId;
	patient: Schema.Types.ObjectId;
}
