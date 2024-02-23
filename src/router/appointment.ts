import express from "express";
import { isUserKind, verifyAuthorization } from "../middlewares/common.auth";
import { AppointmentController as controller } from "../feauture/appointment/controller/appointment";

const router = express.Router();

router.use(verifyAuthorization);

router
	.route("/")
	.post(isUserKind.Doctor, controller.create)
	.get(controller.listAppointments);
router
	.route("/:id")
	.get(controller.getById)
	.delete(isUserKind.Doctor, controller.cancel)
	.patch(isUserKind.Doctor, controller.reschedule);

export { router as ApppointmentRouter };
