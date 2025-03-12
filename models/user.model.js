const generateHelper = require("../helpers/generate");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: String,
    email: String, 
    password: String, 
    tokenUser: {
        type: String,
        default: () => generateHelper.generateRandomString(30),
    },
    phone: String,
    avatar: String,
    status: {
        type: String,
        default: "active"
    },
    online: {
        type: Boolean,
        default: true,
    },
    requestList: Array,
    respondList: Array, 
    friendList: [
        {
            userId: String,
            chatRoomId: String,
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
)

const User = mongoose.model("User", userSchema, "users");

module.exports = User;