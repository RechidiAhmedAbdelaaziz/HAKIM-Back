import express from "express";
import {
	CommentController as comment,
	PostController as post,
	LikeController as like,
} from "../feauture/post/controller";
import { verifyAuthorization } from "../middlewares";

const router = express.Router();

router.use(verifyAuthorization);

router.route("/").get(post.listAllPosts).post(post.create);
router.route("/my").get(post.listMine);
router.route("/my/:id").get(post.listForUser);
router.route("/:id").delete(post.delete).patch(post.update).get(post.getById);
router.route("/:id/like").delete(like.unlike).post(like.like);
router.route("/:id/comments").post(comment.create).get(comment.listComments);
router
	.route("/comment/:id")
	.delete(comment.delete)
	.patch(comment.update)
	.get(comment.getById);

export { router as PostRouter };
