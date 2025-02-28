const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/friend.controller")

router.get("/not-friends", controller.notFriends);

router.get("/friends", controller.friends);

router.get("/requests", controller.requests);

router.get("/responds", controller.responds);

module.exports = router;