const mongoose = require("mongoose")
const orderSchema = new mongoose.Schema(
    {
        user_id: String,
        userInfo: {
            fullName: String,
            phone: String,
            address: String,
        },
        cart_id: String,
        products: [
            {
                product_id: String,
                quantity: Number,
                discountPercentage: Number,
                price: Number,
            }
        ],

        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: Date,
    },
    {
        timestamps: true,
    }
)

const Order = mongoose.model("Order", orderSchema, "orders")

module.exports = Order