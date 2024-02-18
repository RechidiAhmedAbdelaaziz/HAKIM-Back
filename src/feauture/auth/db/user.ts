import { dontShow } from "../../../constants";
import { UpdateUserDio } from "../dio/user";
import { Doctor, DoctorType, User, UserType } from "../models";
import { cryptPass } from "../../../utils";

export const getDoctors = async (): Promise<DoctorType[]> => {
	const doctors = await Doctor.find({}, dontShow);
	return doctors;
};
export const getUser = async (id: any): Promise<UserType> => {
	const user = await User.findOne({ _id: id }, dontShow);
	return user;
};

export const updateUser = async (info: UpdateUserDio): Promise<any> => {
	const {
		id,
		pullAppointment,
		pushAppointment,
		email,
		isVerified,
		name,
		pic,
		isOnline,
	} = info;

	if (info.password) info.password = cryptPass(info.password);
	const user = await User.findByIdAndUpdate(id, {
		id,
		$push: { appointments: pushAppointment },
		$pull: { appointments: pullAppointment },
		email,
		isVerified,
		name,
		password: info.password,
		pic,
		isOnline,
	});
	return user;
};

export const deleteUser = async (id: string): Promise<void> => {
	await User.findByIdAndDelete(id);
};
