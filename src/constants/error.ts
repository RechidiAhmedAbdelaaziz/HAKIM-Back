import { AppERROR } from "../utils";
import { ErrorMessage } from "./res.messages";
import { ErrorStatus } from "./res.status";
import { AppModels } from "./types";

export class Errors {
	Not_found?: AppERROR;
	constructor(add?: any) {
		this.Not_found = new AppERROR(
			`${add} ${ErrorMessage.Not_Found}`,
			ErrorStatus.Not_Found
		);
	}

	static No_Model = (model: string): AppERROR => {
		return new AppERROR(`There is no ${model}`, ErrorStatus.Not_Found);
	};
	static No_Models = (model: string): AppERROR => {
		return new AppERROR(`There are no ${model}`, ErrorStatus.Not_Found);
	};

	static Not_Doctor = new AppERROR(
		`${ErrorMessage.Un_Authorized} -NOT DOCTOR-`,
		ErrorStatus.Un_Authorized
	);




	static Genric = new AppERROR(
		`${ErrorMessage.Generic}`,
		ErrorStatus.Bad_Gateway
	);
}
