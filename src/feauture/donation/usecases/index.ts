import { editRequest } from "./edit.request";
import { getDonationRequests } from "./list.requests";
import { makeDonationRequest } from "./request.donation";

const useCases = {
	makeDonationRequest,
	getDonationRequests,
	editRequest,
};

export { useCases as DonationUseCases };
