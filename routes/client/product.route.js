const express = require("express")
const router = express.Router()
const controller = require("../../controllers/client/products.controller")

router.get("/", controller.index)
router.get("/edit", controller.edit)
router.get("/creat", controller.creat)

module.exports = router