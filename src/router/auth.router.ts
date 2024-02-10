import express from "express";
import { DoctorSignUp, SignUp, getPorfile, login } from "../controller";
import { verifyAuthorization } from "../middlewares";

const router = express.Router();

router.route("/").post(login).get(verifyAuthorization,getPorfile);
router.post("/signup", SignUp);
router.post("/signup-dr", DoctorSignUp);

export { router as AuthRouter };
