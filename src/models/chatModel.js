import { model, Schema } from "mongoose";
import AppError from "../util/appError.js";

const chatSchema = new Schema(
	{
		userIds: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
		lastMessage: {
			type: Schema.Types.ObjectId,
			ref: "Messages",
		},
	},
	{
		timestamps: { createdAt: true, updatedAt: false },
	},
);

chatSchema.pre("save", function (next) {
	if (!this.userIds || this.userIds.length !== 2) {
		return next(new AppError("Chat must be exactly 2 users", 400));
	}

	// next();
});

chatSchema.index({ userIds: 1 });

const Chat = model("Chat", chatSchema);

export default Chat;
