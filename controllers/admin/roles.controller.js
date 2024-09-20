const Role = require("../../models/roles.model")
const systemConfig = require("../../config/system");

// [GET] /admin/roles
module.exports.index = async (req, res) => {
    let find = {
        deleted: false,
    }
    const records = await Role.find(find)

    res.render("admin/pages/roles/index", {
        pageTitle: "Nhóm quyền",
        records: records,
    })
}

// [GET] /admin/roles/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/roles/create", {
        pageTitle: "Nhóm quyền",
    })
}

// [POST] /admin/roles/create
module.exports.createPost = async (req, res) => {
    const record = new Role(req.body);
    await record.save();

    res.redirect(`${systemConfig.prefixAdmin}/roles`)
}

// [GET] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id
    
        const record = await Role.findOne({ _id: id })

        res.render("admin/pages/roles/edit", {
            pageTitle: "Chỉnh sửa nhóm quyền",
            record: record,
        })
    } catch (error) {
        req.flash("error", "Không tìm thấy nhóm quyền!");
        res.redirect(`${systemConfig.prefixAdmin}/roles`);
    }
}

// [PATCH] /admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
    try {
        await Role.updateOne({_id: req.params.id}, req.body)

        req.flash("success", "Cập nhật thành công!")
    } catch (error) {
        req.flash("error", "Cập nhật thất bại!");
    }
    res.redirect("back")
}


// [GET] /admin/roles/permissions
module.exports.permissions = async (req, res) => {
    let find = {
        deleted: false,
    }

    const records = await Role.find(find);

    res.render("admin/pages/roles/permissions", {
        pageTitle: "Phân quyền",
        records: records,
    })
}

// [PATCH] /admin/roles/permissions
module.exports.permissionsPatch = async (req, res) => {
    try {
        const roles = JSON.parse(req.body.permissions)

        for (const item of roles) {
            await Role.updateOne({ _id: item.id }, { permissions: item.permissions })
        }

        req.flash("success", "Cập nhật Phân quyền thành công!")
    } catch (error) {
        req.flash("error", "Cập nhật Phân quyền thất bại!")
    }

    res.redirect("back")
}