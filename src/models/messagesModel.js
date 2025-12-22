import { model, Schema } from "mongoose";

const messagesSchema = new Schema(
	{
		message: {
			type: String,
			trim: true,
			required: true,
		},
		originalMessage: {
			type: String,
			trim: true,
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		chatId: {
			type: Schema.Types.ObjectId,
			ref: "Chat",
		},
		seen: {
			type: Boolean,
			default: false,
		},
		delivered: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: { createdAt: true },
	},
);

messagesSchema.index({ chatId: 1, seen: 1, userId: 1 });

const Messages = model("Messages", messagesSchema);

export default Messages;
