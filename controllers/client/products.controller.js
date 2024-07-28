const Product = require("../../models/product.model.js")

module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false,

    })
    console.log(products)

    const newProducts = products.map((item) => {
        item.priceNew = (item.price*(1-item.discountPercentage/100)).toFixed()
        return item
    })

    res.render("client/pages/products/index", {
        pageTitle: "Sản phẩm",
        products: newProducts
    })
}

module.exports.edit = (req, res) => {
    res.render("client/pages/products/index", {
        pageTitle: "Chỉnh sủa sản phẩm"
    })
}

module.exports.create = (req, res) => {
    res.render("client/pages/products/index", {
        pageTitle: "Thêm sản phẩm mới",
    })
}


