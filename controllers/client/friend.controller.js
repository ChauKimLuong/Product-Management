const User = require("../../models/user.model")

const friendSocket = require("../../sockets/client/friend.socket")


module.exports.notFriends = async (req, res) => {
    //? CẤU HÌNH SOCKET.IO
    friendSocket(res);
    //? END CẤU HÌNH SOCKET.IO

    const userId = res.locals.user.id;
    const user = await User.findOne({ 
        _id: userId,
        status: "active", 
        deleted: false
    });

    const users = await User.find({
        _id: { 
            $nin: [
                ...(user.requestList || []), 
                ...(user.respondList || []), 
                ...(user.friendList.map(friend => friend.userId) || []),
                userId 
            ]
        },
        status: "active", 
        deleted: false,
    }).select("id avatar fullName")

    res.render("client/pages/friend/not-friends.pug", {
        pageTitle: "Danh sách người dùng",
        users: users,
    })
}

module.exports.requests = async (req, res) => {
    //? CẤU HÌNH SOCKET.IO
    friendSocket(res);
    //? END CẤU HÌNH SOCKET.IO

    const userId = res.locals.user.id;
    const user = await User.findOne({ 
        _id: userId,
        status: "active", 
        deleted: false
    });

    const requestedUsers = await User.find({
        _id: { $in: user.requestList },
        status: "active", 
        deleted: false,
    }).select("id avatar fullName")

    res.render("client/pages/friend/requests.pug", {
        pageTitle: "Yêu cầu đã gửi",
        users : requestedUsers ,
    })
}

module.exports.responds = async (req, res) => {
    //? CẤU HÌNH SOCKET.IO
    friendSocket(res);
    //? END CẤU HÌNH SOCKET.IO

    const userId = res.locals.user.id;
    const user = await User.findOne({ 
        _id: userId,
        status: "active", 
        deleted: false
    });

    const respondingUsers = await User.find({
        _id: { $in: user.respondList },
        status: "active", 
        deleted: false,
    }).select("id avatar fullName")

    res.render("client/pages/friend/responds.pug", {
        pageTitle: "Yêu cầu kết bạn",
        users : respondingUsers ,
    })
}


module.exports.friends = async (req, res) => {
    //? CẤU HÌNH SOCKET.IO
    friendSocket(res);
    //? END CẤU HÌNH SOCKET.IO

    const userId = res.locals.user.id;
    const user = await User.findOne({ 
        _id: userId,
        status: "active", 
        deleted: false
    });

    const friendshipUsers = await User.find({
        _id: { $in: user.friendList.map(friend => friend.userId) },
        status: "active", 
        deleted: false,
    }).select("id avatar fullName online")

    res.render("client/pages/friend/friends.pug", {
        pageTitle: "Danh sách bạn bè",
        users : friendshipUsers ,
    })
}

