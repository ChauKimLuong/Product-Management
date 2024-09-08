const systemConfig = require("../../config/system");
const ProductCategory = require("../../models/product-category.model")

// [GET] /admin/product-category
module.exports.index = async (req, res) => {
    let find = {
        deleted: false,
    }

    record = await ProductCategory.find(find);

    

    res.render("admin/pages/product-category/index", {
        pageTitle: "Trang danh mục sản phẩm",
        record: record
    })
}

// [GET] /admin/product-category/create
module.exports.create = (req, res) => {
    res.render("admin/pages/product-category/create", {
        pageTitle: "Tạo danh mục"
    })
}

// [POST] /admin/product-category/create
module.exports.createPost = async (req, res) => {
    if (!req.body.position) {
        req.body.position = (await ProductCategory.countDocuments()) + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }

    const record = new ProductCategory(req.body);
    await record.save();

    res.redirect(`${systemConfig.prefixAdmin}/product-category`);
}
