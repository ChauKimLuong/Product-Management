// [GET] /admin/products


const Product = require("../../models/product.model")
const filterStatusHeler = require("../../helpers/filterStatus")

module.exports.products = async (req, res) => { 
    const filterStatus = filterStatusHeler(req.query)
    
    let find = {
        deleted: false,
    }
// Chức năng lọc
    let currentStatus = req.query.status
    if (currentStatus)
        find.status = currentStatus

// Chức năng tìm kiếm
    let keyword = req.query.keyword
    if (keyword){
        const regex = new RegExp(keyword, "i")
        find.title = regex
    } 

    const products = await Product.find(find)
    // console.log(products)

    res.render("admin/pages/products/index.pug", {
        pageTitle: "Trang sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: keyword,
    })
}