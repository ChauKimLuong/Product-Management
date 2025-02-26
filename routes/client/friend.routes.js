const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/friend.controller")

router.get("/not-friends", controller.notFriends)

module.exports = router;