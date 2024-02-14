import { Response } from "express";
export class AppResponse {
	status = true;
	statusCode: number;
	data?: object;
	message?: string;
	constructor(statusCode: number, data?: any, message?: string) {
		this.statusCode = statusCode;
		this.message = message;
		this.data = data;
	}
}

export const sendRes = (response: AppResponse, res: Response) => {
	return res.status(response.statusCode).json({
		status: response.status,
		message: response.message,
		data: response.data,
		code: response.statusCode,
	});
};
