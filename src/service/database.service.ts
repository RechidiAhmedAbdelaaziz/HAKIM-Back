import mongoose from "mongoose";
import { Applogger } from "./logger.service";

export type mongooseType = typeof mongoose;

export const dbconnection = async () => {
	const connectOptions: any = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};
	try {
		await mongoose.connect(process.env.MONGODB_URI!, connectOptions);
		mongoose.connection.on("error", (err) => {
			Applogger.warn("Event Mongo error");
			Applogger.info(err);
		});
		mongoose.connection.on("disconnected", (err) => {
			Applogger.warn("Event Mongo disconnected");
			Applogger.info(err);
		});

		Applogger.info(
			"MongoDB Connected Successfully: " + mongoose.connection.host
		);
	} catch (err) {
		Applogger.warn("Error, Cannot connect to MongoDB");
		Applogger.error(err);
	}
};

// function x(mongoose: mongooseType, io: Server) {
// 	const connection = mongoose.connection;
// 	connection.once("open", () => {
// 		const messageStream = connection.collection(AppModels.message).watch();
// 		messageStream.on("change", async (change) => {
// 			switch (change.operationType) {
// 				case "insert":
// 					const { sender, receiver, chat, text } =
// 						change.fullDocument;
// 					const message = new Message({
// 						sender,
// 						receiver,
// 						chat,
// 						text,
// 					});

// 					io.of("/api/v1/socket").emit("newMessage", message);
// 				case "delete":
// 					io.of("/api/v1/socket").emit(
// 						"deleteMessage",
// 						change.documentKey._id
// 					);
// 			}
// 		});
// 	});
// }
