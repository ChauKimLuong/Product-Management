const systemConfig = require("../../config/system");

const dashboardRoute = require("./dashboard.route.js");
const productRoute = require("./products.route.js");
const productCategoryRoute = require("./product-category.route.js");
const roleRoute = require("./roles.route.js");
const accountRoute = require("./accounts.route.js");

const authRoute = require("./auth.route.js");
const authMiddleware = require("../../middlewares/admin/auth.middleware.js");

module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;

    app.use(
        `${PATH_ADMIN}/dashboard`,
        authMiddleware.requireAuth,
        dashboardRoute
    );

    app.use(`${PATH_ADMIN}/products`, 
        authMiddleware.requireAuth, 
        productRoute
    );

    app.use(
        `${PATH_ADMIN}/product-category`,
        authMiddleware.requireAuth,
        productCategoryRoute
    );

    app.use(`${PATH_ADMIN}/roles`, 
        authMiddleware.requireAuth, 
        roleRoute
    );

    app.use(`${PATH_ADMIN}/accounts`, 
        authMiddleware.requireAuth, 
        accountRoute
    );

    app.use(`${PATH_ADMIN}/auth`, authRoute);
};
