import { Errors, ResStatus } from "../../../constants";
import { AppResponse, decryptPass, genrateSign } from "../../../utils";
import { UseCase } from "../../../utils/types/usecases";
import { User } from "../models";
import { sendVerificationEmail } from "../helpers/verify.email";

interface Params {
	login: string;
	password: string;
}

export const login: UseCase<Params> = async (params) => {
	const { login, password } = params;

	const user = await User.findOne({
		$or: [{ email: login }, { phone: login }],
	});

	if (!user) return { error: Errors.Wrong_Login };
	if (decryptPass(user.password) !== password)
		return { error: Errors.Wrong_Password };

	const token = genrateSign(user);
	await sendVerificationEmail(user._id, user.email);

	const response = new AppResponse(ResStatus.OK, { token, result: user });

	return { response };
};
