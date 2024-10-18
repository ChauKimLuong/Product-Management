// [GET] /products
const Product = require("../../models/product.model.js")
const ProductCategory = require("../../models/product-category.model.js")

const productHelper = require("../../helpers/product.js")
const ProductCategoryHelper = require("../../helpers/product-category.js")

module.exports.index = async (req, res) => {
    let find = {
        status: "active",
        deleted: false,
    }
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

// [GET] /products/:slugCategory
module.exports.category = async (req, res) => {
    const category = await ProductCategory.findOne({
        slug: req.params.slugCategory,
        deleted: false, 
    })

    const categoryArr = await ProductCategoryHelper.getCategory(category)


    const products = await Product.find({
        deleted: false, 
        status: "active", 
        productCategory_id: {
            $in: categoryArr.map(cate => cate.id)
        },
    }).sort({ position: 1 })

    const newProducts = productHelper.newProductPrice(products)

    res.render("client/pages/products/index", {
        pageTitle: category.title,
        products: newProducts
    })
}

