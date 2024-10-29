const Cart = require("../../models/cart.model.js");
const Product = require("../../models/product.model.js");
const productHelper = require("../../helpers/product.js")

// [GET] /cart
module.exports.index = async (req, res) => {
  const cart = await Cart.findOne({ _id: req.cookies.cartId });
  let totalPriceAll = 0;

  for (const product of cart.products) {
    let productInfo = await Product.findOne({
      _id: product.product_id,
      deleted: false, 
      status: "active"
    }).select("title thumbnail price discountPercentage slug");

    productInfo = productInfo.toObject(); // ! Vì productInfo là tài lại Mongoose mặc định định là immutable
    productInfo = productHelper.newOneProductPrice(productInfo);

    totalPrice = productInfo.newPrice * product.quantity;
    totalPriceAll += totalPrice;

    product.productInfo = productInfo;
    product.totalPrice = totalPrice;
  }
  cart.totalPriceAll = totalPriceAll;

  res.render("client/pages/cart/index", {
    pageTitle: "Giỏ hàng",
    cart: cart,
  });
};
// [POST] /cart/add/:productId
module.exports.addPost = async (req, res) => {
  const productId = req.params.productId;
  const quantity = parseInt(req.body.quantity);
  const cartId = req.cookies.cartId;

  const cart = await Cart.findOne({ "products.product_id": productId });

  if (cart) {
    await Cart.updateOne(
      { _id: cartId, "products.product_id": productId },
      { $inc: { "products.$.quantity": quantity } }
    );
  } else {
    const objCart = {
      product_id: productId,
      quantity: quantity,
    };

    await Cart.updateOne({ _id: cartId }, { $push: { products: objCart } });
  }

  req.flash("success", "Thêm sản phẩm thành công!");
  res.redirect("/");
};
