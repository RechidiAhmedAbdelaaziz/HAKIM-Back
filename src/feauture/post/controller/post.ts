import expressAsyncHandler from "express-async-handler";

import { AppERROR, AppResponse, sendRes } from "../../../utils";
import {
	AppModels,
	ErrorMessage,
	ErrorStatus,
	Errors,
	ResStatus,
} from "../../../constants";
import { User } from "../../auth/models";
import { AuthPayload } from "../../auth/dio/auth";
import { deleteComment } from "../db/comment";
import {
	getPosts,
	getUserPosts,
	createPost,
	updatePost,
	deletePost,
} from "../db/post";
import { CreatePostDio, UpdatePostDio } from "../dio/post";

const controller = {
	getAll: expressAsyncHandler(async (req, res, next) => {
		const posts = await getPosts();
		if (!posts)
			return next(
				new AppERROR(ErrorMessage.Not_Found, ErrorStatus.Not_Found)
			);

		const response = new AppResponse(ResStatus.OK, { posts: posts });
		sendRes(response, res);
	}),
	getMyPosts: expressAsyncHandler(async (req, res, next) => {
		const { id } = <AuthPayload>req.user;
		const posts = await getUserPosts(id);
		if (!posts) return next(new Errors(AppModels.post).Not_found);

		const response = new AppResponse(ResStatus.OK, posts);
		sendRes(response, res);
	}),

	post: expressAsyncHandler(async (req, res, next) => {
		const { post } = <CreatePostDio>req.body;
		const user = <AuthPayload>req.user;

		const created = await createPost({ post, poster: user.id });
		if (!created)
			return next(
				new AppERROR(ErrorMessage.Not_Found, ErrorStatus.Not_Found)
			);
		await User.findByIdAndUpdate(user.id, { $push: { posts: created } });

		const response = new AppResponse(
			ResStatus.OK,
			created,
			"Post created successfully"
		);
		sendRes(response, res);
	}),

	like: expressAsyncHandler(async (req, res, next) => {
		const id = req.params.id;
		const user = <AuthPayload>req.user;

		const updated = await updatePost({ pushLike: user.id, id });
		if (!updated)
			return next(
				new AppERROR(ErrorMessage.Not_Found, ErrorStatus.Not_Found)
			);

		const response = new AppResponse(
			ResStatus.OK,
			{},
			"Post liked successfully"
		);
		sendRes(response, res);
	}),
	unlike: expressAsyncHandler(async (req, res, next) => {
		const id = req.params.id;
		const user = <AuthPayload>req.user;

		const updated = await updatePost({ pullLike: user.id, id });
		if (!updated)
			return next(
				new AppERROR(ErrorMessage.Not_Found, ErrorStatus.Not_Found)
			);

		const response = new AppResponse(
			ResStatus.OK,
			{},
			"Post unliked successfully"
		);
		sendRes(response, res);
	}),

	edit: expressAsyncHandler(async (req, res, next) => {
		const id = req.params.id;
		const user = <AuthPayload>req.user;
		const { post } = <UpdatePostDio>req.body;

		const updated = await updatePost({ posterId: user.id, id, post });
		if (!updated)
			return next(
				new AppERROR(ErrorMessage.Not_Found, ErrorStatus.Not_Found)
			);

		const response = new AppResponse(
			ResStatus.OK,
			updated,
			"Post updated successfully"
		);
		sendRes(response, res);
	}),

	delete: expressAsyncHandler(async (req, res, next) => {
		const { id: poster } = <AuthPayload>req.user;

		const post = await deletePost(req.params.id, poster);
		if (!post) return next(new Errors(AppModels.post).Not_found);

		post.comments.forEach(async (e) => {
			await deleteComment(e);
		});

		const response = new AppResponse(
			ResStatus.OK,
			{},
			"Post deleted successfully"
		);
		sendRes(response, res);
	}),
};

export { controller as PostController };
