const ProductCategory = require("../../models/product-category.model")
const Product = require("../../models/product.model")
const Account = require("../../models/accounts.model")
const User = require("../../models/user.model")

// [GET] /admin/dashboard
module.exports.dashboard = async (req, res) => {
    const productCategorys = {
        total: await ProductCategory.countDocuments({ deleted: false }),
        active: await ProductCategory.countDocuments({ status: "active", deleted: false }),
        inactive: await ProductCategory.countDocuments({ status: "inactive", deleted: false }),
    }

    const products = {
        total: await Product.countDocuments({ deleted: false }),
        active: await Product.countDocuments({ status: "active", deleted: false }),
        inactive: await Product.countDocuments({ status: "inactive", deleted: false }),
    }

    const accounts = {
        total: await Account.countDocuments({ deleted: false }),
        active: await Account.countDocuments({ status: "active", deleted: false }),
        inactive: await Account.countDocuments({ status: "inactive", deleted: false }),
    }

    const users = {
        total: await User.countDocuments({ deleted: false }),
        active: await User.countDocuments({ status: "active", deleted: false }),
        inactive: await User.countDocuments({ status: "inactive", deleted: false }),
    }

    res.render("admin/pages/dashboard/index.pug", {
        pageTitle: "Trang tổng quan",
        productCategorys: productCategorys,
        products: products,
        accounts: accounts,
        users: users,
    })
}
