import { Document, Schema, model } from "mongoose";
import { AppModels } from "../../../constants";
import { DoctorDoc } from ".";

export interface UserDoc extends Document {
	name: string;
	email: string;
	password: string;
	kind: string;
	pic: string;
	isVerified: boolean;
	patient: { appointments: Schema.Types.ObjectId[] };
	posts: Schema.Types.ObjectId[];
	isOnline: boolean;
	birthday: Date;
}

const schema = new Schema(
	{
		name: { type: String, required: true },
		pic: { type: String, default: "IMGurl" },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		kind: { type: String, required: true, default: AppModels.patient },
		isVerified: { type: Boolean, default: false },
		isOnline: { type: Boolean, default: false },
		birthday: { type: Date },
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
