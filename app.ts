import express from "express";
import { Applogger, App, DoteEnvConfig, dbconnection } from "./src/service";
import { createServer } from "http";
import { Server } from "socket.io";
import socket from "./src/service/sockect.service";

const StartServer = async () => {
	DoteEnvConfig();
	dbconnection();
	const app = await App(express());

	const httpServer = createServer(app);
	const io = new Server(httpServer, {
		cors: { origin: "*", methods: ["GET", "POST"] },
	});

	const port = process.env.PORT;
	httpServer.listen(port, () => {
		console.clear();
		Applogger.info(`FoodLy app listening on port ${port} !`);
		socket({ io });
	});
};

StartServer();
