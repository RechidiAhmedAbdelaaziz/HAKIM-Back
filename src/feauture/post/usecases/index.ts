import { createComment } from "./comment.create";
import { deleteComment } from "./comment.delete";
import { getCommentById } from "./comment.getbyid";
import { listPostComments } from "./comment.listbypost";
import { updateComment } from "./comment.update";
import { createLike } from "./like.create";
import { deleteLike } from "./like.delete";
import { createPost } from "./post.create";
import { deletePost } from "./post.delete";
import { getPostById } from "./post.get";
import { listPosts } from "./post.list";
import { listUserPosts } from "./post.listbyuser";
import { updatePost } from "./post.update";

export const useCases = {
	createPost,
	updatePost,
	deletePost,
	getPostById,
	listPosts,
	listUserPosts,
	createComment,
	deleteComment,
	listPostComments,
	getCommentById,
	updateComment,
	createLike,
	deleteLike,
};
