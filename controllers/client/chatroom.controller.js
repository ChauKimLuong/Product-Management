const User = require("../../models/user.model")
const ChatRoom = require("../../models/chatRoom.model")


module.exports.index = async (req, res) => {

    res.render("client/pages/chatroom/index.pug", {
        pageTitle: "Nhắn tin",
    })
}


// [GET] chatroom/create
module.exports.create = async (req, res) => {
    const friends = [];
    
    for (const friend of res.locals.user.friendList) {
        const infoFriend = await User.findOne({ _id: friend.userId }).select("_id fullName");

        friends.push(infoFriend);
    }

    res.render("client/pages/chatroom/create.pug", {
        pageTitle: "Tạo phòng",
        friends: friends,
    })
}

// [POST] chatroom/create
module.exports.createPost = async (req, res) => {
    const usersId = req.body.usersId;
    const infoUsers = [];

    usersId.forEach(userId => infoUsers.push({ userId: userId, role: "user" }));
    infoUsers.push({ userId: res.locals.user.id, role: "admin" });

    const chatRoom = new ChatRoom({
        title: req.body.title,
        roomType: "group",
        users: infoUsers,
    });

    await chatRoom.save();


    res.redirect(`/chat/${chatRoom._id}`);
}

