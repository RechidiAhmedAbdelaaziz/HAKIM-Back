import { CreatePostDio, UpdatePostDio } from "../dio/post";
import { Post, PostType } from "../models/post";
import { dontShow } from "../../../constants";
import { Document, Schema } from "mongoose";
import { User } from "../../auth/models";

export const createPost = async (info: CreatePostDio): Promise<any> => {
	const post = await Post.create(info);
	if (post)
		await User.findByIdAndUpdate(post.poster, {
			$pull: { posts: post._id },
		});
	return post;
};

export const getPosts = async (): Promise<any> => {
	const posts = await Post.find({});
	return posts;
};
export const getUserPosts = async (
	poster: Schema.Types.ObjectId
): Promise<PostType[]> => {
	const posts = await Post.find({ poster: poster });
	return posts;
};
export const getPost = async (id: string): Promise<Document | null> => {
	const post = await Post.findOne({ _id: id }, dontShow);
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
