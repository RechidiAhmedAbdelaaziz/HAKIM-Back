import express from "express";
import { CommentController as comment, PostController as post } from "../controller";
import { verifyAuthorization } from "../middlewares";

const router = express.Router();

router.use(verifyAuthorization);

router.route("/").get(post.getAll).post(post.post);
router.route("/:id").delete(post.delete).patch(post.edit);
router.route("/:id/like").delete(post.unlike).post(post.like);
router.route("/:id/comment").post(comment.comment);
router.delete("/comment/:id", comment.remove);

export { router as PostRouter };
