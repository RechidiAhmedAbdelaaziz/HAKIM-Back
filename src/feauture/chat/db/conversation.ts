import { CreateConversationDio, UpdateConversationDio, GetConversationByIdDio, GetConversationDio, GetConversationsDio, CreateMessageDio, DeleteMessageDio } from "../dio/conversation";
import { ConversationType, Conversation } from "../models/conversation";
import { MessageType, Message } from "../models/message";


export const createConversation = async (
	info: CreateConversationDio
): Promise<ConversationType> => {
	const conversation = await Conversation.create({
		users: [info.sender, info.receiver],
	});
	return conversation;
};

export const updateConversation = async (
	info: UpdateConversationDio
): Promise<ConversationType> => {
	const conversation =  Conversation.findByIdAndUpdate(info.id, {
		$addToSet: { messages: info.message },
	});
	return conversation;
};

export const getConversationById = async (
	info: GetConversationByIdDio
): Promise<ConversationType> => {
	const { id, user } = info;
	const conversation = await Conversation.findOne({
		_id: id,
		users: { $in: user },
	}).populate("messages");
	return conversation;
};
export const getConversation = async (
	info: GetConversationDio
): Promise<ConversationType> => {
	const { sender, receiver } = info;
	const conversation = await Conversation.findOne({
		users: { $all: [receiver, sender] },
	}).populate("messages");
	return conversation;
};
export const getConversations = async (
	info: GetConversationsDio
): Promise<ConversationType[]> => {
	const { userId } = info;
	const conversation = await Conversation.find({
		users: { $in: userId },
	}).populate("messages");
	return conversation;
};

export const createMessage = async (
	info: CreateMessageDio
): Promise<MessageType> => {
	const { message: text, receiver, sender } = info;
	const message = await Message.create({ sender, receiver, text });
	return message;
};

export const deleteMessage = async (
	info: DeleteMessageDio
): Promise<MessageType> => {
	const message = await Message.findOneAndDelete(info);
	return message;
};
