const express = require("express")
const router = express.Router()
const controller = require("../../controllers/client/chatroom.controller")

router.get("/", controller.index)


module.exports = router