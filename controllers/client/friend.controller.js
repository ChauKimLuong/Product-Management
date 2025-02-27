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

    console.log(user);

    const users = await User.find({
        _id: { $nin: [...(user.requestList || []), ...(user.respondList || []), userId ]},
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

    console.log(user);

    const requestedUsers = await User.find({
        _id: { $in: [...(user.requestList || []), userId ]},
        status: "active", 
        deleted: false,
    }).select("id avatar fullName")

    res.render("client/pages/friend/requests.pug", {
        pageTitle: "Yêu cầu đã gửi",
        users : requestedUsers ,
    })
}
