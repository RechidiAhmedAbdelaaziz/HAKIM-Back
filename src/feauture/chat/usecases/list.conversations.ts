import { Schema, Types } from "mongoose";
import { Errors, ResStatus } from "../../../constants";
import { AppResponse } from "../../../utils";
import { Conversation } from "../models/conversation";
import { Message } from "../models/message";
import { UseCase } from "../../../utils/types/usecases";
import { PaginationInput } from "../../../utils/types/pagination";
import ModelsGetter from "../../../utils/model.getter";

interface Params {
	user: Schema.Types.ObjectId;
	setting?: PaginationInput;
}

export const getConversations: UseCase<Params> = async (params) => {
	const { user, setting } = params;

	//Make query
	const { query, pagination } = new ModelsGetter(
		Conversation.find().sort({ updatedAt: -1 }),
		setting
	)
		.select({
			users: { $in: [user] },
		})
		.paginate(await Conversation.countDocuments({}));

	//Get conversation
	const conversations = await query.exec();
	if (!conversations) return { error: Errors.No_Models("Conversations") };

	//Send Response
	const response = new AppResponse(ResStatus.OK, {
		result: conversations,
		pagination,
	});

	return { response };
};
