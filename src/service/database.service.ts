import mongoose from "mongoose";
import { Applogger } from "./logger.service";

export const dbconnection = () => {
	mongoose
		.connect(process.env.MONGODB_URI!)
		.then(async (value) => {
			Applogger.info(`DATABASE CONNECTED : ${value.connection.host}`);
		})
		.catch((err) => {
			Applogger.error(`DATABASE ERROR  : ${err}`);
			process.exit(1);
		});
};

