import { Document, Schema, model } from "mongoose";
import { AppModels } from "../../../constants";

export interface DonationDoc extends Document {
	need: string;
	user: Schema.Types.ObjectId;
	location: {
		title: string;
		longtitude: number;
		latitude: number;
	};
	isUrgent: boolean;
	phone: String;
	type: "Blood" | "Medical supplies & equipment";
	date: Date;
}

const schema = new Schema(
	{
		need: { type: String, required: true },
		user: {
			type: Schema.Types.ObjectId,
			ref: AppModels.user,
			required: true,
		},
		phone: { type: String },

		type: {
			type: String,
			enum: ["Blood", "Medical supplies & equipment"],
			default: "Medical supplies & equipment",
		},
		isUrgent: { type: Boolean, default: false },
		location: {
			type: {
				title: { type: String },
				longitude: { type: Number },
				latitude: { type: Number },
			},
			required: true,
		},
		date: { type: Date, required: true },
	},
	{ timestamps: true }
);
export const Donation = model<DonationDoc>(AppModels.donation, schema);
