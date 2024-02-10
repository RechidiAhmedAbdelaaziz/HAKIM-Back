import expressAsyncHandler from "express-async-handler";
import { validSign, AppERROR } from "../utils";
import { AppModels, ErrorMessage, ErrorStatus, Errors } from "../constants";
import { AuthPayload } from "../dio";

export const verifyAuthorization = expressAsyncHandler((req, res, next) => {
	return validSign(req, res, () => {
		if (!req.user) {
			return next(new AppERROR(ErrorMessage.Un_Authorized, ErrorStatus.Un_Authorized));
		}
		return next();
	});
});

export const verifyDoctor = expressAsyncHandler((req, res, next) => {
	return validSign(req, res, () => {
		const user = <AuthPayload>req.user;
		if (!user || user.kind !== AppModels.doctor) {
			return next(Errors.Not_Doctor);
		}
		return next();
	});
});
