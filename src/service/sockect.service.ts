import { Server, Socket } from "socket.io";
import { Applogger } from "./logger.service";
import { EVENTS } from "../config/socket.events";
import { OnSendMessage } from "../feauture/chat/usecases/send.message";
import { updateUser } from "../feauture/auth/db/user";

export const onlineUsers = {};

function socket({ io }: { io: Server }) {
	Applogger.info("user enabled");
	io.on(EVENTS.connection, async (socket: Socket) => {
		Applogger.info(`user Connected :${socket.id}`);
		const id = socket.handshake.query.auth as string;
		onlineUsers[id] = socket.id;

		await updateUser({ id, isOnline: true });

		await OnSendMessage(socket);

		socket.on("disconnect", async () => {
			await updateUser({ id, isOnline: false });
			onlineUsers[id] = null;
		});
	});
}

export default socket;
