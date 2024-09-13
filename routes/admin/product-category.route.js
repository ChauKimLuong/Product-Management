const express = require("express")
const route = express.Router()

const multer = require("multer")

const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")

const validate = require("../../validate/admin/product-category.validate");

const controller = require("../../controllers/admin/product-category.controller")

route.get("/", controller.index)

route.get("/create", controller.create)

route.post(
    "/create",
    upload.single("thumbnail"),
    uploadCloud.upload,
    validate.createPost,
    controller.createPost
);

route.get("/edit/:id", controller.edit)

route.patch("/edit/:id", 
    upload.single("thumbnail"),
    uploadCloud.upload,
    validate.createPost,
    controller.editPatch
)



module.exports = route