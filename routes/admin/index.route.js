const systemConfig = require("../../config/system")

const dashboardRoute = require("./dashboard.route.js")
const productsRoute = require("./products.route.js") 
const productCategoryRoute = require("./product-category.route.js")
const rolesRoute = require("./roles.route.js")


module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin

    app.use(`${PATH_ADMIN}/dashboard`, dashboardRoute)
    app.use(`${PATH_ADMIN}/products`, productsRoute)
    app.use(`${PATH_ADMIN}/product-category`, productCategoryRoute)
    app.use(`${PATH_ADMIN}/roles`, rolesRoute)
}