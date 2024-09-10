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
