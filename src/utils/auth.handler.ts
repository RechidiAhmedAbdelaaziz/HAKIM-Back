import Jwt from "jsonwebtoken";
import crypto from "crypto-js";
import { AuthPayload } from "../dio";
import expressAsyncHandler from "express-async-handler";
import { AppERROR } from ".";
import { Types, Document } from "mongoose";
import { User, UserDoc } from "../models/auth";
import { AppModels, ErrorMessage, ErrorStatus } from "../constants";

export const cryptPass = (passwd: string) => {
	return crypto.AES.encrypt(passwd, process.env.SECRET!).toString();
};

export const decryptPass = (passwd: string) => {
	const decryptedPasswd = crypto.AES.decrypt(passwd, process.env.SECRET!);
	return decryptedPasswd.toString(crypto.enc.Utf8);
};

export const genrateSign = (
	user: Document<unknown, object, UserDoc> &
		UserDoc & {
			_id: Types.ObjectId;
		}
) => {
	const payload: AuthPayload = {
		id: user._id,
		kind: user.kind,
		email: user.email,
		name: user.name,
	};
	return Jwt.sign(payload, process.env.JWT_SECRET!, {
		expiresIn: "15d",
	});
};

export const validSign = expressAsyncHandler(async (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (authHeader) {
		const token = authHeader.split(" ")[1];
		const payload = Jwt.verify(token, process.env.JWT_SECRET!) as AuthPayload;

		const user = await User.findOne({
			_id: payload.id,
			email: payload.email,
			name: payload.name,
		});

		if (!user) return next(new AppERROR(ErrorMessage.Un_Authorized, ErrorStatus.Un_Authorized));
		const checkkind = payload.kind === AppModels.doctor ? user.kind === AppModels.doctor : true;
		if (!checkkind)
			return next(new AppERROR(ErrorMessage.Un_Authorized, ErrorStatus.Un_Authorized));

		req.user = payload;
		return next();
	}

	return next(new AppERROR("Authorization error -MISSED TOKEN- ", ErrorStatus.Un_Authorized));
});
