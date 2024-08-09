const express = require("express")
const route = express.Router()
const controller =  require("../../controllers/admin/products.controller")

route.get("/", controller.products)

route.patch("/change-status/:status/:id", controller.changeStatus)

route.patch("/change-multi", controller.changeMulti)

route.delete("/delete/:id", controller.deleteItem)

module.exports = route