import expressAsyncHandler from "express-async-handler";
import { createPost, deletePost, getPosts, updatePost, deleteComment } from "../db";
import { AuthPayload, CreatePostDio, UpdatePostDio } from "../dio";
import { AppERROR, AppResponse, sendRes } from "../utils";
import { AppModels, ErrorMessage, ErrorStatus, Errors, ResStatus } from "../constants";
import { User } from "../models";

export default {
	getAll: expressAsyncHandler(async (req, res, next) => {
		const posts = await getPosts();
		if (!posts) return next(new AppERROR(ErrorMessage.Not_Found, ErrorStatus.Not_Found));

		const response = new AppResponse(ResStatus.OK, { posts: posts });
		sendRes(response, res);
	}),

	post: expressAsyncHandler(async (req, res, next) => {
		const { post } = <CreatePostDio>req.body;
		const user = <AuthPayload>req.user;

		const created = await createPost({ post, poster: user.id });
		if (!created) return next(new AppERROR(ErrorMessage.Not_Found, ErrorStatus.Not_Found));
		await User.findByIdAndUpdate(user.id, { $push: { posts: created } });

		const response = new AppResponse(
			ResStatus.OK,
			{ post: created },
			"Post created successfully"
		);
		sendRes(response, res);
	}),

	like: expressAsyncHandler(async (req, res, next) => {
		const id = req.params.id;
		const user = <AuthPayload>req.user;

		const updated = await updatePost({ pushLike: user.id, id });
		if (!updated) return next(new AppERROR(ErrorMessage.Not_Found, ErrorStatus.Not_Found));

		const response = new AppResponse(ResStatus.OK, {}, "Post liked successfully");
		sendRes(response, res);
	}),
	unlike: expressAsyncHandler(async (req, res, next) => {
		const id = req.params.id;
		const user = <AuthPayload>req.user;

		const updated = await updatePost({ pullLike: user.id, id });
		if (!updated) return next(new AppERROR(ErrorMessage.Not_Found, ErrorStatus.Not_Found));

		const response = new AppResponse(ResStatus.OK, {}, "Post unliked successfully");
		sendRes(response, res);
	}),

	edit: expressAsyncHandler(async (req, res, next) => {
		const id = req.params.id;
		const user = <AuthPayload>req.user;
		const { post } = <UpdatePostDio>req.body;

		const updated = await updatePost({ posterId: user.id, id, post });
		if (!updated) return next(new AppERROR(ErrorMessage.Not_Found, ErrorStatus.Not_Found));

		const response = new AppResponse(ResStatus.OK, {}, "Post updated successfully");
		sendRes(response, res);
	}),

	delete: expressAsyncHandler(async (req, res, next) => {
		const { id: poster } = <AuthPayload>req.user;

		const post = await deletePost(req.params.id, poster);
		if (!post) return next(new Errors(AppModels.post).Not_found);

		post.comments.forEach(async (e) => {
			await deleteComment(e);
		});

		const response = new AppResponse(ResStatus.OK, {}, "Post deleted successfully");
		sendRes(response, res);
	}),
};
