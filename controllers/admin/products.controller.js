// [GET] /admin/products
const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const seachHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");

module.exports.products = async (req, res) => {
    // Xử lý trạng thái lọc từ các tham số truy vấn
    const filterStatus = filterStatusHelper(req.query);

    // Khởi tạo đối tượng find để tìm kiếm các sản phẩm
    let find = { deleted: false };

    // Thêm trạng thái lọc vào đối tượng find nếu có
    let currentStatus = req.query.status;
    if (currentStatus) find.status = currentStatus;

    // Xử lý từ khóa tìm kiếm từ các tham số truy vấn
    const objectSearch = seachHelper(req.query);
    if (objectSearch.regex) find.title = objectSearch.regex;

    // Chức năng phân trang
    const countProduct = await Product.countDocuments(find);
    let objectPagination = paginationHelper(
        {
            limitItems: 4,
            currentPage: 1,
            skip: 0,
        },
        req.query,
        countProduct
    );

    // Lấy các sản phẩm từ cơ sở dữ liệu
    const products = await Product.find(find)
        .sort({ position: -1 })
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip);
    // console.log(products)
    res.render("admin/pages/products/index.pug", {
        pageTitle: "Trang sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination,
    });
};

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    await Product.updateOne({ _id: id }, { status: status });

    req.flash("success", "Cập nhật trạng thái thành công!");
    res.redirect("back");
};

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(", ");
    
    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
            break;
        case "inactive":
            break;
        case "delete":
            await Product.updateMany(
                { _id: { $in: ids } },
                { deleted: true, deletedAt: new Date() }
            );
            break;
        case "change-position":
            for (const id_pos of ids) {
                const [id, pos] = id_pos.split("-");
                await Product.updateOne({ _id: id }, { position: pos });
            }
            break;
        default:
            break;
    }
    req.flash("success", `Đã ${type} ${ids.length} sản phẩm!`);
    res.redirect("back");
};
// [DELETE]/admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;

    // await Product.deleteOne({ _id: id })
    await Product.updateOne(
        { _id: id },
        { deleted: true, deletedAt: new Date() }
    );
    req.flash("success", "Xóa sản phẩm thành công!");
    res.redirect("back");
};
