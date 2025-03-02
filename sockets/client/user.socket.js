module.exports.online = (user) => {
    _io.once("connection", (socket) => {
        socket.broadcast.emit("SERVER_RETURN_USER_ONLINE", {
            userId: user._id,
        })
    })
}

module.exports.offline = (user) => {
    _io.once("connection", (socket) => {
        socket.broadcast.emit("SERVER_RETURN_USER_OFFLINE", {
            userId: user._id,
        })
    })
}