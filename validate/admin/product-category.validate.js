module.exports.createPost = (req, res, next) => {
    if (!req.body.title) {
        req.flash("error", "Vui lòng nhập tiêu đề sản phấm!");
        res.redirect("back");
        return;
    }
    next();
}