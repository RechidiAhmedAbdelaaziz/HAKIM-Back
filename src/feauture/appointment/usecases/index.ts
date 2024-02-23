import { CancelAppointment } from "./cancel";
import { CreateAppointment } from "./create.appointment";
import { GetAppointmentById } from "./get.byid";
import { listAppointments } from "./list.appointment";
import { RescheduleAppointment } from "./reschedule";

export const useCases = {
	CreateAppointment,
	listAppointments,
	GetAppointmentById,
	RescheduleAppointment,
	CancelAppointment,
};
