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

// [GET] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
    try {
        let find = {
            _id: req.params.id,
            deleted: false,
        }

        const record = await Account.findOne(find).populate('role_id');;

        const roles = await Role.find({deleted: false});

        res.render("admin/pages/accounts/edit", {
            pageTitle: "Chỉnh sửa tài khoản",
            record: record,
            roles: roles,
            
        })
    } catch (error) {
        req.flash("error", "Không tìm thấy tài khoản!");
        res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    }
}


// [PATCH] /admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
    const permissions = res.locals.role.permissions
    if (!permissions.includes("accounts_create")) {
        return;
    }
    const emailExist = await Account.findOne({
        _id: {$ne: req.params.id},
        deleted: false,
        email: req.body.email
    });

    if (emailExist) {
        req.flash("error", `Email: ${req.body.email} đã tồn tại.`);
        
    } else {
        if (req.body.password){
            req.body.password = md5(req.body.password)
        } else {
            delete req.body.password;
        }
    
        await Account.updateOne({_id: req.params.id}, req.body);
        req.flash("success", "Cập nhật tài khoản thành công!");
    }
    res.redirect("back");
}