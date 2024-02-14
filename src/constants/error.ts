import { AppERROR } from "../utils";
import { ErrorMessage } from "./res.messages";
import { ErrorStatus } from "./res.status";

export class Errors {
	Not_found?: AppERROR;
	constructor(add?: any) {
		this.Not_found = new AppERROR(
			`${add} ${ErrorMessage.Not_Found}`,
			ErrorStatus.Not_Found
		);
	}

	static Not_Doctor = new AppERROR(
		`${ErrorMessage.Un_Authorized} -NOT DOCTOR-`,
		ErrorStatus.Un_Authorized
	);
	static Genric = new AppERROR(
		`${ErrorMessage.Generic}`,
		ErrorStatus.Bad_Gateway
	);
}
