import { Errors, ResStatus } from "../../../constants";
import { AppResponse, cryptPass, genrateSign } from "../../../utils";
import { UseCase } from "../../../utils/types/usecases";
import { User } from "../models";
import { sendVerificationEmail } from "../helpers/verify.email";

interface Params {
	name: string;
	email: string;
	password: string;
}

export const signUp: UseCase<Params> = async (params) => {
	const { email, name, password } = params;

	const user = await User.create({
		email,
		name,
		password: cryptPass(password),
	});
	if (!user) return { error: Errors.Used_EmailOrPhone };

	const token = genrateSign(user);
	await sendVerificationEmail(user._id, user.email);

	const { password: x, ...other } = user.toObject();

	const response = new AppResponse(ResStatus.OK, { token, result: other });

	return { response };
};
