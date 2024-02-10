import dotenv from "dotenv";

export const DoteEnvConfig =  () => {
	dotenv.config({
		path: "./config.env",
	});
};
