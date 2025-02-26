const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");

const uploadToCloudinary = require("../../helpers/uploadToCloudinary")
const chatSocket = require("../../sockets/client/chat.socket")

// [GET] /chat
module.exports.index = async (req, res) => {
    const userID = res.locals.user.id;
    const fullName = res.locals.user.fullName;

    // CẤU HÌNH SOCKET.IO
    chatSocket(res);
    // END CẤU HÌNH SOCKET.IO

    // LẤY DATA TỪ DB
    const messages = await Chat.find({ deleted: false });

    for (const message of messages) {
        const infoUser = await User.findOne({ _id: message.user_id }).select("fullName avatar");

        message.infoUser = infoUser;
    }
    // END LẤY DATA TỪ DB



    res.render("client/pages/chat/index", {
        pageTitle: "Chat",
        messages: messages,
    })
}