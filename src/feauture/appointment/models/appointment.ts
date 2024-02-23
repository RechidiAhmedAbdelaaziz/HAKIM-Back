import { Document, Schema, model } from "mongoose";
import { AppModels } from "../../../constants";

export interface AppointmentDoc extends Document {
	type: string;
	date: Date;
	doctor: Schema.Types.ObjectId;
	patient: Schema.Types.ObjectId;
}

const schema = new Schema(
	{
		type: { type: String, required: true },
		date: { type: Date, required: true, index: true },
		doctor: {
			type: Schema.Types.ObjectId,
			ref: AppModels.doctor,
		},
		patient: {
			type: Schema.Types.ObjectId,
			ref: AppModels.user,
		},
	},
	{ timestamps: true }
);
export const Appointment = model<AppointmentDoc>(AppModels.appointment, schema);
