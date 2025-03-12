const mongoose = require("mongoose");
const User = require("../../models/user.model");
const ChatRoom = require("../../models/chatRoom.model");

module.exports = async (req, res, next) => {
    const chatRoomId = req.params.chatRoomId;
    const userId = res.locals.user.id;

    if (!mongoose.Types.ObjectId.isValid(chatRoomId)) {
        req.flash("error", "Id phòng không hợp lệ!");
        return res.redirect(`back`);
    }

    const chatRoom = await ChatRoom.findOne({ _id: chatRoomId });

    if (!chatRoom) {
        req.flash("error", "Phòng không tồn tại!");
        return res.redirect(`back`);
    }

    const isExist = chatRoom.users.find(user => user.userId == userId);

    if (!isExist) {
        
        req.flash("error", "Bạn không thuộc phòng này!");
        return res.redirect(`back`);
    }

    next();
};
