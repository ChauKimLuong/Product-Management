const Cart = require("../../models/cart.model.js");
const Product = require("../../models/product.model.js");
const Order = require("../../models/order.model.js");
const productHelper = require("../../helpers/product.js");

// [GET] /checkout
module.exports.index = async (req, res) => {
    const cart = await Cart.findOne({ _id: req.cookies.cartId });
    // console.log(cart);
    let totalPriceAll = 0;

    for (const product of cart.products) {
        let productInfo = await Product.findOne({
            _id: product.product_id,
            deleted: false,
            status: "active",
        }).select("title thumbnail price discountPercentage slug");

        productInfo = productInfo.toObject(); // ! Vì productInfo là Mongoose Document
        productInfo = productHelper.newOneProductPrice(productInfo);

        const totalPrice = productInfo.newPrice * product.quantity;
        totalPriceAll += totalPrice;

        product.productInfo = productInfo;
        product.totalPrice = totalPrice;
    }
    cart.totalPriceAll = totalPriceAll;

    res.render("client/pages/checkout/index", {
        pageTitle: "Thanh toán",
        cart: cart,
    })
}


// [POST] /checkout/order
module.exports.order = async (req, res) => {
    const cartId = req.cookies.cartId;
    const cart = await Cart.findOne({ _id: cartId });
    const userInfo = req.body;

    // const products = cart.products; //! Cách 1 Web load không nổi :)) 
    // for (const product of cart.products) {
    //     const productInfo = await Product.findOne({ 
    //         _id: product.product_id,
    //         deleted: false,
    //         status: "active",
    //     }).select("price discountPercentage");

    //     const objectProduct = {
    //         product_id: product.product_id,
    //         quantity: product.quantity,
    //         price: productInfo.price,
    //         discountPercentage: productInfo.discountPercentage,
            
    //     }

    //     products.push(objectProduct)
    // }

    //* Promise.all([...]) nhận vào một mảng Promise và chờ tất cả các Promise hoàn thành. Khi tất cả các truy vấn đã hoàn thành, Promise.all trả về một mảng chứa kết quả của từng Promise.
    const products = await Promise.all( 
        cart.products.map(async (product) => {
            const productInfo = await Product.findOne({ 
                _id: product.product_id,
                deleted: false,
                status: "active",
            }).select("price discountPercentage");

            return {
                product_id: product.product_id,
                quantity: product.quantity,
                price: productInfo.price,
                discountPercentage: productInfo.discountPercentage,
            };
        })
    );
    const order = new Order({
        userInfo: userInfo,
        cart_id: cartId,
        products: products,
    })

    await order.save();

    await Cart.updateOne(
        { _id: cartId }, 
        { products: []}
    )

    res.redirect(`/checkout/success/${order._id}`)
}

// [GET] /checkout/success/:orderId
module.exports.success = async (req, res) => {
    const orderId = req.params.orderId;
    const order = await Order.findOne({ _id: orderId });
    const orderObj = order.toObject();

    const processedProducts = await Promise.all((orderObj.products.map(async (product) => {
        const productInfo = await Product.findOne({ _id: product.product_id }).select("title thumbnail");

        product.productInfo = productInfo;
        product = productHelper.newOneProductPrice(product);
        product.totalPrice = product.quantity * product.newPrice;

        return product;
    })))

    orderObj.products = processedProducts;
    orderObj.totalPriceAll = orderObj.products.reduce((sum, item) => sum + item.totalPrice, 0);

    console.log(orderObj);

    res.render("client/pages/checkout/success", {
        pageTitle: "Đặt hàng thành công",
        order: orderObj,
    })
}
