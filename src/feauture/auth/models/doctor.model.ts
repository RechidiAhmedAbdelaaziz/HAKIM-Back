import { Schema, Document } from "mongoose";
import { User, UserDoc } from ".";
import { AppModels } from "../../../constants";

export interface DoctorDoc extends UserDoc {
	specialization: string;
	location: Schema.Types.ObjectId[];
	phone: Schema.Types.ObjectId[];
	points: number;
	worktime: Date[];
}

const schema = new Schema(
	{
		phone: { type: String, required: true },
		specialization: { type: String, required: true },
		location: [{ type: Schema.Types.ObjectId, ref: AppModels.location }],
		worktime: [{ type: Date }],
		points: { type: Number, required: true, default: 0, min: 0 },
	},
	{ timestamps: true }
);

export const Doctor = User.discriminator<DoctorDoc>(AppModels.doctor, schema);
export type DoctorType =
	| (Document<unknown, {}, DoctorDoc> &
			DoctorDoc & {
				_id: Schema.Types.ObjectId;
			})
	| null;
