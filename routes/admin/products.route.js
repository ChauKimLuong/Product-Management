const express = require("express");
const route = express.Router();
const controller = require("../../controllers/admin/products.controller");
// Multer
const multer = require("multer");
const storageMulter = require("../../helpers/storageMulter");
const upload = multer({ storage: storageMulter() });

const validate = require("../../validate/admin/product.validate");

route.get("/", controller.products);

route.patch("/change-status/:status/:id", controller.changeStatus);

route.patch("/change-multi", controller.changeMulti);

route.delete("/delete/:id", controller.deleteItem);

route.get("/create", controller.create);

route.post(
    "/create",
    upload.single("thumbnail"),
    validate.createPost,
    controller.createPost
);

route.get("/edit/:id", controller.edit);

route.patch(
    "/edit/:id", // Đảm bảo rằng route trùng với URL trong form
    upload.single("thumbnail"), // Middleware để xử lý file upload
    validate.createPost, // Middleware để validate dữ liệu
    controller.editPatch // Controller xử lý logic
);

module.exports = route;
