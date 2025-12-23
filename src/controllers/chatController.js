import Chat from "../models/chatModel.js";
import AppError from "../util/appError.js";

export const createChat = async (req, res, next) => {
	const senderId = req.user._id;
	const { receiverId } = req.body;

	if (senderId === receiverId) {
		return next(new AppError("Cannot create chat with yourself", 400));
	}

	let chat = await Chat.findOne({ userIds: { $all: [senderId, receiverId], $size: 2 } });

	if (chat) {
		return res.status(200).json({
			status: "success",
			data: { chat },
		});
	}

	chat = await Chat.create({ userIds: [senderId, receiverId] });

	res.status(201).json({
		status: "success",
		data: {
			chat,
		},
	});
};

export const getChat = async (req, res, next) => {
	const chatId = req.params.chatId;

	const chat = await Chat.findById(chatId);

	if (!chat) {
		return next(new AppError("No chat found!", 404));
	}

	res.status(200).json({
		status: "success",
		data: { chat },
	});
};

// biome-ignore lint/correctness/noUnusedFunctionParameters: <>
export const getAllChats = async (req, res, next) => {
	const userId = req.user._id;

	const chats = await Chat.find({ userIds: { $in: userId } });

	res.status(200).json({
		status: "success",
		data: { chats },
	});
};
