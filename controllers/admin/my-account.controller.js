const md5 = require("md5")
const Account = require("../../models/accounts.model")

// [GET] /admin/my-account
module.exports.index = (req, res) => {
    res.render("admin/pages/my-account/index", {
        pageTitle: "Trang Thông tin cá nhân",

    })
}

// [GET] /admin/my-account/edit
module.exports.edit = (req, res) => {
    res.render("admin/pages/my-account/edit", {
        pageTitle: "Trang chỉnh sửa Thông tin cá nhân",

    })
}

// [PATCH] /admin/my-account/edit
module.exports.editPatch = async (req, res) => {
    const emailExist = await Account.findOne({
        _id: { $ne: res.locals.user.id },
        deleted: false,
        email: req.body.email
    });

    if (emailExist) {
        req.flash("error", `Email: ${req.body.email} đã tồn tại.`);

    } else {
        if (req.body.password) {
            req.body.password = md5(req.body.password)
        } else {
            delete req.body.password;
        }

        await Account.updateOne({ _id: res.locals.user.id }, req.body);
        req.flash("success", "Cập nhật tài khoản thành công!");
    }
    res.redirect("back");
}