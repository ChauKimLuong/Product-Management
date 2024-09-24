const systemConfig = require("../../config/system");
const md5 = require("md5")

const Account = require("../../models/accounts.model")
const Role = require("../../models/roles.model")

// [GET] /admin/accounts
module.exports.index = async (req, res) => {
    let find = {
        deleted: false,
    }
    
    const records = await Account.find(find).select("-password -token").populate("role_id")

    res.render("admin/pages/accounts/index.pug", {
        pageTitle: "Trang tài khoản",
        records: records,
    })
}

// [GET] /admin/accounts/create
module.exports.create = async (req, res) => {
    let find = {
        deleted: false,
    }

    const roles = await Role.find(find)

    res.render("admin/pages/accounts/create.pug", {
        pageTitle: "Tạo mới tài khoản",
        roles: roles, 
    })
}


// [POST] /admin/accounts/create
module.exports.createPost = async (req, res) => {
    const emailExist = await Account.findOne({
        deleted: false,
        email: req.body.email
    });
    console.log(emailExist)
    if (emailExist) {
        req.flash("error", `Email: ${req.body.email} đã tồn tại.`);
        res.redirect("back");
    } else {

        req.body.password = md5(req.body.password)

        const record = new Account(req.body)
    
        await record.save();
        res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    }
}   
