import { AuthPayload } from "./../../auth/dio/auth";
import expressAsyncHandler from "express-async-handler";

import { AppERROR, AppResponse, sendResponse } from "../../../utils";
import {
	AppModels,
	ErrorMessage,
	ErrorStatus,
	Errors,
	ResStatus,
} from "../../../constants";
import { addComment, getComment, deleteOwnComment } from "../db/comment";
import { getPost, updatePost } from "../db/post";
import { CreateCommentDio } from "../dio/comment";

const controller = {
	comment: expressAsyncHandler(async (req, res, next) => {
		const { comment } = <CreateCommentDio>req.body;
		const { id } = req.params;
		const user = <AuthPayload>req.user;

		if (!comment || !user || !id)
			return next(
				new AppERROR(ErrorMessage.Generic, ErrorStatus.Bad_Request)
			);
		if (!(await getPost(id)))
			return next(
				new AppERROR(
					`Post ${ErrorMessage.Not_Found}`,
					ErrorStatus.Not_Found
				)
			);

		const created = await addComment({
			comment,
			commentator: user.id,
			post: id,
		});
		if (!created)
			return next(
				new AppERROR(ErrorMessage.Generic, ErrorStatus.Bad_Gateway)
			);
		await updatePost({ pushComment: created._id, id });

		const response = new AppResponse(
			ResStatus.OK,
			{ comment: created },
			"Comment added successfully"
		);
		sendResponse(response, res);
	}),
	remove: expressAsyncHandler(async (req, res, next) => {
		const { id } = req.params;
		const user = <AuthPayload>req.user;
		if (!user || !id)
			return next(
				new AppERROR(ErrorMessage.Generic, ErrorStatus.Bad_Request)
			);

		if (!(await getComment(id)))
			return next(
				new AppERROR(
					`Comment ${ErrorMessage.Not_Found}`,
					ErrorStatus.Not_Found
				)
			);

		const comment = await deleteOwnComment(id, user.id);
		if (!comment) return next(new Errors(AppModels.comment).Not_found);
		await updatePost({ pullComment: id, id: comment.post });

		const response = new AppResponse(
			ResStatus.OK,
			{},
			"Comment deleted successfully"
		);
		sendResponse(response, res);
	}),
};

export { controller as CommentController };
