import expressAsyncHandler from "express-async-handler";
import { validSign, AppERROR, AuthPayload } from "../utils";
import { AppModels, ErrorMessage, ErrorStatus, Errors } from "../constants";

export const verifyAuthorization = expressAsyncHandler((req, res, next) => {
	return validSign(req, res, () => {
		if (!req.user) {
			return next(
				new AppERROR(
					ErrorMessage.Un_Authorized,
					ErrorStatus.Un_Authorized
				)
			);
		}
		return next();
	});
});

export const checkUserType = {
	Patient: expressAsyncHandler((req, res, next) => {
		return validSign(req, res, () => {
			const user = <AuthPayload>req.user;
			if (!user || user.kind !== AppModels.patient) {
				return next(Errors.Not_Doctor);
			}
			return next();
		});
	}),
	Doctor: expressAsyncHandler((req, res, next) => {
		return validSign(req, res, () => {
			const user = <AuthPayload>req.user;
			if (!user || user.kind !== AppModels.doctor) {
				return next(Errors.Not_Doctor);
			}
			return next();
		});
	}),
};
