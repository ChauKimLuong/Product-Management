const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const productSchema = new mongoose.Schema(
  {
    title: String,
    productCategory_id: { type: String, default: "" },
    description: String,
    price: { type: Number, min: 0 },
    discountPercentage: { type: Number, min: 0 },
    stock: { type: Number, min: 0 },
    thumbnail: String,
    status: String,
    position: Number,
    deleted: { type: Boolean, default: false },
    deletedAt: Date,
    slug: { type: String, slug: "title", unique: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema, "Products");

module.exports = Product;
