// [GET] /admin/products


const Product = require("../../models/product.model")

module.exports.products = async (req, res) => { 
    

    let find = {
        deleted: false,
    }
    if (req.query.status)
        find.status = req.query.status

    const products = await Product.find(find)
    // console.log(products)

    res.render("admin/pages/products/index.pug", {
        pageTitle: "Trang sản phẩm",
        products: products
    })
}