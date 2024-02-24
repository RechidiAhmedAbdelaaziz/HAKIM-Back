import { Document, Schema, model } from "mongoose";
import { AppModels } from "../../../constants";

export interface UserDoc extends Document {
	name: string;
	email: string;
	password: string;
	kind: "Doctor" | "Patient";
	pic: string;
	isVerified: boolean;
	isOnline: boolean;
	birthday: Date;
	gender: "Male" | "Female";
	medicalRecord: {
		allergies: String[];
		chronicDiseases: String[];
	};
	documents: {
		title: String;
		link: String;
	}[];
}

const schema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		info: {
			pic: { type: String, default: "IMGurl" },
			gender: { type: String, enum: ["Male", "Female"] },
			birthday: { type: Date },
			age: { type: Number },
			blood: {
				type: String,
				enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
			},
			tall: { type: Number },
			weight: { type: Number },
		},
		kind: { type: String, required: true, default: AppModels.patient },
		isVerified: { type: Boolean, default: false },
		isOnline: { type: Boolean, default: false },
		patientCard: {
			Diagnosis: [String],
			Prescriptions: [String],
			Notes: [String],
		},
		medicalRecord: {
			allergies: [String],
			chronicDiseases: [String],
		},
		documents: [
			{
				title: { type: String, required: true },
				link: { type: String, required: true },
			},
		],
	},
	{ timestamps: true, discriminatorKey: "kind" }
);

export const User = model<UserDoc>(AppModels.user, schema);
export type UserType =
	| (Document<unknown, object, UserDoc> &
			UserDoc & {
				_id: Schema.Types.ObjectId;
			})
	| null;
