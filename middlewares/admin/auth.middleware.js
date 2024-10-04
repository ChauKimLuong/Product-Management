const systemConfig = require("../../config/system");
const Account = require("../../models/accounts.model")

module.exports.requireAuth = async (req, res, next) => {
    if (!req.cookies.token) {
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    } else {
        const user = await Account.findOne({ token: req.cookies.token })
            .select("-password")
            .populate({ path: "role_id", select: "title permissions" }); // Chỉ lấy ra title và permissions

        if (!user) {
            res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
        } else {
            res.locals.user = user;
            res.locals.role = user.role_id;
            // console.log(user)
            // console.log(user.role_id);
            next();
        }
    }
}


