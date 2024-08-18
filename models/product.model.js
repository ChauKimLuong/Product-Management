const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: { type: Number, min: 0 },
    discountPercentage: { type: Number, min: 0 },
    stock: { type: Number, min: 0 },
    thumbnail: String,
    status: String,
    position: Number,
    deleted: { type: Boolean, default: false },
    deletedAt: Date,
}, {
    timestamps: true
});

const Product = mongoose.model("Product", productSchema, "Products");

module.exports = Product;
