const express = require("express")
const router = express.Router();

const controller = require("../../controllers/client/password.controller")
const validate = require("../../validate/client/password.validate")

router.get("/forgot", controller.forgot);

router.post("/forgot", validate.forgotPost, controller.forgotPost);

router.get("/otp", controller.otp);

router.post("/otp", validate.otpPost, controller.otpPost);

router.get("/reset", controller.reset);

router.post("/reset", validate.resetPost, controller.resetPost);

module.exports = router;