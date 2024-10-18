const systemConfig = require("../../config/system");
const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");

const productCategory = require("../../models/product-category.model")
const createTreeHelper = require("../../helpers/createTree")

const Account = require("../../models/accounts.model")

// [GET] /admin/products
module.exports.index = async (req, res) => {
    // Xử lý trạng thái lọc từ các tham số truy vấn
    const filterStatus = filterStatusHelper(req.query);

    // Khởi tạo đối tượng find để tìm kiếm các sản phẩm
    let find = { deleted: false };

    // Thêm trạng thái lọc vào đối tượng find nếu có
    let currentStatus = req.query.status;
    if (currentStatus) find.status = currentStatus;

    // Xử lý từ khóa tìm kiếm từ các tham số truy vấn
    const objectSearch = searchHelper(req.query);
    if (objectSearch.regex) find.title = objectSearch.regex;

    // Chức năng phân trang
    const countProduct = await Product.countDocuments(find);
    let objectPagination = paginationHelper(
        {
            limitItems: 5,
            currentPage: 1,
            skip: 0,
        },
        req.query,
        countProduct
    );

    // Sort
    let sort = {};
    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue
    } else {
        sort.position = "desc"
    }

    // Lấy các sản phẩm từ cơ sở dữ liệu 
    const products = await Product.find(find)
        .sort(sort)
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip);

    for (const product of products) {
        // Lấy ra thông tin người tạo
        const creator = await Account.findOne({
            _id: product.createdBy.account_id
        })

        if (creator) {
            product.creatorFullName = creator.fullName;
        }

        // Lấy ra thông tin người cập nhật gần nhất
        const updatedBy = product.updatedBy.at(-1)
        
        if (updatedBy){
            const lastUpdater = await Account.findOne({
                _id: updatedBy.account_id
            })

            product.lastUpdaterFullName = lastUpdater.fullName
        }
    }


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
    
    const updatedBy = {
        account_id: res.locals.user.id,
        updatedAt: new Date(),
    }

    await Product.updateOne(
        { _id: req.params.id },
        {
            status: status,
            $push: { updatedBy: updatedBy }
        }
    )

    req.flash("success", "Cập nhật trạng thái thành công!");
    res.redirect("back");
};

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(", ");

    const updatedBy = {
        account_id: res.locals.user.id,
        updatedAt: new Date(),
    }

    switch (type) {
        case "active":
            await Product.updateMany(
                { _id: { $in: ids } }, 
                { 
                    status: "active",
                    $push: { updatedBy: updatedBy }
                }
            );
            break;
        case "inactive":
            await Product.updateMany(
                { _id: { $in: ids } }, 
                { 
                    status: "inactive",
                    $push: { updatedBy: updatedBy }
                }
            );
            break;
        case "delete":
            await Product.updateMany(
                { _id: { $in: ids } },
                {
                    deleted: true,
                    deletedBy: {
                        account_id: res.locals.user.id,
                        deletedAt: new Date(),
                    }
                }
            );
            break;
        case "change-position":
            for (const id_pos of ids) {
                const [id, pos] = id_pos.split("-");
                await Product.updateOne({ _id: id }, { 
                    position: pos,
                    $push: { updatedBy: updatedBy }
                });
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
        {
            deleted: true,
            deletedBy: {
                account_id: res.locals.user.id,
                deletedAt: new Date(),
            }
        }
    );
    req.flash("success", "Xóa sản phẩm thành công!");
    res.redirect("back");
};

// [GET] /admin/products/create
module.exports.create = async (req, res) => {
    let find = {
        deleted: false,
    }

    const records = await productCategory.find(find);
    const newRecords = createTreeHelper(records);

    res.render("admin/pages/products/create", {
        pageTitle: "Tạo sản phẩm",
        category: newRecords,
    });
};

// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {
    const permissions = res.locals.role.permissions
    if (!permissions.includes("products_create")) {
        return;
    }

    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);

    // if (req.file) {
    //     req.body.thumbnail = `/uploads/${req.file.filename}`;
    // }

    if (!req.body.position) {
        req.body.position = (await Product.countDocuments()) + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }

    req.body.createdBy = {
        account_id: res.locals.user.id
    }

    const product = new Product(req.body);
    await product.save();

    res.redirect(`${systemConfig.prefixAdmin}/products`);
};


// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const find = {
            _id: req.params.id,
            deleted: false,
        }
        const product = await Product.findOne(find)

        let find_2 = {
            deleted: false,
        }

        const records = await productCategory.find(find_2);
        const newRecords = createTreeHelper(records);


        res.render("admin/pages/products/edit", {
            pageTitle: "Chỉnh sửa sản phẩm",
            product: product,
            category: newRecords,
        })
    } catch (error) {
        req.flash("error", "Không tìm thấy sản phẩm!");
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
}
// [PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);

    if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }

    try {
        const updatedBy = {
            account_id: res.locals.user.id,
            updatedAt: new Date(),
        }

        await Product.updateOne(
            { _id: req.params.id },
            {
                ...req.body,
                $push: { updatedBy: updatedBy }
            }
        )

        req.flash("success", "Cập nhật thành công!");
    } catch (error) {
        req.flash("error", "Cập nhật thất bại!");
    }

    res.redirect("back");
};

// [GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
    try {
        const find = {
            _id: req.params.id,
            deleted: false,
        }
        const product = await Product.findOne(find);

        res.render("admin/pages/products/detail", {
            pageTitle: "Chi tiết sản phẩm",
            product: product
        })
    } catch (error) {
        req.flash("error", "Không tìm thấy sản phẩm!");
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
}