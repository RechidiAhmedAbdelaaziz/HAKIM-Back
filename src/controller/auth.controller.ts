/* eslint-disable @typescript-eslint/no-unused-vars */
import expressAsyncHandler from "express-async-handler";
import { AuthPayload, DoctorSignUpPayload, SignUpPayload } from "../dio";
import { EmailVerification, User, Doctor } from "../models/auth";
import { cryptPass, AppERROR, genrateSign, decryptPass } from "../utils";
import { Schema } from "mongoose";
import { AppResponse, sendRes } from "../utils/response";
import {
	ErrorMessage,
	ErrorStatus,
	ResMessages,
	ResStatus,
} from "../constants";
import { getUser } from "../db";

export const getPorfile = expressAsyncHandler(async (req, res) => {
	const { id } = <AuthPayload>req.user;
	const user = await getUser(id);
	const Response = new AppResponse(
		ResStatus.OK,
		user,
		`Welcome Back ${user.name}`
	);
	sendRes(Response, res);

});

export const login = expressAsyncHandler(async (req, res, next) => {
	const { login, password } = req.body;

	const check = await User.findOne({
		$or: [{ email: login }, { phone: login }],
	});
	if (!check)
		return next(
			new AppERROR(ErrorMessage.Login_Not_Found, ErrorStatus.Un_Authorized)
		);

	const user = await User.findOne({
		$or: [{ email: login }, { phone: login }],
	});
	if (!user)
		return next(new AppERROR(ErrorMessage.Generic, ErrorStatus.Bad_Gateway));

	if (decryptPass(user.password) != password)
		return next(
			new AppERROR(ErrorMessage.Wrong_password, ErrorStatus.Un_Authorized)
		);

	const token = genrateSign(user);
	const Response = new AppResponse(
		ResStatus.OK,
		{ token },
		`Welcome Back ${user.name}`
	);
	sendRes(Response, res);
});

export const DoctorSignUp = expressAsyncHandler(async (req, res, next) => {
	const { email, name, password, location, phone, specialization } = <
		DoctorSignUpPayload
		>req.body;

	const check = await User.findOne({ $or: [{ email }, { phone }] });
	if (check)
		return next(new AppERROR(ErrorMessage.Login_Used, ErrorStatus.Conflict));

	const doctor = await Doctor.create({
		email,
		name,
		password: cryptPass(password),
		location,
		phone,
		specialization,
	});
	const token = genrateSign(doctor);
	await sendVerificationEmail(doctor._id, doctor.email);

	const response = new AppResponse(
		ResStatus.OK,
		{ token },
		ResMessages.Welcome_Dr + name
	);
	sendRes(response, res);
});

export const SignUp = expressAsyncHandler(async (req, res, next) => {
	const { email, name, password } = <SignUpPayload>req.body;

	const check = await User.findOne({ email });
	if (check)
		return next(new AppERROR(ErrorMessage.Login_Used, ErrorStatus.Conflict));

	const user = await User.create({
		email,
		name,
		password: cryptPass(password),
	});

	const token = genrateSign(user);
	await sendVerificationEmail(user._id, user.email);

	const response = new AppResponse(
		ResStatus.OK,
		{ token },
		ResMessages.Welcome_Dr + name
	);
	sendRes(response, res);
});

const sendVerificationEmail = async (
	id: Schema.Types.ObjectId,
	email: string
) => {
	const token = await EmailVerification.create({ user: id });
	// await sendVerifyEmail(email , `http://localhost:3000/verify/${id}?token=${token}`);
};
