import express from "express";
import {
	QuestionController as question,
	AnswerController as answer,
} from "../feauture/question/controller";
import { isUserKind, verifyAuthorization } from "../middlewares";

const router = express.Router();

router.use(verifyAuthorization);

router.route("/").get(question.listAll).post(question.create);

router
	.route("/:id")
	.get(question.getById)
	.post(question.update)
	.delete(question.delete);

router
	.route("/:id/answers")
	.get(answer.listAll)
	.post(isUserKind.Doctor, answer.create);

router
	.route("/answers/:id")
	.get(answer.getById)
	.post(answer.update)
	.delete(answer.delete);

export { router as QuestionRouter };
