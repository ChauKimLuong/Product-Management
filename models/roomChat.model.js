const mongoose = require("mongoose");

const chatRoomSchema = mongoose.Schema(
    {
        title: String,
        avatar: String, 
        roomType: {
            type: String,
            default: "friend",
        },
        user: [
            {
                userId: string,
                role: String,
            }
        ],

        deleted: {
            type: Boolean,
            default: false,
        },
        deletedAt: Date,
    },
    {
        timestamps: true,
    }
);

const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema, "chatRooms");

module.exports = ChatRoom;