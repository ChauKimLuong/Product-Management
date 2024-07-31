// [GET] /admin/products


const Product = require("../../models/product.model")

module.exports.products = async (req, res) => {
    const products = await Product.find({
        deleted: false,
    })
    console.log(products)
    res.render("admin/pages/products/index.pug", {
        pageTitle: "Trang sản phẩm",
        products: products
    })
}