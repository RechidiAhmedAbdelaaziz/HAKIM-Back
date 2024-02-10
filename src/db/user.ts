import { dontShow } from "../constants";
import { UpdateUserDio } from "../dio";
import { Doctor, User } from "../models";
import { cryptPass } from "../utils";

export const getDoctors = async (): Promise<any> => {
	const doctors = await Doctor.find({}, dontShow);
	return doctors;
};
export const getUser = async (id: any): Promise<any> => {
	const patients = await User.find({ _id: id }, dontShow);
	return patients;
};

export const updateUser = async (info: UpdateUserDio): Promise<any> => {
	const { id, pullAppointment, pushAppointment, email, isVerified, name, pic } = info;

	if (info.password) info.password = cryptPass(info.password);
	const user = await User.findByIdAndUpdate(id, {
		id,
		$push: { "patient.appointment": pushAppointment },
		$pull: { "patient.appointment": pullAppointment },
		email,
		isVerified,
		name,
		password: info.password,
		pic,
	});
	return user;
};

export const deleteUser = async (id: string): Promise<void> => {
	await User.findByIdAndDelete(id);
};
