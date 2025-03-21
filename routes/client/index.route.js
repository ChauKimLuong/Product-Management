const productRoutes = require("./product.route");
const homeRoutes = require("./home.route");
const searchRoutes = require("./search.routes");
const cartRoutes = require("./cart.routes");
const checkoutRoutes = require("./checkout.routes");
const userRoutes = require("./user.routes");
const passwordRoutes = require("./password.routes");
const chatRoutes = require("./chat.routes");
const friendRoutes = require("./friend.routes");
const chatRoomRoutes = require("./chatroom.routes");

const categoryMiddleware = require("../../middlewares/client/category.middleware");
const cartMiddleware = require("../../middlewares/client/cart.middleware");
const userMiddleware = require("../../middlewares/client/user.middleware");
const settingMiddleware = require("../../middlewares/client/setting.middleware");
const authMiddleware = require("../../middlewares/client/auth.middleware");
const socketMiddleware = require("../../middlewares/client/socket.middleware");

module.exports = (app) => {
    app.use(categoryMiddleware.category);
    app.use(cartMiddleware.cartId);
    app.use(userMiddleware.infoUser);
    app.use(settingMiddleware.settingGeneral);
    app.use(socketMiddleware.connect);

    app.use("/", homeRoutes);
    app.use("/products", productRoutes);
    app.use("/search", searchRoutes);
    app.use("/cart", cartRoutes);
    app.use("/checkout", checkoutRoutes);
    app.use("/user", userRoutes);
    app.use("/password", passwordRoutes);
    app.use("/chat", authMiddleware.requireAuth, chatRoutes);
    app.use("/friend", authMiddleware.requireAuth, friendRoutes);   
    app.use("/chatroom", authMiddleware.requireAuth, chatRoomRoutes);  
};
