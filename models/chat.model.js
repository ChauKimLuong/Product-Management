const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
    {
        user_id: String,
        chatRoomId: String,
        content: String,
        images: Array, 
        deleted: { type: Boolean, default: false },
        deletedAt: Date,
    }, { timestamp: true }
);


const Chat = mongoose.model("Chat", chatSchema, "chats");

module.exports = Chat;