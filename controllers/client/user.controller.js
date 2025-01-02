const User = require("../../models/user.model")
const productHelper = require("../../helpers/product.js")
const md5 = require("md5")

// [GET] /user/register
module.exports.register = (req, res) => {
    res.render("client/pages/user/register", {
        pageTitle: "Đăng kí tài khoản",
    })
}

// [POST] /user/register
module.exports.registerPost = async (req, res) => {
    const isExistEmail = await User.findOne({ email: req.body.email });
    
    if (isExistEmail) {
        req.flash("error", "Email đã tồn tại!");
        res.redirect("back");
        return;
    }
    
    req.body.password = md5(req.body.password);
    
    const user = new User(req.body);
    await user.save();

    res.cookie("tokenUser", user.tokenUser);
    res.redirect("/");
    req.flash("success", "Đăng kí thành công!");
}