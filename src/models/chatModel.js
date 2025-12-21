import { model, Schema } from "mongoose";

const chatSchema = new Schema({
	userIds: { type: Schema.Types.ObjectId, ref: "User" },
});

const Chat = model("Chat", chatSchema);

export default Chat;
