// [GET] /products

const Product = require("../../models/product.model.js")

let find = {
    status: "active",
    deleted: false,
}

module.exports.index = async (req, res) => {
    const products = await Product.find(find).sort({ position: -1 })
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


