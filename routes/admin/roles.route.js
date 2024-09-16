const express = require("express")
const route = express.Router()

controller = require("../../controllers/admin/roles.controller")


route.get("/", controller.index)

route.get("/create", controller.create)

route.post("/create", controller.createPost)

module.exports = route