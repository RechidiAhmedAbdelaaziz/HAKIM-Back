import { login } from "./login";
import { createDoctor } from "./create.dr";
import { signUp } from "./signup";
import { getProfile } from "./getProfile";

const useCases = {
	signUp,
	createDoctor,
	login,
	getProfile,
};

export default useCases;
