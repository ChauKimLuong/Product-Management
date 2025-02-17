const Chat = require("../../models/chat.model");

const uploadToCloudinary = require("../../helpers/uploadToCloudinary")


module.exports = (res) => {
    const userID = res.locals.user.id;
    const fullName = res.locals.user.fullName;

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
}
