import { NextFunction, Request, Response } from "express";
import { AppERROR } from "../utils";

const errorHandler = (
	err: AppERROR,
	req: Request,
	res: Response,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	next: NextFunction
) => {
	err.statusCode = err.statusCode || 500;
	err.status = false;
	err.isOptional = err.isOptional || true;
	if (process.env.MODE_ENV == "production") sendProdError(err, res);
	if (process.env.MODE_ENV === "development") sendDevError(err, res);
};

const sendDevError = (err: AppERROR, res: Response) => {
	const data = {
		error: {
			statusCode: err.statusCode,
			isOperationError: err.isOptional,
		},
		message: err.message,

		stack: err.stack,
	};
	res.status(err.statusCode).json({
		status: err.status,
		data,
	});
};

const sendProdError = (err: AppERROR, res: Response) => {
	res.status(err.statusCode).json({
		status: err.status,
		message: err.message
	});
};

export default errorHandler;
