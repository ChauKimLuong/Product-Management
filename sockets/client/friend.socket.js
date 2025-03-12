const User = require("../../models/user.model");
const ChatRoom = require("../../models/chatRoom.model");


module.exports = (res) => {
    const userId = res.locals.user.id;

    _io.once("connection", (socket) => {
        socket.on("CLIEND_ADD_FRIEND", async (clickedUserId) => {
            const isExist = await User.findOne({
                _id: userId,
                requestList: clickedUserId,
            })
            if (isExist) return;

            await User.updateOne({ _id: userId }, { $push: { requestList: clickedUserId } })
            await User.updateOne({ _id: clickedUserId }, { $push: { respondList: userId } })

            // Lầy ra respondList.length để trả về 
            const clickedUserInfo = await User.findOne({ _id: clickedUserId });

            socket.broadcast.emit("SERVER_RETURN_RESPOND_LENGTH", {
                clickedUserId: clickedUserId,
                respondLength: clickedUserInfo.respondList.length,
            })

            // Lấy info của user trả về cho clickedUser
            const infoUser = await User.findOne({ _id: userId }).select("fullName avatar id");

            socket.broadcast.emit("SERVER_RETURN_CLICKED_INFO_USER", {
                clickedInfoUser: clickedUserInfo,
                infoUser: infoUser,
            })

            socket.broadcast.emit("SERVER_RETURN_USER_ID", {
                userId: userId,
                clickedInfoUser: clickedUserInfo,
            })
        })
    })

    _io.once("connection", (socket) => {
        socket.on("CLIEND_CANCEL_FRIEND", async (clickedUserId) => {
            const isExist = await User.findOne({
                _id: userId,
                requestList: clickedUserId,
            })

            if (!isExist) return;

            await User.updateOne({ _id: userId }, { $pull: { requestList: clickedUserId } })
            await User.updateOne({ _id: clickedUserId }, { $pull: { respondList: userId } })

            // Lầy ra respondList.length để trả về 
            const clickedUserInfo = await User.findOne({ _id: clickedUserId });

            socket.broadcast.emit("SERVER_RETURN_RESPOND_LENGTH", {
                clickedUserId: clickedUserId,
                respondLength: clickedUserInfo.respondList.length,
            })
            
            socket.broadcast.emit("SERVER_RETURN_CANCEL_FRIEND", {
                clickedInfoUser: clickedUserInfo,
                userId: userId, 
            })

        })
    })

    _io.once("connection", (socket) => {
        socket.on("CLIEND_REFUSE_FRIEND", async (clickedUserId) => {
            const isExist = await User.findOne({
                _id: userId,
                respondList: clickedUserId,
            })

            if (!isExist) return;

            await User.updateOne({ _id: userId }, { $pull: { respondList: clickedUserId } })
            await User.updateOne({ _id: clickedUserId }, { $pull: { requestList: userId } })

        })
    })

    _io.once("connection", async (socket) => {
        socket.on("CLIEND_ACCEPT_FRIEND", async (clickedUserId) => {
            const isExist = await User.findOne({
                _id: userId,
                "friendList.userId": clickedUserId,
            })

            if (isExist) return;

            const users = [
                {
                    userId: userId,
                    role: "admin",
                },
                {
                    userId: clickedUserId,
                    role: "admin",
                }
            ]

            const chatRoom = new ChatRoom({users: users});
            await chatRoom.save();

            await User.updateOne(
                { _id: userId }, 
                { 
                    $push: { 
                        friendList: {
                            userId: clickedUserId,
                            chatRoomId: chatRoom._id.toString(),
                        } 
                    },  
                    $pull: { respondList: clickedUserId }
                },
            )

            await User.updateOne(
                { _id: clickedUserId },
                { 
                    $push: { 
                        friendList: {
                            userId: userId,
                            chatRoomId: chatRoom._id.toString(),
                        } 
                    },
                    $pull: { requestList: userId } 
                }
            )
        })
    })
}

