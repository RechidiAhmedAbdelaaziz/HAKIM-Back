import { NextFunction, Response } from "express";
import { AppResponse, sendResponse } from "..";
import { AppERROR } from "../error";

interface UserCaseReturn {
	error?: AppERROR;
	response?: AppResponse;
}

export type UseCase<T> = (params: T) => Promise<UserCaseReturn>;

export const SendErorrOrResponse = (
	info: UserCaseReturn,
	res: Response,
	next: NextFunction
) => {
	const { error, response } = info;
	if (error) return next(error);
	if (response) sendResponse(response, res);
};
