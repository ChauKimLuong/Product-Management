const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");

// [GET] /chat
module.exports.index = async (req, res) => {
    const userID = res.locals.user.id;

    // Socket.io
    _io.once("connection", (socket) => {
        console.log("ID nguời dùng kết nối:", socket.id);

        socket.on("CLIENT_SEND_MESSAGE", async (content) => {
            console.log(content);

            const chat = new Chat({
                user_id: userID,
                content: content
            })

            await chat.save();
        })
    })
    // end Socket.io

    // Lấy data từ db
    const messages = await Chat.find({ deleted: false });

    for (const message of messages) {
        const infoUser = await User.findOne({ _id: message.user_id }).select("fullName avatar");

        message.infoUser = infoUser;
    }
    // End

    res.render("client/pages/chat/index", {
        pageTitle: "Chat",
        messages: messages,
    })
}