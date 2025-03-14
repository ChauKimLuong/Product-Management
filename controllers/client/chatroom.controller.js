const User = require("../../models/user.model")
const ChatRoom = require("../../models/chatRoom.model")


module.exports.index = async (req, res) => {




    res.render("client/pages/chatroom/index.pug", {
        pageTitle: "Nhắn tin",
    })
}

