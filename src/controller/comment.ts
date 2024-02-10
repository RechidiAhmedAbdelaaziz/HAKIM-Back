import expressAsyncHandler from "express-async-handler";
import { addComment, getComment, getPost, deleteOwnComment, updatePost } from "../db";
import { AuthPayload, CreateCommentDio } from "../dio";
import { AppERROR, AppResponse, sendRes } from "../utils";
import { AppModels, ErrorMessage, ErrorStatus, Errors, ResStatus } from "../constants";

export default {
	comment: expressAsyncHandler(async (req, res, next) => {
		const { comment } = <CreateCommentDio>req.body;
		const { id } = req.params;
		const user = <AuthPayload>req.user;

		if (!comment || !user || !id)
			return next(new AppERROR(ErrorMessage.Generic, ErrorStatus.Bad_Request));
		if (!(await getPost(id)))
			return next(new AppERROR(`Post ${ErrorMessage.Not_Found}`, ErrorStatus.Not_Found));

		const created = await addComment({ comment, commentator: user.id, post: id });
		if (!created) return next(new AppERROR(ErrorMessage.Generic, ErrorStatus.Bad_Gateway));
		await updatePost({ pushComment: created._id, id });

		const response = new AppResponse(
			ResStatus.OK,
			{ comment: created },
			"Comment added successfully"
		);
		sendRes(response, res);
	}),
	remove: expressAsyncHandler(async (req, res, next) => {
		const { id } = req.params;
		const user = <AuthPayload>req.user;
		if (!user || !id) return next(new AppERROR(ErrorMessage.Generic, ErrorStatus.Bad_Request));

		if (!(await getComment(id)))
			return next(new AppERROR(`Comment ${ErrorMessage.Not_Found}`, ErrorStatus.Not_Found));

		const comment = await deleteOwnComment(id, user.id);
		if (!comment) return next(new Errors(AppModels.comment).Not_found);
		await updatePost({ pullComment: id, id: comment.post });

		const response = new AppResponse(ResStatus.OK, {}, "Comment deleted successfully");
		sendRes(response, res);
	}),
};
