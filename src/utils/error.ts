export class AppERROR extends Error {
	statusCode: number;
	status: boolean = false;
	isOptional: boolean;
	constructor(message: string, statusCode: number, isOperational?: boolean) {
		super(message);
		this.statusCode = statusCode || 500;
		this.isOptional = isOperational || true;
	}
}
