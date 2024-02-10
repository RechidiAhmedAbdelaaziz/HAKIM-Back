import { Schema, model } from "mongoose";
import { AppModels } from "../../constants";

const schema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: AppModels.user },
	},
	{ timestamps: true }
);

schema.index({ createdAt: 1 }, { expireAfterSeconds: 259200 });

export const EmailVerification = model(AppModels.verifEmail, schema);
