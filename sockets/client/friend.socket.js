const User = require("../../models/user.model");

const uploadToCloudinary = require("../../helpers/uploadToCloudinary")

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

        })
    })

    _io.once("connection", (socket) => {
        socket.on("CLIEND_REFUSE_FRIEND", async (clickedUserId) => {
            const isExist = await User.findOne({
                _id: userId,
                respondList: clickedUserId,
            })
            console.log(clickedUserId)

            if (!isExist) return;

            await User.updateOne({ _id: userId }, { $pull: { respondList: clickedUserId } })

            await User.updateOne({ _id: clickedUserId }, { $pull: { requestList: userId } })

        })
    })
}

