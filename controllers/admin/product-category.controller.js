const systemConfig = require("../../config/system");
const productCategory = require("../../models/product-category.model")
const createTreeHelper = require("../../helpers/createTree")

// [GET] /admin/product-category
module.exports.index = async (req, res) => {
    let find = {
        deleted: false,
    }

    const records = await productCategory.find(find);
    const newRecords = createTreeHelper(records);

    res.render("admin/pages/product-category/index", {
        pageTitle: "Trang danh mục sản phẩm",
        records: newRecords,
    })
}

// [GET] /admin/product-category/create
module.exports.create = async (req, res) => {
    let find = {
        deleted: false,
    }

    const records = await productCategory.find(find);
    const newRecords = createTreeHelper(records);

    res.render("admin/pages/product-category/create", {
        pageTitle: "Tạo danh mục",
        records: newRecords,
    })
}

// [POST] /admin/product-category/create
module.exports.createPost = async (req, res) => {
    if (!req.body.position) {
        req.body.position = (await productCategory.countDocuments()) + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }

    const record = new productCategory(req.body);
    await record.save();

    res.redirect(`${systemConfig.prefixAdmin}/product-category`);
}

// [GET] /admin/product-category/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;
        let find = {
            deleted: false,
            _id: id, 
        }

        const data = await productCategory.findOne(find);

        let find_2 = {
            deleted: false,
        }

        const records = await productCategory.find(find_2);
        const newRecords = createTreeHelper(records);

        res.render("admin/pages/product-category/edit", {
            pageTitle: "Chỉnh sửa danh mục",
            productCategory: data,
            records: newRecords,
        })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/product-category`)
    }
}

module.exports.editPatch = async(req, res) => {
    const id = req.params.id;

    req.body.position = parseInt(req.body.position);
    
    try {
        await productCategory.updateOne({ _id: req.params.id }, req.body);
        req.flash("success", "Cập nhật thành công!");
    } catch (error) {
        req.flash("error", "Cập nhật thất bại!");
    }
    
    res.redirect("back");
}