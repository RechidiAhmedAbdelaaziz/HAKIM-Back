import { CreatePostDio, UpdatePostDio } from "../dio/post";
import { Post, PostDoc, PostType } from "../models/post";
import { dontShow } from "../../../constants";
import { Document, Query, Schema } from "mongoose";
import { User } from "../../auth/models";
import ModelsGetter, { ModelsGetterReturn } from "../../../utils/model.getter";

export const createPost = async (info: CreatePostDio): Promise<any> => {
	const post = await Post.create(info);
	if (post)
		await User.findByIdAndUpdate(post.poster, {
			$pull: { posts: post._id },
		});
	return post;
};

export const getPosts = async (
	reqQuery: any
): Promise<ModelsGetterReturn<PostDoc[]>> => {
	const { query, paginationResults } = new ModelsGetter(Post.find(), reqQuery)
		.sort()
		.paginate(await Post.countDocuments({}));

	const posts = await query.exec();
	return { result: posts, pagination: paginationResults };
};
export const getUserPosts = async (
	reqQuery: any,
	userId: Schema.Types.ObjectId
): Promise<ModelsGetterReturn<PostDoc[]>> => {
	const { query, paginationResults } = new ModelsGetter(Post.find(), reqQuery)
		.select({ poster: userId })
		.sort()
		.search(["post"])
		.paginate(await Post.countDocuments({}));

	const posts = await query.exec();
	return { result: posts, pagination: paginationResults };
};
export const getPost = async (id: string): Promise<Document | null> => {
	const query: Query<PostDoc[], PostDoc> = Post.find();
	const post = await query.findOne({ _id: id }).exec();
	return post;
};

export const updatePost = async (info: UpdatePostDio): Promise<PostType> => {
	const { id, post, posterId, pullComment, pullLike, pushComment, pushLike } =
		info;

	const updated = await Post.findById(id);
	if (updated) {
		if (post) {
			if (updated.poster == posterId) {
				await updated.updateOne(
					{
						post,
					},
					{ new: true }
				);
			}
		}
		await updated.updateOne(
			{
				$pull: { comments: pullComment, likers: pullLike },
				$addToSet: { comments: pushComment, likers: pushLike },
			},
			{ new: true }
		);
	}

	return updated;
};

export const deletePost = async (
	id: string,
	poster: any
): Promise<PostType> => {
	const post = await Post.findOneAndDelete({ _id: id, poster });
	return post;
};
