module.exports.forgotPost = (req, res, next) => {
    if (!req.body.email){
        req.flash("error", "Vui lòng nhập Email!");
        res.redirect("back");
        return;
    }

    next();
}


module.exports.otpPost = (req, res, next) => {
    if (!req.body.email){
        req.flash("error", "Vui lòng nhập Email!");
        res.redirect("back");
        return;
    }

    if (!req.body.otp){
        req.flash("error", "Vui lòng nhập mã OTP!");
        res.redirect("back");
        return;
    }

    next();


}


module.exports.resetPost = (req, res, next) => {
    if (!req.body.password){
        req.flash("error", "Vui lòng nhập mật khẩu mới!");
        res.redirect("back");
        return;
    }

    if (!req.body.confirm){
        req.flash("error", "Vui lòng xác nhận lại mật khẩu !");
        res.redirect("back");
        return;
    }

    if (req.body.password != req.body.confirm){
        req.flash("error", "Xác nhận không trùng khớp!");
        res.redirect("back");
        return;
    }

    next();


}