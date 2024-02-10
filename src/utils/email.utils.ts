import expressAsyncHandler from "express-async-handler";
import nodemailer from "nodemailer";
import { EmailVerification, User } from "../models/auth";
import { AppERROR } from "./error";

export const sendVerifyEmail = async (email: string, link: string) => {
	const transporter = nodemailer.createTransport({
		host: "host",
		port: 25,
	});
	await transporter.sendMail({
		from: "ahm.rec.32@gmail.com",
		to: email,
		subject: "Account verification ",
		text: `Click this link to verify your account \n ${link}`,
	});
};

export const verifyAccount = expressAsyncHandler(async (req, res, next) => {
	const { id } = req.params;
	const { token } = req.query;

	const user = await User.findById(id);
	if (!user) return next(new AppERROR("User not found", 500));

	const realToken = await EmailVerification.findOne({ user: user._id });
	if (!realToken) return next(new AppERROR("Error happened", 500));

	if (token != realToken._id.toString()) return next(new AppERROR("Wrong Token", 500));
	user.isVerified = true;
	await user.save();

	res.status(200).json({
		status: "success",
		messaging: "Your account has been verified",
	});
});
