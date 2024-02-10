import { CreateCommentDio } from "../dio";
import { Comment, CommentType } from "../models";

export const addComment = async (info: CreateCommentDio): Promise<CommentType> => {
	const comment = await Comment.create(info);
	return comment;
};

export const getComment = async (id: string): Promise<any> => {
	return await Comment.findById(id);
};

export const editComment = async (id: any, newComment: string): Promise<CommentType> => {
	const comment = await Comment.findByIdAndUpdate(id, { comment: newComment });
	return comment;
};

export const deleteOwnComment = async (id: any, userId: any): Promise<CommentType> => {
	const comment = await Comment.findOneAndDelete({ _id: id, commentator: userId });
	return comment;
};

export const deleteComment = async (id: any): Promise<CommentType> => {
	const comment = await Comment.findOneAndDelete({ _id: id });
	return comment;
};
