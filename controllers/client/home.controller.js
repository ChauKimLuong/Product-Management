const Product = require("../../models/product.model.js")
const productHelper = require("../../helpers/product.js")

// [GET] /
module.exports.index = async (req, res) => {
    // Sẩn phầm nổi bật
    const featuredProducts = await Product.find({
        featured: "1", 
        deleted: false,
        status: "active",
    }).limit(3)

    const newProducts = productHelper.newProductPrice(featuredProducts)

    res.render("client/pages/home/index", {
        pageTitle: "Trang ông chủ",
        featuredProducts: newProducts,
    })
}