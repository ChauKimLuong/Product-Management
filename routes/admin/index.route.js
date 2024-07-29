const systemConfig = require("../../config/system")

const dashboardRoute = require("./dashboard.route.js")

module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin
    app.use(`${PATH_ADMIN}/dashboard`, dashboardRoute)
}
