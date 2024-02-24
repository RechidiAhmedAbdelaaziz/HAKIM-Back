import { Response } from "express";
import { ModelsGetterReturn, Pagination } from "./model.getter";
import { Applogger } from "../service";
interface response_ {
	message?: string;
	pagination?: Pagination;
}

export class AppResponse {
	status = true;
	statusCode: number;
	data?: object;
	message?: string;
	token?: string;
	pagination?: Pagination;
	constructor(
		statusCode: number,
		data?: ModelsGetterReturn<any> | any,
		message?: string
	) {
		this.statusCode = statusCode;
		if (data) {
			this.pagination = data.pagination;
			this.token = data.token;
			if (data.result) this.data = data.result;
			else this.data = data;
		}

		this.message = message;
	}
}

export const sendResponse = (response: AppResponse, res: Response) => {
	return res.status(response.statusCode).json({
		status: response.status,
		message: response.message,
		token: response.token,
		pagination: response.pagination,
		data: response.data,
		code: response.statusCode,
	});
};
