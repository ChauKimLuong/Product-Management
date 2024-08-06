const express = require("express")
const route = express.Router()
const controller =  require("../../controllers/admin/products.controller")

route.get("/", controller.products)
route.patch("/change-status/:status/:id", controller.changeStatus)

module.exports = route