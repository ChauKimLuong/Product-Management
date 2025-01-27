
// [GET] /chat
module.exports.index = async (req, res) => {
    _io.on("connection", (socket) => {
        console.log("ID nguời dùng kết nối:", socket.id);
    })

    res.render("client/pages/chat/index", {
        pageTitle: "Chat",
    })
}