import { Schema } from "mongoose";

export interface AuthPayload {
	id: Schema.Types.ObjectId;
	kind: string;
	email: string;
	name: string;
}

export interface SignUpPayload {
	name: string;
	email: string;
	password: string;
	patient: Schema.Types.ObjectId;
}

export interface DoctorSignUpPayload extends SignUpPayload {
	specialization: string;
	location: Schema.Types.ObjectId[];
	phone: Schema.Types.ObjectId[];
}
