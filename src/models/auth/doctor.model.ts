import { Schema } from "mongoose";
import { User, UserDoc } from ".";
import { AppModels } from "../../constants";

export interface DoctorDoc extends UserDoc {
	specialization: string;
	appointments: Schema.Types.ObjectId[];
	location: Schema.Types.ObjectId[];
	phone: Schema.Types.ObjectId[];
	points: number;
}

const schema = new Schema(
	{
		phone: { type: String, required: true },
		specialization: { type: String, required: true },
		appointments: [{ type: Schema.Types.ObjectId, ref: AppModels.appointment }],
		location: [{ type: Schema.Types.ObjectId, ref: AppModels.location }],
		worktime: [{ type: Date }],
		points: { type: Number, required: true, default: 0, min: 0 },
	},
	{ timestamps: true }
);

export const Doctor = User.discriminator<DoctorDoc>(AppModels.doctor, schema);
