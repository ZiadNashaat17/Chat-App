import Chat from "../models/chatModel.js";
import Messages from "../models/messagesModel.js";

export const createMessage = async (req, res, next) => {
	const { receiverId, message } = req.body;
	const senderId = req.user._id;

	let chat = await Chat.findOne({ userIds: { $all: [senderId, receiverId], $size: 2 } });

	let newMessage;

	if (!chat) {
		chat = await Chat.create({ userIds: [senderId, receiverId] });

		newMessage = await Messages.create({ chatId: chat._id, senderId, receiverId, message });

		chat.lastMessage = newMessage._id;

		await chat.save();
	} else {
		newMessage = await Messages.create({ chatId: chat._id, senderId, receiverId, message });

		chat.lastMessage = newMessage._id;

		await chat.save();
	}

	res.status(201).json({
		status: "success",
		data: { newMessage },
	});
};
