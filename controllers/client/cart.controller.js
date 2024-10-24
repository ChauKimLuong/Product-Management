const Cart = require("../../models/cart.model.js")
// const Product = require("../../models/product.model.js")


// [POST] /add/:productId
module.exports.addPost = async (req, res) => {
    const productId = req.params.productId;
    const quantity = parseInt(req.body.quantity);
    const cartId = req.cookies.cartId;

    const cart = await Cart.findOne({ "products.product_id": productId })
    
    if (cart) {
        await Cart.updateOne(
            { _id: cartId, "products.product_id": productId },
            { $inc: { "products.$.quantity": quantity } }
        )
    } else {
        const objCart = {
            product_id: productId,
            quantity: quantity
        }

        await Cart.updateOne(
            { _id: cartId }, 
            { $push: { products: objCart } }
        );
    }

    req.flash("success", "Thêm sản phẩm thành công!")
    res.redirect("/")
}