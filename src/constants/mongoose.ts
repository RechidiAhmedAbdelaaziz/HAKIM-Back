export const dontShow = { createdAt: 0, updatedAt: 0, __v: 0, password: 0 };
export const ApiPopulate = {
	doctor: { path: "doctor", select: "specialization name pic -_id" },
	patient: { path: "patient", select: "name pic -_id" },
};
