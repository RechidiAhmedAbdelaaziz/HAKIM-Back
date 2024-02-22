import { Document, Schema, model } from "mongoose";
import { AppModels } from "../../../constants";

export interface RelationDoc extends Document {
	doctor: Schema.Types.ObjectId;
	patient: Schema.Types.ObjectId;
}

const schema = new Schema(
	{
		doctor: {
			type: Schema.Types.ObjectId,
			ref: AppModels.doctor,
			required: true,
		},
		patient: {
			type: Schema.Types.ObjectId,
			ref: AppModels.patient,
			required: true,
		},
	},
	{ timestamps: true }
);

export const Relation = model<RelationDoc>(AppModels.relation, schema);
