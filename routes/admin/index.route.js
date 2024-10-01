const systemConfig = require("../../config/system")

const dashboardRoute = require("./dashboard.route.js")
const productRoute = require("./products.route.js") 
const productCategoryRoute = require("./product-category.route.js")
const roleRoute = require("./roles.route.js")
const accountRoute = require("./accounts.route.js")
const authRoute = require("./auth.route.js")

module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin

    app.use(`${PATH_ADMIN}/dashboard`, dashboardRoute)
    app.use(`${PATH_ADMIN}/products`, productRoute)
    app.use(`${PATH_ADMIN}/product-category`, productCategoryRoute)
    app.use(`${PATH_ADMIN}/roles`, roleRoute)
    app.use(`${PATH_ADMIN}/accounts`, accountRoute)
    app.use(`${PATH_ADMIN}/auth`, authRoute)
}