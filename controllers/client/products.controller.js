// [GET] /products
const Product = require("../../models/product.model.js")
const productHelper = require("../../helpers/product.js")

let find = {
    status: "active",
    deleted: false,
}

module.exports.index = async (req, res) => {
    const products = await Product.find(find).sort({ position: -1 })
    // console.log(products)

    const newProducts = productHelper.newProductPrice(products)

    res.render("client/pages/products/index", {
        pageTitle: "Sản phẩm",
        products: newProducts
    })
}

// [GET] /products/detail/:slug
module.exports.detail = async (req, res) => {
    try {
        const find = {
            slug: req.params.slug,
            deleted: false,
            status: "active"
        }
        const product = await Product.findOne(find)

        res.render("client/pages/products/detail", {
            pageTitle: product.title, 
            product: product,
        })
    } catch (error) {
        req.flash("error", "Không tìm thấy sản phẩm!")
        res.redirect("/products")
    }
}


