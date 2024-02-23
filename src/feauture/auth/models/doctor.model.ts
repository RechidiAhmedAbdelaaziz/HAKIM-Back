import { Schema, Document } from "mongoose";
import { User, UserDoc } from ".";
import { AppModels } from "../../../constants";

export interface DoctorDoc extends UserDoc {
	specialization: string;
	location: {
		title: string;
		longtitude: number;
		latitude: number;
	}[];
	phone: string;
	points: number;
	worktime: {
		day:
			| "Sunday"
			| "Monday"
			| "Tuesday"
			| "Wednesday"
			| "Thursday"
			| "Friday"
			| "Saturday";
		periods: {
			start: { hh: number; mm: number };
			end: { hh: number; mm: number };
		}[];
	}[];
	followers: number;
	hearts: number;
	rating: number;
}

const schema = new Schema(
	{
		phone: { type: String, required: true, unique: true },
		specialization: { type: String, required: true },
		location: {
			type: [
				{
					title: { type: String },
					longitude: { type: Number },
					latitude: { type: Number },
				},
			],
			index: true,
		},
		worktime: [
			{
				day: {
					type: String,
					enum: [
						"Sunday",
						"Monday",
						"Tuesday",
						"Wednesday",
						"Thursday",
						"Friday",
						"Saturday",
					],
				}, //mon - sun
				periods: [
					{
						start: { hh: Number, mm: Number },
						end: { hh: Number, mm: Number },
					},
				],
			},
		],
		points: { type: Number, required: true, default: 0, min: 0 },
		followers: { type: Number, required: true, default: 0 },
		hearts: { type: Number, required: true, default: 0 },
		rating: { type: Number, required: true, default: 0, min: 0, max: 5 },
	},
	{ timestamps: true }
);

export const Doctor = User.discriminator<DoctorDoc>(AppModels.doctor, schema);
