const User = require("../../models/user.model")

module.exports.connect = async (req, res, next) => {
    _io.once("connect", async (socket) => {
        
        await User.updateOne(
            { tokenUser: req.cookies.tokenUser }, 
            { online: true },
        );

        //! Lỗi vì khi đăng xuất thì không còn res.locals.user nữa rồi :((((((((
        // socket.broadcast.emit("SERVER_RETURN_USER_ONLINE", {
        //     userId: res.locals.user._id.toString(),
        // })

        socket.once("disconnect", async () => {

            // socket.broadcast.emit("SERVER_RETURN_USER_OFFLINE", {
            //     userId: res.locals.user._id.toString(),
            // })

            await User.updateOne(
                { tokenUser: req.cookies.tokenUser }, 
                { online: false },
            );
        })
    })


    next();
}