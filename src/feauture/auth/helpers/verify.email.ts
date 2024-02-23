import { Schema } from "mongoose";
import { EmailVerification } from "../models";

export const sendVerificationEmail = async (
	id: Schema.Types.ObjectId,
	email: string
) => {
	const token = await EmailVerification.create({ user: id });
	// await sendVerifyEmail(email , `http://localhost:3000/verify/${id}?token=${token}`);
};
