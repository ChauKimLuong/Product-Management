const User = require("../../models/user.model")


module.exports.notFriends = async (req, res) => {
    const userId = res.locals.user.id;

    const users = await User.find({
        _id: { $ne: userId},
        status: "active", 
        deleted: false,
    }).select("id avatar fullName")

    console.log(users);

    res.render("client/pages/users/not-friends.pug", {
        pageTitle: "Danh sách người dùng",
        users: users,
    })
}