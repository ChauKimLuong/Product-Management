const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");

// [GET] /chat
module.exports.index = async (req, res) => {
    const userID = res.locals.user.id;
    const fullName = res.locals.user.fullName;

    // CẤU HÌNH Socket.io
    _io.once("connection", (socket) => {
        console.log("ID nguời dùng kết nối:", socket.id);

        socket.on("CLIENT_SEND_MESSAGE", async (content) => {
            console.log(content);

            const chat = new Chat({
                user_id: userID,
                content: content
            })

            await chat.save();

            //? Trả message mới nhất về CLIENT
            _io.emit("SERVER_RETURN_MESSAGE", {
                userID: userID,
                fullName: fullName,
                content: content,
            });
        })

        socket.on("CLIENT_SEND_TYPING", async (status) => {
            console.log(status);

            //? Trả type về CLIENT
            _io.emit("SERVER_RETURN_TYPING", {
                userID: userID,
                fullName: fullName,
                isTyping: status,
            });
        })
    })
    // END CẤU HÌNH Socket.io

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