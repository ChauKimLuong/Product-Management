const express = require("express");
const route = express.Router();
const controller = require("../../controllers/admin/products.controller");

const multer = require("multer")
const upload = multer();

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")

const validate = require("../../validate/admin/product.validate");

route.get("/", controller.index);

route.patch("/change-status/:status/:id", controller.changeStatus);

route.patch("/change-multi", controller.changeMulti);

route.delete("/delete/:id", controller.deleteItem);

route.get("/create", controller.create);

route.post(
    "/create",
    upload.single("thumbnail"),
    uploadCloud.upload,
    validate.createPost,
    controller.createPost
);

route.get("/edit/:id", controller.edit);

route.patch(
    "/edit/:id", // Đảm bảo rằng route trùng với URL trong form
    upload.single("thumbnail"), // Middleware để xử lý file upload
    uploadCloud.upload,
    validate.createPost, // Middleware để validate dữ liệu
    controller.editPatch // Controller xử lý logic
);

route.get("/detail/:id", controller.detail);

module.exports = route;
