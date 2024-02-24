import express from "express";
import { isUserKind, verifyAuthorization } from "../middlewares";
import { AuthController as controller } from "../feauture/auth/controller/auth";

const router = express.Router();

router
	.route("/")
	.post(controller.login)
	.get(verifyAuthorization, controller.showMyProfile);
router.post("/signup", controller.signUp);
router.post("/signup-dr", isUserKind.Patient, controller.createDoctorProfile);
router.get("/:id", verifyAuthorization, controller.showProfile);

export { router as AuthRouter };
