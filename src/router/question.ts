import express from "express";
import { QuestionController as question } from "../feauture/question/controller/question";
import { verifyAuthorization, verifyDoctor } from "../middlewares";

const router = express.Router();

router.use(verifyAuthorization);

router.route("/").get(question.getAllQues).post(question.ask);
router
	.route("/:id")
	.get(question.getQues)
	.post(question.editQues)
	.delete(question.deleteQues);
router
	.route("/:id/answer")
	.get(question.getAllAnswr)
	.post(verifyDoctor, question.answer);
router
	.route("/answer/:id")
	.get(question.getAnswr)
	.post(question.editAnswr)
	.delete(question.deleteAnswr);

export { router as QuestionRouter };
