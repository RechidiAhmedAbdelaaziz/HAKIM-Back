import express from "express";
import { verifyAuthorization } from "../middlewares";
import {
	getPorfile,
	SignUp,
	DoctorSignUp,
	login,
} from "../feauture/auth/controller/auth.controller";

const router = express.Router();

router.route("/").post(login).get(verifyAuthorization, getPorfile);
router.post("/signup", SignUp);
router.post("/signup-dr", DoctorSignUp);

export { router as AuthRouter };
