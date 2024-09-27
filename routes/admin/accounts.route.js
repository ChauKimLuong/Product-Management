const express = require("express")
const router = express.Router()

const multer = require("multer")
const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")
const validate = require("../../validate/admin/account.validate");

const controller = require("../../controllers/admin/accounts.controller")

router.get("/", controller.index)

router.get("/create", controller.create)

router.post("/create",
    upload.single("avatar"),
    uploadCloud.upload, 
    validate.createPost,
    controller.createPost
)

router.get("/edit/:id", controller.edit)

router.patch("/edit/:id",
    upload.single("avatar"),
    uploadCloud.upload, 
    validate.createPost,
    controller.editPatch
)

module.exports = router;