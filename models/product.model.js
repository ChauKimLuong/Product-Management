const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const productSchema = new mongoose.Schema(
  {
    title: String,
    productCategory_id: {
      type: String,
      default: "",
    },
    description: String,
    price: {
      type: Number,
      min: 0,
    },
    discountPercentage: {
      type: Number,
      min: 0,
    },
    stock: {
      type: Number,
      min: 0,
    },
    thumbnail: String,
    featured: String,
    status: String,
    position: Number,
    createdBy: {
      account_id: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedBy: {
      account_id: String,
      deletedAt: {
        type: Date,
      },
    },
    updatedBy: [
      {
        account_id: String,
        updatedAt: {
          type: Date,
        },
      },
    ],
    slug: {
      type: String,
      slug: "title",
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema, "Products");

module.exports = Product;
