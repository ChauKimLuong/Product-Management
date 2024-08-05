// [GET] /admin/products


const Product = require("../../models/product.model")
const filterStatusHelper = require("../../helpers/filterStatus")
const seachHelper = require("../../helpers/search")

module.exports.products = async (req, res) => {

    // Xử lý trạng thái lọc từ các tham số truy vấn
    const filterStatus = filterStatusHelper(req.query)

    // Khởi tạo đối tượng find để tìm kiếm các sản phẩm 
    let find = { deleted: false }

    // Thêm trạng thái lọc vào đối tượng find nếu có
    let currentStatus = req.query.status
    if (currentStatus)
        find.status = currentStatus

    // Xử lý từ khóa tìm kiếm từ các tham số truy vấn
    const objectSearch = seachHelper(req.query)
    if (objectSearch.regex)
        find.title = objectSearch.regex

    // Chức năng phân trang
    let objectPagination = {
        limitItems: 4,
        currentPage: 1,
        skip: 0,

    }
    const countItem = await Product.countDocuments(find)
    objectPagination.titlePage = Math.ceil(countItem / objectPagination.limitItems)

    if (req.query.page) {
        objectPagination.currentPage = parseInt(req.query.page)
        objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems
    }



    // Lấy các sản phẩm từ cơ sở dữ liệu
    const products = await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip)
    // console.log(products)

    res.render("admin/pages/products/index.pug", {
        pageTitle: "Trang sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination,
    })
}