import bodyParser from "body-parser";
import express, { Application } from "express";
import morgan from "morgan";
import path from "path";
import errorHandler from "../middlewares/error.handler";
import { AppERROR } from "../utils";
import {
	ApppointmentRouter,
	AuthRouter,
	ConversationRouter,
	PostRouter,
	QuestionRouter,
	DonationRouter,
} from "../router";
import { verifyAccount } from "../utils/email.utils";
import { ErrorStatus } from "../constants";

export const App = async (app: Application) => {
	app.use(express.json());
	app.use(morgan("dev"));
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use("/images", express.static(path.join(__dirname, "images")));

	app.use("/api/v1/auth", AuthRouter);
	app.use("/api/v1/appointments", ApppointmentRouter);
	app.use("/api/v1/posts", PostRouter);
	app.use("/api/v1/questions", QuestionRouter);
	app.use("/api/v1/chats", ConversationRouter);
	app.use("/api/v1/donations", DonationRouter);

	app.get("/verify/:id", verifyAccount);

	app.all("*", (req, res, next) => {
		next(new AppERROR("INVALID ROUTE  ", ErrorStatus.Not_Found));
	});
	app.use(errorHandler);

	return app;
};
