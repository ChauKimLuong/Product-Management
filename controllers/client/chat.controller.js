const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");

const uploadToCloudinary = require("../../helpers/uploadToCloudinary")

// [GET] /chat
module.exports.index = async (req, res) => {
    const userID = res.locals.user.id;
    const fullName = res.locals.user.fullName;

    // CẤU HÌNH Socket.io
    _io.once("connection", (socket) => {
        console.log("ID nguời dùng kết nối:", socket.id);

        socket.on("CLIENT_SEND_MESSAGE", async (data) => {
            let images = [];

            for (const imageBuffer of data.images) {
                const link = await uploadToCloudinary(imageBuffer);
                images.push(link);
            }

            const chat = new Chat({
                user_id: userID,
                content: data.content,
                images: images
            })

            await chat.save();

            //? Trả message mới nhất về CLIENT
            _io.emit("SERVER_RETURN_MESSAGE", {
                userID: userID,
                fullName: fullName,
                content: data.content,
                images: images
            });
        })

        socket.on("CLIENT_SEND_TYPING", async (status) => {
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