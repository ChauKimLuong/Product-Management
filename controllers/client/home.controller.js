const Product = require("../../models/product.model.js")
const productHelper = require("../../helpers/product.js")

// [GET] /
module.exports.index = async (req, res) => {
// Sản phầm nổi bật
    const featuredProducts = await Product.find({
        featured: "1", 
        deleted: false,
        status: "active",
    }).limit(3)

    const newFeaturedProducts = productHelper.newProductPrice(featuredProducts)
// Sản phầm nổi bật

// Sản phầm nới nhất
    const newestProducts = await Product
    .find({
        deleted: false,
        status: "active",
    })
    .sort({ position: -1 })
    .limit(4)

    const newestProductsPrice = productHelper.newProductPrice(newestProducts)
// Sản phầm nới nhất

    res.render("client/pages/home/index", {
        pageTitle: "Trang ông chủ",
        newFeaturedProducts: newFeaturedProducts,
        newestProducts: newestProductsPrice,
    })
}