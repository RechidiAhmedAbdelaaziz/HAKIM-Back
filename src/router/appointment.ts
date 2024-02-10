import express from "express";
import { verifyAuthorization, verifyDoctor } from "../middlewares/common.auth";
import { AppointmentController as controller } from "../controller";

const router = express.Router();

router.use(verifyAuthorization);

router.route("/").post(verifyDoctor, controller.create).get(controller.getAll);
router
	.route("/:id")
	.get(controller.get)
	.delete(verifyDoctor, controller.cancel)
	.patch(verifyDoctor, controller.reschedule);

export { router as ApppointmentRouter };
