const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");

const chatSocket = require("../../sockets/client/chat.socket")

// [GET] /chat/:chatRoomId
module.exports.index = async (req, res) => {
    const userID = res.locals.user.id;
    const fullName = res.locals.user.fullName;
    const chatRoomId = req.params.chatRoomId;

    chatSocket(req, res);      //* Cấu hình socket.io

    //* Lấy data từ db
    const messages = await Chat.find(
        { 
            deleted: false, 
            chatRoomId: chatRoomId,
        }
    );

    for (const message of messages) {
        const infoUser = await User.findOne({ _id: message.user_id }).select("fullName avatar");

        message.infoUser = infoUser;
    }
    //! Lấy data từ db

    res.render("client/pages/chat/index", {
        pageTitle: "Chat",
        messages: messages,
    })
}