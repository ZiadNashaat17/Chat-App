import { isValidObjectId } from "mongoose";
import AppError from "../util/appError.js";

export default async (req, res, next) => {
	const { receiverId } = req.body;
	const senderId = req.user._id;

	if (!receiverId || !isValidObjectId(receiverId)) {
		return next(new AppError("No receiver id found or invalid id!", 400));
	}

	if (receiverId === senderId) {
		return next(new AppError("You cannot send message to yourself!", 400));
	}

	next();
};
