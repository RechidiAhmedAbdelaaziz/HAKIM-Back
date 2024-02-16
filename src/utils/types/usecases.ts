import { AppResponse } from "..";
import { AppERROR } from "../error";

interface UserCaseReturn {
	error?: AppERROR;
	response?: AppResponse;
}

export type UseCase<T> = (params: T) => Promise<UserCaseReturn>;
