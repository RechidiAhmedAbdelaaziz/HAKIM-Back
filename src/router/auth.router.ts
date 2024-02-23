import express from "express";
import { isUserKind, verifyAuthorization } from "../middlewares";
import { AuthController as controller } from "../feauture/auth/controller/auth";

const router = express.Router();

router
	.route("/")
	.post(controller.login)
	.get(isUserKind.Patient, controller.showMyProfile);
router.post("/signup", controller.signUp);
router.post("/signup-dr", controller.createDoctorProfile);
router.get("/:id", verifyAuthorization, controller.showMyProfile);

export { router as AuthRouter };
