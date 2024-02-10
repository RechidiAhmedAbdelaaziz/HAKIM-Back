import { createLogger, format, transports } from "winston";
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp, stack }) => {
	return ` \u001b[36m---\u001b[0m  \n${timestamp}  \u001b[36m|\u001b[0m [${level}] \u001b[36m|\u001b[0m  ${
		stack || message
	} \u001b[36m|\u001b[0m \n \u001b[36m---\u001b[0m `;
});

export const Applogger = createLogger({
	level: "info",
	format: combine(format.colorize(), timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), myFormat),
	transports: [
		new transports.Console({
			level: "info",
			format: combine(format.colorize()),
		}),
	],
});

// export default { Applogger };
