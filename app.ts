import express from "express";
import { Applogger, App, DoteEnvConfig, dbconnection } from "./src/service";

const StartServer = async () => {
	DoteEnvConfig();
	dbconnection();
	const app = await App(express());

	const port = process.env.PORT;
	app.listen(port, () => {
		console.clear();
		Applogger.info(`FoodLy app listening on port ${port} !`);
	});
};

StartServer();
